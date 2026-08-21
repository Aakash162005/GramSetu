'use client';
import React, { useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Select } from '../../components/ui/Select';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Search, Info, FileText, Calendar, CheckCircle2 } from 'lucide-react';

export default function SchemesPage() {
  const { schemes } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedScheme, setSelectedScheme] = useState(null);

  // Extract unique categories
  const categories = ['All', ...new Set(schemes.map(s => s.category))];

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || scheme.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navbar />
      
      {/* Header Section */}
      <div className="bg-primary-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-4">Government Schemes</h1>
          <p className="text-primary-100 max-w-2xl">
            Explore and apply for central and state government schemes. Check your eligibility and find the support you need.
          </p>
        </div>
      </div>

      <main className="flex-grow bg-gray-50 py-8 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Search and Filter */}
          <Card className="mb-8 border-none shadow-sm">
            <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  className="pl-10"
                  placeholder="Search schemes by name or keyword..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="w-full sm:w-64">
                <Select 
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  options={categories.map(c => ({ label: c, value: c }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Results List */}
          <div className="mb-4 text-sm text-gray-500 font-medium">
            Showing {filteredSchemes.length} scheme(s)
          </div>

          {filteredSchemes.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-xl border border-gray-200 border-dashed">
              <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">No schemes found</h3>
              <p className="text-gray-500">Try adjusting your search terms or filters.</p>
              <Button 
                variant="ghost" 
                className="mt-4"
                onClick={() => { setSearchTerm(''); setCategoryFilter('All'); }}
              >
                Clear all filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSchemes.map((scheme) => (
                <Card key={scheme.id} className="flex flex-col h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="primary">{scheme.category}</Badge>
                      <Badge variant={scheme.status === 'Active' ? 'success' : 'default'}>{scheme.status}</Badge>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{scheme.title}</h3>
                    <p className="text-gray-600 mb-6 line-clamp-3 flex-grow">{scheme.description}</p>
                    
                    <Button 
                      variant="outline" 
                      className="w-full border-primary-200 text-primary-700 hover:bg-primary-50"
                      onClick={() => setSelectedScheme(scheme)}
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

        </div>
      </main>
      
      <Footer />

      {/* Scheme Details Modal */}
      <Modal 
        isOpen={!!selectedScheme} 
        onClose={() => setSelectedScheme(null)}
        title="Scheme Details"
      >
        {selectedScheme && (
          <div className="space-y-6">
            <div>
              <div className="flex gap-2 mb-2">
                <Badge variant="primary">{selectedScheme.category}</Badge>
              </div>
              <h2 className="text-xl font-bold text-gray-900">{selectedScheme.title}</h2>
              <p className="text-sm text-gray-500 flex items-center mt-2">
                <Calendar size={14} className="mr-1" /> Deadline: {new Date(selectedScheme.deadline).toLocaleDateString()}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center text-sm">
                <Info size={16} className="text-primary-600 mr-2" /> About Scheme
              </h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                {selectedScheme.description}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center text-sm">
                <CheckCircle2 size={16} className="text-green-600 mr-2" /> Eligibility
              </h4>
              <p className="text-sm text-gray-700 pl-6">
                {selectedScheme.eligibility}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2 flex items-center text-sm">
                <FileText size={16} className="text-blue-600 mr-2" /> Required Documents
              </h4>
              <ul className="list-disc pl-10 text-sm text-gray-700 space-y-1">
                {selectedScheme.documentsRequired.map((doc, i) => (
                  <li key={i}>{doc}</li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-gray-100 flex gap-3">
              <Button className="flex-1">Apply Now</Button>
              <Button variant="outline" onClick={() => setSelectedScheme(null)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
