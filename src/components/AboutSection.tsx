import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Palette, Rocket, Lightbulb, Cpu, Globe } from 'phosphor-react';
import profileImage from '@/assets/profile-image.jpg';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section fade + blur clear animation
      gsap.fromTo(sectionRef.current,
        { 
          opacity: 0, 
          filter: "blur(10px)" 
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Profile image animation - enters from left with rotation
      gsap.fromTo(".profile-image",
        { 
          opacity: 0, 
          x: -100, 
          rotation: -10,
          scale: 0.8
        },
        {
          opacity: 1,
          x: 0,
          rotation: 0,
          scale: 1,
          duration: 1.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".profile-image",
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Bio text staggered animation
      gsap.fromTo(".bio-text",
        { 
          opacity: 0, 
          y: 30,
          filter: "blur(5px)"
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".bio-text",
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Skills icons staggered animation
      gsap.fromTo(".skill-icon",
        { 
          opacity: 0, 
          scale: 0.5, 
          y: 20 
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Profile image hover effect
      const profileImg = document.querySelector('.profile-image');
      if (profileImg) {
        profileImg.addEventListener('mouseenter', () => {
          gsap.to(profileImg, {
            scale: 1.05,
            rotation: 2,
            duration: 0.4,
            ease: "power2.out"
          });
        });

        profileImg.addEventListener('mouseleave', () => {
          gsap.to(profileImg, {
            scale: 1,
            rotation: 0,
            duration: 0.4,
            ease: "power2.out"
          });
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skills = [
    { icon: Code, name: 'JavaScript', color: 'text-yellow-400' },
    { icon: Globe, name: 'React', color: 'text-blue-400' },
    { icon: Palette, name: 'CSS/Tailwind', color: 'text-green-400' },
    { icon: Rocket, name: 'GSAP', color: 'text-purple-400' },
    { icon: Lightbulb, name: 'UI/UX', color: 'text-pink-400' },
    { icon: Cpu, name: 'TypeScript', color: 'text-blue-500' }
  ];

  return (
    <section ref={sectionRef} id="about" className="py-32 relative">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Profile Image */}
          <div className="relative">
            <div className="profile-image relative w-80 h-80 mx-auto lg:mx-0">
              {/* Glowing circular frame */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-blue-accent to-orange-accent p-1 animate-pulse">
                <div className="w-full h-full rounded-full bg-background p-2">
                  <img 
                    src={profileImage} 
                    alt="Shradha Kapoor - Developer" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              
              {/* Floating glow effect */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-primary/20 to-blue-accent/20 blur-xl" />
            </div>
          </div>

          {/* Right - Bio and Skills */}
          <div className="space-y-12">
            <div className="bio-text space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold gradient-text">
                About Me
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a passionate full-stack developer with expertise in creating 
                immersive digital experiences. With a keen eye for design and a 
                love for cutting-edge technology, I transform ideas into 
                beautiful, functional applications.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Specializing in React, GSAP animations, and modern web technologies, 
                I bring creativity and technical excellence to every project.
              </p>
            </div>

            {/* Skills Grid */}
            <div className="skills-grid">
              <h3 className="text-2xl font-semibold mb-8 text-foreground">
                Skills & Technologies
              </h3>
              <div className="grid grid-cols-3 gap-6">
                {skills.map((skill, index) => (
                  <div 
                    key={skill.name} 
                    className="skill-icon glass-card p-6 text-center hover:scale-105 transition-transform cursor-pointer group"
                  >
                    <skill.icon 
                      weight="light" 
                      className={`w-8 h-8 mx-auto mb-3 ${skill.color} group-hover:scale-110 transition-transform`} 
                    />
                    <p className="text-sm font-medium text-foreground">
                      {skill.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;