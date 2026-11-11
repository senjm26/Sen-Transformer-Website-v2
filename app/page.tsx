"use client";

import React, { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import Image from "next/image";
import HeroBackground, { SCENE_BAND } from "./HeroBackground";
import Logo from "./Logo";

const NAV_LINKS = [
  { href: '#overview-content', label: 'Overview' },
  { href: '#reading-content', label: 'Reading' },
  { href: '#projects-content', label: 'Projects' },
  { href: '#leadership', label: 'Leadership' },
];

const BOOKS = [
  {
    cover: '/book1.jpg',
    width: 629,
    height: 1000,
    title: 'Introduction to FACTS Controllers: Theory, Modeling, and Applications',
    isbn: '9780470478752',
    url: 'https://www.wiley.com/en-us/Introduction+to+FACTS+Controllers%3A+Theory%2C+Modeling%2C+and+Applications-p-9780470478752',
    blurb: 'A comprehensive resource introducing Flexible AC Transmission System (FACTS) controllers, their modeling techniques, and real-world applications. Suitable for students, engineers, and professionals in the power sector.',
  },
  {
    cover: '/book2.jpg',
    width: 473,
    height: 690,
    title: 'Power Flow Control Solutions for a Modern Grid Using SMART Power Flow Controllers',
    isbn: '9781119824381',
    url: 'https://www.wiley.com/en-us/Power+Flow+Control+Solutions+for+a+Modern+Grid+Using+SMART+Power+Flow+Controllers-p-9781119824381',
    blurb: "This book presents proven methods for improving grid reliability and efficiency using SMART Power Flow Controllers. It's ideal for grid planners, operators, engineers, and students in modern power systems.",
  },
];

const IEEE_PAPERS = [
  ['Advancements in Transformer Technology: Design, Manufacture, and Testing of a ±6.5 MVA, 33 kV Sen Transformer', 'https://ieeexplore.ieee.org/document/11225700'],
  ['Unique Capabilities of Sen Transformer: A Power Flow Regulating Transformer', 'https://ieeexplore.ieee.org/document/7741518'],
  ['Comparison of Operational Characteristics Between a Sen Transformer and a Phase Angle Regulator', 'https://ieeexplore.ieee.org/document/7741516'],
  ['SMART Power Flow Controller for Smarter Grid Applications', 'https://ieeexplore.ieee.org/document/7286343'],
  ['Introducing the SMART Power Flow Controller - an Integral Part of Smart Grid', 'https://ieeexplore.ieee.org/document/6474988'],
  ['Analysis of FACTS Controllers and their Transient Modelling Techniques', 'https://ieeexplore.ieee.org/document/6990286'],
  ['Comparison of the “Sen” Transformer with the Unified Power Flow Controller', 'https://ieeexplore.ieee.org/document/1234714'],
  ['Introducing the Family of “Sen” Transformers: A Set of Power Flow Controlling Transformers', 'https://ieeexplore.ieee.org/document/1159911'],
  ['Comparison of Field Results and Digital Simulation Results of Voltage-sourced Converter-based FACTS Controllers', 'https://ieeexplore.ieee.org/document/1159935'],
  ['Versatile Power Flow Transformer', 'https://ieeexplore.ieee.org/document/985049'],
  ['A Power Flow Controller with a Stable Reversing Capability', 'https://ieeexplore.ieee.org/document/868721'],
  ['STATCOM-STATic Synchronous COMpensator: Theory, Modeling, and Applications', 'https://ieeexplore.ieee.org/document/747375'],
  ['The Interline Power Flow Controller Concept: A New Approach to Power Flow Management in Transmission Systems', 'https://ieeexplore.ieee.org/document/772382'],
  ['UPFC-Unified Power Flow Controller: Theory, Modeling, and Applications', 'https://ieeexplore.ieee.org/document/714629'],
  ['Static Synchronous Series Compensator: A Solid-state Approach to the Series Compensation of Transmission Lines', 'https://ieeexplore.ieee.org/document/568265'],
  ['Detailed Real-Time Transient Model of the “Sen” Transformer', 'https://ieeexplore.ieee.org/abstract/document/4483685'],
  ['A Tap-Changing Algorithm for the Implementation of “Sen” Transformer', 'https://ieeexplore.ieee.org/document/4265677'],
].map(([title, url]) => ({ title, url, source: 'IEEE Xplore' }));

const INDUSTRY_ARTICLES = [
  { title: 'The Sen Transformer', source: 'Transformer Technology', url: 'https://transformer-technology.com/article-hub/the-sen-transformer-technology-digital-article/' },
  { title: 'Practical Power Flow Controller Brings Benefits Of Power Electronics To The Grid', source: 'How2Power', url: 'https://www.how2power.com/pdf_view.php?url=/newsletters/1503/articles/H2PToday1503_design_Sen.pdf' },
  { title: 'Phase Angle Regulation Versus Impedance Regulation: Which Offers Greater Control Of Power Flow On the Grid?', source: 'How2Power', url: 'https://www.how2power.com/pdf_view.php?url=/newsletters/1702/articles/H2PToday1702_design_Sen.pdf' },
  { title: 'Modeling Of The Sen Transformer Using An Electromagnetic Transients Program', source: 'How2Power', url: 'https://www.how2power.com/pdf_view.php?url=/newsletters/1803/articles/H2PToday1803_design_Sen.pdf' },
  { title: 'Modeling of the Sen Transformer in PSS®E', source: 'PDF', url: 'http://files.midphasesitebuilder.com/ad/33/ad335f60-d07b-4b8b-a9a3-ef0b6ab450ee.pdf' },
];

const PRESS = [
  { title: 'NYPA Energy Innovator News Brief', source: 'NYPA press release', url: 'https://www.nypa.gov/news/press-releases/2021/20211028-transformer' },
  { title: 'Kalyan Sen Receives Fulbright Specialist Award', source: 'Press release (PDF)', url: 'http://files.midphasesitebuilder.com/54/d3/54d32047-3264-4c9b-8394-6354200ab653.pdf' },
  { title: 'Fulbright Scholar Electrifies Audiences', source: 'Toastmasters Magazine', url: 'https://www.toastmasters.org/magazine/magazine-issues/2019/jan/6-quick-takes-member-moment' },
];

const NAMEPLATE = [
  ['Rated voltage', '33 kV'],
  ['Throughput', '±6.5 MVA'],
  ['Control', 'Independent active and reactive power, bidirectional'],
  ['Manufacturer', 'Ampcontrol'],
  ['Technology', 'Sen Engineering Solutions, Inc.'],
  ['Status', 'Under test on a 33 kV radial line, EPRI lab, USA'],
];

type Leader = {
  name: string;
  credentials: string;
  title: string;
  photo: string;
  photoWidth: number;
  photoHeight: number;
  role: string;
  emails: string[];
  education: { degree: string; school: string; year: string }[];
  highlights: React.ReactNode[];
};

const LEADERS: Leader[] = [
  {
    name: 'Kalyan K. Sen',
    credentials: 'PhD-EE, PE, MBA, IEEE Fellow',
    title: 'President & Chief Technology Officer',
    photo: '/kks.jpg',
    photoWidth: 1822,
    photoHeight: 1920,
    role: 'Directs all aspects of the company, including R&D/Engineering, Sales and Marketing, Manufacturing, Quality Assurance, and Finance.',
    emails: ['senkk@sentransformer.com', 'senkk@ieee.org'],
    education: [
      { degree: 'PhD-EE', school: 'Worcester Polytechnic Institute (USA)', year: '1987' },
      { degree: 'MSEE', school: 'Tuskegee University (USA)', year: '1983' },
      { degree: 'BEE', school: 'Jadavpur University (India), First Class Honors', year: '1982' },
      { degree: 'MBA', school: 'Robert Morris University (USA)', year: '2012' },
    ],
    highlights: [
      <><strong>FACTS Pioneer:</strong> Elevated to <strong>IEEE Fellow</strong> for the development and application of power flow control technology, stemming from his work on Flexible Alternating Current Transmission Systems (FACTS) at Westinghouse.</>,
      <><strong>Publications & Patents:</strong> Authored or coauthored over <strong>25 peer-reviewed publications, 8 patents, and 2 books</strong>, including <em>Introduction to FACTS Controllers</em>.</>,
      <><strong>Global Recognition:</strong> Licensed <strong>Professional Engineer (PE)</strong>, in New York and Pennsylvania. Served as a <strong>Fulbright Specialist</strong> (2017-2022), an <strong>IEEE PES Distinguished Lecturer</strong> (2002-Present), and <strong>President Elect (2025-26)</strong> of Society on Social Implications of Technology (SSIT). Received <strong>IEEE PES Outstanding Large Chapter Award</strong> (2004), <strong>IEEE IAS Outstanding Large Chapter Award</strong> (2005), and <strong>IEEE PELS Best Chapter Award</strong> (2015).</>,
      <><strong>IEEE Recognition:</strong> Recipient of the <strong>IEEE Pittsburgh Section Outstanding Volunteer Award</strong> (2004, 2023).</>,
      <><strong>IEEE Leadership:</strong> Extensive volunteer service, including AdCom Member of the IEEE Power Electronics Society (PELS), Chair of the IEEE Pittsburgh Section (awarded &quot;Outstanding Large Section,&quot; 2005).</>,
      <><strong>Industry Experience:</strong> Over 30 years of engineering and advisory experience with <strong>Westinghouse/Successors</strong> and <strong>ABB</strong>.</>,
    ],
  },
  {
    name: 'Mey Ling Sen',
    credentials: 'MEE, IEEE Member',
    title: 'Chief Operating Officer',
    photo: '/mls.jpg',
    photoWidth: 1820,
    photoHeight: 2140,
    role: 'Responsible for performing the everyday operations of the company, ensuring efficiency and project execution.',
    emails: ['senml@sentransformer.com', 'senml@ieee.org'],
    education: [
      { degree: 'MEE', school: 'Rice University (USA)', year: '1990' },
      { degree: 'BSEE', school: 'Worcester Polytechnic Institute (USA), High Distinction', year: '1988' },
    ],
    highlights: [
      <><strong>Business Leadership:</strong> Served as President of Sen Engineering Solutions, Inc. (2002-2020) and consulted for ABB and Westinghouse.</>,
      <><strong>Technical Contributions:</strong> Coauthored <strong>7 peer-reviewed publications, 5 issued patents, and 2 books</strong> focused on power flow control.</>,
      <><strong>Global Recognition:</strong> Received <strong>IEEE PES Outstanding Large Chapter Award</strong> (2008) and <strong>IEEE IAS Outstanding Large Chapter Award</strong> (2010).</>,
      <><strong>IEEE Recognition:</strong> Recipient of the <strong>IEEE Pittsburgh Section Power & Energy Society Outstanding Engineer Award</strong> (2018) for service and technical contributions and <strong>IEEE Pittsburgh Section Outstanding Volunteer Award</strong> (2023).</>,
      <><strong>Community & Service:</strong> Recognized as a <strong>Distinguished Toastmaster (DTM)</strong>; served in various leadership roles for IEEE Pittsburgh Section/Chapters.</>,
    ],
  },
];

const ExternalIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5h5v5M19 5l-8 8M10 5H6a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1v-4" />
  </svg>
);

