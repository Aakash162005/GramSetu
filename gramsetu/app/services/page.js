'use client';
import React from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAppContext } from '../../context/AppContext';
import * as Icons from 'lucide-react';

export default function ServicesPage() {
  const { servicesList } = useAppContext();

  return (
    <>
      <Navbar />
      
      <div className="bg-primary-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-4">Village Services</h1>
          <p className="text-primary-100 max-w-2xl">
            Access essential certificates and administrative services directly through the digital portal.
          </p>
        </div>
      </div>

      <main className="flex-grow bg-gray-50 py-12 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesList.map((service) => {
              const IconComponent = Icons[service.icon] || Icons.FileText;
              
              return (
                <Card key={service.id} className="h-full hover:shadow-md transition-shadow group cursor-pointer">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary-100 transition-all">
                      <IconComponent size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
                    <Link href={`/services/${service.id}`} className="w-full">
                      <Button variant="outline" className="w-full border-primary-200 text-primary-700 hover:bg-primary-50">
                        Apply Now
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-16 bg-blue-50 border border-blue-100 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8 text-center md:text-left">
              <h2 className="text-2xl font-bold text-blue-900 mb-2">Have a problem to report?</h2>
              <p className="text-blue-700">Submit grievances regarding infrastructure, water supply, or other village issues.</p>
            </div>
            <Link href="/complaints">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white border-none shrink-0">
                Lodge Complaint
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
