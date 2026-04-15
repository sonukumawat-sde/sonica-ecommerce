import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock, ChevronRight, Search } from 'lucide-react';
import { orders } from '@/data/mock';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const statusConfig = {
  pending: { icon: Clock, color: 'bg-yellow-100 text-yellow-700', label: 'Pending' },
  processing: { icon: Package, color: 'bg-blue-100 text-blue-700', label: 'Processing' },
  shipped: { icon: Truck, color: 'bg-violet-100 text-violet-700', label: 'Shipped' },
  delivered: { icon: CheckCircle, color: 'bg-green-100 text-green-700', label: 'Delivered' },
  cancelled: { icon: Clock, color: 'bg-red-100 text-red-700', label: 'Cancelled' },
  refunded: { icon: CheckCircle, color: 'bg-gray-100 text-gray-700', label: 'Refunded' },
};

export default function Orders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<string>('all');

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || order.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              {['all', 'pending', 'processing', 'shipped', 'delivered'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    filter === status
                      ? 'bg-violet-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => {
              const status = statusConfig[order.status];
              const StatusIcon = status.icon;

              return (
                <div key={order.id} className="bg-white rounded-2xl p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-lg">{order.id}</h3>
                        <Badge className={status.color}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {status.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">
                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-xl text-violet-600">${order.total.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">{order.items.length} items</p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="flex gap-4 overflow-x-auto py-4 border-t border-b">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex-shrink-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4">
                    <div>
                      {order.trackingNumber && (
                        <p className="text-sm text-gray-500">
                          Tracking: <span className="font-medium">{order.trackingNumber}</span>
                        </p>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      {order.status === 'delivered' && (
                        <Button size="sm" className="bg-violet-600 hover:bg-violet-700">
                          Buy Again
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-20">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
              <Link to="/shop">
                <Button className="bg-violet-600 hover:bg-violet-700">
                  Start Shopping
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
