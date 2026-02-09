"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import { useForm, ValidationError } from "@formspree/react";

function ContactForm() {
  const [state, handleSubmit] = useForm("mnjdrqwa");

  if (state.succeeded) {
    return (
      <div className="bg-[#0F172A] p-8 rounded-2xl text-center border border-gray-700">
        <h3 className="text-2xl font-bold text-[#3B82F6] mb-2">Message Sent</h3>
        <p className="text-gray-300">We’ll get back to you shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* ... form fields ... */}
    </form>
  );
}

// Main App Component (default export for Next.js app/page.jsx)
export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const scrollIndicatorRef = useRef<HTMLAnchorElement>(null);

    // Dynamic height calculation for the "Read More" section
    useEffect(() => {
        if (contentRef.current) {
            contentRef.current.style.maxHeight = isExpanded ? `${contentRef.current.scrollHeight + 20}px` : '0px';
        }
    }, [isExpanded]);

    // Scroll Indicator Fade Logic
    useEffect(() => {
    const indicator = scrollIndicatorRef.current;
    if (!indicator) return;  // Fix: prevents TypeScript "never" errors

    indicator.classList.add("opacity-0");

    const fadePoint = window.innerHeight * 0.8;

    const handleScroll = () => {
        setScrolled(window.scrollY > 50);

        const indicatorEl = scrollIndicatorRef.current;
        if (!indicatorEl) return; // Fix: ensures safe access again

        if (window.scrollY > fadePoint) {
            indicatorEl.classList.add("opacity-0");
        } else {
            indicatorEl.classList.remove("opacity-0");
        }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
}, []);


    const BounceArrow = () => (
        <svg 
            className="w-8 h-8 text-[#3B82F6] animate-bounce" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
    );

    return (
        <div style={{ fontFamily: 'Inter, sans-serif' }} className="bg-[#111827] text-[#F9FAFB] scroll-smooth">
            
            {/* FIXED NAVIGATION BANNER - Enhanced with transition */}
            <header className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-all duration-500 ${
                scrolled 
                    ? 'bg-white/95 shadow-xl border-b border-[#9CA3AF]/30' 
                    : 'bg-[#0A0A0A]/85 shadow-xl border-b border-[#3B82F6]/50'
            }`}>
                <div className={`container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 ${
                    scrolled ? 'h-16' : 'h-20'
                } flex items-center justify-between`}>
                    {/* Logo and Company Name */}
                    <div className="flex items-center space-x-3">
                        <img 
                            src="/Logo.png" 
                            alt="Sen Engineering Solutions Logo" 
                            width={100}
                            height={100}
                            className={`
                            w-8 h-8 object-contain
                            transition-all duration-500
                            ${scrolled ? 'opacity-90' : 'opacity-100'}
                            `}
                        />
                        <span className={`text-2xl font-extrabold tracking-wider transition-colors duration-500 ${
                            scrolled ? 'text-gray-900' : 'text-[#F9FAFB]'
                        }`}>Sen Engineering Solutions</span>
                    </div>

                    {/* Navigation Links */}
                    <nav className="hidden md:flex space-x-6">
                        <a href="#overview-content" className={`transition-all duration-500 font-medium p-2 rounded-md ${
                            scrolled ? 'text-[#374151] hover:text-[#1E3A8A]' : 'text-[#9CA3AF] hover:text-[#3B82F6]'
                        }`}>Overview</a>
                        <a href="#reading-content" className={`transition-all duration-500 font-medium p-2 rounded-md ${
                            scrolled ? 'text-[#374151] hover:text-[#1E3A8A]' : 'text-[#9CA3AF] hover:text-[#3B82F6]'
                        }`}>Additional Reading</a>
                        <a href="#projects-content" className={`transition-all duration-500 font-medium p-2 rounded-md ${
                            scrolled ? 'text-[#374151] hover:text-[#1E3A8A]' : 'text-[#9CA3AF] hover:text-[#3B82F6]'
                        }`}>Our Projects</a>
                        <a href="#contact-section" className={`transition-all duration-500 font-medium px-4 py-2 rounded-lg shadow-lg ${
                            scrolled 
                                ? 'bg-[#1E3A8A] text-white hover:bg-[#3B82F6]' 
                                : 'bg-[#1E3A8A] text-[#F9FAFB] hover:bg-[#3B82F6]'
                        }`}>Contact Us</a>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`md:hidden focus:outline-none transition-colors duration-500 ${
                        scrolled ? 'text-[#0A0A0A]' : 'text-[#F9FAFB]'
                    }`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                <div className={`md:hidden ${scrolled ? 'bg-white border-t border-[#9CA3AF]/30' : 'bg-[#111827] border-t border-[#3B82F6]/30'} ${isMenuOpen ? 'block' : 'hidden'}`}>
                    <a onClick={() => setIsMenuOpen(false)} href="#overview-content" className={`block py-3 px-4 font-medium ${
                        scrolled ? 'text-[#374151] hover:bg-gray-100 hover:text-[#1E3A8A]' : 'text-[#9CA3AF] hover:bg-gray-800 hover:text-[#3B82F6]'
                    }`}>Overview</a>
                    <a onClick={() => setIsMenuOpen(false)} href="#reading-content" className={`block py-3 px-4 font-medium ${
                        scrolled ? 'text-[#374151] hover:bg-gray-100 hover:text-[#1E3A8A]' : 'text-[#9CA3AF] hover:bg-gray-800 hover:text-[#3B82F6]'
                    }`}>Additional Reading</a>
                    <a onClick={() => setIsMenuOpen(false)} href="#projects-content" className={`block py-3 px-4 font-medium ${
                        scrolled ? 'text-[#374151] hover:bg-gray-100 hover:text-[#1E3A8A]' : 'text-[#9CA3AF] hover:bg-gray-800 hover:text-[#3B82F6]'
                    }`}>Our Projects</a>
                    <a onClick={() => setIsMenuOpen(false)} href="#contact-section" className="block py-3 px-4 text-[#F9FAFB] bg-[#1E3A8A] hover:bg-[#3B82F6] font-medium">Contact Us</a>
                </div>
            </header>

            {/* Main content */}
            <main className="pt-0">
                {/* LUXURIOUS LANDING PAGE - Enhanced with gradient fade */}
                <section id="home" className="relative h-screen w-full flex items-center justify-center text-center bg-gradient-to-b from-[#0A0A0A] via-[#0a0a1a] to-[#111827] overflow-hidden">
                    {/* Animated Blue Glow Effect */}
                    <div 
                        style={{ 
                            background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.3) 0%, rgba(30, 58, 138, 0) 70%)',
                            animation: 'pulse 4s ease-in-out infinite'
                        }} 
                        className="absolute inset-0 w-3/4 h-3/4 md:w-1/2 md:h-1/2 mx-auto mt-[-5%] blur-3xl opacity-60 transform scale-150 pointer-events-none"
                    ></div>

                    <div className="px-6 py-12 max-w-5xl z-10 animate-fade-in">
                        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black mb-6 text-[#F9FAFB] tracking-tighter leading-snug">
                            Sen Engineering Solutions, Inc.
                        </h1>
                        <p className="text-xl sm:text-2xl text-[#9CA3AF] max-w-4xl mx-auto">
                            A technology company developing the <strong>SMART Power Flow Controller</strong> — a functional requirements-based, cost-effective solution.
                        </p>
                    </div>

                    {/* Bouncing Scroll Indicator */}
                    <a ref={scrollIndicatorRef} href="#overview-content" className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 opacity-100 transition-opacity duration-500">
                        <div className="flex flex-col items-center text-[#9CA3AF] hover:text-[#3B82F6] transition duration-300">
                            <span className="text-base font-semibold uppercase tracking-widest mb-2">Explore Our Mission</span>
                            <BounceArrow />
                        </div>
                    </a>

                    {/* Gradient Fade Overlay */}
                    <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-[#F9FAFB] to-transparent pointer-events-none"></div>
                </section>

                {/* TECHNOLOGY OVERVIEW CONTENT (Light Theme) - Enhanced animations */}
                <section id="overview-content" className="py-16 sm:py-24 bg-[#F9FAFB] text-[#0A0A0A]">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                        
                        <h2 className="text-5xl font-extrabold text-center mb-6 text-[#1E3A8A] animate-fade-in-up">SMART Power Flow Controller — Empowering the Grid</h2>
                        
                        {/* Introduction */}
                        <div className="mb-16 text-center animate-fade-in-up">
                            <p className="text-xl text-[#374151] leading-relaxed mb-8">
                                <strong>SMART Power Flow Controller</strong> is a breakthrough in bulk power system technology, hosting a range of benefits over traditional power flow solutions. SMART Power Flow Controller, a patented technology, acts as an Impedance Regulating Transformer and offers a plethora of power flow control features independent active and reactive power flows, voltage, phase angle, Impedance (XL or XC and R or –R, all independently variable) in one, multi-use unit to provide a reliable, cost‐effective, and portable solution to meet today's needs to modernize the grid.
                            </p>

                            {/* Product Image Suggestion Placement */}
                            <div className="my-10 p-6 bg-gray-200 rounded-xl shadow-inner border border-gray-300 hover:shadow-xl transition-shadow duration-300">
                                <img 
                                    src="/smart power flow.jpg" 
                                    alt="SMART Power Flow Controller Product Image" 
                                    className="w-full h-auto rounded-lg shadow-lg mx-auto"
                                />
                            </div>

                            {/* Vision and Mission */}
                            <div className="bg-white p-6 rounded-xl border-l-4 border-[#3B82F6] text-left shadow-lg hover:shadow-2xl transition-shadow duration-300">
                                <h3 className="text-2xl font-semibold mb-2 text-[#1E3A8A]">Vision and Mission</h3>
                                <p className="text-[#374151]">
                                    We strive to serve society by delivering advanced power‑flow control technology. Through publications, tutorials, seminars, and webinars, we educate customers, enabling them to define functional requirements and obtain cost‑effective solutions.
                                </p>
                            </div>
                        </div>

                        {/* Content Block 1: Empowering Grid & Read More */}
                        <div className="mb-16">
                            <h3 className="text-4xl font-bold mb-6 text-[#0A0A0A]">Empowering a Smarter Grid</h3>
                            <p className="text-lg text-[#374151] leading-relaxed mb-6">
                                The SMART Power Flow Controller (SPFC) redefines how electricity moves through the grid — offering precise, independent control over active and reactive power. By intelligently managing energy flow, it maximizes efficiency, enhances reliability, and minimizes losses across the transmission network.
                            </p>
                            <p className="text-lg text-[#374151] leading-relaxed mb-8">
                                Unlike traditional solutions built around a single technology, the SPFC unites the best features of all power-flow concepts developed until now into one, functional-requirements-based system that's simple, scalable, and cost-effective.
                            </p>
                            
                            {/* Read More Toggle Button */}
                            <button onClick={() => setIsExpanded(!isExpanded)} className="flex items-center text-lg font-semibold text-[#3B82F6] hover:text-[#1E3A8A] transition-all duration-300 hover:translate-x-1">
                                <span>{isExpanded ? 'Show Less' : 'Read More'}</span>
                                <svg className={`w-5 h-5 ml-2 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>

                            {/* How the SPFC Works (Hidden Content) */}
                            <div ref={contentRef} className="mt-8 overflow-hidden transition-all duration-500 ease-in-out">
                                <h4 className="text-3xl font-bold text-[#0A0A0A] mb-4 border-b pb-2 border-[#9CA3AF]">How the SPFC Works</h4>
                                <p className="text-lg text-[#374151] leading-relaxed mb-6">
                                    The SPFC acts as an <strong>impedance-regulating transformer</strong>, dynamically adjusting both resistance and reactance in a transmission line. This allows it to control power flows independently, maximizing useful active power and minimizing unwanted reactive power.
                                </p>
                                <p className="text-lg text-[#374151] leading-relaxed mb-8">
                                    While power-electronics-based systems can react in milliseconds, most utility applications only require response times measured in seconds or longer. The SPFC's design meets those real-world functional requirements delivering high performance at a fraction of the cost of power electronics solutions.
                                </p>

                                <h5 className="text-xl font-bold text-[#1E3A8A] mb-4">Functional Principles (S.M.A.R.T.)</h5>
                                <ul className="space-y-3 text-lg text-[#374151] list-none p-0">
                                    <li className="flex items-start">
                                        <span className="font-bold text-[#3B82F6] mr-3 whitespace-nowrap">S — Specific:</span> 
                                        <span>Meets the actual needs of utilities</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="font-bold text-[#3B82F6] mr-3 whitespace-nowrap">M — Measurable:</span> 
                                        <span>Reliable, efficient, cost-effective, and portable</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="font-bold text-[#3B82F6] mr-3 whitespace-nowrap">A — Attainable:</span> 
                                        <span>Built for realistic grid performance expectations</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="font-bold text-[#3B82F6] mr-3 whitespace-nowrap">R — Relevant:</span> 
                                        <span>Improves overall grid efficiency and resilience</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="font-bold text-[#3B82F6] mr-3 whitespace-nowrap">T — Time-Bound:</span> 
                                        <span>Delivered with defined milestones</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Content Block 2: Key Benefits */}
                        <div className="mb-16">
                            <h3 className="text-4xl font-bold mb-6 text-[#0A0A0A]">Key Benefits</h3>
                            
                            {/* Table Display */}
                            <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-100 hover:shadow-[#1E3A8A]/20 transition-shadow duration-300">
                                {/* Header */}
                                <div className="grid grid-cols-2 bg-[#1E3A8A] text-[#F9FAFB] font-bold text-xl p-4">
                                    <span>Category</span>
                                    <span>Impact</span>
                                </div>

                                {/* Rows */}
                                <div className="divide-y divide-[#9CA3AF]/30">
                                    <div className="grid grid-cols-2 p-4 hover:bg-gray-50 transition-all duration-200 hover:translate-x-1">
                                        <span className="font-semibold text-[#0A0A0A]">Efficiency</span>
                                        <span className="text-[#374151]">Reduces reactive power and energy losses in generators, transformers, and lines</span>
                                    </div>
                                    <div className="grid grid-cols-2 p-4 hover:bg-gray-50 transition-all duration-200 hover:translate-x-1">
                                        <span className="font-semibold text-[#0A0A0A]">Sustainability</span>
                                        <span className="text-[#374151]">Cuts unnecessary generation and lowers environmental impact</span>
                                    </div>
                                    <div className="grid grid-cols-2 p-4 hover:bg-gray-50 transition-all duration-200 hover:translate-x-1">
                                        <span className="font-semibold text-[#0A0A0A]">Grid Optimization</span>
                                        <span className="text-[#374151]">Redirects power to underutilized lines, reducing congestion</span>
                                    </div>
                                    <div className="grid grid-cols-2 p-4 hover:bg-gray-50 transition-all duration-200 hover:translate-x-1">
                                        <span className="font-semibold text-[#0A0A0A]">Cost Reduction</span>
                                        <span className="text-[#374151]">Defers or eliminates the need for new high-voltage transmission lines</span>
                                    </div>
                                    <div className="grid grid-cols-2 p-4 hover:bg-gray-50 transition-all duration-200 hover:translate-x-1">
                                        <span className="font-semibold text-[#0A0A0A]">Flexibility</span>
                                        <span className="text-[#374151]">Portable and easily redeployed as grid demands evolve</span>
                                    </div>
                                    <div className="grid grid-cols-2 p-4 hover:bg-gray-50 transition-all duration-200 hover:translate-x-1">
                                        <span className="font-semibold text-[#0A0A0A]">Interoperability</span>
                                        <span className="text-[#374151]">Works with components from various suppliers to reduce maintenance and lifecycle costs</span>
                                    </div>
                                </div>
                            </div>

                            {/* The Result */}
                            <div className="mt-10 p-6 bg-[#3B82F6]/10 rounded-xl border border-[#3B82F6]/30 shadow-md hover:shadow-xl transition-shadow duration-300">
                                <h4 className="text-2xl font-bold text-[#1E3A8A] mb-2">The Result</h4>
                                <p className="text-lg text-[#374151]">
                                    A more intelligent, reliable, and sustainable power grid — built around functional principles rather than rigid technologies. The SPFC enables utilities to do more with existing infrastructure, ensuring a smarter, cleaner, and future-ready energy system.
                                </p>
                            </div>
                        </div>

                    </div>
                </section>


                {/* ADDITIONAL READING CONTENT (Light Theme) */}
                <section id="reading-content" className="py-16 sm:py-24 bg-gray-100 text-[#0A0A0A] border-t border-gray-300">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                        <h1 className="text-5xl font-extrabold text-center mb-16 text-[#1E3A8A]">Additional Reading & Resources</h1>

                        {/* Featured Publications */}
                        <section className="mb-20">
                            <h2 className="text-3xl font-bold mb-8 text-[#0A0A0A] border-b-2 border-[#1E3A8A] pb-2 max-w-7xl mx-auto">Featured Publications</h2>
                            
                            <div className="grid md:grid-cols-2 gap-10 max-w-7xl mx-auto">
                                {/* Book 1 Card */}
                                <div className="flex flex-col sm:flex-row bg-white rounded-xl shadow-2xl p-6 hover:shadow-[#1E3A8A]/20 transition-all duration-300 hover:-translate-y-1">
                                    <img src="/book1.jpg" 
                                        alt="Introduction to FACTS Controllers Book Cover" 
                                        className="w-full sm:w-1/3 h-auto sm:h-auto rounded-lg mb-4 sm:mb-0 sm:mr-6 object-cover flex-shrink-0" />
                                    
                                    <div className="book-details flex-grow">
                                        <h3 className="text-xl font-bold mb-2">
                                            <a href="https://www.wiley.com/en-us/Introduction+to+FACTS+Controllers%3A+Theory%2C+Modeling%2C+and+Applications-p-9780470478752" target="_blank" 
                                            className="text-[#3B82F6] hover:text-[#1E3A8A] transition duration-300">
                                                Introduction to FACTS Controllers: Theory, Modeling, and Applications
                                            </a>
                                        </h3>
                                        <p className="text-sm text-[#374151] mb-2"><strong>Author:</strong> K. K. Sen, M. L. Sen</p>
                                        <p className="text-sm text-[#374151] mb-2"><strong>ISBN:</strong> 9780470478752</p>
                                        <p className="text-[#374151] text-base">
                                            A comprehensive resource introducing Flexible AC Transmission System (FACTS) controllers, their modeling techniques, and real-world applications. Suitable for students, engineers, and professionals in the power sector.
                                        </p>
                                    </div>
                                </div>

                                {/* Book 2 Card */}
                                <div className="flex flex-col sm:flex-row bg-white rounded-xl shadow-2xl p-6 hover:shadow-[#1E3A8A]/20 transition-all duration-300 hover:-translate-y-1">
                                    <img src="/book2.JPG" 
                                        alt="Power Flow Control Solutions Book Cover" 
                                        className="w-full sm:w-1/3 h-auto sm:h-auto rounded-lg mb-4 sm:mb-0 sm:mr-6 object-cover flex-shrink-0" />
                                    
                                    <div className="book-details flex-grow">
                                        <h3 className="text-xl font-bold mb-2">
                                            <a href="https://www.wiley.com/en-us/Power+Flow+Control+Solutions+for+a+Modern+Grid+Using+SMART+Power+Flow+Controllers-p-9781119824381" target="_blank" 
                                            className="text-[#3B82F6] hover:text-[#1E3A8A] transition duration-300">
                                                Power Flow Control Solutions for a Modern Grid Using SMART Power Flow Controllers
                                            </a>
                                        </h3>
                                        <p className="text-sm text-[#374151] mb-2"><strong>Author:</strong> K. K. Sen, M. L. Sen</p>
                                        <p className="text-sm text-[#374151] mb-2"><strong>ISBN:</strong> 9781119824381</p>
                                        <p className="text-[#374151] text-base">
                                            This book presents proven methods for improving grid reliability and efficiency using SMART Power Flow Controllers. It's ideal for grid planners, operators, engineers, and students in modern power systems.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>


                        {/* Technical Publications & Articles (Grouped Lists) */}
                        <div className="grid lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
                            
                            {/* Left Column: Technical Publications */}
                            <div className="lg:col-span-1 space-y-10">
                                <section>
                                    <h2 className="text-3xl font-bold mb-4 text-[#0A0A0A]">Technical Publications (IEEE)</h2>
                                    <ul className="space-y-3 bg-white p-6 rounded-xl shadow-lg border border-gray-200 divide-y divide-gray-100">
                                        <li className="pt-2"><a href="https://ieeexplore.ieee.org/document/11225700" target="_blank" className="block text-lg font-medium text-[#0A0A0A] hover:text-[#3B82F6] transition-all duration-200 hover:translate-x-1">Advancements in Transformer Technology: Design, Manufacture, and Testing of a ±6.5 MVA, 33 kV Sen Transformer - IEEE</a></li>
                                        <li className="pt-2"><a href="https://ieeexplore.ieee.org/document/7741518" target="_blank" className="block text-lg font-medium text-[#0A0A0A] hover:text-[#3B82F6] transition-all duration-200 hover:translate-x-1">Unique Capabilities of Sen Transformer: A power Flow Regulating Transformer – IEEE</a></li>
                                        <li className="pt-2"><a href="https://ieeexplore.ieee.org/document/7741516" target="_blank" className="block text-lg font-medium text-[#0A0A0A] hover:text-[#3B82F6] transition-all duration-200 hover:translate-x-1">Comparison of Operational Characteristics Between a Sen Transformer and a Phase Angle Regulator – IEEE</a></li>
                                        <li className="pt-2"><a href="https://ieeexplore.ieee.org/document/7286343" target="_blank" className="block text-lg font-medium text-[#0A0A0A] hover:text-[#3B82F6] transition-all duration-200 hover:translate-x-1">SMART Power Flow Controller for Smarter Grid Applications – IEEE</a></li>
                                        <li className="pt-2"><a href="https://ieeexplore.ieee.org/document/6474988" target="_blank" className="block text-lg font-medium text-[#0A0A0A] hover:text-[#3B82F6] transition-all duration-200 hover:translate-x-1">Introducing the SMART Power Flow Controller - an Integral Part of Smart Grid – IEEE</a></li>
                                        <li className="pt-2"><a href="https://ieeexplore.ieee.org/document/6990286" target="_blank" className="block text-lg font-medium text-[#0A0A0A] hover:text-[#3B82F6] transition-all duration-200 hover:translate-x-1">Analysis of FACTS Controllers and their Transient Modelling Techniques – IEEE</a></li>
                                        <li className="pt-2"><a href="https://ieeexplore.ieee.org/document/1234714" target="_blank" className="block text-lg font-medium text-[#0A0A0A] hover:text-[#3B82F6] transition-all duration-200 hover:translate-x-1">Comparison of the 'Sen' Transformer with the Unified Power Flow Controller – IEEE</a></li>
                                        <li className="pt-2"><a href="https://ieeexplore.ieee.org/document/1159911" target="_blank" className="block text-lg font-medium text-[#0A0A0A] hover:text-[#3B82F6] transition-all duration-200 hover:translate-x-1">Introducing the Family of "Sen" Transformers: A Set of Power Flow Controlling Transformers – IEEE</a></li>
                                        <li className="pt-2"><a href="https://ieeexplore.ieee.org/document/1159935" target="_blank" className="block text-lg font-medium text-[#0A0A0A] hover:text-[#3B82F6] transition-all duration-200 hover:translate-x-1">Comparison of Field Results and Digital Simulation Results of Voltage-sourced Converter-based FACTS Controllers – IEEE</a></li>
                                        <li className="pt-2"><a href="https://ieeexplore.ieee.org/document/985049" target="_blank" className="block text-lg font-medium text-[#0A0A0A] hover:text-[#3B82F6] transition-all duration-200 hover:translate-x-1">Versatile Power Flow Transformer – IEEE</a></li>
                                        <li className="pt-2"><a href="https://ieeexplore.ieee.org/document/868721" target="_blank" className="block text-lg font-medium text-[#0A0A0A] hover:text-[#3B82F6] transition-all duration-200 hover:translate-x-1">A Power Flow Controller with a Stable Reversing Capability – IEEE</a></li>
                                        <li className="pt-2"><a href="https://ieeexplore.ieee.org/document/747375" target="_blank" className="block text-lg font-medium text-[#0A0A0A] hover:text-[#3B82F6] transition-all duration-200 hover:translate-x-1">STATCOM-STATic Synchronous COMpensator: Theory, Modeling, and Applications – IEEE</a></li>
                                        <li className="pt-2"><a href="https://ieeexplore.ieee.org/document/772382" target="_blank" className="block text-lg font-medium text-[#0A0A0A] hover:text-[#3B82F6] transition-all duration-200 hover:translate-x-1">The Interline Power Flow Controller Concept: A New Approach to Power Flow Management in Transmission Systems – IEEE</a></li>
                                        <li className="pt-2"><a href="https://ieeexplore.ieee.org/document/714629" target="_blank" className="block text-lg font-medium text-[#0A0A0A] hover:text-[#3B82F6] transition-all duration-200 hover:translate-x-1">UPFC-Unified Power Flow Controller: Theory, Modeling, and Applications – IEEE</a></li>
                                        <li className="pt-2"><a href="https://ieeexplore.ieee.org/document/568265" target="_blank" className="block text-lg font-medium text-[#0A0A0A] hover:text-[#3B82F6] transition-all duration-200 hover:translate-x-1">Static Synchronous Series Compensator: A Solid-state Approach to the Series Compensation of Transmission Lines – IEEE</a></li>


                                        <li className="pt-2"><a href="https://ieeexplore.ieee.org/abstract/document/4483685" target="_blank" className="block text-lg font-medium text-[#0A0A0A] hover:text-[#3B82F6] transition-all duration-200 hover:translate-x-1">Detailed Real-Time Transient Model of the “Sen” Transformer – IEEE</a></li>
                                        
                                        <li className="pt-2"><a href="https://ieeexplore.ieee.org/document/4265677" target="_blank" className="block text-lg font-medium text-[#0A0A0A] hover:text-[#3B82F6] transition-all duration-200 hover:translate-x-1">A Tap-Changing Algorithm for the Implementation of “Sen” Transformer – IEEE</a></li>

                                    </ul>
                                </section>
                            </div>

                            {/* Right Column: Industry Articles & Press Release */}
                            <div className="lg:col-span-1 space-y-10">
                                <section>
                                    <h2 className="text-3xl font-bold mb-4 text-[#0A0A0A]">Industry Articles</h2>
                                    <ul className="space-y-3 bg-white p-6 rounded-xl shadow-lg border border-gray-200 divide-y divide-gray-100">
                                        <li className="pt-2"><a href="https://transformer-technology.com/article-hub/the-sen-transformer-technology-digital-article/" target="_blank" className="block text-lg font-medium text-[#0A0A0A] hover:text-[#3B82F6] transition-all duration-200 hover:translate-x-1">The Sen Transformer – Transformer Technology</a></li>
                                        <li className="pt-2"><a href="https://www.how2power.com/pdf_view.php?url=/newsletters/1503/articles/H2PToday1503_design_Sen.pdf" target="_blank" className="block text-lg font-medium text-[#0A0A0A] hover:text-[#3B82F6] transition-all duration-200 hover:translate-x-1">Practical Power Flow Controller Brings Benefits Of Power Electronics To The Grid - How2Power</a></li>
                                        <li className="pt-2"><a href="https://www.how2power.com/pdf_view.php?url=/newsletters/1702/articles/H2PToday1702_design_Sen.pdf" target="_blank" className="block text-lg font-medium text-[#0A0A0A] hover:text-[#3B82F6] transition-all duration-200 hover:translate-x-1">Phase Angle Regulation Versus Impedance Regulation: Which Offers Greater Control Of Power Flow On the Grid? – How2Power</a></li>
                                        <li className="pt-2"><a href="https://www.how2power.com/pdf_view.php?url=/newsletters/1803/articles/H2PToday1803_design_Sen.pdf" target="_blank" className="block text-lg font-medium text-[#0A0A0A] hover:text-[#3B82F6] transition-all duration-200 hover:translate-x-1">Modeling Of The Sen Transformer Using An Electromagnetic Transients Program - How2Power</a></li>
                                        <li className="pt-2 flex justify-between items-center hover:bg-gray-50 transition-all duration-200">
                                            <a href="http://files.midphasesitebuilder.com/ad/33/ad335f60-d07b-4b8b-a9a3-ef0b6ab450ee.pdf" target="_blank" className="block text-lg font-medium text-[#0A0A0A] hover:text-[#3B82F6] transition-all duration-200 hover:translate-x-1">Modeling of the Sen Transformer in PSS®E</a></li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-3xl font-bold mb-4 text-[#0A0A0A]">Press Releases</h2>
                                    <ul className="space-y-3 bg-white p-6 rounded-xl shadow-lg border border-gray-200 divide-y divide-gray-100">
                                        <li className="pt-2"><a href="https://www.nypa.gov/news/press-releases/2021/20211028-transformer" target="_blank" className="block text-lg font-medium text-[#0A0A0A] hover:text-[#3B82F6] transition-all duration-200 hover:translate-x-1">NYPA Energy Innovator News Brief – NYPA Press Release</a></li>
                                        <li className="pt-2"><a href="http://files.midphasesitebuilder.com/54/d3/54d32047-3264-4c9b-8394-6354200ab653.pdf" target="_blank" className="block text-lg font-medium text-[#0A0A0A] hover:text-[#3B82F6] transition-all duration-200 hover:translate-x-1">Kalyan Sen Receives Fulbright Specialist Award</a></li>
                                        <li className="pt-2"><a href="https://www.toastmasters.org/magazine/magazine-issues/2019/jan/6-quick-takes-member-moment" target="_blank" className="block text-lg font-medium text-[#0A0A0A] hover:text-[#3B82F6] transition-all duration-200 hover:translate-x-1">Fulbright Scholar Electrifies Audiences – Toastmasters Magazine</a></li>
                                    </ul>
                                </section>
                            </div>
                        </div>

                    </div>
                </section>


                {/* OUR PROJECTS CONTENT (Dark Theme) */}
                <section id="projects-content" className="py-16 sm:py-24 bg-[#111827] text-[#F9FAFB] border-t border-gray-700">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                        <h1 className="text-5xl font-extrabold text-center mb-16 text-[#3B82F6]">Introducing the World's First Commercial-Grade Sen Transformer</h1>

                        <div className="space-y-12">
                            
                            {/* Project Image */}
                            <div className="w-full max-w-3xl mx-auto hover:scale-[1.02] transition-transform duration-300">
                            <Image
                             src="/sentransformer.jpg"
                            alt="Commercial-Grade ST Project Image"
                            width={200}
                            height={300}
                            className="rounded-xl shadow-2xl border-4 border-gray-700 object-cover w-full h-auto"
                            />
                            <p className="mt-4 text-sm text-gray-400 text-center">
                                  Image of the successfully tested commercial-grade Sen Transformer unit.
                            </p>
                            </div>


                            {/* Project Description */}
                            <div className="text-lg text-[#9CA3AF] leading-relaxed space-y-6">
                                <p>
                                    "Ampcontrol is excited to announce that in collaboration with @Sen Engineering Solutions, Inc., we have designed, manufactured and extensively tested the <strong>world's first commercial-grade Sen Transformer</strong>, a patented technology, that acts as an Impedance Regulating Transformer. Sometimes, there comes a technical advancement that is simple, elegant and effective.
                                </p>
                                <p>
                                    Sen Transformer marks the first breakthrough in bulk power system design in more than a century, hosting a range of benefits over traditional power flow solutions. Sen Transformer, which offers a plethora of power flow control features, such as independent active and reactive power flows, voltage, phase angle, impedance (XL or XC and R or –R, all independently variable), all in one unit, uses time‐tested components, such as transformer and load tap changers that are proven to be reliable, cost‐effective, and portable to meet today's needs to modernize the grid.
                                </p>
                                <p>
                                    A commercial-grade Sen Transformer was designed to operate at <strong>33 kV</strong> with a throughput rating of <strong>±6.5 MVA</strong>. The unit was manufactured and tested to demonstrate the proof of concept. The test results show that the bidirectional active and reactive power flows can be regulated independently, proving that the Sen Transformer is a practical solution to meet utilities' needs in terms of reliability, cost-effectiveness, component non-obsolescence, efficiency, portability and interoperability.
                                </p>
                                <p>
                                    The Sen Transformer is being further tested in a 33 kV radial line at the EPRI lab in the USA."
                                </p>
                                <a href="https://ampcontrolgroup.com/projects/sen-transformer?utm_campaign=Power%20Infrastructure_FY26&utm_source=linkedin&utm_medium=Ampcontrol&utm_content=Image&utm_term=P%26I_Sen%20Transformer" target="_blank" 
                                    className="text-center text-[#3B82F6] hover:text-[#1E3A8A] transition duration-300">
                                    Read the Full Project Overview from Ampcontrol
                                </a>
                            </div>

                        </div>
                    </div>
                </section>

                {/* LEADERSHIP SECTION (Dark Theme) */}
                <section id="contact-section" className="py-16 sm:py-24 bg-gray-900 text-[#F9FAFB] border-t border-gray-700">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                        <h1 className="text-5xl font-extrabold text-center mb-16 text-[#3B82F6]">Our Leadership Team</h1>

                        {/* Leadership Cards Grid */}
                        <div className="grid md:grid-cols-2 gap-12">
                            
                            {/* KKS Card (President & CTO) */}
                            <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border-t-4 border-[#1E3A8A] transition-all duration-300 hover:border-[#3B82F6] hover:-translate-y-1">
                                
                                {/* Profile Image Placeholder */}
                                <div className="mb-6 flex justify-center">
                                    <img 
                                        src="/kks1.jpg" 
                                        alt="KKS Profile Photo" 
                                        className="w-40 h-40 rounded-full object-cover border-3 border-[#3B82F6] shadow-xl"
                                        onError={(e) => {
                                        const img = e.currentTarget as HTMLImageElement;
                                        img.onerror = null;
                                        img.src = "https://placehold.co/200x200/1E3A8A/F9FAFB?text=KKS";
                                        }}
                                    />
                                </div>

                                <h2 className="text-3xl font-extrabold mb-1 text-[#F9FAFB]">Kalyan K. Sen, PhD-EE, PE, MBA, IEEE Fellow</h2>
                                <h3 className="text-xl font-semibold text-[#3B82F6] mb-4">President & Chief Technology Officer</h3>
                                
                                <p className="text-[#9CA3AF] mb-6 border-b border-gray-700 pb-4">
                                    <strong>Role:</strong> Directs all aspects of the company, including R&D/Engineering, Sales and Marketing, Manufacturing, Quality Assurance, and Finance.
                                </p>
                                
                                <div className="space-y-6">
                                    
                                    {/* Contact */}
                                    <div>
                                        <h4 className="text-lg font-bold text-[#3B82F6] mb-2">Contact</h4>
                                        <div className="flex items-center text-[#9CA3AF]">
                                            <svg className="w-5 h-5 mr-2 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                            <a href="mailto:email@email.com" className="hover:text-[#F9FAFB] transition duration-200">senkk@sentransformer.com or senkk@ieee.org</a>
                                        </div>
                                    </div>

                                    {/* Education */}
                                    <div>
                                        <h4 className="text-lg font-bold text-[#3B82F6] mb-2">Education</h4>
                                        <ul className="list-disc list-inside space-y-1 text-[#9CA3AF] ml-4">
                                            <li><strong>PhD-EE</strong> (1987), Worcester Polytechnic Institute (USA)</li>
                                            <li><strong>MSEE</strong> (1983), Tuskegee University (USA)</li>
                                            <li><strong>BEE</strong> (First Class Honors, 1982), Jadavpur University (India)</li>
                                            <li><strong>MBA</strong> (2012), Robert Morris University (USA)</li>
                                        </ul>
                                    </div>

                                    {/* Professional Expertise */}
                                    <div>
                                        <h4 className="text-lg font-bold text-[#3B82F6] mb-2">Key Expertise & Achievements</h4>
                                        <ul className="list-disc list-inside space-y-2 text-[#9CA3AF] ml-4">
                                            <li><strong>FACTS Pioneer:</strong> Elevated to <strong>IEEE Fellow</strong> for the development and application of power flow control technology, stemming from his work on Flexible Alternating Current Transmission Systems (FACTS) at Westinghouse.</li>
                                            <li><strong>Publications & Patents:</strong> Authored or coauthored over <strong>25 peer-reviewed publications, 8 patents, and 2 books</strong>, including <em>Introduction to FACTS Controllers</em>.</li>
                                            <li><strong>Global Recognition:</strong> Licensed <strong>Professional Engineer (PE)</strong>, in New York and Pennsylvania. Served as a <strong>Fulbright Specialist</strong> (2017-2022), an <strong>IEEE PES Distinguished Lecturer</strong> (2002-Present), and <strong>President Elect (2025-26)</strong> of Society on Social Implications of Technology (SSIT). Recieved <strong>IEEE PES Outstanding Large Chapter Award</strong> (2004), <strong>IEEE IAS Outstanding Large Chapter Award</strong> (2005), and <strong>IEEE PELS Best Chapter Award</strong> (2015)</li>
                                            <li><strong>IEEE Recognition:</strong> Recipient of the <strong>IEEE Pittsburgh Section Outstanding Volunteer Award</strong> (2004,2023)</li>
                                            <li><strong>IEEE Leadership:</strong> Extensive volunteer service, including AdCom Member of the IEEE Power Electronics Society (PELS), Chair of the IEEE Pittsburgh Section (awarded "Outstanding Large Section," 2005).</li>
                                            <li><strong>Industry Experience:</strong> Over 30 years of engineering and advisory experience with <strong>Westinghouse/Successors</strong> and <strong>ABB</strong>.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* MLS Card (Chief Operating Officer) */}
                            <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border-t-4 border-[#1E3A8A] transition-all duration-300 hover:border-[#3B82F6] hover:-translate-y-1">
                                
                                {/* Profile Image Placeholder */}
                                <div className="mb-6 flex justify-center">
                                    <img 
                                        src="mls1.jpg" 
                                        alt="MLS Profile Photo" 
                                        className="w-40 h-40 rounded-full object-cover border-3 border-[#3B82F6] shadow-xl"
                                        onError={(e) => {
                                        const img = e.currentTarget as HTMLImageElement;
                                        img.onerror = null;
                                        img.src = "https://placehold.co/200x200/1E3A8A/F9FAFB?text=KKS";
                                        }}
                                    />
                                </div>

                                <h2 className="text-3xl font-extrabold mb-1 text-[#F9FAFB]">Mey Ling Sen, MEE, IEEE Member</h2>
                                <h3 className="text-xl font-semibold text-[#3B82F6] mb-4">Chief Operating Officer</h3>
                                
                                <p className="text-[#9CA3AF] mb-6 border-b border-gray-700 pb-4">
                                    <strong>Role:</strong> Responsible for performing the everyday operations of the company, ensuring efficiency and project execution.
                                </p>

                                <div className="space-y-6">
                                    
                                    {/* Contact */}
                                    <div>
                                        <h4 className="text-lg font-bold text-[#3B82F6] mb-2">Contact</h4>
                                        <div className="flex items-center text-[#9CA3AF]">
                                            <svg className="w-5 h-5 mr-2 text-[#3B82F6]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                            <a href="mailto:Email@email.com" className="hover:text-[#F9FAFB] transition duration-200">senml@sentransformer.com or senml@ieee.org</a>
                                        </div>
                                    </div>

                                    {/* Education */}
                                    <div>
                                        <h4 className="text-lg font-bold text-[#3B82F6] mb-2">Education</h4>
                                        <ul className="list-disc list-inside space-y-1 text-[#9CA3AF] ml-4">
                                            <li><strong>MEE</strong> (1990), Rice University (USA)</li>
                                            <li><strong>BSEE</strong> (High Distinction, 1988), Worcester Polytechnic Institute (USA)</li>
                                        </ul>
                                    </div>

                                    {/* Professional Expertise */}
                                    <div>
                                        <h4 className="text-lg font-bold text-[#3B82F6] mb-2">Key Expertise & Achievements</h4>
                                        <ul className="list-disc list-inside space-y-2 text-[#9CA3AF] ml-4">
                                            <li><strong>Business Leadership:</strong> Served as President of Sen Engineering Solutions, Inc. (2002-2020) and consulted for ABB and Westinghouse.</li>
                                            <li><strong>Technical Contributions:</strong> Coauthored <strong>7 peer-reviewed publications, 5 issued patents, and 2 books</strong> focused on power flow control.</li>
                                            <li><strong>Global Recognition:</strong>Recieved <strong>IEEE PES Outstanding Large Chapter Award</strong> (2008) and <strong>IEEE IAS Outstanding Large Chapter Award</strong> (2010)</li>
                                            <li><strong>IEEE Recognition:</strong> Recipient of the <strong>IEEE Pittsburgh Section Power & Energy Society Outstanding Engineer Award</strong> (2018) for service and technical contributions and <strong>IEEE Pittsburgh Section Outstanding Volunteer Award</strong>(2023)</li>
                                            <li><strong>Community & Service:</strong> Recognized as a <strong>Distinguished Toastmaster (DTM)</strong>; served in various leadership roles for IEEE Pittsburgh Section/Chapters.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

{/* Contact Section */}
<section id="contact-section" className="py-24 bg-[#020617] text-[#F9FAFB] border-t border-gray-800">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">

    <h2 className="text-4xl font-extrabold text-center mb-4 text-[#3B82F6]">
      Contact Us
    </h2>

    <p className="text-center text-gray-400 mb-12 max-w-xl mx-auto">
      Send us a message and we’ll get back to you shortly.
    </p>

    <div className="flex justify-center">
      <div className="w-full max-w-xl bg-[#0F172A] rounded-2xl p-8 shadow-2xl border border-gray-700">

        <form
  onSubmit={async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await fetch("https://formspree.io/f/mnjdrqwa", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (res.ok) {
      form.reset();
      alert("Thanks! Your message has been sent.");
    } else {
      alert("Oops! Something went wrong. Please try again.");
    }
  }}
  className="space-y-5"
>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full rounded-lg bg-[#020617] border border-gray-700 px-4 py-2 text-white focus:outline-none focus:border-[#3B82F6]"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-lg bg-[#020617] border border-gray-700 px-4 py-2 text-white focus:outline-none focus:border-[#3B82F6]"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-1">Message</label>
            <textarea
              name="message"
              rows={5}
              required
              className="w-full rounded-lg bg-[#020617] border border-gray-700 px-4 py-2 text-white focus:outline-none focus:border-[#3B82F6]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#1E3A8A] hover:bg-[#3B82F6] transition text-white font-bold py-3 rounded-lg shadow-lg"
          >
            Send Message
          </button>

        </form>
      </div>
    </div>

  </div>
</section>

                {/* Footer */}
                <div className="border-t pt-8 border-gray-700 text-center text-[#9CA3AF] py-8 bg-[#111827]">
                    <p className="text-sm">Sen Engineering Solutions, Inc. &copy; 2026. All rights reserved.</p>
                </div>

            </main>

            <style jsx>{`
                @keyframes pulse {
                    0%, 100% { opacity: 0.6; transform: scale(1.5); }
                    50% { opacity: 0.4; transform: scale(1.6); }
                }

                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes fade-in-up {
                    from { 
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to { 
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fade-in {
                    animation: fade-in 1.2s ease-out;
                }

                .animate-fade-in-up {
                    animation: fade-in-up 1s ease-out;
                }
            `}</style>
        </div>
    );
}