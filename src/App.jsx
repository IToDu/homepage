import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ArrowRight, Box, Code2, ShieldCheck, Linkedin } from 'lucide-react';
import imgCTO from './assets/team/CTO.jpg';
import imgLead from './assets/team/Lead_Engineer.jpg';
import imgMarketing from './assets/team/Marketing.jpeg';

gsap.registerPlugin(ScrollTrigger);

// Magnetic Button Wrapper
const MagneticButton = ({ children, className, onClick, href, ...props }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const handleMouseEnter = () => gsap.to(btn, { scale: 1.03, duration: 0.3, ease: 'power2.out' });
    const handleMouseLeave = () => gsap.to(btn, { scale: 1, duration: 0.3, ease: 'power2.out' });

    btn.addEventListener('mouseenter', handleMouseEnter);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mouseenter', handleMouseEnter);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const Component = href ? 'a' : 'button';

  return (
    <Component
      ref={buttonRef}
      href={href}
      onClick={onClick}
      className={`relative overflow-hidden group inline-flex ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
    </Component>
  );
};

// Navbar
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';
  const showDarkText = scrolled || !isHome;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 transition-all duration-300">
      <nav className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-xl border border-dark/10 shadow-sm' : 'bg-transparent'}`}>
        <div className={`font-mono font-bold tracking-tight text-xl ${showDarkText ? 'text-primary' : 'text-background'}`}>
          IToDu<span className="text-accent">.</span>
        </div>
        <div className={`hidden md:flex items-center gap-6 font-sans text-sm ${showDarkText ? 'text-dark/70' : 'text-background/70'}`}>
          <a href="/#features" className="hover:-translate-y-[1px] transition-transform">Services</a>
          <a href="/#philosophy" className="hover:-translate-y-[1px] transition-transform">Philosophy</a>
          <a href="/#protocol" className="hover:-translate-y-[1px] transition-transform">Development</a>
          <a href="/#team" className="hover:-translate-y-[1px] transition-transform">Team</a>
        </div>
        <MagneticButton href="mailto:projects@itodu.dev" className="bg-accent text-primary px-5 py-2 rounded-full text-sm font-sans font-medium hover:bg-accent/90">
          Contact
        </MagneticButton>
      </nav>
    </div>
  );
};

// Hero
const Hero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-text',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[100dvh] w-full flex flex-col justify-end pb-24 px-8 md:px-16 lg:px-24">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.1.0&q=85&fm=jpg&crop=entropy&cs=srgb"
          alt="Black flat screen computer monitor"
          className="w-full h-full object-cover grayscale opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/90 to-black/20"></div>
      </div>

      <div className="relative z-10 max-w-4xl w-full">
        <h1 className="flex flex-col gap-2">
          <span className="hero-text font-heading font-medium text-4xl md:text-5xl text-background uppercase tracking-tight">Vision meets</span>
          <span className="hero-text font-drama italic text-7xl md:text-9xl text-accent leading-[0.9]">Execution.</span>
        </h1>
        <p className="hero-text mt-8 font-mono text-background/70 max-w-xl text-lg md:text-xl">
          Building structural software foundations.
          resilient · secure · true.
        </p>
        <div className="hero-text mt-10">
          <MagneticButton href="mailto:projects@itodu.dev" className="bg-accent text-primary px-8 py-4 text-lg rounded-full font-sans font-medium flex-inline">
            Get in touch <ArrowRight className="w-5 h-5 ml-2" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};

