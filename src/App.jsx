import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Box, Code2, ShieldCheck } from 'lucide-react';
import imgCTO from './assets/team/CTO.jpg';
import imgLead from './assets/team/Lead_Engineer.jpg';
import imgMarketing from './assets/team/Marketing.jpeg';

gsap.registerPlugin(ScrollTrigger);

// Magnetic Button Wrapper
const MagneticButton = ({ children, className, onClick, href }) => {
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
    >
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
    </Component>
  );
};

// Navbar
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 transition-all duration-300">
      <nav className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-xl border border-dark/10 shadow-sm' : 'bg-transparent'}`}>
        <div className={`font-mono font-bold tracking-tight text-xl ${scrolled ? 'text-primary' : 'text-background'}`}>
          IToDu<span className="text-accent">.</span>
        </div>
        <div className={`hidden md:flex items-center gap-6 font-sans text-sm ${scrolled ? 'text-dark/70' : 'text-background/70'}`}>
          <a href="#features" className="hover:-translate-y-[1px] transition-transform">Services</a>
          <a href="#philosophy" className="hover:-translate-y-[1px] transition-transform">Philosophy</a>
          <a href="#protocol" className="hover:-translate-y-[1px] transition-transform">Development</a>
          <a href="#team" className="hover:-translate-y-[1px] transition-transform">Team</a>
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
          <div className="mt-8">
            <MagneticButton href="mailto:projects@itodu.dev" className="bg-accent text-primary px-6 py-3 rounded-full font-sans font-medium hover:bg-white hover:text-primary transition-colors">
              Get in touch
            </MagneticButton>
          </div>
        </div>

        <div>
          <div className="font-mono text-xs text-background/40 mb-6 uppercase tracking-wider">Navigation</div>
          <ul className="space-y-3 font-sans text-background/80">
            <li><a href="#" className="hover:text-accent transition-colors block">Home</a></li>
            <li><a href="#features" className="hover:text-accent transition-colors block">Capabilities</a></li>
            <li><a href="#philosophy" className="hover:text-accent transition-colors block">Philosophy</a></li>
            <li><a href="#protocol" className="hover:text-accent transition-colors block">Architecture</a></li>
          </ul>
        </div>

        <div>
          <div className="font-mono text-xs text-background/40 mb-6 uppercase tracking-wider">Legal</div>
          <ul className="space-y-3 font-sans text-background/80">
            {/* <li><a href="#" className="hover:text-accent transition-colors block">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-accent transition-colors block">Terms of Service</a></li> */}
            <li><a href="#" className="hover:text-accent transition-colors block">Imprint</a></li>
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

// Main App
export default function App() {
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
}
