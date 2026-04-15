import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(
        '.hero-title span',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: 'expo.out',
          delay: 0.3,
        }
      );

      gsap.fromTo(
        '.hero-subtitle',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'expo.out',
          delay: 0.8,
        }
      );

      gsap.fromTo(
        '.hero-description',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'expo.out',
          delay: 1,
        }
      );

      gsap.fromTo(
        '.hero-cta',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'expo.out',
          delay: 1.2,
        }
      );

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { x: 100, opacity: 0, rotateY: 30 },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 1.2,
          ease: 'expo.out',
          delay: 0.4,
        }
      );

      // Floating shapes
      gsap.to('.floating-shape', {
        y: -20,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: {
          each: 0.5,
          from: 'random',
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-violet-50 via-white to-teal-50"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl" />
        
        {/* Floating Shapes */}
        <div className="floating-shape absolute top-1/4 left-1/4 w-4 h-4 bg-violet-400 rounded-full opacity-60" />
        <div className="floating-shape absolute top-1/3 right-1/3 w-6 h-6 bg-teal-400 rounded-full opacity-40" />
        <div className="floating-shape absolute bottom-1/3 left-1/3 w-3 h-3 bg-orange-400 rounded-full opacity-50" />
        <div className="floating-shape absolute top-2/3 right-1/4 w-5 h-5 bg-violet-300 rounded-full opacity-40" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div ref={contentRef} className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-violet-600 rounded-full animate-pulse" />
              New Collection 2024
            </div>

            <h1 className="hero-title text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              {'MEGA SALE'.split('').map((char, i) => (
                <span key={i} className="inline-block">
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>

            <h2 className="hero-subtitle text-3xl sm:text-4xl font-semibold gradient-text">
              Up to 50% Off
            </h2>

            <p className="hero-description text-lg text-gray-600 max-w-lg">
              Discover premium quality products at unbeatable prices. From cutting-edge 
              electronics to trendy fashion, find everything you need with exclusive deals.
            </p>

            <div className="hero-cta flex flex-wrap gap-4 pt-4">
              <Link to="/shop">
                <Button
                  size="lg"
                  className="bg-violet-600 hover:bg-violet-700 text-white px-8 h-14 text-lg btn-shimmer"
                >
                  Shop Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/categories">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-violet-600 text-violet-600 hover:bg-violet-50 px-8 h-14 text-lg"
                >
                  Explore Collection
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8">
              {[
                { value: '50K+', label: 'Happy Customers' },
                { value: '10K+', label: 'Products' },
                { value: '4.9', label: 'Rating' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-violet-600">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div
            ref={imageRef}
            className="relative lg:h-[600px] flex items-center justify-center"
            style={{ perspective: '1000px' }}
          >
            <div className="relative w-full max-w-lg">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-teal-400 rounded-3xl blur-3xl opacity-30 transform scale-110" />
              
              {/* Main Image */}
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop"
                  alt="Premium Headphones"
                  className="w-full aspect-square object-cover"
                />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Featured Product</p>
                      <p className="font-semibold text-gray-900">Wireless Pro Headphones</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-violet-600">$299</p>
                      <p className="text-sm text-gray-400 line-through">$399</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl p-4 animate-bounce">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Order Placed</p>
                    <p className="text-xs text-gray-500">Just now</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop"
                    alt="Customer"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-semibold">Sarah M.</p>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
