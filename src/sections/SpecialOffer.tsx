import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SpecialOffer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background animation
      gsap.fromTo(
        '.offer-bg',
        { scale: 1.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Content animation
      gsap.fromTo(
        '.offer-content > *',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.offer-content',
            start: 'top 80%',
          },
        }
      );

      // Image animation
      gsap.fromTo(
        '.offer-image',
        { x: 100, opacity: 0, rotateY: 30 },
        {
          x: 0,
          opacity: 1,
          rotateY: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.offer-image',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const benefits = [
    'Free shipping on orders over $50',
    '30-day easy returns',
    '24/7 customer support',
    'Exclusive member discounts',
  ];

  return (
    <section ref={sectionRef} className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-violet-600 via-violet-700 to-violet-800 rounded-3xl overflow-hidden">
          {/* Background Pattern */}
          <div className="offer-bg absolute inset-0">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl" />
          </div>

          <div className="relative grid lg:grid-cols-2 gap-8 items-center p-8 lg:p-16">
            {/* Content */}
            <div className="offer-content text-white space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
                <Clock className="w-4 h-4" />
                Limited Time Offer
              </div>

              <h2 className="text-4xl lg:text-5xl font-bold">
                Special Offer
              </h2>

              <h3 className="text-3xl lg:text-4xl font-semibold text-teal-300">
                Get 30% Off on Your First Order
              </h3>

              <p className="text-violet-100 text-lg max-w-md">
                Use code <span className="font-bold text-white bg-white/20 px-2 py-1 rounded">WELCOME30</span> at checkout. 
                Limited time offer for new customers only.
              </p>

              {/* Countdown Timer */}
              <div className="flex gap-4">
                {[
                  { value: timeLeft.hours, label: 'Hours' },
                  { value: timeLeft.minutes, label: 'Minutes' },
                  { value: timeLeft.seconds, label: 'Seconds' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center min-w-[80px]"
                  >
                    <p className="text-3xl font-bold">{String(item.value).padStart(2, '0')}</p>
                    <p className="text-xs text-violet-200">{item.label}</p>
                  </div>
                ))}
              </div>

              {/* Benefits */}
              <ul className="space-y-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-teal-400 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-violet-900" />
                    </div>
                    <span className="text-violet-100">{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/shop">
                  <Button
                    size="lg"
                    className="bg-white text-violet-700 hover:bg-violet-50 px-8 h-14 text-lg font-semibold"
                  >
                    Shop Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Image */}
            <div className="offer-image relative hidden lg:block">
              <div className="relative">
                {/* Glow */}
                <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl transform scale-75" />
                
                {/* Product Image */}
                <img
                  src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop"
                  alt="Special Offer Product"
                  className="relative w-full max-w-md mx-auto transform hover:scale-105 transition-transform duration-500"
                />

                {/* Floating Badge */}
                <div className="absolute top-10 right-10 bg-orange-500 text-white rounded-2xl p-4 shadow-xl animate-bounce">
                  <p className="text-3xl font-bold">30%</p>
                  <p className="text-sm">OFF</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
