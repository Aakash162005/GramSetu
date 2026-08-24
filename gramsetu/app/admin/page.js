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
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [newsTitle, setNewsTitle] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsCategory, setNewsCategory] = useState('News');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // States for Scheme
  const [schemeTitle, setSchemeTitle] = useState('');
  const [schemeCategory, setSchemeCategory] = useState('Agriculture');
  const [schemeDesc, setSchemeDesc] = useState('');
  const [schemeElig, setSchemeElig] = useState('');
  const [schemeDocs, setSchemeDocs] = useState('');
  const [schemeDeadline, setSchemeDeadline] = useState('');
  const [isSubmittingScheme, setIsSubmittingScheme] = useState(false);

  // States for Notice
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeType, setNoticeType] = useState('Important');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticeDate, setNoticeDate] = useState('');
  const [isSubmittingNotice, setIsSubmittingNotice] = useState(false);

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

  const handlePostScheme = async (e) => {
    e.preventDefault();
    setIsSubmittingScheme(true);
    try {
      await fetch('/api/schemes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: schemeTitle, 
          category: schemeCategory, 
          description: schemeDesc,
          eligibility: schemeElig,
          documentsRequired: schemeDocs.split(',').map(d => d.trim()).filter(Boolean),
          deadline: schemeDeadline
        })
      });
      setSchemeTitle('');
      setSchemeDesc('');
      setSchemeElig('');
      setSchemeDocs('');
      setSchemeDeadline('');
      alert('Scheme created successfully!');
    } catch (error) {
      console.error('Error creating scheme:', error);
    } finally {
      setIsSubmittingScheme(false);
    }
  };

  const handlePostNotice = async (e) => {
    e.preventDefault();
    setIsSubmittingNotice(true);
    try {
      await fetch('/api/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: noticeTitle, 
          content: noticeContent, 
          type: noticeType,
          date: noticeDate
        })
      });
      setNoticeTitle('');
      setNoticeContent('');
      setNoticeDate('');
      alert('Notice created successfully!');
    } catch (error) {
      console.error('Error creating notice:', error);
    } finally {
      setIsSubmittingNotice(false);
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

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-4">
            <Button variant={activeTab === 'users' ? 'primary' : 'outline'} onClick={() => setActiveTab('users')}>User Management</Button>
            <Button variant={activeTab === 'news' ? 'primary' : 'outline'} onClick={() => setActiveTab('news')}>Post News</Button>
            <Button variant={activeTab === 'scheme' ? 'primary' : 'outline'} onClick={() => setActiveTab('scheme')}>Create Scheme</Button>
            <Button variant={activeTab === 'notice' ? 'primary' : 'outline'} onClick={() => setActiveTab('notice')}>Create Notice</Button>
          </div>

          <div className="max-w-3xl">
            {/* User Management Section */}
            {activeTab === 'users' && (
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
            )}

            {/* Post Village News Section */}
            {activeTab === 'news' && (
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
            )}

            {/* Create Scheme Section */}
            {activeTab === 'scheme' && (
            <Card>
              <CardHeader>
                <CardTitle>Create New Scheme</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePostScheme} className="space-y-4">
                  <Input label="Title" value={schemeTitle} onChange={e => setSchemeTitle(e.target.value)} required />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      value={schemeCategory}
                      onChange={e => setSchemeCategory(e.target.value)}
                    >
                      <option value="Agriculture">Agriculture</option>
                      <option value="Housing">Housing</option>
                      <option value="Education">Education</option>
                      <option value="Health">Health</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg h-20 resize-none" value={schemeDesc} onChange={e => setSchemeDesc(e.target.value)} required></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility Criteria</label>
                    <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg h-16 resize-none" value={schemeElig} onChange={e => setSchemeElig(e.target.value)} required></textarea>
                  </div>
                  <Input label="Required Documents (comma separated)" value={schemeDocs} onChange={e => setSchemeDocs(e.target.value)} required />
                  <Input type="date" label="Deadline" value={schemeDeadline} onChange={e => setSchemeDeadline(e.target.value)} required />
                  <Button type="submit" isLoading={isSubmittingScheme} className="w-full">Create Scheme</Button>
                </form>
              </CardContent>
            </Card>
            )}

            {/* Create Notice Section */}
            {activeTab === 'notice' && (
            <Card>
              <CardHeader>
                <CardTitle>Create New Notice</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePostNotice} className="space-y-4">
                  <Input label="Title" value={noticeTitle} onChange={e => setNoticeTitle(e.target.value)} required />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      value={noticeType}
                      onChange={e => setNoticeType(e.target.value)}
                    >
                      <option value="Important">Important</option>
                      <option value="Update">Update</option>
                      <option value="Event">Event</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                    <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg h-32 resize-none" value={noticeContent} onChange={e => setNoticeContent(e.target.value)} required></textarea>
                  </div>
                  <Input type="date" label="Date" value={noticeDate} onChange={e => setNoticeDate(e.target.value)} required />
                  <Button type="submit" isLoading={isSubmittingNotice} className="w-full">Create Notice</Button>
                </form>
              </CardContent>
            </Card>
            )}
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
