'use client';
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { useAppContext } from '../../context/AppContext';
import { Search, CalendarDays, MapPin } from 'lucide-react';

export default function EventsPage() {
  const { events } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = events?.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <>
      <Navbar />
      
      <div className="bg-primary-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-4 flex items-center">
            <CalendarDays className="mr-3" size={32} />
            Upcoming Events
          </h1>
          <p className="text-primary-100 max-w-2xl">
            Discover and participate in community events, meetings, and cultural programs happening in the village.
          </p>
        </div>
      </div>

      <main className="flex-grow bg-gray-50 py-12 min-h-screen">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-md mx-auto sm:mx-0 mb-8">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                className="pl-10"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.length === 0 ? (
              <div className="col-span-full text-center py-12 bg-white rounded-xl border border-gray-200">
                <p className="text-gray-500">No events found matching your search.</p>
              </div>
            ) : (
              filteredEvents.map((event) => (
                <Card key={event.id} className="h-full flex flex-col hover:shadow-md transition-shadow">
                  <div className="bg-primary-50 px-6 py-4 border-b border-primary-100 flex items-center justify-between">
                    <div className="flex flex-col text-center">
                      <span className="text-xs font-bold text-primary-600 uppercase">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                      </span>
                      <span className="text-2xl font-black text-primary-800 leading-none">
                        {new Date(event.date).getDate()}
                      </span>
                    </div>
                    <div className="flex-1 ml-4 border-l border-primary-200 pl-4">
                      <h3 className="font-bold text-gray-900 line-clamp-2">{event.title}</h3>
                    </div>
                  </div>
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <p className="text-sm text-gray-600 mb-6 flex-grow line-clamp-4">{event.description}</p>
                    
                    <div className="flex items-center text-sm text-gray-500 mt-auto pt-4 border-t border-gray-100">
                      <MapPin size={16} className="mr-2 text-primary-500 shrink-0" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
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
