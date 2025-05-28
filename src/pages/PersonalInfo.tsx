import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Heart, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const loadExistingData = async () => {
      // First try to load from localStorage for demo purposes
      const savedData = localStorage.getItem('personalInfo');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);
        setInitialLoading(false);
        return;
      }

      // If user is authenticated, try to load from Supabase
      if (user) {
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
        }
      }
      setInitialLoading(false);
    };

    loadExistingData();
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = async () => {
    if (!validateForm()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      // Save to localStorage for demo purposes
      localStorage.setItem('personalInfo', JSON.stringify(formData));
      
      // If user is authenticated, also save to Supabase
      if (user) {
        const onboardingData = {
          user_id: user.id,
          first_name: formData.firstName.trim(),
          last_name: formData.lastName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          date_of_birth: formData.dateOfBirth || null,
          address: formData.address.trim() || null,
          city: formData.city.trim() || null,
          state: formData.state.trim() || null,
          zip_code: formData.zipCode.trim() || null,
          emergency_contact_name: formData.emergencyContactName.trim() || null,
          emergency_contact_phone: formData.emergencyContactPhone.trim() || null,
          emergency_contact_relationship: formData.emergencyContactRelationship.trim() || null,
          completed_steps: ['family-type', 'personal-info']
        };

        const { error: onboardingError } = await supabase
          .from('user_onboarding')
          .upsert(onboardingData);

        if (onboardingError) {
          console.error('Supabase error:', onboardingError);
          // Don't block the user from continuing for demo purposes
        }

        // Also update the profiles table
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ 
            full_name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
            email: formData.email.trim()
          })
          .eq('id', user.id);

        if (profileError) {
          console.error('Profile update error:', profileError);
          // Don't show error to user as this is secondary
        }
      }

      toast({
        title: "Information saved",
        description: "Moving to family structure setup...",
      });

      navigate('/family-structure');
    } catch (error) {
      console.error('Error saving data:', error);
      // Don't block the user from continuing for demo purposes
      toast({
        title: "Information saved locally",
        description: "Moving to family structure setup...",
      });
      navigate('/family-structure');
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Step 2 of 4</span>
            <span className="text-sm text-slate-600">50%</span>
          </div>
          <Progress value={50} className="h-2" />
        </div>

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
        <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm mb-6">
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={(e) => {e.preventDefault(); handleContinue();}} className="space-y-6">
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
                        className={`mt-1 ${errors.firstName ? 'border-red-500' : ''}`}
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && (
                        <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="lastName" className="text-sm font-medium text-slate-700">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className={`mt-1 ${errors.lastName ? 'border-red-500' : ''}`}
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && (
                        <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
                      )}
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
                        className={`mt-1 ${errors.email ? 'border-red-500' : ''}`}
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-slate-700">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`mt-1 ${errors.phone ? 'border-red-500' : ''}`}
                        placeholder="(555) 123-4567"
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                      )}
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

              {/* Navigation */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/family-setup')}
                  className="flex-1 sm:flex-none h-12 border-slate-300 text-slate-700 hover:bg-slate-50"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Family Type
                </Button>
                
                <div className="flex-1" />
                
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 sm:flex-none h-12 bg-[#223b0a] hover:bg-[#1a2e08] text-white px-8"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Saving...</span>
                    </div>
                  ) : (
                    <>
                      Continue to Family Structure
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Progress Indicator */}
        <div className="text-center mt-4 sm:mt-6">
          <p className="text-xs sm:text-sm text-slate-500">
            Step 2 of 4 • Personal Information
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
