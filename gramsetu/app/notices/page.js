'use client';
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { useAppContext } from '../../context/AppContext';
import { Search, Bell, Calendar } from 'lucide-react';

export default function NoticesPage() {
  const { notices } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotices = notices?.filter(notice => 
    notice.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    notice.content.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <>
      <Navbar />
      
      <div className="bg-primary-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-4 flex items-center">
            <Bell className="mr-3" size={32} />
            Village Announcements
          </h1>
          <p className="text-primary-100 max-w-2xl">
            Stay updated with the latest news, notices, and important information from your Gram Panchayat.
          </p>
        </div>
      </div>

      <main className="flex-grow bg-gray-50 py-12 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                className="pl-10"
                placeholder="Search announcements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-6">
            {filteredNotices.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <p className="text-gray-500">No announcements found matching your search.</p>
              </div>
            ) : (
              filteredNotices.map((notice) => (
                <Card key={notice.id} className="hover:border-primary-200 transition-colors">
                  <CardHeader className="pb-3 border-b-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
                      <div className="flex flex-wrap gap-2 items-center">
                        <Badge variant={notice.type === 'Important' ? 'danger' : 'primary'}>
                          {notice.type}
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-500 flex items-center shrink-0">
                        <Calendar size={14} className="mr-1" />
                        {new Date(notice.date).toLocaleDateString('en-US', {
                          weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                        })}
                      </span>
                    </div>
                    <CardTitle className="text-xl text-gray-900 leading-tight">
                      {notice.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {notice.content}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
