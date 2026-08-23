'use client';
import React from 'react';
import Link from 'next/link';
import { useAppContext } from '../../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Clock, CheckCircle2, ShieldCheck, FileText, ChevronRight } from 'lucide-react';

export default function Dashboard() {
  const { user, isLoaded, userComplaints, schemes } = useAppContext();

  if (!isLoaded || !user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const pendingComplaints = userComplaints.filter(c => c.status === 'Pending').length;
  const resolvedComplaints = userComplaints.filter(c => c.status === 'Resolved').length;

  return (
    <>
      <Navbar />
      <main className="flex-grow bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name} 👋</h1>
              <p className="text-gray-600 mt-1">Here is what's happening with your services and applications.</p>
            </div>
            <Link href="/complaints">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white border-none shrink-0 shadow-sm">
                Lodge Complaint
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-blue-100 mb-1">Pending Requests</p>
                    <h3 className="text-4xl font-bold">{pendingComplaints}</h3>
                  </div>
                  <div className="p-3 bg-blue-400/30 rounded-lg">
                    <Clock size={24} className="text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-green-100 mb-1">Resolved Requests</p>
                    <h3 className="text-4xl font-bold">{resolvedComplaints}</h3>
                  </div>
                  <div className="p-3 bg-green-400/30 rounded-lg">
                    <CheckCircle2 size={24} className="text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-purple-100 mb-1">Eligible Schemes</p>
                    <h3 className="text-4xl font-bold">2</h3>
                  </div>
                  <div className="p-3 bg-purple-400/30 rounded-lg">
                    <ShieldCheck size={24} className="text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Recent Requests Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900">Recent Requests</h2>
                <Link href="/complaints" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center">
                  View All <ChevronRight size={16} />
                </Link>
              </div>
              
              <Card>
                <div className="divide-y divide-gray-100">
                  {userComplaints.slice(0, 3).map(complaint => (
                    <div key={complaint.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          <div className={`p-2 rounded-lg ${complaint.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                            <FileText size={16} />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900">{complaint.title}</h4>
                            <p className="text-xs text-gray-500">{new Date(complaint.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                        <Badge variant={complaint.status === 'Resolved' ? 'success' : 'warning'}>
                          {complaint.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {userComplaints.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                      You haven't made any requests yet.
                    </div>
                  )}
                </div>
              </Card>
            </div>

            {/* Recommended Schemes */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-900">Recommended Schemes</h2>
                <Link href="/schemes" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center">
                  Explore <ChevronRight size={16} />
                </Link>
              </div>
              
              <div className="space-y-4">
                {schemes.slice(0, 2).map(scheme => (
                  <Card key={scheme.id} className="hover:border-primary-200 transition-colors">
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-base font-semibold text-gray-900">{scheme.title}</h4>
                        <Badge variant="primary">{scheme.category}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-4">{scheme.description}</p>
                      <Button variant="outline" size="sm" className="w-full">
                        Check Eligibility
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
