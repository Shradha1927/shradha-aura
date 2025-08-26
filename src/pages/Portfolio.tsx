import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import LoadingScreen from '@/components/LoadingScreen';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import FooterSection from '@/components/FooterSection';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const [loading, setLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    // Disable scroll while loading
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [loading]);

  const handleLoadingComplete = () => {
    setLoading(false);
    
    // Fade in main content after loading
    setTimeout(() => {
      setContentVisible(true);
      
      // Main content fade in animation
      gsap.fromTo(".main-content", 
        { 
          opacity: 0,
          filter: "blur(10px)"
        },
        { 
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power2.out"
        }
      );
    }, 100);
  };

  // SEO metadata should be handled by the parent component or helmet
  // For now, we'll update document title
  useEffect(() => {
    document.title = "Shradha Kapoor - Full Stack Developer | Portfolio";
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground font-inter">
      {/* Loading Screen */}
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      {/* Main Portfolio Content */}
      {contentVisible && (
        <main className="main-content">
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <ContactSection />
          <FooterSection />
        </main>
      )}
    </div>
  );
};

export default Portfolio;