import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import PublicWatchlistsGrid from '@/components/PublicWatchlistsGrid';

const Index = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { user } = useAuth();

  const handleSignUp = () => {
    navigate(user ? '/my-watchlists' : '/auth');
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-black to-cinema-dark-blue">
      <Header />
      
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="text-center mb-8 z-10"
        >
          <h2 className="text-lg md:text-xl text-cinema-subtle mb-6 font-light tracking-wide">
            After 30 hours of work, and a lot of AI magic, we present to you
          </h2>
          
          <h1 className="text-5xl md:text-7xl font-bold text-cinema-text mb-8 tracking-tighter">
            THE HUB
          </h1>
          
          <p className="text-lg md:text-xl text-cinema-subtle mb-12 max-w-md mx-auto">
            Elevating movie experiences
          </p>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              onClick={handleSignUp}
              className="bg-cinema-accent text-cinema-dark-blue hover:bg-opacity-90 text-lg px-8 py-6"
              size="lg"
            >
              {user ? 'My Watchlists' : 'Join Now'}
            </Button>
          </motion.div>
        </motion.div>

        {/* 3D Background - always visible */}
        <div className="absolute inset-0 -z-0 opacity-50">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} />
            
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
              <mesh position={[-3, -1, 0]} rotation={[0, 0.5, 0]}>
                <dodecahedronGeometry args={[0.8, 0]} />
                <meshStandardMaterial color="#9b87f5" wireframe />
              </mesh>
            </Float>
            
            <Float speed={1.5} rotationIntensity={0.7} floatIntensity={0.5}>
              <mesh position={[3, 2, -2]}>
                <icosahedronGeometry args={[1, 0]} />
                <meshStandardMaterial color="#787eff" wireframe />
              </mesh>
            </Float>
            
            <Float speed={3} rotationIntensity={0.3} floatIntensity={0.8}>
              <mesh position={[2, -2, 0]}>
                <torusGeometry args={[0.6, 0.2, 16, 32]} />
                <meshStandardMaterial color="#9b87f5" />
              </mesh>
            </Float>
            
            <Float speed={2.5} rotationIntensity={0.4} floatIntensity={0.6}>
              <mesh position={[-2, 2, -1]}>
                <octahedronGeometry args={[0.7, 0]} />
                <meshStandardMaterial color="#6e7dff" />
              </mesh>
            </Float>
            
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
          </Canvas>
        </div>
      </section>

      {/* Public Watchlists Section */}
      <section className="container max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-cinema-text mb-8">Popular Watchlists</h2>
        <PublicWatchlistsGrid />
      </section>

      {/* Features Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
        <div className="container max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-cinema-text mb-16">
            Features
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-6 bg-cinema-card rounded-lg"
            >
              <div className="bg-cinema-accent bg-opacity-20 p-5 rounded-full mb-6">
                <div className="h-10 w-10 text-cinema-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-medium text-cinema-text mb-3">Curate</h3>
              <p className="text-cinema-subtle">
                Build and organize your perfect watchlist collection
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-6 bg-cinema-card rounded-lg"
            >
              <div className="bg-cinema-accent bg-opacity-20 p-5 rounded-full mb-6">
                <div className="h-10 w-10 text-cinema-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-medium text-cinema-text mb-3">Share</h3>
              <p className="text-cinema-subtle">
                Instantly collaborate with friends in real-time
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-6 bg-cinema-card rounded-lg"
            >
              <div className="bg-cinema-accent bg-opacity-20 p-5 rounded-full mb-6">
                <div className="h-10 w-10 text-cinema-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-medium text-cinema-text mb-3">Discover</h3>
              <p className="text-cinema-subtle">
                Find hidden gems with ratings and insights
              </p>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <Button 
              onClick={handleSignUp}
              className="bg-cinema-accent text-cinema-dark-blue hover:bg-opacity-90"
              size="lg"
            >
              {user ? 'Explore Movies' : 'Begin Your Journey'}
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
