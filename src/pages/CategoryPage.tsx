import { useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import { products, categories } from '@/data/mock';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const category = categories.find(c => c.slug === slug);

  const categoryProducts = useMemo(() => {
    if (!category) return [];
    return products.filter(p => p.category.id === category.id);
  }, [category]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Header */}
      <div className="relative h-[300px] overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <button
              onClick={() => navigate('/shop')}
              className="flex items-center gap-2 text-white/80 hover:text-white mb-4"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Shop
            </button>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{category.name}</h1>
            <p className="text-white/80 max-w-xl">{category.description}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Results Count */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-600">
            Showing {categoryProducts.length} {categoryProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>

        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No products yet</h2>
            <p className="text-gray-500 mb-8">
              We're working on adding products to this category. Check back soon!
            </p>
            <Link to="/shop">
              <Button className="bg-violet-600 hover:bg-violet-700">
                Browse Other Categories
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
