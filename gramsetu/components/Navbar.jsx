'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, User, Bell } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Button } from './ui/Button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAppContext();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const baseNavLinks = [
    { name: 'Home', href: '/' },
    { name: 'Schemes', href: '/schemes' },
    { name: 'Services', href: '/services' },
    { name: 'Notices', href: '/notices' },
    { name: 'Village News', href: '/village-news' },
  ];

  const navLinks = user?.role === 'admin' 
    ? [...baseNavLinks, { name: 'Admin Panel', href: '/admin' }]
    : baseNavLinks;

  const isActive = (path) => pathname === path;

  return (
    <nav className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md border-b-transparent py-0' : 'bg-white border-b border-gray-200 py-1'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex justify-between transition-all duration-300 ${isScrolled ? 'h-14' : 'h-16'}`}>
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary-700">GramSetu</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    isActive(link.href)
                      ? 'border-primary-600 text-primary-700'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <button className="text-gray-500 hover:text-primary-600 p-2 rounded-full hover:bg-gray-100 transition-colors relative" title="Notifications">
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="relative group cursor-pointer" title="User Menu">
                  <div className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="h-8 w-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  </div>
                  <div className="absolute right-0 top-full pt-1 w-48 hidden group-hover:block z-50">
                    <div className="py-2 bg-white rounded-xl shadow-lg border border-gray-100 shadow-xl">
                      <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Dashboard</Link>
                      <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile</Link>
                      <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Logout</button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Log in</Button>
                </Link>
                <Link href="/signup">
                  <Button variant="primary">Sign up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive(link.href)
                    ? 'bg-primary-50 border-primary-600 text-primary-700'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {user ? (
              <>
                <div className="flex items-center px-4 mb-3">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold text-lg">
                      {user.name.charAt(0)}
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{user.name}</div>
                    <div className="text-sm font-medium text-gray-500">{user.phone}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Link href="/dashboard" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">Dashboard</Link>
                  <Link href="/profile" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">Profile</Link>
                  <button onClick={() => { logout(); setIsOpen(false); }} className="block w-full text-left px-4 py-2 text-base font-medium text-red-600 hover:text-red-800 hover:bg-red-50">Logout</button>
                </div>
              </>
            ) : (
              <div className="flex space-x-4 px-4 pb-4">
                <Link href="/login" onClick={() => setIsOpen(false)} className="flex-1">
                  <Button variant="outline" className="w-full">Log in</Button>
                </Link>
                <Link href="/signup" onClick={() => setIsOpen(false)} className="flex-1">
                  <Button variant="primary" className="w-full">Sign up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}