const READING_LINKS = [
  ['books', 'Books'],
  ['ieee-papers', 'IEEE papers'],
  ['industry-articles', 'Industry articles'],
  ['press', 'Press'],
];

function ReadingHeading({ title, count }: { title: string; count: number }) {
  return (
    <h3 className="flex items-center gap-4 mb-6 text-2xl font-bold text-[#0F1B33]">
      <span>{title}</span>
      <span className="h-px flex-grow bg-[#CBD5E1]" aria-hidden="true" />
      <span className="text-sm font-semibold text-[#475569] tabular-nums">{count}</span>
    </h3>
  );
}

function ResourceGrid({ items, single = false }: { items: { title: string; source: string; url: string }[]; single?: boolean }) {
  return (
    <ul className={`grid gap-3 ${single ? '' : 'md:grid-cols-2'}`}>
      {items.map(item => (
        <li key={item.url}>
          <a href={item.url} target="_blank" rel="noopener noreferrer"
            className="group flex h-full items-start gap-4 rounded-xl bg-white border border-[#D9E0EA] px-5 py-4 hover:border-[#3B82F6] hover:shadow-[0_10px_24px_-16px_rgba(30,58,138,0.5)] transition-[border-color,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]">
            <span className="flex-grow">
              <span className="block text-[17px] leading-snug font-medium text-[#0F1B33] group-hover:text-[#1E3A8A]">{item.title}</span>
              <span className="block mt-1.5 text-sm text-[#64748B]">{item.source}</span>
            </span>
            <ExternalIcon className="w-4 h-4 mt-1 flex-shrink-0 text-[#94A3B8] group-hover:text-[#3B82F6] transition-colors" />
          </a>
        </li>
      ))}
    </ul>
  );
}

