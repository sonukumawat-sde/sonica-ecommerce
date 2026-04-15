import { useEffect } from 'react';
import Hero from '@/sections/Hero';
import Categories from '@/sections/Categories';
import FeaturedProducts from '@/sections/FeaturedProducts';
import SpecialOffer from '@/sections/SpecialOffer';
import LatestProducts from '@/sections/LatestProducts';
import Testimonials from '@/sections/Testimonials';
import Blog from '@/sections/Blog';
import InstagramFeed from '@/sections/InstagramFeed';

export default function Home() {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="space-y-0">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <SpecialOffer />
      <LatestProducts />
      <Testimonials />
      <Blog />
      <InstagramFeed />
    </div>
  );
}
