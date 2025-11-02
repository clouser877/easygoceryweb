'use client';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaDownload, FaBars, FaTimes, FaMoon, FaSun, FaPaperPlane, FaCheck } from 'react-icons/fa';
import logo from '../public/logo.png';

const STATUS_CYCLE = ['Pending', 'Not Found', 'Purchased', 'Not Available'];
const STATUS_COLORS_LIGHT: Record<string, string> = {
  Pending: 'bg-yellow-100 text-yellow-800',
  'Not Found': 'bg-orange-100 text-orange-800',
  Purchased: 'bg-green-100 text-green-800',
  'Not Available': 'bg-red-100 text-red-800',
};
const STATUS_COLORS_DARK: Record<string, string> = {
  Pending: 'bg-yellow-900/20 text-yellow-300 border border-yellow-700/30',
  'Not Found': 'bg-orange-900/20 text-orange-300 border border-orange-700/30',
  Purchased: 'bg-green-900/20 text-green-300 border border-green-700/30',
  'Not Available': 'bg-red-900/20 text-red-300 border border-red-700/30',
};

const EasyGrocery: NextPage = () => {
  const [statusIndex, setStatusIndex] = useState(0);
  const [pulseKey, setPulseKey] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', query: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setError('');
  setShowSuccess(false);

  try {
    const res = await fetch('/api/sendEmail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        query: formData.query,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setShowSuccess(true);
      setFormData({ name: '', email: '', query: '' });
      setTimeout(() => setShowSuccess(false), 4000);
    } else {
      setError(data.error || 'Something went wrong.');
    }
  } catch (err) {
    setError('Network error. Please check your connection.');
  } finally {
    setIsSubmitting(false);
  }
};

  const statusRef = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp');
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('section').forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      statusRef.current = (statusRef.current + 1) % STATUS_CYCLE.length;
      setStatusIndex(statusRef.current);
      setPulseKey((k) => k + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const STATUS_COLORS = isDark ? STATUS_COLORS_DARK : STATUS_COLORS_LIGHT;


  return (
    <div className={`min-h-screen transition-all duration-500 ${isDark ? 'bg-black text-white' : 'bg-white text-slate-900'} font-poppins antialiased`}>
      <Head>
        <title>EasyGrocery — Simplify Your Shopping</title>
        <meta name="description" content="EasyGrocery streamlines grocery shopping with smart lists, categories, reminders and family sharing." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      {/* Grid Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-black via-gray-950 to-black' : 'bg-gradient-to-br from-white via-sky-50 to-white'} opacity-95`} />
        <div className="absolute inset-0 opacity-20">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `linear-gradient(${isDark ? '#1a1a1a' : '#e2e8f0'} 1px, transparent 1px), linear-gradient(90deg, ${isDark ? '#1a1a1a' : '#e2e8f0'} 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
              transform: 'perspective(800px) rotateX(20deg)',
              transformOrigin: 'bottom',
            }}
          />
        </div>
        <div className={`absolute -left-44 -top-40 w-[520px] h-[520px] rounded-full blur-3xl animate-blob ${isDark ? 'bg-sky-900/20' : 'bg-gradient-to-tr from-blue-200/40 to-sky-400/10'}`} />
        <div className={`absolute -right-36 -bottom-12 w-[420px] h-[420px] rounded-full blur-2xl ${isDark ? 'bg-sky-800/10' : 'bg-gradient-to-br from-sky-100/20 to-transparent'}`} />
      </div>

      {/* Header */}
      <header className="sticky top-6 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`flex items-center justify-between gap-4 rounded-2xl border p-4 shadow-md ${isDark ? 'bg-white/5 backdrop-blur-xl border-white/10' : 'bg-white/80 backdrop-blur border-slate-100'} transition-all duration-300`}>
            {/* Logo + Title */}
            <div className="flex items-center gap-3">
              {/* ROUNDED LOGO (CONTACT FORM STYLE) */}
              <div className="relative w-14 h-14">
                {/* Outer Gradient Ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#e7e6e6ff] to-[#e7e6e6ff] p-[2px] shadow-xl">
                  {/* Inner White Circle */}
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <Image
                      src={logo}
                      alt="EasyGrocery Logo"
                      width={36}
                      height={36}
                      className="w-9 h-9 object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Title */}
              <div>
                <h1 className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'} tracking-tight`}>
                  EasyGrocery
                </h1>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'} -mt-0.5`}>
                  Simplify your shopping
                </p>
              </div>
            </div>

            <nav className="hidden md:flex gap-6 text-sm font-medium">
              {['Features', 'Preview', 'Why Choose', 'Privacy', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-slate-700 hover:text-gray-600'} transition`}>
                  {item}
                </a>
              ))}
            </nav>

            <div className="hidden sm:flex items-center gap-3">
              <a
                href="/easygrocery.apk"
                download
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-semibold shadow-lg transition-transform ${isDark ? 'bg-white text-black hover:scale-105' : 'bg-gradient-to-r from-[#e7e6e6ff] to-[#e7e6e6ff] text-black hover:scale-[1.02]'}`}
              >
                Download App
              </a>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsDark(!isDark)}
                className={`p-2 rounded-full ${isDark ? 'bg-gray-700 text-white' : 'bg-slate-200 text-slate-700'} transition`}
              >
                {isDark ? <FaSun /> : <FaMoon />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden p-2 rounded-lg ${isDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'} transition`}
              >
                {mobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`md:hidden mt-2 rounded-xl border p-4 shadow-lg ${isDark ? 'bg-white/5 backdrop-blur-xl border-white/10' : 'bg-white/90 backdrop-blur border-slate-100'}`}
            >
              <nav className="flex flex-col gap-3 text-sm font-medium">
                {['Features', 'Preview', 'Why Choose', 'Privacy', 'Contact'].map((item) => (
                  <a key={item} href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={() => setMobileMenuOpen(false)} className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-slate-700 hover:text-sky-600'}`}>
                    {item}
                  </a>
                ))}
                <a
                  href="/easygrocery.apk"
                  download
                  onClick={() => setMobileMenuOpen(false)}
                  className={`mt-3 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full font-semibold shadow ${isDark ? 'bg-white text-black' : 'bg-gradient-to-r from-[#e7e6e6ff] to-[#e7e6e6ff] text-black'}`}
                >
                  <FaDownload /> Download App
                </a>
              </nav>
            </motion.div>
          )}
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Simplify Grocery Shopping — Fast, Smart & Organized
            </h2>
            <p className={`text-lg max-w-2xl ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
              EasyGrocery helps you create smart lists, categorize items, share with family, and receive automated reminders — all in a clean, intuitive experience.
            </p>
            <div className="flex items-center gap-4">
              <a href="#features" className={`px-6 py-3 rounded-full font-semibold shadow transition ${isDark ? 'bg-white text-black' : 'bg-gradient-to-r from-[#e7e6e6ff] to-[#e7e6e6ff] text-black'}`}>
                Explore Features
              </a>
              <a href="/easygrocery.apk" download className={`px-5 py-3 rounded-full border ${isDark ? 'border-gray-600 text-white hover:bg-white/10' : 'border-slate-200 text-slate-700 hover:bg-slate-50'}`}>
                Preview App
              </a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative flex justify-center">
            <div className={`w-full max-w-sm rounded-2xl p-6 border shadow-2xl transform -rotate-3 hover:rotate-0 transition-all duration-500 ${isDark ? 'bg-white/5 backdrop-blur-xl border-white/10' : 'bg-white border-slate-100'}`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Weekly Groceries</h3>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-400'}`}>Updated 2h ago</p>
                </div>
                <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>List • 12</div>
              </div>
              <ul className={`mt-3 divide-y ${isDark ? 'divide-white/10' : 'divide-slate-100'}`}>
                {['Milk', 'Bread', 'Tomatoes'].map((item, idx) => {
                  const showStatus = idx === 0;
                  const status = showStatus ? STATUS_CYCLE[statusIndex] : (idx === 1 ? 'Pending' : 'Purchased');
                  const colorClass = STATUS_COLORS[status];
                  return (
                    <motion.li key={item} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} className="py-2 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">{item}</div>
                        <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-400'}`}>1 unit</div>
                      </div>
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${colorClass} ${showStatus ? 'status-pulse' : ''}`} key={pulseKey}>
                        <span className={`w-2 h-2 rounded-full ${status === 'Purchased' ? (isDark ? 'bg-green-400' : 'bg-green-600') : status === 'Pending' ? (isDark ? 'bg-yellow-400' : 'bg-yellow-500') : status === 'Not Found' ? (isDark ? 'bg-orange-400' : 'bg-orange-500') : (isDark ? 'bg-red-400' : 'bg-red-500')}`} />
                        <span>{status}</span>
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
              <div className="mt-6 flex items-center gap-3">
                <button className={`px-1 py-2 rounded-md text-sm font-semibold border ${isDark ? 'bg-white/10 text-white border-white/20' : 'bg-sky-50 text-sky-700 border-sky-100'}`}>Open List</button>
                <button className={`px-3 py-2 rounded-md text-sm border ${isDark ? 'bg-white/5 text-gray-300 border-white/10' : 'bg-white text-slate-700 border-slate-200'}`}>Share</button>
                <a href="/easygrocery.apk" download className={`flex px-3 py-2 rounded-md text-sm border ${isDark ? 'bg-white/5 text-gray-300 border-white/10' : 'bg-white text-slate-700 border-slate-200'}`}>
                  Easygrocery <FaDownload className="ml-1" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SCREEN SECTION */}
      <section id="screen" className="py-16 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-5">
            <h3 className="text-3xl font-bold">See EasyGrocery in Action</h3>
            <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
              Watch the app in action with a smooth demo.
            </p>
            <ul className="mt-4 space-y-3">
              {['Clean UI and fast scanning', 'Real-time sync & family collaboration', 'Auto reminders every 4 hours'].map((text) => (
                <li key={text} className={`flex gap-3 items-start ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                  <span className={`mt-1 inline-block w-3 h-3 rounded-full ${isDark ? 'bg-gray-500' : 'bg-[#e7e6e6ff]'}`} />
                  {text}
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <a href="/easygrocery.apk" download className={`inline-block px-5 py-3 rounded-full font-semibold shadow ${isDark ? 'bg-white text-black' : 'bg-gradient-to-r from-[#e7e6e6ff] to-[#e7e6e6ff] text-black'}`}>
                Start Free
              </a>
              <a href="#features" className={`ml-3 text-sm underline ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>Learn more</a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="flex justify-center">
            <div className="rounded-[40px] w-[320px] h-[680px] bg-black overflow-hidden shadow-[0_30px_70px_rgba(14,165,233,0.12)] border-8 border-black relative">
              <div className="h-10 flex items-center justify-center bg-black/60">
                <div className="w-24 h-2 rounded-full bg-black/30" />
              </div>
              <div className="flex-1 relative overflow-hidden">
                <video
                  src="/videos/demo1.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PURPOSE */}
      <section id="purpose" className={`py-16 px-6 ${isDark ? 'bg-gradient-to-b from-black to-gray-950/30' : 'bg-gradient-to-b from-white to-sky-50/30'}`}>
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold">EasyGrocery — Our Purpose</h2>
          <p className={`mt-6 text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
            EasyGrocery's mission is to make grocery shopping easier, faster, and smarter. It organizes and automates lists so you can focus on real life.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureMini title="Create Lists" desc="Build grocery lists quickly and keep them organized." isDark={isDark} />
            <FeatureMini title="Custom Categories" desc="Group items however you like for faster shopping." isDark={isDark} />
            <FeatureMini title="Save Time" desc="Use automation to shop more efficiently." isDark={isDark} />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center">EasyGrocery Features</h2>
          <p className={`text-center mt-3 max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
            Features built for simplicity and reliability — everything you need to manage grocery shopping.
          </p>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard title="Smart Shopping Experience" desc="Create organized lists inside the app — no pen and paper required." isDark={isDark} />
            <FeatureCard title="Custom Categories" desc="Select and organize categories your way to keep everything tidy and accessible." isDark={isDark} />
            <FeatureCard title="Simple & Clean Interface" desc="Minimal, intuitive UI so anyone can create and manage lists without confusion." isDark={isDark} />
            <FeatureCard title="Share Feature" desc="Family members can create and share lists instantly so everyone stays in sync." isDark={isDark} />
            <FeatureCard title="Purchase Status Options" desc="Track items as Purchased, Pending, Not Found, or Not Available for clarity." isDark={isDark} />
            <FeatureCard title="Auto Reminder Notification" desc="App sends notifications every 4 hours for unpurchased items so you don’t forget." isDark={isDark} />
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section id="why-choose" className={`py-16 px-6 ${isDark ? 'bg-gray-950/40' : 'bg-sky-50/40'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center">Why Choose EasyGrocery?</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <WhyCard title="Real-Life Problem Solved" desc="Grocery list management is a household headache — EasyGrocery digitizes and simplifies it." isDark={isDark} />
            <WhyCard title="Smart & Manual Balance" desc="You keep control — app streamlines but never overrides your choices." isDark={isDark} />
            <WhyCard title="Family-Friendly Experience" desc="Family members can share and update lists instantly for smooth collaboration." isDark={isDark} />
            <WhyCard title="Clear Status System" desc="Item statuses make shopping confusion-free and efficient." isDark={isDark} />
          </div>
        </div>
      </section>

      {/* FUTURE UPDATES */}
      <section id="future" className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold">Future Updates / Coming Soon</h2>
          <p className={`mt-4 ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>We are continuously improving EasyGrocery. Upcoming features include:</p>
          <div className="flex flex-wrap gap-10 mt-5 justify-center">
            <PrivacyCard desc="Password-Protected Sharing — secure family sharing" title="" isDark={isDark} />
            <PrivacyCard desc="AI Integration — smarter item handling" title="" isDark={isDark} />
            <PrivacyCard desc="Delete for Everyone — remove shared lists from all devices" title="" isDark={isDark} />
            <PrivacyCard desc="Dark Mode — comfortable night viewing" title="" isDark={isDark} />
          </div>
        </div>
      </section>

      {/* PRIVACY */}
      <section id="privacy" className={`py-16 px-6 ${isDark ? 'bg-gradient-to-b from-black to-gray-950/30' : 'bg-gradient-to-b from-white to-sky-50/30'}`}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center">Privacy & Data Safety</h2>
          <p className={`mt-4 text-center max-w-3xl mx-auto ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>We value your privacy and protect your data.</p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <PrivacyCard title="Data Protection & Storage" desc="Lists and account info are stored in secure databases." isDark={isDark} />
            <PrivacyCard title="Account Security" desc="Accounts use unique credentials." isDark={isDark} />
            <PrivacyCard title="Full User Control" desc="You can edit, delete, or create lists anytime." isDark={isDark} />
            <PrivacyCard title="Data Retention & App Removal" desc="Data remains on secure servers for restore." isDark={isDark} />
            <PrivacyCard title="Regular Security Updates" desc="We continuously improve protection." isDark={isDark} />
            <PrivacyCard title="Transparency Promise" desc="We communicate clearly about permissions." isDark={isDark} />
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="contact" className={`py-24 px-6 ${isDark ? 'bg-gradient-to-b from-black via-gray-950 to-black' : 'bg-gradient-to-b from-white via-sky-50 to-white'}`}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Have a Question or Issue?
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-slate-600'} max-w-2xl mx-auto`}>
              Facing a bug, need assistance, or have a feature suggestion? Reach out to us, and our team will respond promptly!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`relative rounded-3xl p-8 md:p-12 shadow-2xl border ${isDark ? 'bg-white/5 backdrop-blur-xl border-white/10' : 'bg-white/90 backdrop-blur border-slate-100'}`}
          >
            {/* Logo */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-[#e7e6e6ff] to-[#e7e6e6ff] p-1 shadow-xl">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <Image src={logo} alt="EasyGrocery" className="w-16 h-16" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-12 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-white/50' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-gray-500'} transition focus:outline-none focus:ring-2 focus:ring-sky-500/20`}
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-white/50' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-gray-500'} transition focus:outline-none focus:ring-2 focus:ring-sky-500/20`}
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-slate-700'}`}>
                  Your Query or Issue
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.query}
                  onChange={(e) => setFormData({ ...formData, query: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border ${isDark ? 'bg-white/5 border-white/20 text-white placeholder-gray-400 focus:border-white/50' : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-gray-500'} transition focus:outline-none focus:ring-2 focus:ring-gray-400/20 resize-none`}
                  placeholder="Describe your issue or suggestion in detail..."
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`group inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all ${isSubmitting
                    ? 'opacity-70 cursor-not-allowed'
                    : isDark
                      ? 'bg-white text-black hover:bg-gray-200'
                      : 'bg-gradient-to-r from-[#e7e6e6ff] to-[#e7e6e6ff] text-black hover:shadow-xl'
                    } hover:scale-105`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <FaPaperPlane className="group-hover:translate-x-1 transition" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Success Message */}
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${isDark ? 'bg-green-900/30 text-green-300 border border-green-700/30' : 'bg-green-50 text-green-700 border border-green-200'}`}
              >
                <FaCheck className="w-5 h-5" />
                <span className="font-medium">Thank you! Your message has been sent. We'll get back to you soon.</span>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className={`py-10 px-6 ${isDark ? 'bg-black/50 text-white' : 'bg-[#e7e6e6ff]/50 text-black'} transition-all duration-300`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">

            {/* Logo + Name */}
            <div className="flex items-center gap-3">
              {/* ROUNDED LOGO (CONTACT FORM STYLE) */}
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#e7e6e6ff] to-[#e7e6e6ff] p-[2px] shadow-lg">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                    <Image
                      src={logo}
                      alt="EasyGrocery Logo"
                      width={32}
                      height={32}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                </div>
              </div>

              <div>
                <p className={`font-bold text-lg ${isDark ? 'text-white' : 'text-slate-900'}`}>EasyGrocery</p>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>Simplify your shopping</p>
              </div>
            </div>

            {/* Copyright */}
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-slate-700'}`}>
              &copy; 2025 EasyGrocery. All rights reserved.
            </p>

            {/* Links */}
            <div className="flex gap-6 text-sm">
              <a
                href="#privacy"
                className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-slate-700 hover:text-slate-900'} transition-colors`}
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-slate-700 hover:text-slate-900'} transition-colors`}
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeInUp { animation: fadeInUp 0.68s ease-out forwards; }
        @keyframes blob { 0%{transform:translateY(0px) scale(1)} 33%{transform:translateY(-12px) scale(1.05)} 66%{transform:translateY(6px) scale(0.98)} 100%{transform:translateY(0px) scale(1)} }
        .animate-blob { animation: blob 8s infinite; }
        @keyframes statusPulse { 0% { transform: translateY(0) scale(1); } 30% { transform: translateY(-4px) scale(1.03); } 100% { transform: translateY(0) scale(1); } }
        .status-pulse { animation: statusPulse 700ms ease-out; }
        .font-poppins { font-family: 'Poppins', sans-serif; }
      `}</style>
    </div>
  );
};

export default EasyGrocery;

// Subcomponents
function FeatureCard({ title, desc, isDark }: { title: string; desc: string; isDark: boolean }) {
  return (
    <motion.div whileHover={{ scale: 1.03, y: -4 }} className={`rounded-xl p-6 shadow-sm border ${isDark ? 'bg-white/5 backdrop-blur-xl border-white/10 hover:shadow-white/10' : 'bg-white border-slate-100 hover:shadow-md'} transition`}>
      <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h4>
      <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>{desc}</p>
    </motion.div>
  );
}

function WhyCard({ title, desc, isDark }: { title: string; desc: string; isDark: boolean }) {
  return (
    <div className={`rounded-xl p-6 shadow-sm border ${isDark ? 'bg-white/5 backdrop-blur-xl border-white/10' : 'bg-white border-slate-100'}`}>
      <h4 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h4>
      <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>{desc}</p>
    </div>
  );
}

function PrivacyCard({ title = "", desc, isDark }: { title?: string; desc: string; isDark: boolean }) {
  return (
    <div className={`rounded-xl p-6 shadow-sm border ${isDark ? 'bg-white/5 backdrop-blur-xl border-white/10' : 'bg-white border-slate-100'}`}>
      {title && <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h4>}
      <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>{desc}</p>
    </div>
  );
}

function FeatureMini({ title, desc, isDark }: { title: string; desc: string; isDark: boolean }) {
  return (
    <div className={`rounded-xl p-5 shadow border ${isDark ? 'bg-white/5 backdrop-blur-xl border-white/10 text-left' : 'bg-white border-slate-100 text-left'}`}>
      <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{title}</h4>
      <p className={`mt-2 text-sm ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>{desc}</p>
    </div>
  );
}