'use client';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useAppContext } from '../context/AppContext';
import { ArrowRight, Leaf, Users, ShieldCheck, HelpCircle } from 'lucide-react';

export default function Home() {
  const { schemes, notices } = useAppContext();
  
  // Get latest 3 notices
  const latestNotices = notices?.slice(0, 3) || [];

  return (
    <>
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-primary-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 relative z-10">
            <div className="max-w-3xl">
              <Badge variant="primary" className="mb-6 bg-primary-800 text-primary-100 border border-primary-700">Digital Gram Panchayat</Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
                Connecting Villages. <br/> Empowering Communities.
              </h1>
              <p className="text-lg md:text-xl text-primary-100 mb-10 max-w-2xl text-balance">
                GramSetu is your unified digital portal for accessing government schemes, requesting village services, and staying updated with local announcements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/services">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-primary-900 hover:bg-primary-50">
                    Explore Services <ArrowRight className="ml-2" size={18} />
                  </Button>
                </Link>
                <Link href="/schemes">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-400 text-primary-50 hover:bg-primary-800 hover:text-white">
                    Find Government Schemes
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Access Services */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Core Services</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need to manage your rural life, simplified and accessible.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Schemes', desc: 'Browse and apply for govt schemes', icon: ShieldCheck, href: '/schemes', color: 'text-blue-600', bg: 'bg-blue-100' },
                { title: 'Services', desc: 'Certificates and village services', icon: Users, href: '/services', color: 'text-green-600', bg: 'bg-green-100' },
                { title: 'Agriculture', desc: 'Resources for better farming', icon: Leaf, href: '/schemes?category=Agriculture', color: 'text-amber-600', bg: 'bg-amber-100' },
                { title: 'Help & Support', desc: 'Raise complaints and track them', icon: HelpCircle, href: '/complaints', color: 'text-purple-600', bg: 'bg-purple-100' },
              ].map((service, idx) => (
                <Link href={service.href} key={idx} className="group">
                  <Card className="h-full transition-all duration-200 hover:shadow-md hover:-translate-y-1 hover:border-primary-200 border-transparent">
                    <CardContent className="pt-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${service.bg} ${service.color} group-hover:scale-110 transition-transform`}>
                        <service.icon size={24} />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-sm text-gray-500">{service.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Latest Announcements */}
        <section className="py-20 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Latest Announcements</h2>
                <p className="text-gray-600">Important notices from the Gram Panchayat</p>
              </div>
              <Link href="/notices" className="hidden sm:inline-flex items-center text-primary-600 font-medium hover:text-primary-700">
                View All <ArrowRight className="ml-1" size={16} />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {latestNotices.map((notice) => (
                <Card key={notice.id} className="h-full flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant={notice.type === 'Important' ? 'danger' : 'primary'}>{notice.type}</Badge>
                      <span className="text-xs text-gray-500">{new Date(notice.date).toLocaleDateString()}</span>
                    </div>
                    <CardTitle className="text-lg line-clamp-1">{notice.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-gray-600 line-clamp-3">{notice.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-8 text-center sm:hidden">
              <Link href="/notices" className="inline-flex items-center text-primary-600 font-medium">
                View All Announcements <ArrowRight className="ml-1" size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}