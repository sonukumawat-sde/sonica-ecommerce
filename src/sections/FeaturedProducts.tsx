import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { products } from '@/data/mock';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type FilterTab = 'all' | 'new' | 'sale' | 'top';

export default function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const sectionRef = useRef<HTMLDivElement>(null);

  const filteredProducts = products.filter((product) => {
    switch (activeTab) {
      case 'new':
        return product.isNew;
      case 'sale':
        return product.isSale;
      case 'top':
        return product.rating >= 4.7;
      default:
        return product.isFeatured;
    }
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.featured-title',
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

      // Tabs animation
      gsap.fromTo(
        '.filter-tab',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.filter-tabs',
            start: 'top 85%',
          },
        }
      );

      // Products animation
      gsap.fromTo(
        '.product-item',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.products-grid',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Re-animate products when tab changes
  useEffect(() => {
    gsap.fromTo(
      '.product-item',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'expo.out',
      }
    );
  }, [activeTab]);

  const tabs: { id: FilterTab; label: string }[] = [
    { id: 'all', label: 'All Products' },
    { id: 'new', label: 'New Arrivals' },
    { id: 'sale', label: 'On Sale' },
    { id: 'top', label: 'Top Rated' },
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <h2 className="featured-title text-4xl font-bold text-gray-900 mb-4">
              Featured <span className="gradient-text">Products</span>
            </h2>
            <p className="text-gray-600 max-w-xl">
              Handpicked selection of our best products. Quality guaranteed with every purchase.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="filter-tabs flex flex-wrap gap-2 mt-6 md:mt-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`filter-tab px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/25'
                    : 'bg-white text-gray-600 hover:bg-violet-50 hover:text-violet-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="products-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 8).map((product) => (
            <div key={product.id} className="product-item">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/shop">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white px-8"
            >
              View All Products
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