type Level = 'yes' | 'partial' | 'no';
type Cell = [Level, string];

const COMPETITORS = ['Sen Transformer (SPFC)', 'UPFC', 'Phase angle regulator'];

const COMPARISON: { feature: string; cells: [Cell, Cell, Cell] }[] = [
  { feature: 'Independent active power control', cells: [['yes', 'Yes'], ['yes', 'Yes'], ['no', 'No']] },
  { feature: 'Independent reactive power control', cells: [['yes', 'Yes'], ['yes', 'Yes'], ['no', 'No']] },
  { feature: 'Voltage regulation', cells: [['yes', 'Yes'], ['yes', 'Yes'], ['no', 'No']] },
  { feature: 'Phase angle regulation', cells: [['yes', 'Yes'], ['yes', 'Yes'], ['yes', 'Yes']] },
  { feature: 'Impedance regulation (XL or XC, R or -R)', cells: [['yes', 'All independently variable'], ['yes', 'All independently variable'], ['no', 'Fixed']] },
  { feature: 'Built from proven transformer and tap-changer technology', cells: [['yes', 'Yes'], ['no', 'Voltage-sourced converters'], ['yes', 'Yes']] },
  { feature: 'Response time', cells: [['partial', 'Seconds, enough for most utility needs'], ['yes', 'Milliseconds'], ['partial', 'Seconds']] },
  { feature: 'Cost', cells: [['yes', 'A fraction of power electronics; comparable to phase angle regulator'], ['no', 'Highest of the three'], ['yes', 'Lowest of the three']] },
  { feature: 'Portable and redeployable', cells: [['yes', 'Yes'], ['no', 'No'], ['yes', 'Yes']] },
  { feature: 'Component availability over decades', cells: [['yes', 'Long-lived components'], ['no', 'Electronics become obsolete'], ['yes', 'Long-lived components']] },
];

const BENEFITS = [
  ['Efficiency', 'Reduces reactive power and energy losses in generators, transformers, and lines'],
  ['Sustainability', 'Cuts unnecessary generation to provide the line loss and lowers environmental impact'],
  ['Grid optimization', 'Harnesses the dormant capacity of underutilized lines, raising their power flows up to the lines’ thermal limits'],
  ['Congestion relief', 'Holds the power flow in a line at its design limit instead of tripping the line, which could start a cascading failure of the grid'],
  ['Cost reduction', 'A quicker, cheaper alternative to building new high-voltage transmission lines, a long and costly process'],
  ['Data center supply', 'Helps deliver the large amount of power, on a certain corridor, that modern data centers draw'],
  ['Flexibility', 'Portable and easily redeployed as grid demands evolve'],
  ['Interoperability', 'Works with components from various suppliers to reduce maintenance and lifecycle costs'],
];

