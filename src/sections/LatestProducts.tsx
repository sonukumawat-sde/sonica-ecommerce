import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { products } from '@/data/mock';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LatestProducts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const latestProducts = products.filter(p => p.isNew).slice(0, 8);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.latest-title',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.latest-product',
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.latest-scroll',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="latest-title text-4xl font-bold text-gray-900 mb-4">
              Latest <span className="gradient-text">Arrivals</span>
            </h2>
            <p className="text-gray-600 max-w-xl">
              Check out our newest products. Fresh arrivals updated daily.
            </p>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-violet-100 hover:text-violet-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-violet-100 hover:text-violet-600 transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Products Scroll */}
        <div
          ref={scrollRef}
          className="latest-scroll flex gap-6 overflow-x-auto hide-scrollbar pb-4"
        >
          {latestProducts.map((product) => (
            <div
              key={product.id}
              className="latest-product flex-shrink-0 w-[280px] sm:w-[300px]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-12">
          <Link to="/shop?sort=newest">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white"
            >
              View All New Arrivals
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
