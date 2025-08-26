import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, Calendar, MapPin, Code, Users, Rocket } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const experiences = [
    {
      id: 1,
      company: 'TRACKILA SMART INNOVATIONS PVT. LTD.',
      position: 'Python Developer',
      type: 'Internship',
      duration: 'Jul 2025 - Present · 2 mos',
      location: 'Remote',
      description: 'Collaborating with the development team in live industrial based projects',
      skills: ['Python', 'Natural Language Processing (NLP)', 'Artificial Intelligence (AI)', 'Data Analysis', 'Engineering'],
      icon: Code,
      color: 'text-blue-400'
    },
    {
      id: 2,
      company: 'Events INFO',
      position: 'Web Developer',
      type: 'Full-time',
      duration: 'Sep 2024 - Present · 1 yr',
      location: 'Remote',
      description: 'Leading front-end development projects and managing web development initiatives',
      skills: ['Front-End Development', 'Web Development', 'Communication', 'Leadership', 'Team Management'],
      icon: Code,
      color: 'text-green-400'
    },
    {
      id: 3,
      company: 'Developers',
      position: 'Developer',
      type: 'Part-time',
      duration: '1 yr 1 mo',
      location: 'Remote',
      description: 'Contributing to various development projects and collaborative coding initiatives',
      skills: ['JavaScript', 'React', 'Team Collaboration', 'Problem Solving'],
      icon: Code,
      color: 'text-purple-400'
    },
    {
      id: 4,
      company: 'Organization',
      position: 'Collaboration Coordinator',
      type: 'Full-time',
      duration: 'Jul 2025 - Present · 2 mos',
      location: 'Hybrid',
      description: 'Managing strategic partnerships and coordinating cross-functional teams for project success',
      skills: ['Decision-Making', 'Strategy', 'Public Affairs', 'Leadership', 'Public Relations', 'Recruiting'],
      icon: Users,
      color: 'text-orange-400'
    },
    {
      id: 5,
      company: 'Organization',
      position: 'Coordinator',
      type: 'Full-time',
      duration: 'Aug 2024 - Jul 2025 · 1 yr',
      location: 'On-site',
      description: 'Coordinated team activities and managed project timelines effectively',
      skills: ['Management', 'Time Management', 'Team Management', 'Project Coordination'],
      icon: Briefcase,
      color: 'text-pink-400'
    },
    {
      id: 6,
      company: 'GirlScript Summer of Code',
      position: 'Participant',
      type: 'Program',
      duration: '1 yr 3 mos',
      location: 'Remote',
      description: 'Participated in open source contributions and collaborative coding projects',
      skills: ['Open Source', 'Git', 'Collaboration', 'Programming'],
      icon: Rocket,
      color: 'text-red-400'
    },
    {
      id: 7,
      company: 'Educational Institution',
      position: 'Campus Ambassador',
      type: 'Part-time',
      duration: 'Sep 2024 - Jul 2025 · 11 mos',
      location: 'Remote',
      description: 'Promoted technical events and managed social media presence for technology initiatives',
      skills: ['Communication', 'Engineering', 'Leadership', 'Social Media', 'Team Management'],
      icon: Users,
      color: 'text-cyan-400'
    },
    {
      id: 8,
      company: 'Open Source Community',
      position: 'Contributor',
      type: 'Volunteer',
      duration: 'May 2024 - Aug 2024 · 4 mos',
      location: 'India',
      description: 'Contributed to various open source projects and community initiatives',
      skills: ['Open Source', 'Community Building', 'Code Review', 'Documentation'],
      icon: Code,
      color: 'text-indigo-400'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section title animation
      gsap.fromTo(".experience-title",
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
            trigger: ".experience-title",
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Experience cards staggered animation
      gsap.fromTo(".experience-card",
        { 
          opacity: 0, 
          x: -50,
          filter: "blur(5px)"
        },
        {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".experience-timeline",
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Timeline line animation
      gsap.fromTo(".timeline-line",
        { 
          scaleY: 0,
          transformOrigin: "top"
        },
        {
          scaleY: 1,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".experience-timeline",
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="py-32 relative">
      {/* Background Elements */}
      <div className="glow-orb w-80 h-80 top-20 -right-40" 
           style={{ background: 'radial-gradient(circle, hsl(var(--blue-accent)) 0%, transparent 70%)' }} />
      <div className="glow-orb w-64 h-64 bottom-32 -left-32" />

      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Title */}
        <div className="experience-title text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-6">
            Professional Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My journey in technology, from internships to leadership roles, 
            showcasing growth in development and project coordination.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="experience-timeline relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="timeline-line absolute left-8 top-0 w-0.5 h-full bg-gradient-to-b from-primary via-blue-accent to-orange-accent" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="experience-card relative pl-20">
                {/* Timeline Dot */}
                <div className="absolute left-6 top-6 w-4 h-4 bg-background border-2 border-primary rounded-full z-10">
                  <div className="absolute inset-1 bg-primary rounded-full animate-pulse" />
                </div>

                {/* Experience Card */}
                <div className="glass-card p-8 group hover:scale-[1.02] transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    {/* Left Content */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`p-3 bg-secondary/50 rounded-xl ${exp.color}`}>
                          <exp.icon weight="bold" className="w-6 h-6" />
                        </div>
                        
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                            {exp.position}
                          </h3>
                          <p className="text-primary font-medium mb-2">
                            {exp.company}
                          </p>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                            <span className="flex items-center gap-1">
                              <Calendar weight="bold" className="w-4 h-4" />
                              {exp.duration}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin weight="bold" className="w-4 h-4" />
                              {exp.location}
                            </span>
                            <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium">
                              {exp.type}
                            </span>
                          </div>
                          
                          <p className="text-muted-foreground leading-relaxed mb-4">
                            {exp.description}
                          </p>
                        </div>
                      </div>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.slice(0, 5).map((skill) => (
                          <span 
                            key={skill}
                            className="px-3 py-1 text-xs font-medium bg-secondary/30 text-secondary-foreground rounded-full border border-border/50 hover:bg-secondary/50 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                        {exp.skills.length > 5 && (
                          <span className="px-3 py-1 text-xs font-medium text-muted-foreground">
                            +{exp.skills.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;