'use client';
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function AdminDashboard() {
  const { user, isLoaded, schemes, notices } = useAppContext();
  const [users, setUsers] = useState([]);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsCategory, setNewsCategory] = useState('News');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchUsers();
    }
  }, [user]);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching users:', error);
      setUsers([]);
    }
  };

  const handleToggleBlock = async (userId, currentStatus) => {
    try {
      await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, isBlocked: !currentStatus })
      });
      fetchUsers(); // Refresh
    } catch (error) {
      console.error('Error updating user block status:', error);
    }
  };

  const handlePostNews = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch('/api/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newsTitle, content: newsContent, category: newsCategory })
      });
      setNewsTitle('');
      setNewsContent('');
      alert('News posted successfully!');
    } catch (error) {
      console.error('Error posting news:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded || !user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (user.role !== 'admin') {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl text-red-600 font-bold">Unauthorized Access</p>
        </div>
        <Footer />
      </>
    );
  }

  const citizensCount = users.filter(u => u.role !== 'admin').length;

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage users, schemes, notices, and post daily village progress.</p>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none shadow-md">
              <CardContent className="p-6">
                <p className="text-blue-100 mb-1">Total Citizens</p>
                <h3 className="text-4xl font-bold">{citizensCount}</h3>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-none shadow-md">
              <CardContent className="p-6">
                <p className="text-green-100 mb-1">Active Schemes</p>
                <h3 className="text-4xl font-bold">{schemes.length}</h3>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-none shadow-md">
              <CardContent className="p-6">
                <p className="text-purple-100 mb-1">Active Notices</p>
                <h3 className="text-4xl font-bold">{notices.length}</h3>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* User Management Section */}
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto pr-2">
                  {users.map(u => (
                    <div key={u.id} className="py-4 flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{u.name} {u.role === 'admin' && <Badge variant="primary" className="ml-2 text-xs">Admin</Badge>}</p>
                        <p className="text-sm text-gray-500">{u.phone} • {u.village}</p>
                      </div>
                      {u.role !== 'admin' && (
                        <Button 
                          variant={u.isBlocked ? "primary" : "danger"} 
                          size="sm"
                          onClick={() => handleToggleBlock(u.id, u.isBlocked)}
                        >
                          {u.isBlocked ? 'Unblock' : 'Block'}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Post Village News Section */}
            <Card>
              <CardHeader>
                <CardTitle>Post Village News & Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePostNews} className="space-y-4">
                  <Input 
                    label="Title" 
                    value={newsTitle} 
                    onChange={e => setNewsTitle(e.target.value)} 
                    required 
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      value={newsCategory}
                      onChange={e => setNewsCategory(e.target.value)}
                    >
                      <option value="News">General News</option>
                      <option value="Work Progress">Work Progress</option>
                      <option value="Complaint Solution">Complaint Resolution</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                    <textarea 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors h-32 resize-none"
                      value={newsContent}
                      onChange={e => setNewsContent(e.target.value)}
                      required
                    ></textarea>
                  </div>
                  <Button type="submit" isLoading={isSubmitting} className="w-full">
                    Post Update
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
