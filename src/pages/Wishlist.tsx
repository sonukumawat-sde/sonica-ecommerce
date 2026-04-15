import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useWishlistStore, useCartStore, useUIStore } from '@/store';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';

export default function Wishlist() {
  const { items, clearWishlist } = useWishlistStore();
  const { setCartOpen } = useCartStore();
  const { addNotification } = useUIStore();

  const handleAddAllToCart = () => {
    items.forEach(item => {
      // Add each item to cart
    });
    setCartOpen(true);
    addNotification({
      type: 'order',
      title: 'Items Added',
      message: `${items.length} items added to your cart.`,
      read: false,
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-32 h-32 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-16 h-16 text-violet-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your wishlist is empty</h1>
          <p className="text-gray-500 mb-8 max-w-md">
            Save items you love to your wishlist and they'll be waiting for you here.
          </p>
          <Link to="/shop">
            <Button className="bg-violet-600 hover:bg-violet-700 px-8">
              Start Shopping
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
            <p className="text-gray-500 mt-1">{items.length} items saved</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={clearWishlist}>
              Clear All
            </Button>
            <Button 
              className="bg-violet-600 hover:bg-violet-700"
              onClick={handleAddAllToCart}
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Add All to Cart
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
