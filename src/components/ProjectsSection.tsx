import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Code, Globe } from 'phosphor-react';

// Import project images
import project1 from '@/assets/project-1.jpg';
import project2 from '@/assets/project-2.jpg';
import project3 from '@/assets/project-3.jpg';
import project4 from '@/assets/project-4.jpg';
import project5 from '@/assets/project-5.jpg';
import project6 from '@/assets/project-6.jpg';
import project7 from '@/assets/project-7.jpg';
import project8 from '@/assets/project-8.jpg';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const projects = [
    {
      id: 1,
      title: 'Amazon Clone',
      description: 'Full-featured e-commerce platform with shopping cart, user authentication, and payment integration.',
      image: project1,
      tech: ['React', 'Node.js', 'MongoDB'],
      category: 'E-commerce'
    },
    {
      id: 2,
      title: 'Phone Case Store',
      description: 'Modern e-commerce site for custom phone cases with interactive product customization.',
      image: project2,
      tech: ['React', 'TypeScript', 'Tailwind'],
      category: 'E-commerce'
    },
    {
      id: 3,
      title: 'Travel Landing Page',
      description: 'Beautiful travel booking website with smooth animations and destination explorer.',
      image: project3,
      tech: ['React', 'GSAP', 'CSS3'],
      category: 'Landing Page'
    },
    {
      id: 4,
      title: 'Shopping Platform',
      description: 'Multi-vendor shopping platform with advanced filtering and search capabilities.',
      image: project4,
      tech: ['React', 'Redux', 'Express'],
      category: 'E-commerce'
    },
    {
      id: 5,
      title: 'Weather App',
      description: 'Real-time weather application with beautiful UI and location-based forecasts.',
      image: project5,
      tech: ['React', 'API', 'Chart.js'],
      category: 'Web App'
    },
    {
      id: 6,
      title: 'Kissan Market',
      description: 'Agricultural marketplace connecting farmers directly with consumers for fresh produce.',
      image: project6,
      tech: ['React', 'Firebase', 'Payment Gateway'],
      category: 'Marketplace'
    },
    {
      id: 7,
      title: 'Desktop Assistant',
      description: 'AI-powered desktop assistant with voice commands and smart task automation.',
      image: project7,
      tech: ['Electron', 'AI/ML', 'Voice API'],
      category: 'Desktop App'
    },
    {
      id: 8,
      title: 'Ticket Validator',
      description: 'QR code-based ticket validation system for events with real-time verification.',
      image: project8,
      tech: ['React', 'QR Scanner', 'Database'],
      category: 'System'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation
      gsap.fromTo(".projects-title",
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
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".projects-title",
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Project cards staggered animation
      gsap.fromTo(".project-card",
        { 
          opacity: 0, 
          scale: 0.8,
          y: 50
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Horizontal scroll animation for desktop
      const projectsContainer = document.querySelector('.projects-horizontal');
      if (projectsContainer && window.innerWidth >= 1024) {
        gsap.to(projectsContainer, {
          x: () => -(projectsContainer.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: ".projects-wrapper",
            start: "top top",
            end: () => `+=${projectsContainer.scrollWidth - window.innerWidth}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1
          }
        });
      }

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="glow-orb w-96 h-96 top-10 -right-48" />
      <div className="glow-orb w-64 h-64 bottom-20 -left-32" 
           style={{ background: 'radial-gradient(circle, hsl(var(--blue-accent)) 0%, transparent 70%)' }} />

      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Title */}
        <div className="projects-title text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work in web development, featuring cutting-edge 
            technologies and innovative solutions.
          </p>
        </div>

        {/* Projects Grid - Responsive Layout */}
        <div className="projects-wrapper">
          {/* Desktop: Horizontal Scroll */}
          <div className="hidden lg:block">
            <div className="projects-horizontal flex gap-8 pb-8">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>

          {/* Mobile: Vertical Grid */}
          <div className="lg:hidden projects-grid grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -10,
        scale: 1.02,
        duration: 0.4,
        ease: "power2.out"
      });

      gsap.to(card.querySelector('.project-glow'), {
        opacity: 1,
        scale: 1.1,
        duration: 0.4,
        ease: "power2.out"
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      });

      gsap.to(card.querySelector('.project-glow'), {
        opacity: 0.5,
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className="project-card relative min-w-[350px] lg:min-w-[400px] glass-card p-6 group cursor-pointer"
    >
      {/* Project Glow Effect */}
      <div className="project-glow absolute -inset-1 bg-gradient-to-r from-primary/30 to-blue-accent/30 rounded-3xl blur-xl opacity-50 transition-all duration-300" />
      
      <div className="relative z-10">
        {/* Project Image */}
        <div className="relative overflow-hidden rounded-2xl mb-6 aspect-video">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs font-medium bg-primary/90 text-primary-foreground rounded-full backdrop-blur-sm">
              {project.category}
            </span>
          </div>
          
          {/* Action Buttons */}
          <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="p-2 bg-background/90 backdrop-blur-sm rounded-full hover:bg-background transition-colors">
              <Globe weight="bold" className="w-4 h-4" />
            </button>
            <button className="p-2 bg-background/90 backdrop-blur-sm rounded-full hover:bg-background transition-colors">
              <Code weight="bold" className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Project Info */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <ArrowUpRight 
              weight="bold" 
              className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" 
            />
          </div>
          
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech: string) => (
              <span 
                key={tech}
                className="px-2 py-1 text-xs font-medium bg-secondary/50 text-secondary-foreground rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;