// Card 1: Shuffler
const DiagnosticShuffler = () => {
  const [cards, setCards] = useState(['Requirements', 'Architecture', 'Prototyping']);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards(prev => {
        const newCards = [...prev];
        const last = newCards.pop();
        newCards.unshift(last);
        return newCards;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-background border border-primary/10 rounded-[2rem] p-8 shadow-sm h-full flex flex-col min-h-[350px]">
      <div className="font-heading font-bold text-2xl mb-2 text-primary">Concept & Design</div>
      <p className="font-sans text-dark/70 text-sm mb-6">Rigorous planning and structural integrity before a single line of code is written.</p>

      <div className="relative mt-auto h-32 w-full flex items-center justify-center">
        {cards.map((card, i) => (
          <div
            key={card}
            className="absolute w-full max-w-[220px] bg-white border border-primary/10 rounded-xl p-4 text-center font-mono text-sm font-medium shadow-sm transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] tabular-nums"
            style={{
              transform: `translateY(${i * 15}px) scale(${1 - i * 0.05})`,
              opacity: 1 - i * 0.2,
              zIndex: 10 - i,
            }}
          >
            {card}
          </div>
        ))}
      </div>
    </div>
  );
};

// Card 2: Typewriter
const TelemetryTypewriter = () => {
  const [text, setText] = useState('');
  const fullText = "> init --stack your_project\n> building core microservices...\n> establishing db connections...\n> applying infra...\n> deploying to cloud...\n> system health online.";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
        setTimeout(() => { index = 0; setText(''); }, 2000); // loop
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-primary border border-background/20 rounded-[2rem] p-8 shadow-sm h-full flex flex-col min-h-[350px]">
      <div className="flex justify-between items-start mb-2">
        <div className="font-heading font-bold text-2xl text-background">Implementation</div>

      </div>
      <p className="font-sans text-background/70 text-sm mb-6">Translating precise blueprints into high-performance, resilient applications.</p>

      <div className="mt-auto bg-[#0a0a0e] p-4 rounded-xl font-mono text-xs leading-[1.6] overflow-hidden h-40 border border-background/10 whitespace-pre-wrap text-accent/80">
        {text}
        <span className="inline-block w-2 h-4 bg-accent ml-1 -mb-1 animate-pulse"></span>
      </div>
    </div>
  );
};

