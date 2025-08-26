import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'phosphor-react';

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      // Hero text animations - blur to clear effect
      tl.fromTo(".hero-title", 
        { 
          opacity: 0, 
          y: 50, 
          filter: "blur(10px)" 
        },
        { 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power2.out"
        }
      )
      .fromTo(".hero-subtitle", 
        { 
          opacity: 0, 
          y: 30, 
          filter: "blur(5px)" 
        },
        { 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)",
          duration: 1,
          ease: "power2.out"
        }, 
        "-=0.8"
      )
      .fromTo(".hero-cta", 
        { 
          opacity: 0, 
          scale: 0.8, 
          filter: "blur(5px)" 
        },
        { 
          opacity: 1, 
          scale: 1, 
          filter: "blur(0px)",
          duration: 0.8,
          ease: "back.out(1.7)"
        }, 
        "-=0.5"
      );

      // Spline container fade in from right
      gsap.fromTo(".spline-container", 
        { 
          opacity: 0, 
          x: 100, 
          filter: "blur(10px)" 
        },
        { 
          opacity: 1, 
          x: 0, 
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power2.out",
          delay: 0.8
        }
      );

      // Floating background elements
      gsap.to(".hero-orb", {
        y: -30,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.5
      });

      // CTA button hover animation setup
      const ctaButton = document.querySelector('.cta-button');
      if (ctaButton) {
        ctaButton.addEventListener('mouseenter', () => {
          gsap.to(ctaButton, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        ctaButton.addEventListener('mouseleave', () => {
          gsap.to(ctaButton, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Floating Orbs */}
      <div className="hero-orb glow-orb w-96 h-96 -top-48 -left-48" />
      <div className="hero-orb glow-orb w-64 h-64 top-1/3 -right-32" 
           style={{ background: 'radial-gradient(circle, hsl(var(--blue-accent)) 0%, transparent 70%)' }} />
      <div className="hero-orb glow-orb w-48 h-48 bottom-20 left-1/4" 
           style={{ background: 'radial-gradient(circle, hsl(var(--orange-accent)) 0%, transparent 70%)' }} />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h1 className="hero-title text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                Hi, I'm{' '}
                <span className="gradient-text">
                  Shradha Kapoor
                </span>
                <br />
                <span className="text-3xl md:text-4xl lg:text-5xl font-light text-muted-foreground">
                  Developer
                </span>
              </h1>
            </div>

            <p className="hero-subtitle text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl">
              Crafting innovative digital experiences with cutting-edge technology. 
              Specializing in React, GSAP animations, and immersive web development.
            </p>

            <div className="hero-cta">
              <button className="cta-button glow-button group inline-flex items-center gap-3 text-lg font-medium">
                Hire Me
                <ArrowRight 
                  weight="bold" 
                  className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                />
              </button>
            </div>
          </div>

          {/* Right Content - Spline 3D */}
          <div className="spline-container relative h-[600px] rounded-3xl overflow-hidden glass-card">
            <iframe 
              src='https://my.spline.design/glassmorphlandingpage-kOTqXnRPrQQj5d4TVuDhk8rB/' 
              frameBorder='0' 
              width='100%' 
              height='100%'
              className="rounded-3xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;