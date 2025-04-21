
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { createWatchlist } from '@/services/watchlistService';
import { toast } from 'sonner';

const CreateWatchlist = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Please enter a name for your watchlist');
      return;
    }

    setSubmitting(true);
    try {
      const watchlist = await createWatchlist(name.trim(), description.trim(), isPublic);
      if (watchlist) {
        toast.success('Watchlist created successfully!');
        navigate(`/watchlist/${watchlist.id}`);
      } else {
        toast.error('Failed to create watchlist');
      }
    } catch (error) {
      console.error('Error creating watchlist:', error);
      toast.error('An error occurred while creating your watchlist');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container max-w-2xl mx-auto px-4 py-8 mt-16">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            className="text-cinema-text mb-2"
            onClick={() => navigate('/my-watchlists')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to My Watchlists
          </Button>
          <h1 className="text-2xl font-bold text-cinema-text">Create New Watchlist</h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-cinema-card p-6 rounded-lg">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Watchlist Name*</Label>
              <Input
                id="name"
                placeholder="Enter a name for your watchlist"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-cinema-dark-blue border-cinema-card/50 focus:border-cinema-accent"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Add a description for your watchlist"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-cinema-dark-blue border-cinema-card/50 focus:border-cinema-accent min-h-[100px]"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="visibility">Public Watchlist</Label>
                <p className="text-xs text-cinema-subtle">Anyone can view public watchlists</p>
              </div>
              <Switch
                id="visibility"
                checked={isPublic}
                onCheckedChange={setIsPublic}
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-cinema-accent text-cinema-dark-blue hover:bg-opacity-90"
                disabled={submitting || !name.trim()}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Watchlist'
                )}
              </Button>
            </div>
          </div>
        </form>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateWatchlist;
