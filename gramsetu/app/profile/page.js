'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useAppContext } from '../../context/AppContext';
import { User, Shield, MapPin, Phone, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const { user, isLoaded } = useAppContext();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    village: '',
    district: '',
    state: ''
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/login');
    } else if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        village: user.village || '',
        district: user.district || '',
        state: user.state || ''
      });
    }
  }, [user, isLoaded, router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call to save profile
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      setShowSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  if (!isLoaded || !user) return <div className="min-h-screen"></div>;

  return (
    <>
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-12 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            {!isEditing && (
              <Button onClick={() => setIsEditing(true)} variant="outline">
                Edit Profile
              </Button>
            )}
          </div>

          {showSuccess && (
            <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
              <CheckCircle2 className="mr-2" size={20} />
              Profile updated successfully!
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-24 h-24 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold text-4xl mx-auto mb-4">
                    {user.name?.charAt(0) || 'U'}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">{user.name}</h2>
                  <p className="text-sm text-gray-500 mb-4">{user.role === 'citizen' ? 'Citizen' : 'Admin'}</p>
                  
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <Shield size={12} className="mr-1" /> Verified Account
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSave}>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 gap-6">
                        <Input
                          label="Full Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          disabled={!isEditing}
                          icon={<User size={18} className="text-gray-400" />}
                        />
                        
                        <Input
                          label="Phone Number"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={!isEditing}
                          icon={<Phone size={18} className="text-gray-400" />}
                        />
                        
                        <Input
                          label="Village / Gram Panchayat"
                          name="village"
                          value={formData.village}
                          onChange={handleChange}
                          disabled={!isEditing}
                          icon={<MapPin size={18} className="text-gray-400" />}
                        />
                        
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            label="District"
                            name="district"
                            value={formData.district}
                            onChange={handleChange}
                            disabled={!isEditing}
                          />
                          <Input
                            label="State"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      {isEditing && (
                        <div className="flex gap-4 pt-4 border-t border-gray-100">
                          <Button type="submit" isLoading={isSaving} className="w-full sm:w-auto">
                            Save Changes
                          </Button>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            onClick={() => {
                              setIsEditing(false);
                              // Reset to original data
                              setFormData({
                                name: user.name || '',
                                phone: user.phone || '',
                                village: user.village || '',
                                district: user.district || '',
                                state: user.state || ''
                              });
                            }}
                            disabled={isSaving}
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

        </div>
      </main>
      
      <Footer />
    </>
  );
}
