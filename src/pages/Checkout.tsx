import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Truck, Check, ChevronRight, Lock } from 'lucide-react';
import { useCartStore, useAuthStore, useUIStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const { addNotification } = useUIStore();
  
  const [step, setStep] = useState<'shipping' | 'payment' | 'review'>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);

  const total = getTotal();
  const shipping = total > 50 ? 0 : 9.99;
  const tax = total * 0.08;
  const grandTotal = total + shipping + tax;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    clearCart();
    addNotification({
      type: 'order',
      title: 'Order Placed!',
      message: 'Your order has been placed successfully.',
      read: false,
    });
    
    navigate('/orders');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <Button onClick={() => navigate('/shop')}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Checkout Steps */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-4">
            {[
              { id: 'shipping', label: 'Shipping', icon: Truck },
              { id: 'payment', label: 'Payment', icon: CreditCard },
              { id: 'review', label: 'Review', icon: Check },
            ].map((s, index) => (
              <div key={s.id} className="flex items-center">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                    step === s.id
                      ? 'bg-violet-600 text-white'
                      : index < ['shipping', 'payment', 'review'].indexOf(step)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  <s.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{s.label}</span>
                </div>
                {index < 2 && <ChevronRight className="w-5 h-5 text-gray-400 mx-2" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 'shipping' && (
              <div className="bg-white rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label>First Name</Label>
                    <Input placeholder="John" className="mt-1" />
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <Input placeholder="Doe" className="mt-1" />
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <Label>Email</Label>
                    <Input type="email" placeholder="john@example.com" className="mt-1" />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input placeholder="+1 (555) 123-4567" className="mt-1" />
                  </div>
                  <div>
                    <Label>Address</Label>
                    <Input placeholder="123 Main Street" className="mt-1" />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <Label>City</Label>
                    <Input placeholder="New York" className="mt-1" />
                  </div>
                  <div>
                    <Label>State</Label>
                    <Input placeholder="NY" className="mt-1" />
                  </div>
                  <div>
                    <Label>ZIP Code</Label>
                    <Input placeholder="10001" className="mt-1" />
                  </div>
                </div>

                <Button
                  onClick={() => setStep('payment')}
                  className="w-full bg-violet-600 hover:bg-violet-700 h-12"
                >
                  Continue to Payment
                </Button>
              </div>
            )}

            {step === 'payment' && (
              <div className="bg-white rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">Payment Method</h2>

                <RadioGroup defaultValue="card" className="space-y-4 mb-6">
                  <div className="flex items-center space-x-2 border rounded-xl p-4">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-violet-600" />
                        <div>
                          <p className="font-medium">Credit/Debit Card</p>
                          <p className="text-sm text-gray-500">Visa, Mastercard, Amex</p>
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 border rounded-xl p-4">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">P</div>
                        <div>
                          <p className="font-medium">PayPal</p>
                          <p className="text-sm text-gray-500">Pay with your PayPal account</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                <div className="space-y-4 mb-6">
                  <div>
                    <Label>Card Number</Label>
                    <Input placeholder="1234 5678 9012 3456" className="mt-1" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Expiry Date</Label>
                      <Input placeholder="MM/YY" className="mt-1" />
                    </div>
                    <div>
                      <Label>CVV</Label>
                      <Input placeholder="123" className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label>Cardholder Name</Label>
                    <Input placeholder="John Doe" className="mt-1" />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep('shipping')}
                    className="flex-1 h-12"
                  >
                    Back
                  </Button>
                  <Button
                    onClick={() => setStep('review')}
                    className="flex-1 bg-violet-600 hover:bg-violet-700 h-12"
                  >
                    Review Order
                  </Button>
                </div>
              </div>
            )}

            {step === 'review' && (
              <div className="bg-white rounded-2xl p-8">
                <h2 className="text-2xl font-bold mb-6">Review Your Order</h2>

                {/* Order Items */}
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4 py-4 border-b">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.product.name}</h4>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        <p className="font-semibold text-violet-600">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setStep('payment')}
                    className="flex-1 h-12"
                    disabled={isProcessing}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handlePlaceOrder}
                    className="flex-1 bg-violet-600 hover:bg-violet-700 h-12"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Place Order
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal ({items.length} items)</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-2xl text-violet-600">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
