
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const PersonalInfo = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: '',
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const loadExistingData = async () => {
      try {
        const { data, error } = await supabase
          .from('user_onboarding')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (data && !error) {
          setFormData({
            firstName: data.first_name || '',
            lastName: data.last_name || '',
            email: data.email || user.email || '',
            phone: data.phone || '',
            dateOfBirth: data.date_of_birth || '',
            address: data.address || '',
            city: data.city || '',
            state: data.state || '',
            zipCode: data.zip_code || '',
            emergencyContactName: data.emergency_contact_name || '',
            emergencyContactPhone: data.emergency_contact_phone || '',
            emergencyContactRelationship: data.emergency_contact_relationship || '',
          });
        } else if (user.email) {
          setFormData(prev => ({ ...prev, email: user.email }));
        }
      } catch (error) {
        console.error('Error loading existing data:', error);
      } finally {
        setInitialLoading(false);
      }
    };

    loadExistingData();
  }, [user, navigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContinue = async () => {
    if (!user) return;

    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast({
        title: "Required fields missing",
        description: "Please fill in your first name, last name, and email",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('user_onboarding')
        .upsert({
          user_id: user.id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          date_of_birth: formData.dateOfBirth || null,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zipCode,
          emergency_contact_name: formData.emergencyContactName,
          emergency_contact_phone: formData.emergencyContactPhone,
          emergency_contact_relationship: formData.emergencyContactRelationship,
          completed_steps: ['personal-info'],
        });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Personal information saved",
        description: "Your information has been saved successfully",
      });

      // Navigate to next step (will be family structure)
      navigate('/family-structure');
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[#223b0a]/30 border-t-[#223b0a] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-lg sm:max-w-2xl">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#a8e6ff] to-[#223b0a] rounded-2xl mb-4 sm:mb-6 shadow-lg">
            <Heart className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Personal Information</h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-sm sm:max-w-md mx-auto px-2 sm:px-0">
            Let's start with some basic information about you
          </p>
        </div>

        {/* Form Card */}
        <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm">
          <CardContent className="p-4 sm:p-8">
            <div className="space-y-4 sm:space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">Basic Information</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium text-slate-700">
                      First Name *
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="mt-1"
                      placeholder="Enter your first name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium text-slate-700">
                      Last Name *
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="mt-1"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                      Email *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="mt-1"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium text-slate-700">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="mt-1"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="dateOfBirth" className="text-sm font-medium text-slate-700">
                    Date of Birth
                  </Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">Address</h3>
                
                <div>
                  <Label htmlFor="address" className="text-sm font-medium text-slate-700">
                    Street Address
                  </Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="mt-1"
                    placeholder="1234 Main Street"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-sm font-medium text-slate-700">
                      City
                    </Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="mt-1"
                      placeholder="City"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="state" className="text-sm font-medium text-slate-700">
                      State
                    </Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="mt-1"
                      placeholder="State"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="zipCode" className="text-sm font-medium text-slate-700">
                      ZIP Code
                    </Label>
                    <Input
                      id="zipCode"
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      className="mt-1"
                      placeholder="12345"
                    />
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">Emergency Contact</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="emergencyContactName" className="text-sm font-medium text-slate-700">
                      Contact Name
                    </Label>
                    <Input
                      id="emergencyContactName"
                      value={formData.emergencyContactName}
                      onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                      className="mt-1"
                      placeholder="Emergency contact name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="emergencyContactPhone" className="text-sm font-medium text-slate-700">
                      Contact Phone
                    </Label>
                    <Input
                      id="emergencyContactPhone"
                      type="tel"
                      value={formData.emergencyContactPhone}
                      onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                      className="mt-1"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="emergencyContactRelationship" className="text-sm font-medium text-slate-700">
                    Relationship
                  </Label>
                  <Input
                    id="emergencyContactRelationship"
                    value={formData.emergencyContactRelationship}
                    onChange={(e) => handleInputChange('emergencyContactRelationship', e.target.value)}
                    className="mt-1"
                    placeholder="e.g., Spouse, Parent, Sibling"
                  />
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
              <Button
                variant="outline"
                onClick={() => navigate('/family-setup')}
                className="flex items-center gap-2 h-12 sm:h-14 text-base font-medium border-slate-200 hover:border-slate-300"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              
              <Button
                onClick={handleContinue}
                disabled={loading}
                className="flex-1 h-12 sm:h-14 text-base font-medium bg-[#223b0a] hover:bg-[#1a2e08] text-white rounded-xl transition-all duration-200"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Saving...</span>
                  </div>
                ) : (
                  'Continue'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Progress Indicator */}
        <div className="text-center mt-4 sm:mt-6">
          <p className="text-xs sm:text-sm text-slate-500">
            Step 1 of 7 • Personal Information
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
