import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import { blogPosts } from '@/data/mock';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Blog() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.blog-title',
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
        '.blog-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.blog-grid',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const featuredPost = blogPosts[0];
  const sidePosts = blogPosts.slice(1);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="blog-title text-4xl font-bold text-gray-900 mb-4">
              Latest from <span className="gradient-text">Blog</span>
            </h2>
            <p className="text-gray-600 max-w-xl">
              Stay updated with the latest trends, tips, and stories from our blog.
            </p>
          </div>

          <Link
            to="/blog"
            className="hidden md:flex items-center gap-2 text-violet-600 font-semibold hover:text-violet-700 transition-colors"
          >
            View All Articles
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Blog Grid */}
        <div className="blog-grid grid lg:grid-cols-2 gap-8">
          {/* Featured Post */}
          <Link
            to={`/blog/${featuredPost.slug}`}
            className="blog-card group relative bg-gray-100 rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto"
          >
            <img
              src={featuredPost.image}
              alt={featuredPost.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
              <span className="inline-block px-3 py-1 bg-violet-600 text-white text-sm font-medium rounded-full w-fit mb-4">
                {featuredPost.category}
              </span>
              <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-violet-200 transition-colors">
                {featuredPost.title}
              </h3>
              <p className="text-gray-300 mb-4 line-clamp-2">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {featuredPost.author.name}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(featuredPost.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {featuredPost.readTime} min read
                </div>
              </div>
            </div>
          </Link>

          {/* Side Posts */}
          <div className="flex flex-col gap-6">
            {sidePosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="blog-card group flex gap-4 bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="w-32 sm:w-48 flex-shrink-0 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex-1 py-4 pr-4 flex flex-col justify-center">
                  <span className="text-violet-600 text-sm font-medium mb-2">
                    {post.category}
                  </span>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-violet-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{post.readTime} min read</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile View All */}
        <div className="md:hidden text-center mt-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-violet-600 font-semibold"
          >
            View All Articles
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