const LevelIcon = ({ level }: { level: Level }) => {
  const label = { yes: 'Yes', partial: 'Partly', no: 'No' }[level];
  return (
    <span className="flex-shrink-0 mt-0.5">
      <span className="sr-only">{label}: </span>
      {level === 'yes' && (
        <svg className="w-5 h-5" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="#1E3A8A" /><path d="M5.5 10.5l3 3 6-6.5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      )}
      {level === 'partial' && (
        <svg className="w-5 h-5" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="9" fill="none" stroke="#94A3B8" strokeWidth="1.8" /><path d="M10 1a9 9 0 010 18z" fill="#94A3B8" /></svg>
      )}
      {level === 'no' && (
        <svg className="w-5 h-5" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="9" fill="none" stroke="#CBD5E1" strokeWidth="1.8" /><path d="M7 7l6 6M13 7l-6 6" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" /></svg>
      )}
    </span>
  );
};

function ComparisonTable() {
  return (
    // on wide screens the table extends past the text column so the cells wrap less
    <div className="xl:-mx-16">
      <div className="overflow-x-auto rounded-2xl border border-[#D9E0EA] bg-white shadow-[0_20px_40px_-28px_rgba(15,27,51,0.45)]">
        <table className="w-full min-w-[760px] table-fixed border-collapse text-left">
          <caption className="sr-only">Comparison of the Sen Transformer with the UPFC and the phase angle regulator</caption>
          {/* the highlighted Sen Transformer column has the longest answers, so it gets the most room after the labels */}
          <colgroup>
            <col className="w-[28%]" />
            <col className="w-[28%]" />
            <col className="w-[22%]" />
            <col className="w-[22%]" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col" className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-[#64748B] align-bottom">Capability</th>
              {COMPETITORS.map((name, i) => (
                <th key={name} scope="col" className={`px-5 py-4 align-bottom text-base font-bold ${i === 0 ? 'bg-[#1E3A8A] text-white rounded-t-xl' : 'text-[#0F1B33]'}`}>{name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((row, r) => (
              <tr key={row.feature} className="border-t border-[#E6EBF2]">
                <th scope="row" className="px-5 py-3.5 text-[15px] leading-snug font-semibold text-[#0F1B33] align-middle">{row.feature}</th>
                {row.cells.map(([level, text], i) => (
                  <td key={i} className={`px-5 py-3.5 align-middle text-[15px] leading-snug ${i === 0 ? 'bg-[#EEF3FC] text-[#0F1B33] font-medium' : 'text-[#475569]'} ${i === 0 && r === COMPARISON.length - 1 ? 'rounded-b-xl' : ''}`}>
                    <span className="flex gap-2.5"><LevelIcon level={level} /><span>{text}</span></span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-sm text-[#64748B]">
        Qualitative comparison. See the IEEE papers on the <a className="underline hover:text-[#1E3A8A]" href="https://ieeexplore.ieee.org/document/1234714" target="_blank" rel="noopener noreferrer">Sen Transformer vs the UPFC</a> and the <a className="underline hover:text-[#1E3A8A]" href="https://ieeexplore.ieee.org/document/7741516" target="_blank" rel="noopener noreferrer">Sen Transformer vs the phase angle regulator</a>.
      </p>
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus('sending');
    try {
      const res = await fetch("https://formspree.io/f/mnjdrqwa", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error();
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  const fieldClass = "w-full rounded-lg bg-[#071330] border border-[#24345A] px-4 py-3 text-white placeholder:text-[#5B6B8C] focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30 transition";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-[#C7D2E5] mb-1.5">Name</label>
          <input id="contact-name" type="text" name="name" autoComplete="name" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-[#C7D2E5] mb-1.5">Email</label>
          <input id="contact-email" type="email" name="email" autoComplete="email" required className={fieldClass} />
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-[#C7D2E5] mb-1.5">Message</label>
        <textarea id="contact-message" name="message" rows={5} required className={fieldClass} />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <button type="submit" disabled={status === 'sending'}
          className="bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-60 disabled:cursor-wait text-white font-semibold px-6 py-3 rounded-lg transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
        <p aria-live="polite" className={`text-sm ${status === 'error' ? 'text-[#FCA5A5]' : 'text-[#93C5FD]'}`}>
          {status === 'sent' && "Message sent. We'll reply by email."}
          {status === 'error' && 'Your message didn’t go through. Check your connection and try again, or email us directly.'}
        </p>
      </div>
    </form>
  );
}

// The visitor's choice to pause the hero waves, remembered across visits
const WAVES_PAUSED_KEY = 'heroWavesPaused';
const readWavesPaused = () => {
  try { return localStorage.getItem(WAVES_PAUSED_KEY) === '1'; } catch { return false; }
};
const subscribeWavesPaused = (onChange: () => void) => {
  window.addEventListener(WAVES_PAUSED_KEY, onChange);
  window.addEventListener('storage', onChange);
  return () => {
    window.removeEventListener(WAVES_PAUSED_KEY, onChange);
    window.removeEventListener('storage', onChange);
  };
};

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
        const fadePoint = window.innerHeight * 0.8;

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const indicatorEl = scrollIndicatorRef.current;
            if (!indicatorEl) return;
            indicatorEl.classList.toggle("opacity-0", window.scrollY > fadePoint);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const wavesPaused = useSyncExternalStore(subscribeWavesPaused, readWavesPaused, () => false);

    const toggleWaves = () => {
        try { localStorage.setItem(WAVES_PAUSED_KEY, wavesPaused ? '0' : '1'); } catch {}
        window.dispatchEvent(new Event(WAVES_PAUSED_KEY));
    };

    // Reveal marked elements once as they scroll into view
    useEffect(() => {
        const els = document.querySelectorAll<HTMLElement>('[data-reveal]');
        if (!('IntersectionObserver' in window)) {
            els.forEach(el => el.classList.add('is-visible'));
            return;
        }
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        els.forEach(el => io.observe(el));
        return () => io.disconnect();
    }, []);

    const navLinkClass = `transition-colors duration-300 font-medium px-3 py-2 rounded-md focus-visible:outline-2 focus-visible:outline-[#3B82F6] ${
        scrolled ? 'text-[#334155] hover:text-[#1E3A8A]' : 'text-[#B6C2D9] hover:text-white'
    }`;

    return (
        <div style={{ fontFamily: 'Inter, sans-serif' }} className="bg-[#111827] text-[#F9FAFB]">

            <a href="#overview-content" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:bg-white focus:text-[#0F1B33] focus:px-4 focus:py-2 focus:rounded-md">Skip to content</a>

            {/* FIXED NAVIGATION */}
            <header className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-all duration-500 ${
                scrolled
                    ? 'bg-white/95 shadow-[0_1px_0_rgba(15,27,51,0.08),0_8px_24px_-12px_rgba(15,27,51,0.25)]'
                    : 'bg-[#071330]/60 border-b border-white/10'
            }`}>
                <div className={`container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500 ${
                    scrolled ? 'h-16' : 'h-20'
                } flex items-center justify-between`}>
                    <a href="#home" className="flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-[#3B82F6]">
                        <Logo className={`w-auto flex-shrink-0 transition-[height] duration-500 ${scrolled ? 'h-12' : 'h-16'}`} />
                        <span className={`text-lg sm:text-xl font-bold tracking-tight transition-colors duration-500 ${
                            scrolled ? 'text-[#0F1B33]' : 'text-white'
                        }`}>Sen Engineering Solutions</span>
                    </a>

                    <nav className="hidden md:flex items-center gap-1" aria-label="Main">
                        {NAV_LINKS.map(link => (
                            <a key={link.href} href={link.href} className={navLinkClass}>{link.label}</a>
                        ))}
                        <a href="#contact-section" className="ml-3 font-semibold px-4 py-2 rounded-lg bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]">Contact us</a>
                    </nav>

                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-expanded={isMenuOpen}
                        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                        className={`md:hidden p-2 rounded-md focus-visible:outline-2 focus-visible:outline-[#3B82F6] transition-colors duration-500 ${
                            scrolled ? 'text-[#0F1B33]' : 'text-white'
                        }`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                        </svg>
                    </button>
                </div>

                <div className={`md:hidden ${scrolled ? 'bg-white border-t border-[#E2E8F0]' : 'bg-[#071330] border-t border-white/10'} ${isMenuOpen ? 'block' : 'hidden'}`}>
                    {NAV_LINKS.map(link => (
                        <a key={link.href} onClick={() => setIsMenuOpen(false)} href={link.href} className={`block py-3 px-4 font-medium ${
                            scrolled ? 'text-[#334155] hover:bg-[#F1F5F9]' : 'text-[#B6C2D9] hover:bg-white/5 hover:text-white'
                        }`}>{link.label}</a>
                    ))}
                    <a onClick={() => setIsMenuOpen(false)} href="#contact-section" className="block py-3 px-4 text-white bg-[#2563EB] hover:bg-[#1D4ED8] font-semibold">Contact us</a>
                </div>
            </header>

            <main className="pt-0">
                {/* HERO */}
                <section id="home" className="relative h-[100svh] min-h-[640px] w-full flex flex-col text-center bg-[radial-gradient(ellipse_at_50%_35%,#10275C_0%,#071330_55%,#050B1E_100%)] overflow-hidden">
                    <HeroBackground paused={wavesPaused} />

                    <div className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 pt-24 pb-6">
                    <div className="max-w-5xl">
                        <h1 className="hero-rise text-[2.6rem] sm:text-6xl lg:text-7xl [@media(min-width:1024px)_and_(max-height:820px)]:text-6xl font-black mb-5 text-white tracking-tighter leading-[1.05]" style={{ animationDelay: '100ms' }}>
                            Sen Engineering Solutions, Inc.
                        </h1>
                        <p className="hero-rise text-lg sm:text-xl lg:text-2xl text-[#B6C2D9] max-w-3xl mx-auto leading-relaxed" style={{ animationDelay: '300ms' }}>
                            A technology company developing the <strong className="text-white font-semibold">SMART Power Flow Controller</strong> - a functional requirements-based, cost-effective solution.
                        </p>
                        <div className="hero-rise mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3" style={{ animationDelay: '500ms' }}>
                            <a href="#overview-content" className="px-3.5 sm:px-6 py-3 text-sm sm:text-base rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">See how it works</a>
                            <a href="#reading-content" className="px-3.5 sm:px-6 py-3 text-sm sm:text-base rounded-lg border border-white/25 hover:border-white/60 hover:bg-white/5 text-white font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Read the research</a>
                        </div>
                    </div>
                    </div>

                    {/* Band kept clear so the grid scene is never behind the text or buttons */}
                    <div aria-hidden="true" className="flex-shrink-0" style={{ height: SCENE_BAND }} />

                    <a ref={scrollIndicatorRef} href="#overview-content" aria-label="Scroll to overview" className="hidden sm:block absolute bottom-16 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-500 rounded-md focus-visible:outline-2 focus-visible:outline-[#3B82F6]">
                        <span className="flex flex-col items-center text-[#8FA0C2] hover:text-white transition duration-300">
                            <svg className="w-6 h-6 animate-bounce motion-reduce:animate-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </span>
                    </a>

                    {/* Pause control for the background motion */}
                    <button
                        type="button"
                        onClick={toggleWaves}
                        aria-pressed={wavesPaused}
                        aria-label={wavesPaused ? 'Play background animation' : 'Pause background animation'}
                        title={wavesPaused ? 'Play background animation' : 'Pause background animation'}
                        className="absolute bottom-16 right-6 z-10 w-10 h-10 grid place-items-center rounded-full border border-white/20 text-[#B6C2D9] hover:text-white hover:border-white/50 bg-[#071330]/50 backdrop-blur transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]">
                        {wavesPaused ? (
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                        ) : (
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" /></svg>
                        )}
                    </button>

                    {/* Gradient Fade Overlay */}
                    <div className="absolute bottom-0 w-full h-12 bg-gradient-to-t from-[#F9FAFB] to-transparent pointer-events-none"></div>
                </section>

                {/* TECHNOLOGY OVERVIEW CONTENT (Light Theme) - Enhanced animations */}
                <section id="overview-content" className="py-16 sm:py-24 bg-[#F9FAFB] text-[#0A0A0A]">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                        
                        <h2 className="text-5xl font-extrabold text-center mb-6 text-[#1E3A8A]">SMART Power Flow Controller - Empowering the Grid</h2>
                        
                        {/* Introduction */}
                        <div className="mb-16 text-center">
                            <p className="text-xl text-[#374151] leading-relaxed mb-8">
                                <strong>SMART Power Flow Controller</strong> is a breakthrough in bulk power system technology, hosting a range of benefits over traditional power flow solutions. SMART Power Flow Controller, a patented technology, acts as an Impedance Regulating Transformer and offers a plethora of power flow control features independent active and reactive power flows, voltage, phase angle, Impedance (XL or XC and R or –R, all independently variable) in one, multi-use unit to provide a reliable, cost‐effective, and portable solution to meet today's needs to modernize the grid.
                            </p>

                            {/* Product Image Suggestion Placement */}
                            <div className="my-10 p-6 bg-gray-200 rounded-xl shadow-inner border border-gray-300 hover:shadow-xl transition-shadow duration-300">
                                <Image
                                    src="/smart power flow.jpg"
                                    alt="SMART Power Flow Controller Product Image"
                                    width={929}
                                    height={585}
                                    sizes="(min-width: 1024px) 976px, 100vw"
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
                                The SMART Power Flow Controller (SPFC) redefines how electricity moves through the grid - offering precise, independent control over active and reactive power. By intelligently managing energy flow, it maximizes efficiency, enhances reliability, and minimizes losses across the transmission network.
                            </p>
                            <p className="text-lg text-[#374151] leading-relaxed mb-8">
                                Unlike traditional solutions built around a single technology, the SPFC unites the best features of all power-flow concepts developed until now into one, functional-requirements-based system that's simple, scalable, and cost-effective.
                            </p>
                            
                            {/* Read More Toggle Button */}
                            <button onClick={() => setIsExpanded(!isExpanded)} className="flex items-center text-lg font-semibold text-[#2563EB] hover:text-[#1E3A8A] transition-all duration-300 hover:translate-x-1">
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
                                        <span className="font-bold text-[#2563EB] mr-3 whitespace-nowrap">S - Specific:</span> 
                                        <span>Meets the actual needs of utilities</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="font-bold text-[#2563EB] mr-3 whitespace-nowrap">M - Measurable:</span> 
                                        <span>Reliable, efficient, cost-effective, and portable</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="font-bold text-[#2563EB] mr-3 whitespace-nowrap">A - Attainable:</span> 
                                        <span>Built for realistic grid performance expectations</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="font-bold text-[#2563EB] mr-3 whitespace-nowrap">R - Relevant:</span> 
                                        <span>Improves overall grid efficiency and resilience</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="font-bold text-[#2563EB] mr-3 whitespace-nowrap">T - Time-Bound:</span> 
                                        <span>Delivered with defined milestones</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Content Block 2: Key Benefits */}
                        <div className="mb-16">
                            <h3 className="text-4xl font-bold mb-6 text-[#0A0A0A]">Key Benefits</h3>
                            
                            <p className="text-lg text-[#374151] leading-relaxed mb-8 max-w-3xl">
                                How the SPFC compares with the other ways to control power flow on a transmission line.
                            </p>

                            <ComparisonTable />

                            <h4 className="mt-14 mb-5 text-2xl font-bold text-[#0A0A0A]">What utilities gain by using Sen Transformer</h4>
                            <dl className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
                                {BENEFITS.map(([title, text]) => (
                                    <div key={title} className="border-t-2 border-[#1E3A8A] pt-3">
                                        <dt className="font-semibold text-[#0A0A0A]">{title}</dt>
                                        <dd className="mt-1 text-[#374151] leading-relaxed">{text}</dd>
                                    </div>
                                ))}
                            </dl>

                            {/* The Result */}
                            <div className="mt-10 p-6 bg-[#3B82F6]/10 rounded-xl border border-[#3B82F6]/30 shadow-md hover:shadow-xl transition-shadow duration-300">
                                <h4 className="text-2xl font-bold text-[#1E3A8A] mb-2">The Result</h4>
                                <p className="text-lg text-[#374151]">
                                    A more intelligent, reliable, and sustainable power grid - built around functional requirements rather than rigid technologies. The SPFC enables utilities to do more with existing infrastructure, ensuring a smarter, cleaner, and future-ready energy system.
                                </p>
                            </div>
                        </div>

                    </div>
                </section>

                {/* FURTHER READING */}
                <section id="reading-content" className="py-20 sm:py-28 bg-[#EEF2F7] text-[#0F1B33]">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                        <header className="text-center max-w-2xl mx-auto mb-16">
                            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0F1B33]">Further reading</h2>
                            <p className="mt-4 text-lg text-[#475569] leading-relaxed">
                                Books, papers, and articles on power flow control by K. K. Sen and M. L. Sen.
                            </p>
                            <nav aria-label="Reading sections" className="mt-8 flex flex-wrap justify-center gap-2">
                                {READING_LINKS.map(([id, label]) => (
                                    <a key={id} href={`#${id}`} className="px-4 py-2 rounded-full bg-white border border-[#D9E0EA] text-sm font-semibold text-[#1E3A8A] hover:border-[#3B82F6] hover:bg-[#F3F6FB] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]">{label}</a>
                                ))}
                            </nav>
                        </header>

                        {/* Books */}
                        <div id="books" className="scroll-mt-28 mb-20">
                            <ReadingHeading title="Books" count={BOOKS.length} />
                            <div className="grid md:grid-cols-2 gap-6">
                                {BOOKS.map((book, i) => (
                                    <article key={book.isbn} data-reveal style={{ transitionDelay: `${i * 120}ms` }}
                                        className="book-card flex flex-col sm:flex-row gap-6 bg-white rounded-2xl p-6 border border-[#D9E0EA] shadow-[0_20px_40px_-28px_rgba(15,27,51,0.45)]">
                                        <a href={book.url} target="_blank" rel="noopener noreferrer" tabIndex={-1} className="flex-shrink-0 self-center sm:self-start">
                                            <Image src={book.cover} alt={`Cover of ${book.title}`} width={book.width} height={book.height} sizes="144px" className="book-cover w-36 sm:w-32 lg:w-36 h-auto rounded-md" />
                                        </a>
                                        <div className="flex flex-col">
                                            <h4 className="text-xl font-bold leading-snug text-[#0F1B33]">{book.title}</h4>
                                            <p className="mt-2 text-sm text-[#64748B]">By K. K. Sen and M. L. Sen, published by Wiley. ISBN {book.isbn}</p>
                                            <p className="mt-3 text-[#475569] leading-relaxed">{book.blurb}</p>
                                            <a href={book.url} target="_blank" rel="noopener noreferrer"
                                                className="mt-4 inline-flex items-center gap-1.5 self-start font-semibold text-[#1E3A8A] hover:text-[#3B82F6] rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]">
                                                View on Wiley <ExternalIcon className="w-4 h-4" />
                                            </a>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>

                        {/* IEEE papers */}
                        <div id="ieee-papers" className="scroll-mt-28 mb-20">
                            <ReadingHeading title="IEEE papers" count={IEEE_PAPERS.length} />
                            <ResourceGrid items={IEEE_PAPERS} />
                        </div>

                        {/* Articles and press */}
                        <div className="grid md:grid-cols-2 gap-x-10 gap-y-16">
                            <div id="industry-articles" className="scroll-mt-28">
                                <ReadingHeading title="Industry articles" count={INDUSTRY_ARTICLES.length} />
                                <ResourceGrid items={INDUSTRY_ARTICLES} single />
                            </div>
                            <div id="press" className="scroll-mt-28">
                                <ReadingHeading title="Press" count={PRESS.length} />
                                <ResourceGrid items={PRESS} single />
                            </div>
                        </div>
                    </div>
                </section>

                {/* PROJECTS */}
                <section id="projects-content" className="py-20 sm:py-28 bg-[#071330] text-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                        <header className="text-center max-w-3xl mx-auto mb-12">
                            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-balance">The world&apos;s first commercial-grade Sen Transformer</h2>
                            <p className="mt-5 text-lg text-[#B6C2D9] leading-relaxed">
                                Designed with Ampcontrol, built at 33 kV, and tested to show that active and reactive power flows can be regulated independently in both directions.
                            </p>
                        </header>

                        <figure data-reveal className="max-w-3xl mx-auto">
                            <Image
                                src="/sentransformer.jpg"
                                alt="The commercial-grade Sen Transformer unit after testing"
                                width={1202}
                                height={1297}
                                sizes="(min-width: 768px) 768px, 100vw"
                                className="rounded-2xl object-cover w-full h-auto border border-white/10"
                            />
                            <figcaption className="mt-3 text-sm text-[#8FA0C2] text-center">The successfully tested commercial-grade Sen Transformer unit.</figcaption>
                        </figure>

                        {/* Rating plate, styled after the stamped nameplate on a real transformer */}
                        <div data-reveal className="nameplate max-w-3xl mx-auto mt-10">
                            <span className="nameplate-screw left-3 top-3" /><span className="nameplate-screw right-3 top-3" />
                            <span className="nameplate-screw left-3 bottom-3" /><span className="nameplate-screw right-3 bottom-3" />
                            <div className="nameplate-inner grid md:grid-cols-[1fr_1.7fr] gap-x-10 gap-y-4 items-center">
                                <div>
                                    <p className="text-2xl font-black tracking-tight text-[#1F2937]">Sen Transformer</p>
                                    <p className="text-sm font-medium text-[#4B5563]">Impedance regulating transformer</p>
                                </div>
                                <dl className="divide-y divide-[#9CA3AF]/50 border-y border-[#9CA3AF]/50">
                                    {NAMEPLATE.map(([label, value]) => (
                                        <div key={label} className="grid grid-cols-[7.5rem_1fr] gap-3 py-2.5 text-sm">
                                            <dt className="text-[#4B5563]">{label}</dt>
                                            <dd className="font-semibold text-[#111827] tabular-nums">{value}</dd>
                                        </div>
                                    ))}
                                </dl>
                            </div>
                        </div>

                        {/* Announcement text, centered column */}
                        <blockquote className="mt-20 max-w-2xl mx-auto">
                            <p className="text-center text-xl sm:text-2xl leading-relaxed text-white text-balance">
                                Ampcontrol is excited to announce that in collaboration with Sen Engineering Solutions, Inc., we have designed, manufactured and extensively tested the <strong>world&apos;s first commercial-grade Sen Transformer</strong>, a patented technology, that acts as an Impedance Regulating Transformer. Sometimes, there comes a technical advancement that is simple, elegant and effective.
                            </p>
                            <div className="mx-auto my-10 h-px w-16 bg-[#3B82F6]" aria-hidden="true" />
                            <div className="space-y-5 text-lg text-[#C7D2E5] leading-relaxed">
                                <p>
                                    Sen Transformer marks the first breakthrough in bulk power system design in more than a century, hosting a range of benefits over traditional power flow solutions. Sen Transformer, which offers a plethora of power flow control features, such as independent active and reactive power flows, voltage, phase angle, impedance (XL or XC and R or –R, all independently variable), all in one unit, uses time‐tested components, such as transformer and load tap changers that are proven to be reliable, cost‐effective, and portable to meet today&apos;s needs to modernize the grid.
                                </p>
                                <p>
                                    A commercial-grade Sen Transformer was designed to operate at <strong className="text-white">33 kV</strong> with a throughput rating of <strong className="text-white">±6.5 MVA</strong>. The unit was manufactured and tested to demonstrate the proof of concept. The test results show that the bidirectional active and reactive power flows can be regulated independently, proving that the Sen Transformer is a practical solution to meet utilities&apos; needs in terms of reliability, cost-effectiveness, component non-obsolescence, efficiency, portability and interoperability.
                                </p>
                                <p>
                                    The Sen Transformer is being further tested in a 33 kV radial line at the EPRI lab in the USA.
                                </p>
                            </div>
                            <footer className="mt-10 text-center">
                                <a href="https://ampcontrolgroup.com/projects/sen-transformer?utm_campaign=Power%20Infrastructure_FY26&utm_source=linkedin&utm_medium=Ampcontrol&utm_content=Image&utm_term=P%26I_Sen%20Transformer" target="_blank" rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-white/25 hover:border-white/60 hover:bg-white/5 font-semibold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]">
                                    Read Ampcontrol&apos;s project overview <ExternalIcon className="w-4 h-4" />
                                </a>
                            </footer>
                        </blockquote>
                    </div>
                </section>

                {/* LEADERSHIP */}
                <section id="leadership" className="py-20 sm:py-28 bg-[#F7F9FC] text-[#0F1B33]">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
                        <div className="max-w-2xl mx-auto mb-14 text-center">
                            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Leadership</h2>
                            <p className="mt-4 text-lg text-[#475569] leading-relaxed">
                                The engineers behind the Sen Transformer and the SMART Power Flow Controller.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-8">
                            {LEADERS.map((person, i) => (
                                <article key={person.name} data-reveal style={{ transitionDelay: `${i * 120}ms` }}
                                    className="bg-white rounded-2xl border border-[#D9E0EA] p-6 sm:p-8 shadow-[0_20px_40px_-30px_rgba(15,27,51,0.45)]">
                                    <header className="flex flex-col items-center text-center gap-5">
                                        <Image
                                            src={person.photo}
                                            alt={`Portrait of ${person.name}`}
                                            width={person.photoWidth}
                                            height={person.photoHeight}
                                            sizes="200px"
                                            className="h-44 sm:h-52 w-auto max-w-full rounded-2xl flex-shrink-0 bg-[#E2E8F0]"
                                        />
                                        <div>
                                            <h3 className="text-2xl sm:text-[1.7rem] font-extrabold leading-tight">{person.name}</h3>
                                            <p className="text-sm text-[#64748B] mt-0.5">{person.credentials}</p>
                                            <p className="mt-2 font-semibold text-[#1E3A8A]">{person.title}</p>
                                        </div>
                                    </header>

                                    <p className="mt-6 text-center text-[#475569] leading-relaxed">{person.role}</p>

                                    <div className="mt-4 flex flex-wrap justify-center gap-2">
                                        {person.emails.map(email => (
                                            <a key={email} href={`mailto:${email}`}
                                                className="inline-flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full bg-[#EEF2F7] text-[#1E3A8A] hover:bg-[#DCE6F7] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                                {email}
                                            </a>
                                        ))}
                                    </div>

                                    <h4 className="mt-8 text-lg font-bold">Education</h4>
                                    <dl className="mt-3 divide-y divide-[#E6EBF2] border-y border-[#E6EBF2]">
                                        {person.education.map(ed => (
                                            <div key={ed.degree} className="grid grid-cols-[4.5rem_1fr_auto] gap-3 py-2.5 text-[15px]">
                                                <dt className="font-semibold">{ed.degree}</dt>
                                                <dd className="text-[#475569]">{ed.school}</dd>
                                                <dd className="text-[#64748B] tabular-nums">{ed.year}</dd>
                                            </div>
                                        ))}
                                    </dl>

                                    <h4 className="mt-8 text-lg font-bold">Expertise and recognition</h4>
                                    <ul className="mt-3 space-y-3 text-[15px] text-[#475569] leading-relaxed">
                                        {person.highlights.map((item, j) => (
                                            <li key={j} className="relative pl-5 [&_strong]:text-[#0F1B33] [&_strong]:font-semibold">
                                                <span className="absolute left-0 top-[0.6em] w-2 h-2 rounded-full bg-[#3B82F6]" aria-hidden="true" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CONTACT */}
                <section id="contact-section" className="py-20 sm:py-28 bg-[#071330] text-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-16">
                        <div>
                            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">Contact us</h2>
                            <p className="mt-4 text-lg text-[#B6C2D9] leading-relaxed max-w-md">
                                Questions about the SMART Power Flow Controller, a project, or a talk? Send a message and we’ll reply by email.
                            </p>
                            <div className="mt-8 space-y-4">
                                {LEADERS.map(person => (
                                    <div key={person.name}>
                                        <p className="font-semibold">{person.name}</p>
                                        <a href={`mailto:${person.emails[0]}`} className="text-[#93C5FD] hover:text-white rounded focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B82F6]">{person.emails[0]}</a>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#0C1C42] rounded-2xl p-6 sm:p-8 border border-[#1C2D55]">
                            <ContactForm />
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-[#050B1E] text-[#8FA0C2] border-t border-white/5">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-10">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <a href="#" className="flex items-center gap-3 shrink-0">
                                <Logo className="h-14 w-auto flex-shrink-0" />
                                <span className="text-white font-semibold whitespace-nowrap">Sen Engineering Solutions, Inc.</span>
                            </a>
                            <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm" aria-label="Footer">
                                {NAV_LINKS.map(link => (
                                    <a key={link.href} href={link.href} className="whitespace-nowrap hover:text-white transition-colors">{link.label}</a>
                                ))}
                                <a href="#contact-section" className="whitespace-nowrap hover:text-white transition-colors">Contact</a>
                            </nav>
                        </div>
                        <p className="mt-8 pt-6 border-t border-white/5 text-xs text-center text-[#8FA0C2]">&copy; {new Date().getFullYear()} Sen Engineering Solutions, Inc. All rights reserved.</p>
                    </div>
                </footer>

            </main>
        </div>
    );
}
