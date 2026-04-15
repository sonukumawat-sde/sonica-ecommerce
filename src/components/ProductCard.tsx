import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react';
import { useCartStore, useWishlistStore, useUIStore } from '@/store';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ProductCardProps {
  product: Product;
  variant?: 'default' | 'compact' | 'horizontal';
}

export default function ProductCard({ product, variant = 'default' }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem } = useCartStore();
  const { isInWishlist, toggleItem } = useWishlistStore();
  const { setCartOpen, addNotification } = useUIStore();

  const inWishlist = isInWishlist(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setCartOpen(true);
    addNotification({
      type: 'order',
      title: 'Added to Cart',
      message: `${product.name} has been added to your cart.`,
      read: false,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
    addNotification({
      type: 'system',
      title: inWishlist ? 'Removed from Wishlist' : 'Added to Wishlist',
      message: `${product.name} has been ${inWishlist ? 'removed from' : 'added to'} your wishlist.`,
      read: false,
    });
  };

  if (variant === 'horizontal') {
    return (
      <Link
        to={`/product/${product.id}`}
        className="flex gap-4 p-4 bg-white rounded-xl border hover:shadow-lg transition-shadow"
      >
        <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-violet-600 font-medium">{product.category.name}</p>
          <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600">{product.rating}</span>
            <span className="text-sm text-gray-400">({product.reviewCount})</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="font-bold text-lg text-violet-600">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </Link>
    );
  }

  return (
    <TooltipProvider>
      <Link
        to={`/product/${product.id}`}
        className="group block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="product-card bg-white rounded-2xl overflow-hidden border border-gray-100">
          {/* Image Container */}
          <div className="relative aspect-square bg-gray-100 overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.isNew && (
                <span className="px-3 py-1 bg-teal-500 text-white text-xs font-semibold rounded-full">
                  NEW
                </span>
              )}
              {product.isSale && discount > 0 && (
                <span className="px-3 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Quick Actions */}
            <div
              className={`absolute right-3 top-3 flex flex-col gap-2 transition-all duration-300 ${
                isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
              }`}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleToggleWishlist}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      inWishlist
                        ? 'bg-red-500 text-white'
                        : 'bg-white text-gray-600 hover:bg-violet-600 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="w-10 h-10 bg-white text-gray-600 rounded-full flex items-center justify-center hover:bg-violet-600 hover:text-white transition-all"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Quick View</p>
                </TooltipContent>
              </Tooltip>
            </div>

            {/* Add to Cart Button */}
            <div
              className={`absolute bottom-0 left-0 right-0 p-3 transition-all duration-300 ${
                isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
              }`}
            >
              <Button
                onClick={handleAddToCart}
                className="w-full bg-violet-600 hover:bg-violet-700 text-white"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="text-sm text-violet-600 font-medium mb-1">
              {product.category.name}
            </p>
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-violet-600 transition-colors">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">({product.reviewCount})</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-violet-600">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </TooltipProvider>
  );
}
