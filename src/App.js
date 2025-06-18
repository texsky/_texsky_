import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Code, Smartphone, Globe, TrendingUp, Users, Award, ArrowRight, Play, Star, CheckCircle, Menu, X, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Github } from 'lucide-react';

// Helper hook for fade-in on scroll
function useFadeInOnScroll() {
  const ref = useRef();
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('fade-in-up', 'fade-in-up-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// Helper for fade-in on scroll for multiple items
function useFadeInRefs(length) {
  const refs = useRef([]);
  if (refs.current.length !== length) {
    refs.current = Array(length).fill().map((_, i) => refs.current[i] || React.createRef());
  }
  useEffect(() => {
    refs.current.forEach(ref => {
      const node = ref.current;
      if (!node) return;
      const observer = new window.IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            node.classList.add('fade-in-up', 'fade-in-up-visible');
            observer.disconnect();
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(node);
      return () => observer.disconnect();
    });
  }, [length]);
  return refs.current;
}

const AgencyWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('development');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const services = {
    development: [
      {
        icon: <Code className="w-8 h-8" />,
        title: "Custom Software Development",
        description: "Tailored software solutions built with cutting-edge technologies to meet your unique business requirements.",
        features: ["Full-stack Development", "API Integration", "Database Design", "Code Optimization"]
      },
      {
        icon: <Smartphone className="w-8 h-8" />,
        title: "Mobile App Development",
        description: "Native and cross-platform mobile applications that deliver exceptional user experiences across all devices.",
        features: ["iOS Development", "Android Development", "React Native", "Flutter"]
      },
      {
        icon: <Globe className="w-8 h-8" />,
        title: "Web Development",
        description: "Modern, responsive websites and web applications that drive engagement and convert visitors into customers.",
        features: ["Responsive Design", "E-commerce Solutions", "CMS Development", "Progressive Web Apps"]
      }
    ],
    marketing: [
      {
        icon: <TrendingUp className="w-8 h-8" />,
        title: "Digital Marketing Strategy",
        description: "Comprehensive digital marketing strategies that amplify your brand presence and drive measurable results.",
        features: ["SEO Optimization", "Content Marketing", "Social Media Strategy", "Analytics & Reporting"]
      },
      {
        icon: <Users className="w-8 h-8" />,
        title: "Brand Development",
        description: "Complete brand identity creation and management to establish a strong, memorable presence in your market.",
        features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Positioning"]
      },
      {
        icon: <Award className="w-8 h-8" />,
        title: "Performance Marketing",
        description: "Data-driven marketing campaigns optimized for maximum ROI and sustainable business growth.",
        features: ["PPC Advertising", "Conversion Optimization", "Email Marketing", "Marketing Automation"]
      }
    ]
  };

  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "CEO, TechStart Inc.",
      content: "The team delivered exceptional software that transformed our business operations. Their attention to detail and technical expertise exceeded our expectations.",
      rating: 5
    },
    {
      name: "Michael Chen",
      position: "Marketing Director, GrowthCo",
      content: "Our digital marketing results improved by 300% within six months. Their strategic approach and execution are simply outstanding.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      position: "Founder, InnovateLab",
      content: "From concept to deployment, they handled everything professionally. The mobile app they built has received amazing user feedback.",
      rating: 5
    }
  ];

  const team = [
    {
      name: "Vishwas Thangella",
      position: "Lead Developer",
      image: "https://media.licdn.com/dms/image/v2/D5603AQErX2MV6Kiheg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1726263921571?e=1755734400&v=beta&t=hpFNI9qVWS9xGQffMrpxjYNiGq8l04G96ABVWk-dG-8",
      expertise: "Full-stack development, Cloud architecture"
    },
    {
      name: "Syed Wajid Pasha",
      position: "Full Stack Developer",
      image: "https://media.licdn.com/dms/image/v2/D5635AQHlTN5TsOwgYQ/profile-framedphoto-shrink_400_400/B56ZbO1qIHGkAg-/0/1747226895148?e=1750842000&v=beta&t=lw6teqzYjngRI7HAqtwMNHiVLRGqTVjYwmq2kms5dGA",
      expertise: "Full Stack Development, App Development"
    },
    {
      name: "Manish Reddy Lyagala",
      position: "UI/UX Designer & React Native Developer",
      image: "https://media.licdn.com/dms/image/v2/D5635AQEjH_pQyj6jMA/profile-framedphoto-shrink_800_800/B56ZdgfEU_G0Ak-/0/1749670447184?e=1750842000&v=beta&t=rntWDrZ7zpzmN3Ru9p9W9M7VD3D5l8jqmZ02Hh7uZAc",
      expertise: "User experience, Interface design"
    },
    {
      name: "Srija Mandava",
      position: "Marketing Strategist",
      image: "https://media.licdn.com/dms/image/v2/D5603AQExdQP9OvY2zA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1676271371633?e=1755734400&v=beta&t=VZgks3frTft7kbEjKNIulEyZuhdS93D34DSUtMKFW14",
      expertise: "Digital marketing, Brand development"
    },
  ];

  const stats = [
    { number: "100+", label: "Projects Completed" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "50+", label: "Happy Clients" },
    { number: "1+", label: "Years Experience" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  // Section refs for fade-in
  const homeRef = useFadeInOnScroll();
  const servicesRef = useFadeInOnScroll();
  const aboutRef = useFadeInOnScroll();
  const testimonialsRef = useFadeInOnScroll();
  const portfolioRef = useFadeInOnScroll();
  const contactRef = useFadeInOnScroll();

  // Card refs for mapped items
  const serviceCardRefs = useFadeInRefs(services[activeTab].length);
  const teamCardRefs = useFadeInRefs(team.length);
  const portfolioCardRefs = useFadeInRefs(3); // 3 hardcoded projects

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text text-transparent">
                  TEXSKY
                </h1>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button onClick={() => scrollToSection('home')} className="text-gray-200 hover:text-blue-400 transition-colors animated-underline">
                  Home
                </button>
                <button onClick={() => scrollToSection('services')} className="text-gray-200 hover:text-blue-400 transition-colors animated-underline">
                  Services
                </button>
                <button onClick={() => scrollToSection('about')} className="text-gray-200 hover:text-blue-400 transition-colors animated-underline">
                  About
                </button>
                <button onClick={() => scrollToSection('portfolio')} className="text-gray-200 hover:text-blue-400 transition-colors animated-underline">
                  Portfolio
                </button>
                <button onClick={() => scrollToSection('contact')} className="bg-gradient-to-r from-blue-600 to-black text-white px-6 py-2 rounded-full hover:shadow-lg transition-all animated-underline">
                  Contact
                </button>
              </div>
            </div>
            
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-200 hover:text-blue-400"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button onClick={() => scrollToSection('home')} className="block px-3 py-2 text-gray-200 hover:text-blue-400 animated-underline">
                Home
              </button>
              <button onClick={() => scrollToSection('services')} className="block px-3 py-2 text-gray-200 hover:text-blue-400 animated-underline">
                Services
              </button>
              <button onClick={() => scrollToSection('about')} className="block px-3 py-2 text-gray-200 hover:text-blue-400 animated-underline">
                About
              </button>
              <button onClick={() => scrollToSection('portfolio')} className="block px-3 py-2 text-gray-200 hover:text-blue-400 animated-underline">
                Portfolio
              </button>
              <button onClick={() => scrollToSection('contact')} className="block px-3 py-2 text-gray-200 hover:text-blue-400 animated-underline">
                Contact
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" ref={homeRef} className="pt-16 min-h-screen flex items-center bg-gradient-to-br from-black via-blue-950 to-black relative">
        {/* Overlay for contrast */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
                  Build. Market.
                  <span className="bg-gradient-to-r from-blue-500 to-blue-900 bg-clip-text text-transparent block tracking-widest uppercase">
                    Dominate.
                  </span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                  We craft exceptional software solutions and implement powerful marketing strategies that drive real business growth. Your success is our mission.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollToSection('services')}
                  className="bg-gradient-to-r from-blue-600 to-black text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 transform flex items-center justify-center gap-2 shadow-lg"
                >
                  Explore Services <ArrowRight className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => scrollToSection('portfolio')}
                  className="border-2 border-gray-700 text-gray-200 px-8 py-4 rounded-2xl font-semibold hover:border-blue-600 hover:text-blue-400 transition-all duration-200 flex items-center justify-center gap-2 shadow"
                >
                  <Play className="w-5 h-5" /> View Our Work
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-white drop-shadow-lg">{stat.number}</div>
                    <div className="text-sm text-gray-400 mt-1 tracking-wide uppercase">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10 bg-black rounded-2xl shadow-2xl p-8 border border-gray-800 transition-all duration-200 hover:shadow-blue-900/40 hover:-translate-y-1">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-black rounded-lg flex items-center justify-center float-animate">
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Custom Development</h3>
                      <p className="text-gray-400 text-sm">Tailored solutions for your business</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-900 to-blue-600 rounded-lg flex items-center justify-center float-animate" style={{ animationDelay: '0.5s' }}>
                      <TrendingUp className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Growth Marketing</h3>
                      <p className="text-gray-400 text-sm">Data-driven strategies that convert</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-800 to-black rounded-lg flex items-center justify-center float-animate" style={{ animationDelay: '1s' }}>
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">Proven Results</h3>
                      <p className="text-gray-400 text-sm">98% client satisfaction rate</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-r from-blue-700 to-black rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-gradient-to-r from-black to-blue-900 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" ref={servicesRef} className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 tracking-widest uppercase">
              Our Comprehensive Services
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From cutting-edge software development to results-driven marketing campaigns, we offer end-to-end solutions that propel your business forward.
            </p>
          </div>
          
          <div className="flex justify-center mb-12">
            {/* Dropdown for mobile */}
            <div className="w-full max-w-xs md:hidden">
              <select
                value={activeTab}
                onChange={e => setActiveTab(e.target.value)}
                className="w-full px-6 py-3 rounded-full bg-gray-900 text-white font-semibold border border-gray-700 focus:ring-2 focus:ring-blue-600 transition-all"
              >
                <option value="development">Development Services</option>
                <option value="marketing">Marketing Services</option>
              </select>
            </div>
            {/* Buttons for desktop */}
            <div className="hidden md:flex bg-gray-900 rounded-full p-1">
              <button
                onClick={() => setActiveTab('development')}
                className={`px-8 py-3 rounded-full font-semibold transition-all ${
                  activeTab === 'development'
                    ? 'bg-gradient-to-r from-blue-600 to-black text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Development Services
              </button>
              <button
                onClick={() => setActiveTab('marketing')}
                className={`px-8 py-3 rounded-full font-semibold transition-all ${
                  activeTab === 'marketing'
                    ? 'bg-gradient-to-r from-blue-600 to-black text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Marketing Services
              </button>
            </div>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {services[activeTab].map((service, index) => (
              <div
                key={index}
                ref={serviceCardRefs[index]}
                className="bg-gray-900 rounded-3xl shadow-lg border border-gray-800 p-8 hover:shadow-2xl hover:shadow-blue-900/40 transition-all duration-200 transform hover:-translate-y-1"
              >
                <div className="text-blue-400 mb-6 float-animate" style={{ animationDelay: `${index * 0.2}s` }}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{service.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                      <span className="text-gray-200">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-24 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 tracking-widest uppercase">
                  Why Choose Texsky - IT Consulting Services ?
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  We combine technical excellence with strategic marketing expertise to deliver comprehensive solutions that drive measurable business growth. Our team of seasoned professionals brings years of industry experience to every project.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 float-animate">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">Full-Service Expertise</h3>
                    <p className="text-gray-300">From initial concept to final deployment and ongoing marketing, we handle every aspect of your digital transformation journey.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 float-animate" style={{ animationDelay: '0.5s' }}>
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">Cutting-Edge Technology</h3>
                    <p className="text-gray-300">We leverage the latest technologies and frameworks to build scalable, future-proof solutions that grow with your business.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-800 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 float-animate" style={{ animationDelay: '1s' }}>
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">Proven Track Record</h3>
                    <p className="text-gray-300">With over 100 successful projects and a 98% client satisfaction rate, we consistently deliver exceptional results.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {team.map((member, index) => (
                <div
                  key={index}
                  ref={teamCardRefs[index]}
                  className="bg-black rounded-3xl shadow-lg p-6 text-center border border-gray-800 hover:shadow-2xl hover:shadow-blue-900/40 transition-all duration-200 hover:-translate-y-1"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover float-animate"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  />
                  <h3 className="font-semibold text-white mb-1">{member.name}</h3>
                  <p className="text-blue-400 text-sm mb-2">{member.position}</p>
                  <p className="text-gray-400 text-xs">{member.expertise}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 tracking-widest uppercase">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-300">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-black to-blue-950 rounded-3xl p-8 lg:p-12 shadow-xl fade-in-up">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current float-animate" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
                
                <blockquote className="text-2xl lg:text-3xl text-white font-medium mb-8 leading-relaxed">
                  "{testimonials[currentTestimonial].content}"
                </blockquote>
                
                <div>
                  <div className="font-semibold text-white text-lg">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-gray-400">
                    {testimonials[currentTestimonial].position}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" ref={portfolioRef} className="py-24 bg-blue-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 tracking-widest uppercase">
              Our Recent Work
            </h2>
            <p className="text-xl text-gray-300">
              Explore some of our latest projects and success stories
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                title: "E-Commerce Platform",
                category: "Web Development",
                description: "Complete e-commerce solution with advanced analytics and inventory management",
                image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
              },
              {
                title: "Mobile Banking App",
                category: "Mobile Development",
                description: "Secure banking application with biometric authentication and real-time transactions",
                image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
              },
              {
                title: "SaaS Marketing Campaign",
                category: "Digital Marketing",
                description: "Multi-channel marketing strategy that generated qualified leads and improved conversion rates",
                image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
              }
            ].map((project, index) => (
              <div
                key={index}
                ref={portfolioCardRefs[index]}
                className="bg-black rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:shadow-blue-900/40 transition-all duration-200 transform hover:-translate-y-1 border border-gray-800"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover fade-in-up"
                />
                <div className="p-6">
                  <div className="text-sm text-blue-400 font-semibold mb-2">{project.category}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 tracking-widest uppercase">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-gray-300">
              Let's discuss how we can help transform your business with our comprehensive solutions
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6 tracking-tight">Get in Touch</h3>
                <p className="text-gray-300 leading-relaxed">
                  Ready to take your business to the next level? Our team is here to help you achieve your goals with innovative solutions and strategic expertise.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-900 rounded-lg flex items-center justify-center text-blue-400 shadow hover:bg-blue-600 hover:text-white transition-all float-animate">
                    <Mail className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Email</div>
                    <div className="text-gray-400">texsky24@gmail.com</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-950 rounded-lg flex items-center justify-center text-blue-400 shadow hover:bg-blue-600 hover:text-white transition-all float-animate" style={{ animationDelay: '0.5s' }}>
                    <Phone className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Phone</div>
                    <div className="text-gray-400">+91 9441262299</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-800 rounded-lg flex items-center justify-center text-blue-400 shadow hover:bg-blue-600 hover:text-white transition-all float-animate" style={{ animationDelay: '1s' }}>
                    <MapPin className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">Office</div>
                    <div className="text-gray-400">1-8-50, Hanamkonda, Warangal, Telangana - 506001</div>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center text-blue-400 shadow hover:bg-blue-600 hover:text-white transition-all float-animate">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center text-blue-400 shadow hover:bg-blue-600 hover:text-white transition-all float-animate" style={{ animationDelay: '0.2s' }}>
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center text-blue-400 shadow hover:bg-blue-600 hover:text-white transition-all float-animate" style={{ animationDelay: '0.4s' }}>
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/texsky.in/" className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center text-blue-400 shadow hover:bg-blue-600 hover:text-white transition-all float-animate" style={{ animationDelay: '0.6s' }}>
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center text-blue-400 shadow hover:bg-blue-600 hover:text-white transition-all float-animate" style={{ animationDelay: '0.8s' }}>
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="bg-blue-950 rounded-3xl p-8 shadow-xl fade-in-up">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-white mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Service Interested In
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all">
                      <option>Select a service</option>
                      <option>Custom Software Development</option>
                      <option>Mobile App Development</option>
                      <option>Web Development</option>
                      <option>Digital Marketing Strategy</option>
                      <option>Brand Development</option>
                      <option>Performance Marketing</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Project Details
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-black text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none"
                      placeholder="Tell us about your project requirements and goals..."
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-black text-white py-4 rounded-lg font-semibold hover:shadow-lg transition-all transform hover:scale-105"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-4 tracking-tight">DevMarket Pro</h3>
              <p className="text-gray-400 mb-6 max-w-md">
                Empowering businesses with cutting-edge software solutions and strategic marketing expertise. Your success is our passion.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center text-blue-400 shadow hover:bg-blue-600 hover:text-white transition-all float-animate">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center text-blue-400 shadow hover:bg-blue-600 hover:text-white transition-all float-animate" style={{ animationDelay: '0.2s' }}>
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center text-blue-400 shadow hover:bg-blue-600 hover:text-white transition-all float-animate" style={{ animationDelay: '0.4s' }}>
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="https://www.instagram.com/texsky.in/" className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center text-blue-400 shadow hover:bg-blue-600 hover:text-white transition-all float-animate" style={{ animationDelay: '0.6s' }}>
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 tracking-wide uppercase">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Custom Development</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mobile Apps</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Web Development</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Digital Marketing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Brand Development</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 tracking-wide uppercase">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Our Team</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Texsky - IT consulting services. All rights reserved. Built with passion for excellence.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AgencyWebsite;