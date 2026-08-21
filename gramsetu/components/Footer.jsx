import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-primary-400 mb-4">GramSetu</h2>
            <p className="text-gray-400 max-w-sm mb-6">
              Connecting Villages, Empowering Communities. Your one-stop digital portal for Gram Panchayat services, schemes, and local administration.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/schemes" className="text-gray-400 hover:text-white transition-colors">Govt Schemes</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Village Services</Link></li>
              <li><Link href="/notices" className="text-gray-400 hover:text-white transition-colors">Announcements</Link></li>
              <li><Link href="/events" className="text-gray-400 hover:text-white transition-colors">Local Events</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-200">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="text-primary-400 mr-2 shrink-0" />
                <span className="text-gray-400 text-sm">Gram Panchayat Office, Main Block, Village Center</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-primary-400 mr-2 shrink-0" />
                <span className="text-gray-400 text-sm">1800-111-222 (Toll Free)</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-primary-400 mr-2 shrink-0" />
                <span className="text-gray-400 text-sm">support@gramsetu.in</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} GramSetu. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}