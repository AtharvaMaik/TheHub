
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Film } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  React.useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-16">
        <div className="text-center px-4">
          <div className="inline-block mb-6 p-4 bg-cinema-card rounded-full">
            <Film className="h-12 w-12 text-cinema-accent" />
          </div>
          
          <h1 className="text-4xl font-bold text-cinema-text mb-4">404</h1>
          <p className="text-xl text-cinema-text mb-6">Oops! This scene isn't in our movie.</p>
          <p className="text-cinema-subtle mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved to a different location.
          </p>
          
          <Link to="/">
            <Button className="bg-cinema-accent text-cinema-dark-blue hover:bg-opacity-90">
              Back to Homepage
            </Button>
          </Link>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