// Card 3: Scheduler
const CursorProtocolScheduler = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });
      tl.set('.cursor-svg', { x: -20, y: -20, opacity: 0 })
        .to('.cursor-svg', { opacity: 1, duration: 0.2 })
        .to('.cursor-svg', { x: 90, y: 70, duration: 0.8, ease: 'power2.inOut' })
        .to('.cursor-svg', { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 }) // click
        .to('.cell-highlight', { backgroundColor: '#C9A84C', color: '#0D0D12', duration: 0.2 }, "-=0.1")
        .to('.cursor-svg', { x: 190, y: 130, duration: 0.6, ease: 'power2.inOut', delay: 0.3 })
        .to('.cursor-svg', { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 }) // click save
        .to('.btn-save', { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 }, "-=0.1")
        .to('.cursor-svg', { opacity: 0, duration: 0.2, delay: 0.2 })
        .to('.cell-highlight', { backgroundColor: 'transparent', color: '#0D0D12', duration: 0.2 });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-background border border-primary/10 rounded-[2rem] p-8 shadow-sm h-full flex flex-col min-h-[350px] relative overflow-hidden">
      <div className="font-heading font-bold text-2xl mb-2 text-primary">Testing</div>
      <p className="font-sans text-dark/70 text-sm mb-6">Automated and manual validation ensuring zero-defect deliverables.</p>

      <div className="mt-auto relative w-full pt-4 max-w-xs mx-auto">
        <div className="grid grid-cols-7 gap-1 mb-2 text-center font-mono text-[10px] text-dark/50">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <div key={i}>{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 14 }).map((_, i) => (
            <div key={i} className={`aspect-square rounded-md border border-primary/10 flex items-center justify-center font-mono text-[10px] ${i === 10 ? 'cell-highlight' : ''}`}>
              {i + 1}
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <div className="btn-save bg-primary text-accent text-[10px] font-mono px-3 py-1.5 rounded-md uppercase tracking-wider">Submit</div>
        </div>

        {/* Cursor SVG */}
        <div className="cursor-svg absolute top-0 left-0 w-6 h-6 z-10 pointer-events-none" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4L11.0858 21.7143C11.3789 22.4471 12.4471 22.4471 12.7401 21.7143L15.3408 15.2127C15.4262 14.9993 15.5993 14.8262 15.8127 14.7408L22.3143 12.1396C23.0471 11.8465 23.0471 10.7783 22.3143 10.4853L4.6 3.4C3.89932 3.11973 3.11973 3.89932 3.4 4.6Z" fill="#C9A84C" stroke="#0D0D12" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// Card 4: DevSecOps
const DevSecOpsPipeline = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });

      tl.set('.line-1, .line-2, .line-3', { scaleX: 0, transformOrigin: 'left' })
        .to('.node-1', { backgroundColor: '#C9A84C', color: '#0D0D12', duration: 1.0 })
        .to('.line-1', { scaleX: 1, duration: 1.2, ease: 'power1.inOut' })
        .to('.node-1', { backgroundColor: '#0D0D12', color: '#FAF8F5', duration: 0.6 }, '-=0.6')
        .to('.node-2', { backgroundColor: '#C9A84C', color: '#0D0D12', duration: 1.0 }, '-=0.6')
        .to('.line-2', { scaleX: 1, duration: 1.2, ease: 'power1.inOut' })
        .to('.node-2', { backgroundColor: '#0D0D12', color: '#FAF8F5', duration: 0.6 }, '-=0.6')
        .to('.node-3', { backgroundColor: '#C9A84C', color: '#0D0D12', duration: 1.0 }, '-=0.6')
        .to('.line-3', { scaleX: 1, duration: 1.2, ease: 'power1.inOut' })
        .to('.node-3', { backgroundColor: '#0D0D12', color: '#FAF8F5', duration: 0.6 }, '-=0.6')
        .to('.node-4', { backgroundColor: '#C9A84C', color: '#0D0D12', duration: 1.0 }, '-=0.6')
        .to('.node-4', { backgroundColor: '#0D0D12', color: '#FAF8F5', duration: 0.6 })
        .set('.line-1, .line-2, .line-3', { scaleX: 0 }); // reset
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-primary border border-background/20 rounded-[2rem] p-8 shadow-sm h-full flex flex-col min-h-[350px]">
      <div className="font-heading font-bold text-2xl mb-2 text-background">DevSecOps</div>
      <p className="font-sans text-background/70 text-sm mb-6">From Public Clouds to OnPremise, deliverying velocity with shift-left security built-in.</p>

      <div className="mt-auto relative w-full pt-8 pb-4 flex items-center justify-between">
        {/* Base connecting line */}
        <div className="absolute left-[12%] right-[12%] top-1/2 -translate-y-1/2 h-[1px] bg-background/20 z-0"></div>

        {/* Animated connecting lines */}
        <div className="line-1 absolute left-[12%] right-[66%] top-1/2 -translate-y-1/2 h-[1px] bg-accent z-0"></div>
        <div className="line-2 absolute left-[40%] right-[38%] top-1/2 -translate-y-1/2 h-[1px] bg-accent z-0"></div>
        <div className="line-3 absolute left-[68%] right-[12%] top-1/2 -translate-y-1/2 h-[1px] bg-accent z-0"></div>

        {['CODE', 'BUILD', 'SCAN', 'PROD'].map((label, i) => (
          <div key={label} className={`node-${i + 1} relative z-10 w-[22%] aspect-[2/1] rounded border border-background/20 bg-primary flex items-center justify-center font-mono text-[8px] sm:text-[10px] md:text-[8px] lg:text-[10px] text-background transition-colors`}>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
};

// Philosophy
const Philosophy = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.phil-line', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="philosophy" className="relative py-32 px-8 md:px-16 lg:px-24 bg-dark overflow-hidden min-h-[70vh] flex items-center">
      <div className="absolute inset-0 opacity-20">
        <img
          src="https://images.unsplash.com/photo-1594913219757-9dbfecc87bdf?q=80&w=2000&auto=format&fit=crop"
          alt="Dark Marble Texture"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark/60"></div>
      </div>
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <p className="phil-line font-mono text-background/60 text-lg md:text-xl mb-6 tracking-widest uppercase">
          Most engineering focuses on: minimum viable products.
        </p>
        <h2 className="phil-line font-drama italic text-5xl md:text-7xl lg:text-7xl text-background leading-tight">
          We focus on: <span className="text-accent inline-block">Robust and secure systems.</span>
        </h2>
      </div>
    </section>
  );
};

