'use client';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useAppContext } from '../context/AppContext';
import { ArrowRight, Leaf, Users, ShieldCheck, HelpCircle, ChevronRight, Bell } from 'lucide-react';

export default function Home() {
  const { notices } = useAppContext();
  
  // Get latest 3 notices
  const latestNotices = notices?.slice(0, 3) || [];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden bg-primary-950 text-white">
          {/* Professional Village Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1595844730298-b960fad974cb?auto=format&fit=crop&w=2000&q=80" 
              alt="Indian Village" 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-900/70 to-gray-900/40"></div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full flex flex-col lg:flex-row items-center gap-12">
            
            {/* Hero Text */}
            <div className="flex-1 text-center lg:text-left opacity-0 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-8">
                <span className="flex h-2 w-2 rounded-full bg-primary-400"></span>
                <span className="text-sm font-medium text-primary-100 tracking-wide">Digital Gram Panchayat Portal</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                Connecting Villages. <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-secondary-300">
                  Empowering Futures.
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-primary-100/90 mb-10 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed text-balance">
                GramSetu is your unified digital portal for accessing government schemes, requesting rural services, and staying engaged with your community.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link href="/services" className="w-full sm:w-auto">
                  <Button variant="custom" size="lg" className="w-full sm:w-auto bg-white text-primary-950 hover:bg-gray-100 shadow-lg shadow-white/10 h-14 px-8 rounded-2xl text-lg font-semibold transition-all hover:scale-105 active:scale-95 flex items-center justify-center">
                    Explore Services <ArrowRight className="ml-2" size={20} />
                  </Button>
                </Link>
                <Link href="/schemes" className="w-full sm:w-auto">
                  <Button variant="custom" size="lg" className="w-full sm:w-auto border border-white/40 text-white hover:bg-white/10 backdrop-blur-md h-14 px-8 rounded-2xl text-lg font-medium transition-all hover:scale-105 active:scale-95 flex items-center justify-center">
                    Find Schemes
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Visual / Glass Card */}
            <div className="flex-1 w-full max-w-md lg:max-w-none opacity-0 animate-fade-in-up [animation-delay:200ms]">
              <div className="glass-panel p-6 sm:p-8 rounded-3xl relative">
                <div className="absolute -top-4 -right-4 bg-secondary-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">New</div>
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Bell className="text-primary-600" size={24} /> Recent Highlights
                </h3>
                <div className="space-y-4">
                  {latestNotices.length > 0 ? (
                    latestNotices.slice(0, 2).map((notice, idx) => (
                      <div key={notice.id || idx} className="bg-gray-50/80 hover:bg-gray-50 p-4 rounded-2xl transition-colors border border-gray-100 shadow-sm cursor-pointer group">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-semibold text-primary-700 bg-primary-100 px-2 py-0.5 rounded-md">{notice.type || 'Notice'}</span>
                          <span className="text-xs text-gray-500">{new Date(notice.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm font-medium text-gray-800 line-clamp-2 group-hover:text-primary-700 transition-colors">
                          {notice.title}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500 text-sm italic py-4">No recent highlights.</div>
                  )}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200/50">
                   <Link href="/notices" className="text-primary-600 text-sm font-semibold flex items-center justify-center hover:text-primary-700 transition-colors">
                     View All Announcements <ChevronRight size={16} />
                   </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Custom Shape Divider */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
            <svg className="relative block w-[calc(100%+1.3px)] h-[50px] lg:h-[80px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-gray-50"></path>
            </svg>
          </div>
        </section>

        {/* Core Services Section */}
        <section className="py-24 bg-gray-50 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 opacity-0 animate-fade-in-up">
              <h2 className="text-primary-600 font-semibold tracking-wide uppercase text-sm mb-3">Our Platform</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">Everything you need, <br/> simplified.</h3>
              <p className="text-lg text-gray-600">
                Access vital rural services in one place. Apply for schemes, request certificates, and report issues right from your mobile device.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {[
                { title: 'Govt Schemes', desc: 'Find and apply for beneficial schemes', icon: ShieldCheck, href: '/schemes', from: 'from-blue-500', to: 'to-indigo-500', shadow: 'shadow-blue-500/20' },
                { title: 'Village Services', desc: 'Request certificates easily', icon: Users, href: '/services', from: 'from-green-500', to: 'to-emerald-500', shadow: 'shadow-green-500/20' },
                { title: 'Agriculture', desc: 'Resources for better farming', icon: Leaf, href: '/schemes?category=Agriculture', from: 'from-amber-400', to: 'to-orange-500', shadow: 'shadow-orange-500/20' },
                { title: 'Help & Support', desc: 'Raise and track complaints', icon: HelpCircle, href: '/complaints', from: 'from-purple-500', to: 'to-pink-500', shadow: 'shadow-purple-500/20' },
              ].map((service, idx) => (
                <Link href={service.href} key={idx} className={`group opacity-0 animate-fade-in-up`} style={{animationDelay: `${(idx + 1) * 150}ms`}}>
                  <div className={`h-full bg-white rounded-3xl p-8 border border-gray-100 shadow-xl ${service.shadow} transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden`}>
                    {/* Background decoration */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.from} ${service.to} opacity-5 rounded-bl-full transition-transform duration-500 group-hover:scale-150`}></div>
                    
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.from} ${service.to} text-white flex items-center justify-center mb-6 shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                      <service.icon size={28} />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3 relative z-10">{service.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed relative z-10 mb-6">{service.desc}</p>
                    <div className="flex items-center text-sm font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                      Learn more <ArrowRight className="ml-1 w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}