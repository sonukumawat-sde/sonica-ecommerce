import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Share2, 
  Truck, 
  RefreshCw, 
  Shield, 
  Star, 
  Minus, 
  Plus,
  Check,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { products, reviews } from '@/data/mock';
import { useCartStore, useWishlistStore, useUIStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductCard from '@/components/ProductCard';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCartStore();
  const { isInWishlist, toggleItem } = useWishlistStore();
  const { setCartOpen, addNotification } = useUIStore();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  const product = products.find(p => p.id === id);
  const relatedProducts = products
    .filter(p => p.category.id === product?.category.id && p.id !== id)
    .slice(0, 4);

  const productReviews = reviews.filter(r => r.productId === id);
  const inWishlist = isInWishlist(id || '');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Button onClick={() => navigate('/shop')}>Back to Shop</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    setCartOpen(true);
    addNotification({
      type: 'order',
      title: 'Added to Cart',
      message: `${product.name} has been added to your cart.`,
      read: false,
    });
  };

  const handleToggleWishlist = () => {
    toggleItem(product);
    addNotification({
      type: 'system',
      title: inWishlist ? 'Removed from Wishlist' : 'Added to Wishlist',
      message: `${product.name} has been ${inWishlist ? 'removed from' : 'added to'} your wishlist.`,
      read: false,
    });
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <button onClick={() => navigate('/')} className="hover:text-violet-600">Home</button>
            <ChevronRight className="w-4 h-4" />
            <button onClick={() => navigate('/shop')} className="hover:text-violet-600">Shop</button>
            <ChevronRight className="w-4 h-4" />
            <button 
              onClick={() => navigate(`/category/${product.category.slug}`)}
              className="hover:text-violet-600"
            >
              {product.category.name}
            </button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-2xl overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.isSale && discount > 0 && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-orange-500 text-white text-sm font-semibold rounded-full">
                  -{discount}%
                </span>
              )}
              {product.isNew && (
                <span className="absolute top-4 right-4 px-3 py-1 bg-teal-500 text-white text-sm font-semibold rounded-full">
                  NEW
                </span>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            <div className="flex gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-violet-600' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <p className="text-violet-600 font-medium mb-2">{product.category.name}</p>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">{product.rating}</span>
                <span className="text-gray-400">({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold text-violet-600">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <p className="text-gray-600">{product.description}</p>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className={`text-sm ${product.stock > 10 ? 'text-green-600' : 'text-orange-500'}`}>
                {product.stock > 10 ? 'In Stock' : `Only ${product.stock} left`}
              </span>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button
                size="lg"
                className="flex-1 bg-violet-600 hover:bg-violet-700 h-14 text-lg"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={`w-14 h-14 ${inWishlist ? 'border-red-500 text-red-500' : ''}`}
                onClick={handleToggleWishlist}
              >
                <Heart className={`w-6 h-6 ${inWishlist ? 'fill-current' : ''}`} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-14 h-14"
              >
                <Share2 className="w-6 h-6" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="w-6 h-6 mx-auto mb-2 text-violet-600" />
                <p className="text-sm text-gray-600">Free Shipping</p>
              </div>
              <div className="text-center">
                <RefreshCw className="w-6 h-6 mx-auto mb-2 text-violet-600" />
                <p className="text-sm text-gray-600">Easy Returns</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 mx-auto mb-2 text-violet-600" />
                <p className="text-sm text-gray-600">Secure Payment</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-16">
          <TabsList className="w-full justify-start bg-white p-1 rounded-xl">
            <TabsTrigger value="description" className="flex-1">Description</TabsTrigger>
            <TabsTrigger value="specifications" className="flex-1">Specifications</TabsTrigger>
            <TabsTrigger value="reviews" className="flex-1">Reviews ({productReviews.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-4">Product Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
              <div className="mt-6">
                <h4 className="font-semibold mb-3">Key Features:</h4>
                <ul className="space-y-2">
                  {product.tags.map((tag) => (
                    <li key={tag} className="flex items-center gap-2 text-gray-600">
                      <Check className="w-4 h-4 text-violet-600" />
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-6">
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b">
                    <span className="text-gray-500">{key}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
              {productReviews.length > 0 ? (
                <div className="space-y-6">
                  {productReviews.map((review) => (
                    <div key={review.id} className="border-b pb-6">
                      <div className="flex items-start gap-4">
                        <img
                          src={review.user.avatar || 'https://via.placeholder.com/50'}
                          alt={review.user.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-semibold">{review.user.name}</span>
                            {review.verified && (
                              <span className="px-2 py-0.5 bg-green-100 text-green-600 text-xs rounded-full">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <div className="flex mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <h4 className="font-medium mb-1">{review.title}</h4>
                          <p className="text-gray-600">{review.comment}</p>
                          <p className="text-sm text-gray-400 mt-2">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review!</p>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
