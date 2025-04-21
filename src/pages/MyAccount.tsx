
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { User, Save, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const MyAccount = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    const fetchProfile = async () => {
      setProfileLoading(true);
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        
        if (data?.username) {
          setUsername(data.username);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ username })
        .eq('id', user.id);

      if (error) throw error;
      
      toast.success('Profile updated successfully');
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(`Failed to update profile: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-cinema-text mb-8">My Account</h1>
        
        <div className="space-y-8">
          <Card className="bg-cinema-card border border-cinema-card/30">
            <CardHeader>
              <CardTitle className="text-cinema-text flex items-center gap-2">
                <User className="h-5 w-5" /> Profile Information
              </CardTitle>
              <CardDescription className="text-cinema-subtle">
                Update your profile details
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleUpdateProfile}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-cinema-text">Email</Label>
                  <Input 
                    id="email" 
                    value={user?.email || ''} 
                    disabled 
                    className="bg-cinema-dark-blue/50 text-cinema-subtle border-cinema-card/30"
                  />
                  <p className="text-xs text-cinema-subtle">Your email cannot be changed</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-cinema-text">Username</Label>
                  {profileLoading ? (
                    <div className="h-10 w-full flex items-center justify-center bg-cinema-dark-blue/50 rounded-md">
                      <Loader2 className="h-4 w-4 animate-spin text-cinema-subtle" />
                    </div>
                  ) : (
                    <Input 
                      id="username" 
                      value={username} 
                      onChange={e => setUsername(e.target.value)}
                      className="bg-cinema-dark-blue text-cinema-text border-cinema-card/30"
                      placeholder="Enter your username"
                    />
                  )}
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  type="submit"
                  className="bg-cinema-accent text-cinema-dark-blue hover:bg-opacity-90"
                  disabled={loading || profileLoading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" /> Saving
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" /> Save Changes
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MyAccount;
