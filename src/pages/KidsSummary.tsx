
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, ArrowLeft, ArrowRight, Baby, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';
import AddKidModal from '@/components/AddKidModal';

interface Kid {
  id: string;
  name: string;
  age: number | null;
  grade: string | null;
  school: string | null;
  allergies: string | null;
  medical_notes: string | null;
  activities: string | null;
  special_needs: string | null;
}

const KidsSummary = () => {
  const [kids, setKids] = useState<Kid[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingKid, setEditingKid] = useState<Kid | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // Try to load from localStorage first for demo purposes
    const savedKids = localStorage.getItem('kids');
    if (savedKids) {
      try {
        setKids(JSON.parse(savedKids));
        setLoading(false);
        return;
      } catch (e) {
        console.error('Error parsing saved kids:', e);
      }
    }

    // If user is authenticated, try to load from Supabase
    if (user) {
      fetchKids();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchKids = async () => {
    try {
      // For now, we'll use localStorage since we don't have a kids table yet
      setLoading(false);
    } catch (error) {
      console.error('Error fetching kids:', error);
      setLoading(false);
    }
  };

  const handleAddKid = () => {
    setEditingKid(null);
    setIsModalOpen(true);
  };

  const handleEditKid = (kid: Kid) => {
    setEditingKid(kid);
    setIsModalOpen(true);
  };

  const handleDeleteKid = async (kidId: string) => {
    try {
      const updatedKids = kids.filter(kid => kid.id !== kidId);
      setKids(updatedKids);
      
      // Save to localStorage for demo purposes
      localStorage.setItem('kids', JSON.stringify(updatedKids));

      toast({
        title: "Success",
        description: "Child information removed successfully",
      });
    } catch (error) {
      console.error('Error deleting kid:', error);
      toast({
        title: "Error",
        description: "Failed to remove child information",
        variant: "destructive",
      });
    }
  };

  const handleKidSaved = (savedKid: Kid) => {
    let updatedKids: Kid[];
    
    if (editingKid) {
      updatedKids = kids.map(kid => 
        kid.id === savedKid.id ? savedKid : kid
      );
    } else {
      updatedKids = [...kids, savedKid];
    }
    
    setKids(updatedKids);
    
    // Save to localStorage for demo purposes
    localStorage.setItem('kids', JSON.stringify(updatedKids));
    
    setIsModalOpen(false);
    setEditingKid(null);
  };

  const handleContinue = async () => {
    try {
      setSaving(true);
      
      // Save to localStorage for demo purposes
      localStorage.setItem('kids', JSON.stringify(kids));
      
      // If user is authenticated, also update onboarding progress
      if (user) {
        const { error } = await supabase
          .from('user_onboarding')
          .update({ 
            completed_steps: ['family-type', 'personal-info', 'family-structure', 'kids-summary']
          })
          .eq('user_id', user?.id);

        if (error) {
          console.error('Error updating progress:', error);
        }
      }

      toast({
        title: "Kids information saved",
        description: "Moving to next step...",
      });

      // Navigate to next step (dashboard for now)
      navigate('/');
    } catch (error) {
      console.error('Error saving progress:', error);
      // Don't block the user from continuing for demo purposes
      toast({
        title: "Kids information saved locally",
        description: "Moving to next step...",
      });
      navigate('/');
    } finally {
      setSaving(false);
    }
  };

  const getAgeDisplay = (age: number | null) => {
    if (!age) return '';
    return `${age} years old`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#223b0a]/30 border-t-[#223b0a] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Progress */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-600">Step 4 of 5</span>
            <span className="text-sm text-slate-600">80%</span>
          </div>
          <Progress value={80} className="h-2" />
        </div>

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#a8e6ff] to-[#223b0a] rounded-2xl mb-4 sm:mb-6 shadow-lg">
            <Baby className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Kids Summary</h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto px-2 sm:px-0">
            Tell us about your children so we can provide age-appropriate care coordination and support
          </p>
        </div>

        {/* Kids Grid */}
        <Card className="border-0 shadow-xl bg-white/70 backdrop-blur-sm mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Your Children</CardTitle>
                <CardDescription>
                  {kids.length === 0 
                    ? "No children added yet" 
                    : `${kids.length} child${kids.length === 1 ? '' : 'ren'} added`}
                </CardDescription>
              </div>
              <Button
                onClick={handleAddKid}
                className="bg-[#223b0a] hover:bg-[#1a2e08] text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Child
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {kids.length === 0 ? (
              <div className="text-center py-12">
                <Baby className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500 mb-4">Add information about your children</p>
                <Button
                  onClick={handleAddKid}
                  variant="outline"
                  className="border-[#223b0a] text-[#223b0a] hover:bg-[#223b0a] hover:text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Child
                </Button>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {kids.map((kid) => (
                  <div
                    key={kid.id}
                    className="relative p-4 border border-slate-200 rounded-xl hover:border-[#223b0a]/30 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">👶</span>
                        <div>
                          <h3 className="font-semibold text-slate-900">{kid.name}</h3>
                          {kid.age && (
                            <p className="text-sm text-slate-600">{getAgeDisplay(kid.age)}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleEditKid(kid)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDeleteKid(kid.id)}
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    {kid.grade && (
                      <p className="text-sm text-slate-600 mb-1">
                        <span className="font-medium">Grade:</span> {kid.grade}
                      </p>
                    )}
                    
                    {kid.school && (
                      <p className="text-sm text-slate-600 mb-1">
                        <span className="font-medium">School:</span> {kid.school}
                      </p>
                    )}
                    
                    {kid.activities && (
                      <p className="text-sm text-slate-600 mb-1">
                        <span className="font-medium">Activities:</span> {kid.activities}
                      </p>
                    )}
                    
                    {kid.allergies && (
                      <p className="text-sm text-red-600 mb-1">
                        <span className="font-medium">Allergies:</span> {kid.allergies}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <Button
            variant="outline"
            onClick={() => navigate('/family-structure')}
            className="flex-1 sm:flex-none h-12 border-slate-300 text-slate-700 hover:bg-slate-50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Family Structure
          </Button>
          
          <div className="flex-1" />
          
          <Button
            onClick={handleContinue}
            disabled={saving}
            className="flex-1 sm:flex-none h-12 bg-[#223b0a] hover:bg-[#1a2e08] text-white px-8"
          >
            {saving ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Saving...</span>
              </div>
            ) : (
              <>
                Continue to Dashboard
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>

      <AddKidModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingKid(null);
        }}
        onSave={handleKidSaved}
        editingKid={editingKid}
      />
    </div>
  );
};

export default KidsSummary;