// Protocol
const Protocol = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (i === 0) return; // Skip first card

        gsap.to(cardsRef.current[i - 1], {
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
          scale: 0.9,
          opacity: 0.5,
          filter: 'blur(10px)',
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const steps = [
    { num: '01', title: 'Architectural Blueprint', desc: 'From understanding client needs and the environment to designing the perfect system architecture.', icon: Box },
    { num: '02', title: 'Implemenation', desc: 'Building modular, scalable systems. Code as an instrument, reliable and highly performant.', icon: Code2 },
    { num: '03', title: 'System Validation', desc: 'Rigorous stress-testing across all vectors. DevSecOps principles applied. Automated coverage, vulnerability scanning and manual review ensuring production readiness.', icon: ShieldCheck }
  ];

  return (
    <section ref={containerRef} id="protocol" className="bg-primary pt-32 pb-48 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="font-mono text-accent text-sm mb-4 tracking-widest uppercase">Development Flow</div>
        <h2 className="font-heading font-medium text-5xl md:text-7xl mb-16 text-background tracking-tight">Step by step to perfection.</h2>

        <div className="relative">
          {steps.map((step, i) => {
            const IconComponent = step.icon;
            return (
              <div
                key={step.num}
                ref={el => cardsRef.current[i] = el}
                className="sticky top-24 w-full min-h-[50vh] bg-dark border border-background/10 rounded-[3rem] p-8 md:p-12 flex flex-col justify-between mb-8 shadow-2xl overflow-hidden origin-top"
              >
                <div className="font-mono text-6xl md:text-8xl text-background/10 font-bold mb-8">{step.num}</div>

                <div className="absolute -right-16 -top-16 md:-right-8 md:-top-8 opacity-5 pointer-events-none">
                  {IconComponent && <IconComponent className="w-96 h-96 text-background" strokeWidth={1} />}
                </div>

                <div className="relative z-10 mt-auto">
                  <h3 className="font-heading font-bold text-3xl md:text-5xl text-accent mb-4">{step.title}</h3>
                  <p className="font-sans text-lg md:text-xl text-background/70 max-w-2xl leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// Team
const Team = () => {
  const teamMembers = [
    { name: 'Tobias Dußmann', role: 'CTO', img: imgCTO },
    { name: 'Tobias Dußmann', role: 'Lead Engineer', img: imgLead },
    { name: 'Tobias Dußmann', role: 'Marketing', img: imgMarketing },
  ];

  return (
    <section id="team" className="py-32 px-4 md:px-8 bg-background relative z-10 border-t border-primary/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="font-mono text-accent text-sm mb-4 tracking-widest uppercase">Meet the Experts</div>
          <h2 className="font-heading font-medium text-4xl md:text-5xl text-dark tracking-tight">Team</h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-32">
          {teamMembers.map((member, i) => (
            <div key={i} className="flex flex-col items-center group cursor-default">
              <div className="relative mb-6 group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
                {/* Blurry border effect */}
                <div className="absolute inset-[-4px] rounded-[50%] bg-primary/20 blur-md group-hover:bg-accent/40 transition-colors duration-500"></div>

                <div className="relative w-48 h-64 md:w-56 md:h-72 rounded-[50%] overflow-hidden bg-transparent shadow-lg group-hover:shadow-[0_0_30px_rgba(201,168,76,0.3)] transition-all duration-500">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover blur-sm group-hover:blur-0 transition-all duration-500"
                  />
                </div>
              </div>
              <h3 className="font-heading font-bold text-xl text-dark mb-1 group-hover:text-accent transition-colors duration-300">{member.name}</h3>
              <p className="font-mono text-xs text-dark/50 tracking-widest uppercase">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-dark rounded-t-[4rem] text-background pt-24 pb-12 px-8 md:px-16 lg:px-24 mt-[-4rem] relative z-20 shadow-[0_-20px_40px_rgba(0,0,0,0.5)]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <div className="font-heading font-bold text-4xl tracking-tight mb-4">
            IToDu<span className="text-accent">.</span>
          </div>
          <p className="font-mono text-background/60 max-w-sm text-sm leading-relaxed">
            IoT to Cloud Solutions
            <br />
            resilient · secure · true
          </p>
          <div className="mt-8 flex items-center gap-4">
            <MagneticButton href="mailto:projects@itodu.dev" className="bg-accent text-primary px-6 py-3 rounded-full font-sans font-medium hover:bg-white hover:text-primary transition-colors">
              Get in touch
            </MagneticButton>
            <MagneticButton href="https://www.linkedin.com/in/tobias-dussmann-ba3a20398/" className="bg-background/10 text-background p-3 rounded-full hover:bg-accent hover:text-primary transition-colors border border-background/20" target="_blank" rel="noopener noreferrer">
              <Linkedin size={20} />
            </MagneticButton>
          </div>
        </div>

        <div>
          <div className="font-mono text-xs text-background/40 mb-6 uppercase tracking-wider">Navigation</div>
          <ul className="space-y-3 font-sans text-background/80">
            <li><a href="/#" className="hover:text-accent transition-colors block">Home</a></li>
            <li><a href="/#features" className="hover:text-accent transition-colors block">Capabilities</a></li>
            <li><a href="/#philosophy" className="hover:text-accent transition-colors block">Philosophy</a></li>
            <li><a href="/#protocol" className="hover:text-accent transition-colors block">Architecture</a></li>
          </ul>
        </div>

        <div>
          <div className="font-mono text-xs text-background/40 mb-6 uppercase tracking-wider">Legal</div>
          <ul className="space-y-3 font-sans text-background/80">
            <li><a href="/privacy-policy" className="hover:text-accent transition-colors block">Privacy Policy</a></li>
            <li><a href="/imprint" className="hover:text-accent transition-colors block">Imprint</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3 bg-background/5 rounded-full px-4 py-2 border border-background/10">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
          <span className="font-mono text-xs text-background/70 tracking-widest">FOR HIRE</span>
        </div>
        <div className="font-mono text-xs text-background/40 tracking-widest uppercase">
          © {new Date().getFullYear()} IToDu. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

// Home Page Component
const Home = () => {
  return (
    <div className="bg-background min-h-screen font-sans selection:bg-accent selection:text-primary relative overflow-x-hidden">
      <Navbar />
      <Hero />

      <section id="features" className="py-24 px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        <DiagnosticShuffler />
        <TelemetryTypewriter />
        <CursorProtocolScheduler />
        <DevSecOpsPipeline />
      </section>

      <Philosophy />
      <Protocol />
      <Team />
      <Footer />
    </div>
  );
};

// Imprint Page Component
const Imprint = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-background min-h-screen font-sans selection:bg-accent selection:text-primary relative overflow-x-hidden flex flex-col">
      <Navbar />
      <div className="flex-grow pt-40 pb-24 px-8 md:px-16 lg:px-24 max-w-4xl mx-auto w-full relative z-10">
        <h1 className="font-heading font-medium text-4xl md:text-5xl text-dark mb-12 tracking-tight">Imprint</h1>
        <div className="font-sans text-lg text-dark/80 space-y-8 leading-relaxed max-w-2xl">
          <div>
            <p className="font-bold text-dark mb-2">Tobias Dußmann</p>
            <p>c/o autorenglück.de</p>
            <p>Franz-Mehring-Str. 15</p>
            <p>01237 Dresden</p>
            <p>Germany</p>
          </div>
          <div className="pt-4 border-t border-dark/10">
            <p className="mb-2">Telefon: <a href="tel:+4915679796152" className="text-accent hover:underline">+49 15679796152</a></p>
            <p>E-Mail: <a href="mailto:webmaster@itodu.dev" className="text-accent hover:underline">webmaster@itodu.dev</a></p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Privacy Policy Component
const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-background min-h-screen font-sans selection:bg-accent selection:text-primary relative overflow-x-hidden flex flex-col">
      <Navbar />
      <div className="flex-grow pt-40 pb-24 px-8 md:px-16 lg:px-24 max-w-4xl mx-auto w-full relative z-10">
        <h1 className="font-heading font-medium text-4xl md:text-5xl text-dark mb-12 tracking-tight">Privacy Policy</h1>
        <div className="font-sans text-sm md:text-base text-dark/80 space-y-6 leading-relaxed">
          <p className="italic text-dark/50 mb-8">For legal reasons the Data Privacy Policy is held in German.</p>

          <h2 className="font-heading font-bold text-2xl text-dark mt-12 mb-4">1. Datenschutz auf einen Blick</h2>
          <h3 className="font-bold text-dark mt-6 mb-2">Allgemeine Hinweise</h3>
          <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.</p>

          <h3 className="font-bold text-dark mt-6 mb-2">Datenerfassung auf dieser Website</h3>
          <p><strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle“ in dieser Datenschutzerklärung entnehmen.</p>

          <p><strong>Wie erfassen wir Ihre Daten?</strong><br />
            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.</p>

          <p><strong>Wofür nutzen wir Ihre Daten?</strong><br />
            Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.</p>

          <p><strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong><br />
            Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.</p>

          <h3 className="font-bold text-dark mt-6 mb-2">Analyse-Tools und Tools von Drittanbietern</h3>
          <p>Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit sogenannten Analyseprogrammen. Detaillierte Informationen zu diesen Analyseprogrammen finden Sie in der folgenden Datenschutzerklärung.</p>

          <h2 className="font-heading font-bold text-2xl text-dark mt-12 mb-4">2. Hosting</h2>
          <p>Wir hosten die Inhalte unserer Website bei folgendem Anbieter:</p>

          <h3 className="font-bold text-dark mt-6 mb-2">GitHub</h3>
          <p>Anbieter ist die GitHub B.V. Prins Bernhardplein 200, Amsterdam 1097JB, Niederlande (nachfolgend "GitHub") Wenn Sie unsere Website besuchen, erfasst GitHub verschiedene Logfiles inklusive Ihrer IP-Adressen.</p>
          <p>Details entnehmen Sie der Datenschutzerklärung von GitHub: <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" className="text-accent underline hover:text-dark transition-colors" target="_blank" rel="noopener noreferrer">https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement</a>.</p>
          <p>Die Verwendung von GitHub erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer möglichst zuverlässigen Darstellung unserer Website. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. für Device-Fingerprinting) im Sinne des TDDDG umfasst. Die Einwilligung ist jederzeit widerrufbar.</p>

          <h3 className="font-bold text-dark mt-6 mb-2">Auftragsverarbeitung</h3>
          <p>Wir haben einen Vertrag über Auftragsverarbeitung (AVV) zur Nutzung des oben genannten Dienstes geschlossen. Hierbei handelt es sich um einen datenschutzrechtlich vorgeschriebenen Vertrag, der gewährleistet, dass dieser die personenbezogenen Daten unserer Websitebesucher nur nach unseren Weisungen und unter Einhaltung der DSGVO verarbeitet.</p>

          <h2 className="font-heading font-bold text-2xl text-dark mt-12 mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>
          <h3 className="font-bold text-dark mt-6 mb-2">Datenschutz</h3>
          <p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
          <p>Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.</p>
          <p>Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.</p>

          <h3 className="font-bold text-dark mt-6 mb-2">Hinweis zur verantwortlichen Stelle</h3>
          <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
          <p>Tobias Dußmann<br />c/o autorenglück.de<br />Franz-Mehring-Str. 15<br />01237 Dresden<br />Germany</p>
          <p>Telefon: +49 15679796152<br />E-Mail: webmaster@itodu.dev</p>
          <p>Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.</p>

          <h3 className="font-bold text-dark mt-6 mb-2">Speicherdauer</h3>
          <p>Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben (z. B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.</p>

          <h3 className="font-bold text-dark mt-6 mb-2">Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf dieser Website</h3>
          <p>Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien nach Art. 9 Abs. 1 DSGVO verarbeitet werden. Im Falle einer ausdrücklichen Einwilligung in die Übertragung personenbezogener Daten in Drittstaaten erfolgt die Datenverarbeitung außerdem auf Grundlage von Art. 49 Abs. 1 lit. a DSGVO. Sofern Sie in die Speicherung von Cookies oder in den Zugriff auf Informationen in Ihr Endgerät (z. B. via Device-Fingerprinting) eingewilligt haben, erfolgt die Datenverarbeitung zusätzlich auf Grundlage von § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar. Sind Ihre Daten zur Vertragserfüllung oder zur Durchführung vorvertraglicher Maßnahmen erforderlich, verarbeiten wir Ihre Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO. Des Weiteren verarbeiten wir Ihre Daten, sofern diese zur Erfüllung einer rechtlichen Verpflichtung erforderlich sind auf Grundlage von Art. 6 Abs. 1 lit. c DSGVO. Die Datenverarbeitung kann ferner auf Grundlage unseres berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO erfolgen. Über die jeweils im Einzelfall einschlägigen Rechtsgrundlagen wird in den folgenden Absätzen dieser Datenschutzerklärung informiert.</p>

          <h3 className="font-bold text-dark mt-6 mb-2">Empfänger von personenbezogenen Daten</h3>
          <p>Im Rahmen unserer Geschäftstätigkeit arbeiten wir mit verschiedenen externen Stellen zusammen. Dabei ist teilweise auch eine Übermittlung von personenbezogenen Daten an diese externen Stellen erforderlich. Wir geben personenbezogene Daten nur dann an externe Stellen weiter, wenn dies im Rahmen einer Vertragserfüllung erforderlich ist, wenn wir gesetzlich hierzu verpflichtet sind (z. B. Weitergabe von Daten an Steuerbehörden), wenn wir ein berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO an der Weitergabe haben oder wenn eine sonstige Rechtsgrundlage die Datenweitergabe erlaubt. Beim Einsatz von Auftragsverarbeitern geben wir personenbezogene Daten unserer Kunden nur auf Grundlage eines gültigen Vertrags über Auftragsverarbeitung weiter. Im Falle einer gemeinsamen Verarbeitung wird ein Vertrag über gemeinsame Verarbeitung geschlossen.</p>

          <h3 className="font-bold text-dark mt-6 mb-2">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
          <p>Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.</p>

          <h3 className="font-bold text-dark mt-6 mb-2 text-sm md:text-base leading-snug">Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)</h3>
          <p className="uppercase text-xs md:text-sm">Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder f DSGVO erfolgt, haben Sie jederzeit das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, gegen die Verarbeitung Ihrer personenbezogenen Daten Widerspruch einzulegen; dies gilt auch für ein auf diese Bestimmungen gestütztes Profiling. Die jeweilige Rechtsgrundlage, auf denen eine Verarbeitung beruht, entnehmen Sie dieser Datenschutzerklärung. Wenn Sie Widerspruch einlegen, werden wir Ihre betroffenen personenbezogenen Daten nicht mehr verarbeiten, es sei denn, wir können zwingende schutzwürdige Gründe für die Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten überwiegen oder die Verarbeitung dient der Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen (Widerspruch nach Art. 21 Abs. 1 DSGVO).</p>
          <p className="uppercase text-xs md:text-sm">Werden Ihre personenbezogenen Daten verarbeitet, um Direktwerbung zu betreiben, so haben Sie das Recht, jederzeit Widerspruch gegen die Verarbeitung Sie betreffender personenbezogener Daten zum Zwecke derartiger Werbung einzulegen; dies gilt auch für das Profiling, soweit es mit solcher Direktwerbung in Verbindung steht. Wenn Sie widersprechen, werden Ihre personenbezogenen Daten anschließend nicht mehr zum Zwecke der Direktwerbung verwendet (Widerspruch nach Art. 21 Abs. 2 DSGVO).</p>

          <h3 className="font-bold text-dark mt-6 mb-2">Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
          <p>Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.</p>

          <h3 className="font-bold text-dark mt-6 mb-2">Recht auf Datenübertragbarkeit</h3>
          <p>Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.</p>

          <h3 className="font-bold text-dark mt-6 mb-2">Auskunft, Berichtigung und Löschung</h3>
          <p>Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.</p>

          <h3 className="font-bold text-dark mt-6 mb-2">Recht auf Einschränkung der Verarbeitung</h3>
          <p>Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
            <li>Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.</li>
            <li>Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
            <li>Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</li>
            <li>Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen diese Daten – von ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses der Europäischen Union oder eines Mitgliedstaats verarbeitet werden.</li>
          </ul>

          <h2 className="font-heading font-bold text-2xl text-dark mt-12 mb-4">4. Datenerfassung auf dieser Website</h2>
          <h3 className="font-bold text-dark mt-6 mb-2">Anfrage per E-Mail, Telefon oder Telefax</h3>
          <p>Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
          <p>Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die Einwilligung ist jederzeit widerrufbar.</p>
          <p>Die von Ihnen an uns per Kontaktanfragen übersandten Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihres Anliegens). Zwingende gesetzliche Bestimmungen – insbesondere gesetzliche Aufbewahrungsfristen – bleiben unberührt.</p>

          <p className="mt-8 text-sm text-dark/50">Quelle: <a href="https://www.e-recht24.de" className="hover:text-accent transition-colors underline" target="_blank" rel="noopener noreferrer">https://www.e-recht24.de</a></p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Main App Router
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/imprint" element={<Imprint />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    </Routes>
  );
}
