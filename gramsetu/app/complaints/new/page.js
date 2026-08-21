'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { useAppContext } from '../../../context/AppContext';

export default function NewComplaintPage() {
  const { user, isLoaded, submitComplaint } = useAppContext();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: '',
    category: 'Infrastructure',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/login');
    }
  }, [user, isLoaded, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    await submitComplaint(formData);
    
    setIsLoading(false);
    router.push('/complaints');
  };

  const categories = [
    { label: 'Infrastructure', value: 'Infrastructure' },
    { label: 'Water Supply', value: 'Water' },
    { label: 'Electricity', value: 'Electricity' },
    { label: 'Sanitation', value: 'Sanitation' },
    { label: 'Other', value: 'Other' },
  ];

  if (!isLoaded || !user) return <div className="min-h-screen"></div>;

  return (
    <>
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-12 min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Lodge a New Complaint</CardTitle>
              <CardDescription>
                Please provide detailed information about the issue so we can address it effectively.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Complaint Title"
                  placeholder="e.g. Broken water pipe near main road"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
                
                <Select
                  label="Category"
                  options={categories}
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  required
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 min-h-[120px]"
                    placeholder="Provide specific details, location, and how long this has been an issue..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                  ></textarea>
                </div>
                
                <div className="flex gap-4 pt-4 border-t border-gray-100">
                  <Button type="submit" isLoading={isLoading} className="flex-1">
                    Submit Complaint
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => router.push('/complaints')}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

        </div>
      </main>
      
      <Footer />
    </>
  );
}
