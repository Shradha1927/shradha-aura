import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Code } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const FooterSection = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Footer fade + slide-up animation
      gsap.fromTo(footerRef.current,
        { 
          opacity: 0, 
          y: 60,
          filter: "blur(10px)"
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Floating background particles
      gsap.to(".footer-particle", {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.4
      });

      // Navigation links hover animations
      const navLinks = document.querySelectorAll('.footer-nav-link');
      navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
          gsap.to(link, {
            y: -2,
            duration: 0.2,
            ease: "power2.out"
          });
        });

        link.addEventListener('mouseleave', () => {
          gsap.to(link, {
            y: 0,
            duration: 0.2,
            ease: "power2.out"
          });
        });
      });

    }, footerRef);

    return () => ctx.revert();
  }, []);

  const navigationLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="relative py-16 border-t border-border/50">
      {/* Floating Background Particles */}
      <div className="footer-particle glow-orb w-32 h-32 top-10 left-1/4" />
      <div className="footer-particle glow-orb w-24 h-24 bottom-10 right-1/3" 
           style={{ background: 'radial-gradient(circle, hsl(var(--blue-accent)) 0%, transparent 70%)' }} />
      <div className="footer-particle glow-orb w-20 h-20 top-20 right-1/4" 
           style={{ background: 'radial-gradient(circle, hsl(var(--orange-accent)) 0%, transparent 70%)' }} />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8">
          
          {/* Logo/Name */}
          <div>
            <button 
              onClick={scrollToTop}
              className="text-3xl font-bold gradient-text hover:scale-105 transition-transform duration-300 cursor-pointer"
            >
              SK
            </button>
          </div>

          {/* Navigation Links */}
          <nav>
            <ul className="flex flex-wrap justify-center gap-8 md:gap-12">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="footer-nav-link text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Divider */}
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-border to-transparent mx-auto" />

          {/* Copyright & Made with Love */}
          <div className="space-y-4">
            <p className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
              Made with 
              <Heart weight="fill" className="w-4 h-4 text-red-500 animate-pulse" />
              and 
              <Code weight="bold" className="w-4 h-4 text-primary" />
              by Shradha Kapoor
            </p>
            
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Shradha Kapoor. All rights reserved.
            </p>
          </div>

          {/* Scroll to Top Hint */}
          <div className="pt-4">
            <button
              onClick={scrollToTop}
              className="group inline-flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              <div className="w-6 h-6 rounded-full border border-current flex items-center justify-center group-hover:border-primary transition-colors">
                <div className="w-2 h-2 rounded-full bg-current group-hover:bg-primary transition-colors" />
              </div>
              <span className="text-xs font-medium">Back to top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;