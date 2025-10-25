'use client';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import logo from '../public/logo.png';

/**
 * Enhanced EasyGrocery page
 * - Animated status cycling in mobile mockup (4s interval)
 * - Mobile mockup visually fronted and emphasized
 * - Improved visuals, gradients, micro-interactions
 *
 * To add your video: replace src="/videos/demo.mp4" with your path.
 */

const STATUS_CYCLE = ['Pending', 'Not Found', 'Purchased', 'Not Available'];
const STATUS_COLORS: Record<string, string> = {
  Pending: 'bg-yellow-100 text-yellow-800',
  'Not Found': 'bg-orange-100 text-orange-800',
  Purchased: 'bg-green-100 text-green-800',
  'Not Available': 'bg-red-100 text-red-800',
};

const EasyGrocery: NextPage = () => {
  // Intersection animation for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('animate-fadeInUp', 'opacity-100', 'translate-y-0');
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('section').forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Animated status cycling for mockup
  const [statusIndex, setStatusIndex] = useState(0);
  const statusRef = useRef(0);
  useEffect(() => {
    statusRef.current = 0;
    const interval = setInterval(() => {
      statusRef.current = (statusRef.current + 1) % STATUS_CYCLE.length;
      setStatusIndex(statusRef.current);
    }, 4000); // change every 4s
    return () => clearInterval(interval);
  }, []);

  // for "floating" micro-animation when status changes
  const [pulseKey, setPulseKey] = useState(0);
  useEffect(() => {
    setPulseKey((k) => k + 1);
  }, [statusIndex]);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-poppins antialiased">
      <Head>
        <title>EasyGrocery — Simplify Your Shopping</title>
        <meta name="description" content="EasyGrocery streamlines grocery shopping with smart lists, categories, reminders and family sharing." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      {/* Decorative backgrounds */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-sky-50 to-white opacity-95"></div>
        <div aria-hidden className="absolute -left-44 -top-40 w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-blue-200/40 to-sky-400/10 blur-3xl animate-blob" />
        <div aria-hidden className="absolute -right-36 -bottom-12 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-sky-100/20 to-transparent blur-2xl" />
      </div>

      {/* Header */}
      <header className="sticky top-6 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between gap-4 bg-white/80 backdrop-blur rounded-2xl border border-slate-100 p-4 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-lg  flex items-center justify-center text-black font-bold shadow">
                  <Image src={logo} alt='logo easygrocery'/>
           
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-semibold">EasyGrocery</h1>
                <p className="text-xs text-slate-500 -mt-0.5">Simplify your shopping</p>
              </div>
            </div>

            <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-700">
              <a href="#features" className="hover:text-sky-600 transition">Features</a>
              <a href="#screen" className="hover:text-sky-600 transition">Preview</a>
              <a href="#why-choose" className="hover:text-sky-600 transition">Why</a>
              <a href="#privacy" className="hover:text-sky-600 transition">Privacy</a>
            </nav>

            <div className="hidden sm:flex items-center gap-3">
              <a href="#get-started" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#e7e6e6ff] to-[#e7e6e6ff] text-black font-semibold shadow-lg hover:scale-[1.02] transition-transform">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">Simplify Grocery Shopping — Fast, Smart & Organized</h2>
            <p className="text-lg text-slate-600 max-w-2xl">
              EasyGrocery helps you create smart lists, categorize items, share with family, and receive automated reminders — all in a clean, intuitive experience.
            </p>

            <div className="flex items-center gap-4">
              <a href="#features" className="px-6 py-3 rounded-full bg-gradient-to-r from-[#e7e6e6ff] to-[#e7e6e6ff] text-black font-semibold shadow hover:opacity-95 transition">Explore Features</a>
              <a href="#screen" className="px-5 py-3 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 transition">Preview App</a>
            </div>

           
          </div>

          {/* Hero small card visual */}
          <div className="relative flex items-center justify-center">
            <div className="w-full max-w-sm rounded-2xl p-6 bg-white border border-slate-100 shadow-2xl transform -rotate-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Weekly Groceries</h3>
                  <p className="text-xs text-slate-400">Updated 2h ago</p>
                </div>
                <div className="text-sm text-slate-500">List • 12</div>
              </div>

             <ul className="mt-3 divide-y divide-slate-100">
                      {/* map a few items; the first item will show animated status */}
                      {['Milk','Bread','Tomatoes'].map((item, idx) => {
                        const showStatus = idx === 0; // animate only the first item
                        const status = showStatus ? STATUS_CYCLE[statusIndex] : (idx === 1 ? 'Pending' : 'Purchased');
                        const colorClass = STATUS_COLORS[status] ?? 'bg-slate-100 text-slate-800';
                        return (
                          <li key={item} className="py-2 flex items-center justify-between">
                            <div>
                              <div className="text-sm font-medium">{item}</div>
                              <div className="text-xs text-slate-400">1 unit</div>
                            </div>

                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${colorClass} transition-all duration-600 ease-out transform ${showStatus ? 'status-pulse' : ''}`} key={pulseKey}>
                              {/* small animated dot */}
                              <span className={`w-2 h-2 rounded-full ${status === 'Purchased' ? 'bg-green-600' : status === 'Pending' ? 'bg-yellow-500' : status === 'Not Found' ? 'bg-orange-500' : 'bg-red-500'}`} />
                              <span>{status}</span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>

              <div className="mt-6 flex items-center gap-3">
                <button className="px-3 py-2 rounded-md bg-sky-50 text-sky-700 text-sm font-semibold border border-sky-100">Open List</button>
                <button className="px-3 py-2 rounded-md bg-white text-slate-700 text-sm border border-slate-200">Share</button>
              </div>
            </div>

            <div className="absolute -right-8 -bottom-8 w-44 h-28 rounded-xl bg-gradient-to-r from-blue-50 to-sky-50 border border-slate-100 shadow-lg" />
          </div>
        </div>
      </section>

      {/* SCREEN SECTION (emphasized mobile mockup with animated status) */}
      <section id="screen" className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* LEFT text */}
          <div className="space-y-5">
            <h3 className="text-3xl font-bold">See EasyGrocery in Action</h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              The preview on the right shows a live-like mockup. Video placeholder is built-in — replace the source when you're ready.
              Notice the item status below cycling automatically to showcase different states (Pending → Not Found → Purchased → Not Available).
            </p>

            <ul className="mt-4 space-y-3 text-slate-700">
              <li className="flex gap-3 items-start">
                <span className="mt-1 inline-block w-3 h-3 rounded-full bg-[#e7e6e6ff]" />
                Clean UI and fast scanning
              </li>
              <li className="flex gap-3 items-start">
                <span className="mt-1 inline-block w-3 h-3 rounded-full bg-[#e7e6e6ff]" />
                Real-time sync & family collaboration
              </li>
              <li className="flex gap-3 items-start">
                <span className="mt-1 inline-block w-3 h-3 rounded-full bg-[#e7e6e6ff]" />
                Auto reminders every 4 hours
              </li>
            </ul>

            <div className="mt-4">
              <a href="#get-started" className="inline-block px-5 py-3 rounded-full bg-gradient-to-r from-[#e7e6e6ff] to-[#e7e6e6ff] text-black font-semibold shadow">Start Free</a>
              <a href="#features" className="ml-3 text-sm text-slate-600 underline">Learn more</a>
            </div>
          </div>

          {/* RIGHT - the emphasized mobile mockup */}
          <div className="flex justify-center relative z-30">
            {/* put shadowed elevated mockup in front */}
            <div className="relative">
              <div className="rounded-[40px] w-[320px] h-[680px] bg-black overflow-hidden shadow-[0_30px_70px_rgba(14,165,233,0.12)] border-8 border-black flex flex-col">
                {/* top notch / camera area */}
                <div className="h-10 flex items-center justify-center bg-black/60">
                  <div className="w-24 h-2 rounded-full bg-black/30" />
                </div>

                {/* video area */}
                <div className="flex-1 relative">
                  <video
                    src="/videos/demo.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />

                  {/* overlay card (floating UI inside mockup) */}
                  <div className="absolute left-4 right-4 bottom-6 bg-white/95 backdrop-blur rounded-xl p-4 border border-slate-100 shadow-lg transform transition-transform">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-semibold">Weekly Groceries</h4>
                        <p className="text-xs text-slate-500">12 items • updated 1h ago</p>
                      </div>

                      <div className="text-xs text-slate-500">List</div>
                    </div>

                    <ul className="mt-3 divide-y divide-slate-100">
                      {/* map a few items; the first item will show animated status */}
                      {['Milk','Bread','Tomatoes'].map((item, idx) => {
                        const showStatus = idx === 0; // animate only the first item
                        const status = showStatus ? STATUS_CYCLE[statusIndex] : (idx === 1 ? 'Pending' : 'Purchased');
                        const colorClass = STATUS_COLORS[status] ?? 'bg-slate-100 text-slate-800';
                        return (
                          <li key={item} className="py-2 flex items-center justify-between">
                            <div>
                              <div className="text-sm font-medium">{item}</div>
                              <div className="text-xs text-slate-400">1 unit</div>
                            </div>

                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${colorClass} transition-all duration-600 ease-out transform ${showStatus ? 'status-pulse' : ''}`} key={pulseKey}>
                              {/* small animated dot */}
                              <span className={`w-2 h-2 rounded-full ${status === 'Purchased' ? 'bg-green-600' : status === 'Pending' ? 'bg-yellow-500' : status === 'Not Found' ? 'bg-orange-500' : 'bg-red-500'}`} />
                              <span>{status}</span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Floating label & front highlight */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#e7e6e6ff] to-sky-400 text-black px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                Live Preview
              </div>

              {/* subtle reflection */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[260px] h-8 bg-gradient-to-r from-transparent via-black/10 to-transparent rounded-full blur-lg opacity-60" />
            </div>
          </div>
        </div>
      </section>

      {/* PURPOSE */}
      <section id="purpose" className="py-16 px-6 bg-gradient-to-b from-white to-sky-50/30">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold">EasyGrocery — Our Purpose</h2>
          <p className="mt-6 text-lg text-slate-700 leading-relaxed">
            EasyGrocery's mission is to make grocery shopping easier, faster, and smarter. It organizes and automates lists so you can focus on real life.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureMini title="Create Lists" desc="Build grocery lists quickly and keep them organized." />
            <FeatureMini title="Custom Categories" desc="Group items however you like for faster shopping." />
            <FeatureMini title="Save Time" desc="Use automation to shop more efficiently." />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center">EasyGrocery Features</h2>
          <p className="text-center text-slate-600 mt-3 max-w-2xl mx-auto">
            Features built for simplicity and reliability — everything you need to manage grocery shopping.
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard title="Smart Shopping Experience" desc="Create organized lists inside the app — no pen and paper required." />
            <FeatureCard title="Custom Categories" desc="Select and organize categories your way to keep everything tidy and accessible." />
            <FeatureCard title="Simple & Clean Interface" desc="Minimal, intuitive UI so anyone can create and manage lists without confusion." />
            <FeatureCard title="Share Feature" desc="Family members can create and share lists instantly so everyone stays in sync." />
            <FeatureCard title="Purchase Status Options" desc="Track items as Purchased, Pending, Not Found, or Not Available for clarity." />
            <FeatureCard title="Auto Reminder Notification" desc="App sends notifications every 4 hours for unpurchased items so you don’t forget." />
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section id="why-choose" className="py-16 px-6 bg-sky-50/40">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center">Why Choose EasyGrocery?</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <WhyCard title="Real-Life Problem Solved" desc="Grocery list management is a household headache — EasyGrocery digitizes and simplifies it." />
            <WhyCard title="Smart & Manual Balance" desc="You keep control — app streamlines but never overrides your choices." />
            <WhyCard title="Family-Friendly Experience" desc="Family members can share and update lists instantly for smooth collaboration." />
            <WhyCard title="Clear Status System" desc="Item statuses make shopping confusion-free and efficient." />
          </div>
        </div>
      </section>

      {/* FUTURE UPDATES */}
      <section id="future" className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold">Future Updates / Coming Soon</h2>
          <p className="mt-4 text-slate-600">We are continuously improving EasyGrocery. Upcoming features include:</p>
          <ul className="mt-6 list-disc list-inside text-left text-slate-700">
            <li>Password-Protected Sharing — secure family sharing</li>
            <li>Delete for Everyone — remove shared lists from all devices</li>
            <li>Dark Mode — comfortable night viewing</li>
          </ul>

          <div className="mt-8 bg-white p-6 rounded-xl shadow-md border border-slate-100">
            <h3 className="text-xl font-semibold">Delete for Everyone Option</h3>
            <p className="mt-2 text-slate-600">If a list is shared mistakenly, delete it from both sides to prevent misuse.</p>
          </div>
        </div>
      </section>

      {/* PRIVACY */}
      <section id="privacy" className="py-16 px-6 bg-gradient-to-b from-white to-sky-50/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center">Privacy & Data Safety</h2>
          <p className="mt-4 text-center text-slate-600 max-w-3xl mx-auto">We value your privacy and protect your data. When you trust us with your information, we keep it safe.</p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <PrivacyCard title="Data Protection & Storage" desc="Lists and account info are stored in secure databases. We do not share user data with third parties or advertisers." />
            <PrivacyCard title="Account Security" desc="Accounts use unique credentials. We recommend strong passwords and include internal protections against unauthorized access." />
            <PrivacyCard title="Full User Control" desc="You can edit, delete, or create lists anytime. No hidden tracking or background monitoring." />
            <PrivacyCard title="Data Retention & App Removal" desc="If you uninstall, your data remains on secure servers so you can restore it when you log in again." />
            <PrivacyCard title="Regular Security Updates" desc="We continuously improve protection with each update." />
            <PrivacyCard title="Transparency Promise" desc="We communicate clearly about permissions or privacy-related features." />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 bg-[#e7e6e6ff] text-black">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center font-bold">
                <Image src={logo} alt='logo easygrocery'/>
              </div>
              <div className="text-left">
                <p className="font-semibold">EasyGrocery</p>
                <p className="text-xs text-black">Simplify your shopping</p>
              </div>
            </div>

            <p className="text-sm text-black">&copy; 2025 EasyGrocery. All rights reserved.</p>

            <div className="space-x-4">
              <a href="#privacy" className="text-black hover:text-black">Privacy Policy</a>
              <a href="#terms" className="text-black hover:text-black">Terms</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Global styles & animations */}
      <style jsx global>{`
        :root { --accent: #0ea5e9; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.68s ease-out forwards; }
        @keyframes blob { 0%{transform:translateY(0px) scale(1)}33%{transform:translateY(-12px) scale(1.05)}66%{transform:translateY(6px) scale(0.98);}100%{transform:translateY(0px) scale(1)} }
        .animate-blob { animation: blob 8s infinite; }

        /* status pulse when changed */
        @keyframes statusPulse {
          0% { transform: translateY(0) scale(1); opacity: 1; box-shadow: 0 0 0 rgba(0,0,0,0); }
          30% { transform: translateY(-4px) scale(1.03); opacity: 1; box-shadow: 0 12px 26px rgba(14,165,233,0.12); }
          100% { transform: translateY(0) scale(1); opacity: 1; box-shadow: none; }
        }
        .status-pulse { animation: statusPulse 700ms ease-out; }

        .font-poppins { font-family: 'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; }
      `}</style>
    </div>
  );
};

export default EasyGrocery;

/* -------------------------
   Small subcomponents used inside same file
   (keeps copy/paste simple)
   ------------------------- */

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition">
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="mt-2 text-slate-600">{desc}</p>
    </div>
  );
}

function WhyCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="mt-2 text-slate-600">{desc}</p>
    </div>
  );
}

function PrivacyCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="mt-2 text-slate-600">{desc}</p>
    </div>
  );
}

function FeatureMini({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow border border-slate-100 text-left">
      <h4 className="font-semibold">{title}</h4>
      <p className="mt-2 text-slate-600 text-sm">{desc}</p>
    </div>
  );
}
