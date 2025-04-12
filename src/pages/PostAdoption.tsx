
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Checkbox } from '../components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { PawPrint, Camera, MapPin, User, Phone, Mail, Building, DollarSign, Heart } from 'lucide-react';

const PostAdoption = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    age: '',
    location: '',
    description: '',
    shelter: '',
    adoptionFee: '',
    goodWithKids: false,
    goodWithPets: false,
    houseTrained: false,
    specialNeeds: false,
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    image: null as File | null
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      
      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.name || !formData.breed || !formData.age || !formData.description) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields."
      });
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      // In a real application, this would connect to your backend API
      console.log("Submitted adoption data:", formData);
      
      toast({
        title: "Pet Posted Successfully",
        description: "Your pet has been posted for adoption!"
      });
      
      setIsSubmitting(false);
      // Redirect to adoption page
      navigate('/adopt');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow py-12 bg-pawbg">
        <div className="paw-container max-w-3xl mx-auto">
          <div className="bg-white shadow-md rounded-xl overflow-hidden">
            {/* Form Header */}
            <div className="bg-pawgreen-500 p-6 text-white">
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <Heart className="h-6 w-6" />
                Post a Pet for Adoption
              </h1>
              <p className="text-pawgreen-50 mt-1">
                Help find a loving home for a pet in need
              </p>
            </div>
            
            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Pet Information Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Pet Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Pet Name *</Label>
                    <Input 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Max, Bella, etc."
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="breed">Breed/Species *</Label>
                    <Input 
                      id="breed"
                      name="breed"
                      value={formData.breed}
                      onChange={handleInputChange}
                      placeholder="Golden Retriever, Siamese Cat, etc."
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="age">Age *</Label>
                    <Input 
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="2 years, 6 months, etc."
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="petType">Pet Type *</Label>
                    <Select onValueChange={(value) => handleSelectChange('petType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select pet type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dog">Dog</SelectItem>
                        <SelectItem value="cat">Cat</SelectItem>
                        <SelectItem value="bird">Bird</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="image">Upload Photo (Required)</Label>
                  <div className="flex flex-col items-center border-2 border-dashed border-gray-300 rounded-md p-6 bg-gray-50">
                    {imagePreview ? (
                      <div className="relative w-full h-48 mb-4">
                        <img 
                          src={imagePreview} 
                          alt="Pet preview" 
                          className="w-full h-full object-contain"
                        />
                        <button
                          type="button"
                          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
                          onClick={() => {
                            setImagePreview(null);
                            setFormData(prev => ({ ...prev, image: null }));
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center mb-4">
                        <Camera className="h-12 w-12 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500">Drag and drop an image or click to browse</p>
                      </div>
                    )}
                    
                    <Input 
                      id="image"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('image')?.click()}
                    >
                      Browse Files
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Adoption Information Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Adoption Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      Location *
                    </Label>
                    <Input 
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="City, State"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="shelter" className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      Shelter/Rescue (if applicable)
                    </Label>
                    <Input 
                      id="shelter"
                      name="shelter"
                      value={formData.shelter}
                      onChange={handleInputChange}
                      placeholder="PawPals Rescue Center"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="adoptionFee" className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      Adoption Fee
                    </Label>
                    <Input 
                      id="adoptionFee"
                      name="adoptionFee"
                      value={formData.adoptionFee}
                      onChange={handleInputChange}
                      placeholder="$250"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Pet Description & Personality *</Label>
                  <Textarea 
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the pet's personality, training level, energy level, and any specific needs or preferences..."
                    rows={4}
                    required
                  />
                </div>
                
                <div className="space-y-3">
                  <Label>Characteristics (check all that apply)</Label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="goodWithKids" 
                        checked={formData.goodWithKids}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('goodWithKids', checked as boolean)
                        }
                      />
                      <Label htmlFor="goodWithKids" className="cursor-pointer">Good with kids</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="goodWithPets" 
                        checked={formData.goodWithPets}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('goodWithPets', checked as boolean)
                        }
                      />
                      <Label htmlFor="goodWithPets" className="cursor-pointer">Good with other pets</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="houseTrained" 
                        checked={formData.houseTrained}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('houseTrained', checked as boolean)
                        }
                      />
                      <Label htmlFor="houseTrained" className="cursor-pointer">House trained</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="specialNeeds" 
                        checked={formData.specialNeeds}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange('specialNeeds', checked as boolean)
                        }
                      />
                      <Label htmlFor="specialNeeds" className="cursor-pointer">Special needs</Label>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Contact Information Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Contact Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactName" className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      Your Name *
                    </Label>
                    <Input 
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      placeholder="John Smith"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone" className="flex items-center gap-1">
                      <Phone className="h-4 w-4" />
                      Phone Number *
                    </Label>
                    <Input 
                      id="contactPhone"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      placeholder="(123) 456-7890"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="contactEmail" className="flex items-center gap-1">
                      <Mail className="h-4 w-4" />
                      Email Address *
                    </Label>
                    <Input 
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/adopt')}
                >
                  Cancel
                </Button>
                
                <Button 
                  type="submit" 
                  className="bg-pawgreen-500 hover:bg-pawgreen-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Post for Adoption"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PostAdoption;
