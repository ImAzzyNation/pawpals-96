
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/dbService';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { User, Edit, Save } from 'lucide-react';

type ProfileData = {
  first_name: string;
  last_name: string;
  email: string;
  bio: string;
  phone: string;
  address: string;
};

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    first_name: '',
    last_name: '',
    email: '',
    bio: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    // Check if user is logged in
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }

    // Initialize profile data from the user object
    setProfileData({
      first_name: currentUser.first_name || '',
      last_name: currentUser.last_name || '',
      email: currentUser.email || '',
      bio: currentUser.bio || 'No bio provided yet.',
      phone: currentUser.phone || '',
      address: currentUser.address || '',
    });
  }, [navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    // In a real app, this would send the updated profile data to the backend
    // For now, we'll just update the user in localStorage to simulate this
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
        ...profileData
      };
      
      localStorage.setItem('pawpals_user', JSON.stringify(updatedUser));
      
      // Show success message
      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      });
      
      setIsEditing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow py-8">
        <div className="paw-container max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Profile Header */}
            <div className="bg-pawgreen-500 text-white p-6 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="bg-white text-pawgreen-600 rounded-full p-3">
                  <User size={32} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">My Profile</h1>
                  <p className="text-pawgreen-100">Manage your personal information</p>
                </div>
              </div>
              <Button 
                variant={isEditing ? "default" : "outline"} 
                className={isEditing ? "bg-white text-pawgreen-600 hover:bg-gray-100" : "bg-pawgreen-600 text-white border-white hover:bg-pawgreen-700"}
                onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
              >
                {isEditing ? (
                  <>
                    <Save size={18} className="mr-2" />
                    Save Profile
                  </>
                ) : (
                  <>
                    <Edit size={18} className="mr-2" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>
            
            {/* Profile Content */}
            <div className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input 
                    id="first_name"
                    name="first_name"
                    value={profileData.first_name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input 
                    id="last_name"
                    name="last_name"
                    value={profileData.last_name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email"
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                  disabled={true} // Email cannot be changed
                />
                {isEditing && <p className="text-sm text-gray-500">Email address cannot be changed.</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Your phone number"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input 
                  id="address"
                  name="address"
                  value={profileData.address}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Your address"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Tell us a bit about yourself..."
                  rows={4}
                />
              </div>
              
              {isEditing && (
                <div className="flex justify-end gap-3 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSaveProfile}
                    className="bg-pawgreen-500 hover:bg-pawgreen-600"
                  >
                    Save Changes
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
