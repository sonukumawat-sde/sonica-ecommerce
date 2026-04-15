import { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  User, 
  Heart, 
  ShoppingCart, 
  Menu, 
  X, 
  ChevronDown,
  LogOut,
  Package,
  Settings
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore, useCartStore, useUIStore, useWishlistStore } from '@/store';
import { useScrollPosition, useClickOutside, useDebounce } from '@/hooks';
import { searchSuggestions } from '@/data/mock';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'Categories', href: '/categories' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const navigate = useNavigate();
  const { scrollPosition, scrollDirection } = useScrollPosition();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { getItemCount } = useCartStore();
  const { items: wishlistItems } = useWishlistStore();
  const { setCartOpen, setMobileMenuOpen, isMobileMenuOpen } = useUIStore();
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedSearch = useDebounce(searchQuery, 300);
  
  useClickOutside(searchRef, () => setShowSuggestions(false));
  
  const isScrolled = scrollPosition > 50;
  const isHidden = scrollDirection === 'down' && scrollPosition > 200;
  
  const cartItemCount = getItemCount();
  const wishlistCount = wishlistItems.length;
  
  const filteredSuggestions = debouncedSearch
    ? searchSuggestions.filter(s => 
        s.value.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
      setShowSuggestions(false);
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-violet-600 text-white py-2 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="hidden sm:block">Welcome to Sonica - Your Premium Shopping Destination</p>
          <div className="flex items-center gap-4 ml-auto">
            <Link to="/track-order" className="hover:text-violet-200 transition-colors">
              Track Order
            </Link>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">Support: +1 (555) 123-4567</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-lg' 
            : 'bg-white'
        } ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-teal-500 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-teal-500 bg-clip-text text-transparent">
                Sonica
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`nav-link text-gray-700 font-medium hover:text-violet-600 transition-colors ${
                    index % 2 === 0 ? '-translate-y-0.5' : 'translate-y-0.5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search */}
              <div ref={searchRef} className="relative">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 hover:bg-violet-50 rounded-full transition-colors"
                >
                  <Search className="w-5 h-5 text-gray-700" />
                </button>
                
                {/* Search Dropdown */}
                {isSearchOpen && (
                  <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
                    <form onSubmit={handleSearch}>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search products..."
                          value={searchQuery}
                          onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setShowSuggestions(true);
                          }}
                          className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500"
                          autoFocus
                        />
                      </div>
                    </form>
                    
                    {/* Suggestions */}
                    {showSuggestions && filteredSuggestions.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <p className="text-xs text-gray-500 uppercase font-semibold">Suggestions</p>
                        {filteredSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setSearchQuery(suggestion.value);
                              navigate(`/search?q=${encodeURIComponent(suggestion.value)}`);
                              setIsSearchOpen(false);
                              setShowSuggestions(false);
                            }}
                            className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors text-left"
                          >
                            {suggestion.image && (
                              <img 
                                src={suggestion.image} 
                                alt="" 
                                className="w-10 h-10 rounded-lg object-cover"
                              />
                            )}
                            <div>
                              <p className="font-medium text-gray-800">{suggestion.value}</p>
                              <p className="text-xs text-gray-500 capitalize">{suggestion.type}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* User */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="hidden sm:flex items-center gap-2 p-2 hover:bg-violet-50 rounded-full transition-colors">
                      <img
                        src={user?.avatar || 'https://via.placeholder.com/32'}
                        alt={user?.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-3 py-2">
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/orders')}>
                      <Package className="w-4 h-4 mr-2" />
                      Orders
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/settings')}>
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="hidden sm:flex items-center gap-2 p-2 hover:bg-violet-50 rounded-full transition-colors"
                >
                  <User className="w-5 h-5 text-gray-700" />
                </button>
              )}

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-2 hover:bg-violet-50 rounded-full transition-colors"
              >
                <Heart className="w-5 h-5 text-gray-700" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-violet-600 text-white text-xs rounded-full flex items-center justify-center animate-in zoom-in">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 hover:bg-violet-50 rounded-full transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-gray-700" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-violet-600 text-white text-xs rounded-full flex items-center justify-center animate-in zoom-in">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-violet-50 rounded-full transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-700" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-white pt-20">
          <nav className="flex flex-col p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-4 text-lg font-medium text-gray-700 hover:bg-violet-50 hover:text-violet-600 rounded-xl transition-colors"
              >
                {link.name}
              </Link>
            ))}
            {!isAuthenticated && (
              <>
                <div className="border-t my-2" />
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 px-4 text-lg font-medium text-violet-600 hover:bg-violet-50 rounded-xl transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 px-4 text-lg font-medium bg-violet-600 text-white rounded-xl hover:bg-violet-700 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </>
  );
}
