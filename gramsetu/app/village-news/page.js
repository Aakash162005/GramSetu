'use client';
import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Newspaper, HardHat, CheckCircle } from 'lucide-react';

export default function VillageNews() {
  const { user, isLoaded } = useAppContext();
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news');
        const data = await res.json();
        setNews(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching village news:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    if (user) {
      fetchNews();
    }
  }, [user]);

  if (!isLoaded || !user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Work Progress': return <HardHat className="text-amber-500" size={24} />;
      case 'Complaint Solution': return <CheckCircle className="text-green-500" size={24} />;
      default: return <Newspaper className="text-blue-500" size={24} />;
    }
  };

  const getCategoryBadge = (category) => {
    switch (category) {
      case 'Work Progress': return <Badge variant="warning">Work Progress</Badge>;
      case 'Complaint Solution': return <Badge variant="success">Resolution</Badge>;
      default: return <Badge variant="primary">News</Badge>;
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Village Updates & Progress</h1>
            <p className="text-gray-600 mt-2">Stay informed about daily work, complaint resolutions, and news in your Gram Panchayat.</p>
          </div>

          {isLoading ? (
             <div className="text-center py-12 text-gray-500">Loading updates...</div>
          ) : news.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center text-gray-500">
                No updates have been posted yet. Check back soon!
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {news.map((item) => (
                <Card key={item.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gray-100 rounded-full shrink-0">
                        {getCategoryIcon(item.category)}
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(item.createdAt).toLocaleDateString('en-IN', {
                                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                              })}
                            </p>
                          </div>
                          {getCategoryBadge(item.category)}
                        </div>
                        <p className="text-gray-700 whitespace-pre-line mt-4 leading-relaxed">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
