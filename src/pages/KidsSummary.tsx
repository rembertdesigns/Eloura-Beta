import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, MinusCircle, UserPlus } from 'lucide-react';
import Navigation from '@/components/Navigation';

const KidsSummary = () => {
  const [kids, setKids] = useState([
    { id: 1, name: '', age: '' }
  ]);
  const navigate = useNavigate();

  const addKid = () => {
    setKids([...kids, { id: Date.now(), name: '', age: '' }]);
  };

  const removeKid = (id: number) => {
    setKids(kids.filter(kid => kid.id !== id));
  };

  const updateKid = (id: number, field: string, value: string) => {
    setKids(kids.map(kid =>
      kid.id === id ? { ...kid, [field]: value } : kid
    ));
  };

  const handleContinue = () => {
    // Save to localStorage for demo
    localStorage.setItem('kids', JSON.stringify(kids));
    console.log('Saved kids to localStorage:', kids);
    
    // Navigate to challenges page
    navigate('/top-challenges');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Kids Summary</CardTitle>
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => navigate('/invite')}
                className="border-[#223b0a] text-[#223b0a] hover:bg-[#223b0a] hover:text-white"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Invite Support Team
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {kids.map(kid => (
              <div key={kid.id} className="space-y-2 border-b pb-4 last:border-b-0">
                <div className="text-lg font-medium text-slate-700">Kid #{kids.indexOf(kid) + 1}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`name-${kid.id}`}>Name</Label>
                    <Input
                      type="text"
                      id={`name-${kid.id}`}
                      placeholder="Kid's Name"
                      value={kid.name}
                      onChange={(e) => updateKid(kid.id, 'name', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`age-${kid.id}`}>Age</Label>
                    <Input
                      type="number"
                      id={`age-${kid.id}`}
                      placeholder="Kid's Age"
                      value={kid.age}
                      onChange={(e) => updateKid(kid.id, 'age', e.target.value)}
                    />
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:bg-red-50 hover:text-red-700 -mb-2"
                  onClick={() => removeKid(kid.id)}
                >
                  <MinusCircle className="h-4 w-4 mr-2" />
                  Remove Kid
                </Button>
              </div>
            ))}

            <Button
              variant="secondary"
              className="w-full justify-center"
              onClick={addKid}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Another Kid
            </Button>

            <Button className="w-full justify-center" onClick={handleContinue}>
              Continue to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default KidsSummary;
