'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { useAppContext } from '../../context/AppContext';
import { AlertCircle, Plus, FileText, CheckCircle2 } from 'lucide-react';

export default function ComplaintsPage() {
  const { user, isLoaded, userComplaints } = useAppContext();
  const router = useRouter();

  if (isLoaded && !user) {
    return (
      <>
        <Navbar />
        <main className="flex-grow flex items-center justify-center bg-gray-50 py-12">
          <div className="text-center max-w-md">
            <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Required</h2>
            <p className="text-gray-600 mb-6">You need to log in to view or submit complaints.</p>
            <Link href="/login">
              <Button>Login Now</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-primary-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-6 sm:mb-0 text-center sm:text-left">
            <h1 className="text-3xl font-bold mb-2">My Complaints</h1>
            <p className="text-primary-100 max-w-xl">
              Track the status of your submitted grievances and service requests.
            </p>
          </div>
          <Link href="/complaints/new">
            <Button className="bg-white text-primary-900 hover:bg-primary-50">
              <Plus size={18} className="mr-2" /> New Complaint
            </Button>
          </Link>
        </div>
      </div>

      <main className="flex-grow bg-gray-50 py-12 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {userComplaints?.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-xl border border-gray-200 border-dashed">
              <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">No complaints found</h3>
              <p className="text-gray-500 mb-6">You haven't submitted any complaints or requests yet.</p>
              <Link href="/complaints/new">
                <Button>Lodge a Complaint</Button>
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userComplaints?.map((complaint) => (
                <Card key={complaint.id} className="h-full flex flex-col">
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="default" className="bg-gray-100">{complaint.category}</Badge>
                      <Badge variant={complaint.status === 'Resolved' ? 'success' : 'warning'}>
                        {complaint.status}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{complaint.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{complaint.description}</p>
                    <div className="text-xs text-gray-500 pt-4 border-t border-gray-100 mt-auto">
                      Submitted on: {new Date(complaint.date).toLocaleDateString()}
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
