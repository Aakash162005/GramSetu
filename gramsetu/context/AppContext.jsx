'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Real Data State
  const [schemes, setSchemes] = useState([]);
  const [notices, setNotices] = useState([]);
  const [events, setEvents] = useState([]);
  const [userComplaints, setUserComplaints] = useState([]);

  // Fetch initial generic data on load
  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        const [schemesRes, noticesRes, eventsRes] = await Promise.all([
          fetch('/api/schemes').then(r => r.json()),
          fetch('/api/notices').then(r => r.json()),
          fetch('/api/events').then(r => r.json())
        ]);
        
        setSchemes(Array.isArray(schemesRes) ? schemesRes : []);
        setNotices(Array.isArray(noticesRes) ? noticesRes : []);
        setEvents(Array.isArray(eventsRes) ? eventsRes : []);
      } catch (error) {
        console.error('Error fetching global data:', error);
      }
    };
    fetchGlobalData();
  }, []);

  // Fetch user specific data
  useEffect(() => {
    // Check local storage for session
    const savedUser = localStorage.getItem('gramsetu_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      fetchUserComplaints(parsedUser.id);
    }
    setIsLoaded(true);
  }, []);

  const fetchUserComplaints = async (userId) => {
    try {
      const res = await fetch(`/api/complaints?userId=${userId}`);
      const data = await res.json();
      setUserComplaints(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    }
  };

  const login = async (phone, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        return { success: false, message: data.error || 'Login failed' };
      }
      
      setUser(data.user);
      localStorage.setItem('gramsetu_user', JSON.stringify(data.user));
      fetchUserComplaints(data.user.id);
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Server connection error' };
    }
  };

  const signup = async (userData) => {
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        return { success: false, message: data.error || 'Signup failed' };
      }
      
      setUser(data.user);
      localStorage.setItem('gramsetu_user', JSON.stringify(data.user));
      setUserComplaints([]); // new user has no complaints
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, message: 'Server connection error' };
    }
  };

  const logout = () => {
    setUser(null);
    setUserComplaints([]);
    localStorage.removeItem('gramsetu_user');
  };

  const submitComplaint = async (complaintData) => {
    if (!user) return null;
    
    try {
      const res = await fetch('/api/complaints', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...complaintData, userId: user.id })
      });
      
      if (res.ok) {
        const newComplaint = await res.json();
        setUserComplaints([newComplaint, ...userComplaints]);
        return newComplaint;
      }
      return null;
    } catch (error) {
      console.error('Error submitting complaint:', error);
      return null;
    }
  };

  // We still provide a static services list as it might not be dynamic yet
  const servicesList = [
    {
      id: 's1',
      title: 'Income Certificate',
      icon: 'FileText',
      description: 'Apply for official income certificate required for scholarships and subsidies.'
    },
    {
      id: 's2',
      title: 'Caste Certificate',
      icon: 'FileText',
      description: 'Apply for SC/ST/OBC caste certificate with the sub-divisional magistrate office.'
    },
    {
      id: 's3',
      title: 'Birth & Death Registration',
      icon: 'FileText',
      description: 'Register births and deaths online to receive official certificates quickly.'
    },
    {
      id: 's4',
      title: 'Pension Scheme',
      icon: 'FileText',
      description: 'Apply for old age, widow, or disability pension schemes.'
    },
    {
      id: 's5',
      title: 'Water Connection',
      icon: 'Droplet',
      description: 'Apply for a new household water connection or report issues with existing one.'
    },
    {
      id: 's6',
      title: 'BPL Card Application',
      icon: 'FileText',
      description: 'Apply for Below Poverty Line (BPL) ration card.'
    }
  ];

  return (
    <AppContext.Provider value={{
      user,
      isLoaded,
      login,
      signup,
      logout,
      schemes,
      notices,
      events,
      userComplaints,
      submitComplaint,
      servicesList
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
