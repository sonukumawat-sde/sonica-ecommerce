import { Link } from 'react-router-dom';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20">
      <div className="text-center max-w-lg px-4">
        {/* 404 Illustration */}
        <div className="relative mb-8">
          <div className="text-9xl font-bold text-violet-200">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-violet-100 rounded-full flex items-center justify-center">
              <Search className="w-16 h-16 text-violet-400" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="bg-violet-600 hover:bg-violet-700 w-full sm:w-auto">
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link to="/shop">
            <Button variant="outline" className="w-full sm:w-auto">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Browse Products
            </Button>
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-gray-500 mb-4">Popular pages:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { name: 'Shop', href: '/shop' },
              { name: 'Categories', href: '/categories' },
              { name: 'Blog', href: '/blog' },
              { name: 'Contact', href: '/contact' },
            ].map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="px-4 py-2 bg-white rounded-full text-sm text-gray-600 hover:text-violet-600 hover:bg-violet-50 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
