import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import NotificationBar from './components/NotificationBar';
import LatestVideos from './components/LatestVideos';
import AboutSection from './components/AboutSection';
import TeamSection from './components/TeamSection';
import PartnersSection from './components/PartnersSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
        <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-red-600 selection:text-white">
        <Header />
        <Hero />
        <NotificationBar />
        <LatestVideos />
        <AboutSection />
        <TeamSection />
        <PartnersSection />
        <CTASection />
        <Footer />
        </div>
    </AuthProvider>
  );
}

export default App;