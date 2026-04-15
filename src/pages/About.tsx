import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, Heart, Users, Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const stats = [
  { value: '50K+', label: 'Happy Customers' },
  { value: '10K+', label: 'Products' },
  { value: '99%', label: 'Satisfaction Rate' },
  { value: '24/7', label: 'Customer Support' },
];

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'To provide premium quality products at affordable prices, making luxury accessible to everyone.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    description: 'To become the most trusted e-commerce destination for quality-conscious shoppers worldwide.',
  },
  {
    icon: Heart,
    title: 'Our Values',
    description: 'Customer first, quality always, transparency in everything we do.',
  },
];

const team = [
  {
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
  },
  {
    name: 'Michael Chen',
    role: 'Head of Operations',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
  },
  {
    name: 'Emily Davis',
    role: 'Creative Director',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
  },
  {
    name: 'David Wilson',
    role: 'Tech Lead',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-violet-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Sonica</h1>
          <p className="text-xl text-violet-100 max-w-2xl mx-auto">
            Your trusted destination for premium products. We're on a mission to make quality shopping accessible to everyone.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-violet-600">{stat.value}</p>
                <p className="text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2020, Sonica began with a simple idea: to create an online shopping experience 
              that prioritizes quality, affordability, and customer satisfaction above all else.
            </p>
            <p className="text-gray-600 mb-4">
              What started as a small venture has grown into a trusted destination for thousands of 
              customers worldwide. Our commitment to excellence has never wavered, and we continue 
              to expand our offerings while maintaining the highest standards.
            </p>
            <p className="text-gray-600 mb-6">
              Today, Sonica offers a curated selection of products across multiple categories, 
              from cutting-edge electronics to trendy fashion and home essentials.
            </p>
            <Link to="/shop">
              <Button className="bg-violet-600 hover:bg-violet-700">
                Explore Our Products
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800&h=600&fit=crop"
              alt="Our Story"
              className="rounded-2xl shadow-xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-violet-600 text-white rounded-2xl p-6">
              <p className="text-3xl font-bold">4+</p>
              <p className="text-violet-100">Years of Excellence</p>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Stand For</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our core values guide everything we do, from product selection to customer service.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center p-8">
                <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-violet-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The passionate people behind Sonica who work tirelessly to bring you the best shopping experience.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
              />
              <h3 className="font-semibold text-gray-900">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-violet-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-violet-100 mb-8 max-w-xl mx-auto">
            Join thousands of satisfied customers and discover why Sonica is the preferred choice for premium products.
          </p>
          <Link to="/shop">
            <Button size="lg" className="bg-white text-violet-600 hover:bg-violet-50">
              Shop Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
