'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">TB</span>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  Tredje Boligsektor
                </h1>
                <p className="text-xs text-gray-500">Aktørkartlegging</p>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="flex space-x-1">
              <Link
                href="/"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/')
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Forside
              </Link>
              <Link
                href="/topics"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/topics')
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Temaer
              </Link>
              <Link
                href="/actors"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/actors')
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Alle aktører
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500">
              <p>
                Tredje Boligsektor Aktørkartlegging &copy; {new Date().getFullYear()}
              </p>
              <p className="mt-1">
                Data konsolidert fra 5 AI-rapporter (Gemini, GPT, Claude, Manus, Perplexity)
              </p>
            </div>
            <div className="flex space-x-6 text-sm text-gray-500">
              <span>246 aktører</span>
              <span>511 temaer</span>
              <span>9 kategorier</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
