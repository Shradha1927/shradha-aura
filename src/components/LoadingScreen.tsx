import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress bar from 0 to 100%
    const progressObj = { value: 0 };
    gsap.to(progressObj, {
      value: 100,
      duration: 2.5,
      ease: "power2.out",
      onUpdate: function() {
        setProgress(Math.round(progressObj.value));
      },
      onComplete: () => {
        // Fade out preloader after progress completes
        gsap.timeline()
          .to(".preloader-content", {
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            ease: "power2.inOut"
          })
          .to(".preloader", {
            opacity: 0,
            duration: 0.6,
            onComplete: () => {
              onComplete();
            }
          });
      }
    });

    // Animate the logo/text
    gsap.fromTo(".logo-text", 
      { 
        opacity: 0, 
        y: 30,
        scale: 0.8 
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 1,
        delay: 0.2,
        ease: "back.out(1.7)"
      }
    );

    // Floating animation for background orbs
    gsap.to(".loading-orb", {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      stagger: 0.3
    });

  }, [onComplete]);

  return (
    <div className="preloader fixed inset-0 z-50 bg-background flex flex-col items-center justify-center">
      {/* Background Floating Orbs */}
      <div className="loading-orb glow-orb w-32 h-32 top-1/4 left-1/4" 
           style={{ background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)' }} />
      <div className="loading-orb glow-orb w-24 h-24 top-1/3 right-1/4" 
           style={{ background: 'radial-gradient(circle, hsl(var(--blue-accent)) 0%, transparent 70%)' }} />
      <div className="loading-orb glow-orb w-20 h-20 bottom-1/4 left-1/3" 
           style={{ background: 'radial-gradient(circle, hsl(var(--orange-accent)) 0%, transparent 70%)' }} />
      
      <div className="preloader-content text-center">
        {/* Animated Logo/Text */}
        <div className="logo-text mb-12">
          <h1 className="text-6xl md:text-8xl font-bold gradient-text mb-4">
            SK
          </h1>
          <p className="text-lg font-light text-muted-foreground tracking-wider">
            Loading Portfolio...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-80 max-w-sm mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm font-mono text-primary">{progress}%</span>
          </div>
          
          <div className="h-1 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-blue-accent transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;