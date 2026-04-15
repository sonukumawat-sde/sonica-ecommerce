import { useState } from 'react';
import { User, Mail, Phone, MapPin, Camera, Edit2, Check } from 'lucide-react';
import { useAuthStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Profile() {
  const { user, updateProfile } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl p-8 mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-violet-100 rounded-full flex items-center justify-center overflow-hidden">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-violet-400" />
                )}
              </div>
              <button className="absolute bottom-0 right-0 w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center text-white hover:bg-violet-700 transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
              <p className="text-gray-500">{user?.email}</p>
              <p className="text-sm text-violet-600 mt-1">Member since {new Date(user?.createdAt || '').toLocaleDateString()}</p>
            </div>
            <Button
              variant="outline"
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2"
            >
              {isEditing ? <Check className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
              {isEditing ? 'Done' : 'Edit Profile'}
            </Button>
          </div>
        </div>

        {/* Profile Content */}
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="bg-white p-1 rounded-xl">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <div className="bg-white rounded-2xl p-8">
              <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
              
              <div className="space-y-6">
                <div>
                  <Label>Full Name</Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label>Email Address</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <Label>Phone Number</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                      placeholder="Add phone number"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                      Cancel
                    </Button>
                    <Button onClick={handleSave} className="flex-1 bg-violet-600 hover:bg-violet-700">
                      Save Changes
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="addresses">
            <div className="bg-white rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Saved Addresses</h2>
                <Button className="bg-violet-600 hover:bg-violet-700">
                  Add New Address
                </Button>
              </div>

              {user?.addresses && user.addresses.length > 0 ? (
                <div className="space-y-4">
                  {user.addresses.map((address) => (
                    <div key={address.id} className="border rounded-xl p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-violet-600 mt-0.5" />
                          <div>
                            <p className="font-medium">{address.type.charAt(0).toUpperCase() + address.type.slice(1)}</p>
                            <p className="text-gray-600">{address.street}</p>
                            <p className="text-gray-600">{address.city}, {address.state} {address.zipCode}</p>
                            <p className="text-gray-600">{address.country}</p>
                            {address.isDefault && (
                              <span className="inline-block mt-2 px-2 py-1 bg-violet-100 text-violet-600 text-xs rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm" className="text-red-500">Delete</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No addresses saved yet</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="security">
            <div className="bg-white rounded-2xl p-8">
              <h2 className="text-xl font-semibold mb-6">Security Settings</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between py-4 border-b">
                  <div>
                    <p className="font-medium">Change Password</p>
                    <p className="text-sm text-gray-500">Update your password regularly for security</p>
                  </div>
                  <Button variant="outline">Change</Button>
                </div>

                <div className="flex items-center justify-between py-4 border-b">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500">Add an extra layer of security</p>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>

                <div className="flex items-center justify-between py-4">
                  <div>
                    <p className="font-medium">Login History</p>
                    <p className="text-sm text-gray-500">View your recent login activity</p>
                  </div>
                  <Button variant="outline">View</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
