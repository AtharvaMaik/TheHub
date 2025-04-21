
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const Auth = () => {
  const navigate = useNavigate();
  const { signIn, signUp, user } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  
  // Signup form state
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupLoading, setSignupLoading] = useState(false);

  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    try {
      await signIn(loginEmail, loginPassword);
      navigate('/');
    } catch (error) {
      // Error is handled in the AuthContext
    } finally {
      setLoginLoading(false);
    }
  };
  
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupLoading(true);
    try {
      if (!signupUsername.trim()) {
        throw new Error("Username is required");
      }
      await signUp(signupEmail, signupPassword, signupUsername);
      toast.success("Please check your email to confirm your account");
      setActiveTab('login');
    } catch (error) {
      // Error is handled in the AuthContext
    } finally {
      setSignupLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-cinema-dark-blue">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <Card className="w-full max-w-md bg-cinema-card border-cinema-card/30">
          <Tabs 
            defaultValue="login" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 bg-cinema-dark-blue">
              <TabsTrigger value="login" className="data-[state=active]:bg-cinema-accent data-[state=active]:text-cinema-dark-blue">
                Login
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-cinema-accent data-[state=active]:text-cinema-dark-blue">
                Sign Up
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="p-6">
              <h2 className="text-2xl font-bold text-cinema-text mb-6 text-center">Welcome Back</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-cinema-text">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="your@email.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                    className="bg-cinema-dark-blue text-cinema-text border-cinema-card focus:ring-cinema-accent"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-cinema-text">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                    className="bg-cinema-dark-blue text-cinema-text border-cinema-card focus:ring-cinema-accent"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-cinema-accent text-cinema-dark-blue hover:bg-opacity-90"
                  disabled={loginLoading}
                >
                  {loginLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup" className="p-6">
              <h2 className="text-2xl font-bold text-cinema-text mb-6 text-center">Create Account</h2>
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-cinema-text">Username</Label>
                  <Input 
                    id="username" 
                    type="text" 
                    placeholder="username"
                    value={signupUsername}
                    onChange={(e) => setSignupUsername(e.target.value)}
                    required
                    className="bg-cinema-dark-blue text-cinema-text border-cinema-card focus:ring-cinema-accent"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-cinema-text">Email</Label>
                  <Input 
                    id="signup-email" 
                    type="email" 
                    placeholder="your@email.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                    className="bg-cinema-dark-blue text-cinema-text border-cinema-card focus:ring-cinema-accent"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-cinema-text">Password</Label>
                  <Input 
                    id="signup-password" 
                    type="password" 
                    placeholder="••••••••"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                    minLength={6}
                    className="bg-cinema-dark-blue text-cinema-text border-cinema-card focus:ring-cinema-accent"
                  />
                  <p className="text-xs text-cinema-subtle">Password must be at least 6 characters</p>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-cinema-accent text-cinema-dark-blue hover:bg-opacity-90"
                  disabled={signupLoading}
                >
                  {signupLoading ? "Creating Account..." : "Sign Up"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
