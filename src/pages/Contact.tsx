import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Have a question or need assistance? We're here to help. Reach out to us and we'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6">
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-violet-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Email Us</h3>
              <p className="text-gray-600 mb-2">For general inquiries:</p>
              <a href="mailto:support@sonica.com" className="text-violet-600 hover:text-violet-700">
                support@sonica.com
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6">
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-violet-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Call Us</h3>
              <p className="text-gray-600 mb-2">Mon-Fri from 8am to 5pm:</p>
              <a href="tel:+15551234567" className="text-violet-600 hover:text-violet-700">
                +1 (555) 123-4567
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6">
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-violet-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Visit Us</h3>
              <p className="text-gray-600">
                123 Premium Street<br />
                New York, NY 10001<br />
                United States
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6">
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-violet-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Business Hours</h3>
              <div className="text-gray-600 space-y-1">
                <p>Monday - Friday: 8am - 8pm</p>
                <p>Saturday: 9am - 6pm</p>
                <p>Sunday: 10am - 4pm</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Message Sent!</h2>
                  <p className="text-gray-600 mb-6">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)} variant="outline">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <Label>First Name</Label>
                        <Input placeholder="John" className="mt-1" required />
                      </div>
                      <div>
                        <Label>Last Name</Label>
                        <Input placeholder="Doe" className="mt-1" required />
                      </div>
                    </div>

                    <div>
                      <Label>Email Address</Label>
                      <Input type="email" placeholder="john@example.com" className="mt-1" required />
                    </div>

                    <div>
                      <Label>Subject</Label>
                      <Input placeholder="How can we help?" className="mt-1" required />
                    </div>

                    <div>
                      <Label>Message</Label>
                      <Textarea
                        placeholder="Tell us more about your inquiry..."
                        className="mt-1 min-h-[150px]"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700 h-12">
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
