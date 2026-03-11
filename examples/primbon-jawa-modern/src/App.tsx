/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Calendar, 
  Heart, 
  User, 
  Sparkles, 
  Info, 
  ChevronRight, 
  CalendarDays,
  Briefcase,
  Home,
  Users,
  MessageSquare,
  Loader2,
  Send,
  Volume2,
  Scroll,
  Sun,
  Moon,
  TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import {
  calculateWeton,
  getWatak,
  calculateJodoh,
  getGarisHidup,
  calculateKalenderJawa,
  calculatePranataMangsa,
  getHariBaik,
  calculateWuku,
  calculateSadwara,
  calculateAsatawara,
  calculateSangawara,
  setLocale,
  getLocale,
  getTranslations,
  getKitabInfo,
  getAllKitabReferences
} from '@damarkuncoro/primbon';
import { GoogleGenAI, Modality } from "@google/genai";
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

// Initialize Gemini
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

// Types from the library (simplified for UI)
interface WetonData {
  hari: string;
  pasaran: string;
  weton: string;
  neptu: number;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'weton' | 'jodoh' | 'mangsa' | 'haribaik' | 'sadwara' | 'asatawara' | 'sangawara' | 'kitab' | 'ai'>('weton');
  const [birthDate, setBirthDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [partnerDate, setPartnerDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [keperluan, setKeperluan] = useState<string>('nikah');
  const [isParchment, setIsParchment] = useState(false);
  const [language, setLanguage] = useState<'id' | 'jv' | 'en'>('id');
  
  // AI State
  const [aiResponse, setAiResponse] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isTtsLoading, setIsTtsLoading] = useState(false);

  // Calculations
  const weton = useMemo(() => calculateWeton(new Date(birthDate)), [birthDate]);
  const watak = useMemo(() => getWatak(new Date(birthDate)), [birthDate]);
  const garisHidup = useMemo(() => getGarisHidup(new Date(birthDate)), [birthDate]);
  const kalenderJawa = useMemo(() => calculateKalenderJawa(new Date(birthDate)), [birthDate]);
  const wuku = useMemo(() => calculateWuku(new Date(birthDate)), [birthDate]);
  
  const jodohResult = useMemo(() => calculateJodoh(new Date(birthDate), new Date(partnerDate)), [birthDate, partnerDate]);
  
  const currentMangsa = useMemo(() => calculatePranataMangsa(new Date()), []);
  const birthMangsa = useMemo(() => calculatePranataMangsa(new Date(birthDate)), [birthDate]);

  // New calculations for Sadwara, Asatawara, Sangawara
  const sadwara = useMemo(() => calculateSadwara(new Date(birthDate)), [birthDate]);
  const asatawara = useMemo(() => calculateAsatawara(new Date(birthDate)), [birthDate]);
  const sangawara = useMemo(() => calculateSangawara(new Date(birthDate)), [birthDate]);
  
  // Get all kitab references
  const kitabReferences = useMemo(() => getAllKitabReferences(), []);

  // Handle language change
  const handleLanguageChange = (lang: 'id' | 'jv' | 'en') => {
    setLanguage(lang);
    setLocale(lang);
  };

  const hariBaik = useMemo(() => getHariBaik(keperluan), [keperluan]);

  const todayWeton = useMemo(() => calculateWeton(new Date()), []);

  // Chart Data
  const radarData = useMemo(() => [
    { subject: 'Karakter', A: Math.floor(Math.random() * 40) + 60, fullMark: 100 },
    { subject: 'Rejeki', A: Math.floor(Math.random() * 40) + 60, fullMark: 100 },
    { subject: 'Sosial', A: Math.floor(Math.random() * 40) + 60, fullMark: 100 },
    { subject: 'Kesehatan', A: Math.floor(Math.random() * 40) + 60, fullMark: 100 },
    { subject: 'Spiritual', A: Math.floor(Math.random() * 40) + 60, fullMark: 100 },
  ], [birthDate]);

  const lifeCycleData = useMemo(() => {
    const data = [];
    for (let i = 0; i <= 60; i += 10) {
      data.push({
        age: i,
        luck: Math.floor(Math.random() * 50) + (i > 30 ? 40 : 20),
      });
    }
    return data;
  }, [birthDate]);

  const askAi = async () => {
    setIsAiLoading(true);
    setActiveTab('ai');
    try {
      const prompt = `
        Anda adalah seorang ahli Primbon Jawa dan konsultan spiritual modern.
        Berdasarkan data berikut, berikan nasihat bijak, panduan karir, dan tips kehidupan dalam bahasa Indonesia yang santun dan puitis.
        
        Data Kelahiran:
        - Weton: ${weton.hari} ${weton.pasaran} (Neptu: ${weton.neptu})
        - Kalender Jawa: ${kalenderJawa.tanggal} ${kalenderJawa.bulan} ${kalenderJawa.tahun}
        - Wuku: ${wuku.nama}
        - Garis Hidup: ${garisHidup.karakter}
        - Watak: ${watak.deskripsi}
        - Sifat: ${watak.sifat.join(', ')}
        - Pranata Mangsa: ${birthMangsa?.nama} (${birthMangsa?.candra})
        
        Berikan jawaban dalam teks biasa (plain text) yang rapi dengan spasi antar paragraf yang jelas. JANGAN gunakan format Markdown (seperti #, **, atau -). Fokus pada potensi positif dan cara mengatasi kelemahan.
      `;

      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      setAiResponse(response.text || 'Maaf, saya tidak bisa memberikan saran saat ini.');
    } catch (error) {
      console.error("AI Error:", error);
      setAiResponse("Terjadi kesalahan saat menghubungi konsultan spiritual digital. Silakan coba lagi nanti.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const playTts = async () => {
    if (!aiResponse || isTtsLoading) return;
    setIsTtsLoading(true);
    try {
      const response = await genAI.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: `Bacakan dengan suara bijak dan tenang: ${aiResponse}` }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Kore' },
            },
          },
        },
      });

      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (base64Audio) {
        const audio = new Audio(`data:audio/mpeg;base64,${base64Audio}`);
        audio.play();
      }
    } catch (error) {
      console.error("TTS Error:", error);
    } finally {
      setIsTtsLoading(false);
    }
  };

  const themeClasses = isParchment 
    ? "bg-[#e8d5b5] text-[#4a3728] parchment-texture" 
    : "bg-[#f5f5f0] text-[#2c2c24]";

  return (
    <div className={`min-h-screen transition-colors duration-700 font-serif selection:bg-[#5A5A40] selection:text-white ${themeClasses}`}>
      <style>{`
        .parchment-texture {
          background-image: url("https://www.transparenttextures.com/patterns/parchment.png");
          background-color: #e8d5b5;
        }
      `}</style>
      
      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <button 
          onClick={() => setIsParchment(!isParchment)}
          className={`p-3 rounded-full shadow-lg transition-all ${isParchment ? 'bg-[#4a3728] text-[#e8d5b5]' : 'bg-white text-[#5A5A40]'}`}
        >
          {isParchment ? <Sun size={20} /> : <Scroll size={20} />}
        </button>
      </div>

      {/* Header */}
      <header className="pt-12 pb-8 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-block mb-4"
        >
          <div className="w-16 h-16 bg-[#5A5A40] rounded-full flex items-center justify-center mx-auto shadow-lg">
            <Sparkles className="text-white w-8 h-8" />
          </div>
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">Primbon Jawa Modern</h1>
        <p className="text-[#5A5A40] italic opacity-80">Menyingkap Rahasia Takdir melalui Kearifan Lokal</p>
      </header>

      {/* Navigation */}
      {/* Language Selector */}
      <div className="fixed top-6 left-6 z-50 flex gap-2">
        {[
          { id: 'id', label: 'ID' },
          { id: 'jv', label: 'JV' },
          { id: 'en', label: 'EN' },
        ].map((lang) => (
          <button
            key={lang.id}
            onClick={() => handleLanguageChange(lang.id as 'id' | 'jv' | 'en')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              language === lang.id
                ? 'bg-[#5A5A40] text-white'
                : 'bg-white text-[#5A5A40] shadow-sm hover:bg-[#5A5A40]/10'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>

      <nav className="max-w-4xl mx-auto px-6 mb-12">
        <div className="flex flex-wrap justify-center gap-2 bg-white/50 p-2 rounded-full border border-[#5A5A40]/10 shadow-sm">
          {[
            { id: 'weton', label: 'Weton & Watak', icon: User },
            { id: 'jodoh', label: 'Cek Jodoh', icon: Heart },
            { id: 'mangsa', label: 'Pranata Mangsa', icon: CalendarDays },
            { id: 'sadwara', label: 'Paringkelan', icon: Calendar },
            { id: 'asatawara', label: 'Padewan', icon: Calendar },
            { id: 'sangawara', label: 'Padangon', icon: Calendar },
            { id: 'kitab', label: 'Kitab', icon: Scroll },
            { id: 'haribaik', label: 'Hari Baik', icon: Sparkles },
            { id: 'ai', label: 'Tanya AI', icon: MessageSquare },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
                activeTab === tab.id
                  ? 'bg-[#5A5A40] text-white shadow-md'
                  : 'hover:bg-[#5A5A40]/10 text-[#5A5A40]'
              }`}
            >
              <tab.icon size={14} />
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 pb-24">
        <AnimatePresence mode="wait">
          {activeTab === 'weton' && (
            <motion.div
              key="weton"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              {/* Daily Insight Section */}
              <div className="bg-[#5A5A40] text-white rounded-[32px] p-8 shadow-lg flex flex-col md:flex-row items-center gap-8 border border-white/10">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                  <Calendar size={40} />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xs uppercase tracking-[0.3em] text-white/60 mb-2 font-bold">Wejangan Hari Ini</h3>
                  <p className="text-2xl font-bold mb-1">Hari ini adalah {todayWeton.hari} {todayWeton.pasaran}</p>
                  <p className="text-sm opacity-80 italic">"Gunakan hari ini untuk menanam kebaikan, agar esok menuai keberkahan."</p>
                </div>
                <div className="bg-white/10 px-6 py-3 rounded-2xl backdrop-blur-sm border border-white/10">
                  <p className="text-[10px] uppercase tracking-widest text-white/50 font-bold mb-1">Neptu Hari Ini</p>
                  <p className="text-2xl font-bold text-center">{todayWeton.neptu}</p>
                </div>
              </div>

              {/* Input Section */}
              <div className={`rounded-[32px] p-8 shadow-sm border transition-colors ${isParchment ? 'bg-white/30 border-[#4a3728]/20' : 'bg-white border-[#5A5A40]/5'}`}>
                <label className="block text-sm font-medium text-[#5A5A40] mb-4 uppercase tracking-widest">Pilih Tanggal Lahir</label>
                <div className="flex flex-col md:flex-row gap-4">
                  <input 
                    type="date" 
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className={`flex-1 border-none rounded-2xl px-6 py-4 text-xl focus:ring-2 focus:ring-[#5A5A40] transition-all outline-none ${isParchment ? 'bg-[#f0e4d0]' : 'bg-[#f5f5f0]'}`}
                  />
                  <button 
                    onClick={askAi}
                    className="bg-[#5A5A40] text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#4a4a35] transition-colors shadow-lg"
                  >
                    <Sparkles size={20} />
                    Konsultasi AI
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Weton Card */}
                <div className={`rounded-[32px] p-8 shadow-sm border relative overflow-hidden group transition-colors ${isParchment ? 'bg-white/30 border-[#4a3728]/20' : 'bg-white border-[#5A5A40]/5'}`}>
                  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform duration-500">
                    <Calendar size={120} />
                  </div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-[#5A5A40] mb-6 font-semibold">Weton & Kalender Jawa</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-4xl font-bold text-[#5A5A40]">{weton.hari} {weton.pasaran}</p>
                      <p className="text-[#5A5A40]/60 italic">Neptu: {weton.neptu}</p>
                    </div>
                    <div className="pt-4 border-t border-[#5A5A40]/10">
                      <p className="text-sm text-[#5A5A40]/80">
                        <span className="font-bold">{kalenderJawa.tanggal} {kalenderJawa.bulan} {kalenderJawa.tahun}</span>
                        <br />
                        Tahun {kalenderJawa.namaTahun}, Wuku {wuku.nama}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Garis Hidup Card */}
                <div className="bg-[#5A5A40] text-white rounded-[32px] p-8 shadow-lg relative overflow-hidden">
                  <div className="absolute -bottom-4 -right-4 opacity-10">
                    <Sparkles size={160} />
                  </div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-white/60 mb-6 font-semibold">Garis Hidup (Numerologi)</h3>
                  <div className="space-y-4">
                    <div className="flex items-baseline gap-4">
                      <span className="text-6xl font-bold">{garisHidup.angka}</span>
                      <span className="text-xl italic opacity-80">Angka Takdir</span>
                    </div>
                    <p className="text-sm leading-relaxed opacity-90">{garisHidup.karakter}</p>
                  </div>
                </div>
              </div>

              {/* Visualizations */}
              <div className="grid md:grid-cols-2 gap-8">
                <div className={`rounded-[32px] p-8 shadow-sm border transition-colors ${isParchment ? 'bg-white/30 border-[#4a3728]/20' : 'bg-white border-[#5A5A40]/5'}`}>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-[#5A5A40] mb-6 font-semibold flex items-center gap-2">
                    <TrendingUp size={14} /> Potensi Diri
                  </h3>
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                        <PolarGrid stroke={isParchment ? "#4a3728" : "#5A5A40"} opacity={0.2} />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: isParchment ? "#4a3728" : "#5A5A40", fontSize: 10 }} />
                        <Radar
                          name="Potensi"
                          dataKey="A"
                          stroke="#5A5A40"
                          fill="#5A5A40"
                          fillOpacity={0.6}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className={`rounded-[32px] p-8 shadow-sm border transition-colors ${isParchment ? 'bg-white/30 border-[#4a3728]/20' : 'bg-white border-[#5A5A40]/5'}`}>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-[#5A5A40] mb-6 font-semibold">Siklus Keberuntungan</h3>
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={lifeCycleData}>
                        <defs>
                          <linearGradient id="colorLuck" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#5A5A40" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#5A5A40" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="age" hide />
                        <Tooltip 
                          contentStyle={{ backgroundColor: isParchment ? '#e8d5b5' : '#fff', border: 'none', borderRadius: '12px' }}
                          labelFormatter={(age) => `Usia: ${age}`}
                        />
                        <Area type="monotone" dataKey="luck" stroke="#5A5A40" fillOpacity={1} fill="url(#colorLuck)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <p className="text-[10px] text-center text-[#5A5A40]/40 mt-4 italic">Visualisasi siklus naik turunnya energi kehidupan</p>
                </div>
              </div>

              {/* Character Analysis */}
              <div className={`rounded-[32px] p-10 shadow-sm border transition-colors ${isParchment ? 'bg-white/30 border-[#4a3728]/20' : 'bg-white border-[#5A5A40]/5'}`}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-[#f5f5f0] rounded-full flex items-center justify-center">
                    <User className="text-[#5A5A40]" size={20} />
                  </div>
                  <h3 className="text-xl font-bold">Analisis Watak & Sifat</h3>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-6">
                    <p className="text-lg leading-relaxed text-[#2c2c24]/80 first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-[#5A5A40]">
                      {watak.deskripsi}
                    </p>
                    <div className="flex flex-wrap gap-2 pt-4">
                      {watak.sifat.map((s, i) => (
                        <span key={i} className="px-4 py-1.5 bg-[#f5f5f0] text-[#5A5A40] rounded-full text-sm font-medium border border-[#5A5A40]/10">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-6 bg-[#f5f5f0]/50 p-6 rounded-2xl border border-[#5A5A40]/5">
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-[#5A5A40] mb-2 font-bold">Sifat Hari ({watak.detail.hari.nama})</h4>
                      <ul className="space-y-1">
                        {watak.detail.hari.sifat.map((s, i) => (
                          <li key={i} className="text-sm text-[#2c2c24]/70 flex items-center gap-2">
                            <div className="w-1 h-1 bg-[#5A5A40] rounded-full" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase tracking-widest text-[#5A5A40] mb-2 font-bold">Sifat Pasaran ({watak.detail.pasaran.nama})</h4>
                      <ul className="space-y-1">
                        {watak.detail.pasaran.sifat.map((s, i) => (
                          <li key={i} className="text-sm text-[#2c2c24]/70 flex items-center gap-2">
                            <div className="w-1 h-1 bg-[#5A5A40] rounded-full" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'jodoh' && (
            <motion.div
              key="jodoh"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-[32px] p-8 shadow-sm border border-[#5A5A40]/5">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-bold text-[#5A5A40] mb-3 uppercase tracking-widest">Tanggal Lahir Anda</label>
                    <input 
                      type="date" 
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full bg-[#f5f5f0] border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#5A5A40] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#5A5A40] mb-3 uppercase tracking-widest">Tanggal Lahir Pasangan</label>
                    <input 
                      type="date" 
                      value={partnerDate}
                      onChange={(e) => setPartnerDate(e.target.value)}
                      className="w-full bg-[#f5f5f0] border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-[#5A5A40] outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-[#5A5A40]/5">
                <div className="bg-[#5A5A40] p-10 text-center text-white">
                  <Heart className="mx-auto mb-4 animate-pulse" size={48} fill="currentColor" />
                  <h3 className="text-3xl font-bold mb-2">{jodohResult.kategori}</h3>
                  <p className="text-white/70 italic max-w-lg mx-auto leading-relaxed">"{jodohResult.arti}"</p>
                </div>
                
                <div className="p-10 grid md:grid-cols-3 gap-8 items-center">
                  <div className="text-center space-y-2">
                    <p className="text-xs uppercase tracking-widest text-[#5A5A40]/60 font-bold">Anda</p>
                    <p className="text-xl font-bold">{jodohResult.personA.weton}</p>
                    <p className="text-sm text-[#5A5A40]">Neptu: {jodohResult.personA.neptu}</p>
                  </div>
                  
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-[#f5f5f0] flex items-center justify-center border-2 border-dashed border-[#5A5A40]/20">
                      <span className="text-2xl font-bold text-[#5A5A40]">{jodohResult.totalNeptu}</span>
                    </div>
                    <p className="text-[10px] uppercase tracking-widest mt-2 text-[#5A5A40]/40 font-bold">Total Neptu</p>
                  </div>

                  <div className="text-center space-y-2">
                    <p className="text-xs uppercase tracking-widest text-[#5A5A40]/60 font-bold">Pasangan</p>
                    <p className="text-xl font-bold">{jodohResult.personB.weton}</p>
                    <p className="text-sm text-[#5A5A40]">Neptu: {jodohResult.personB.neptu}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'mangsa' && (
            <motion.div
              key="mangsa"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              {currentMangsa && (
                <div className="bg-white rounded-[32px] p-10 shadow-sm border border-[#5A5A40]/5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <CalendarDays size={200} />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-xs uppercase tracking-[0.3em] text-[#5A5A40] mb-8 font-bold">Pranata Mangsa Saat Ini</h3>
                    <div className="grid md:grid-cols-2 gap-12">
                      <div className="space-y-6">
                        <div>
                          <p className="text-5xl font-bold text-[#5A5A40] mb-2">{currentMangsa.nama}</p>
                          <p className="text-[#5A5A40]/60 italic">"{currentMangsa.candra}"</p>
                        </div>
                        <div className="flex items-center gap-4 text-sm font-medium">
                          <span className="px-4 py-1.5 bg-[#f5f5f0] rounded-full border border-[#5A5A40]/10">
                            {currentMangsa.mulai} — {currentMangsa.akhir}
                          </span>
                        </div>
                        <p className="text-lg leading-relaxed text-[#2c2c24]/80">{currentMangsa.sifat}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { label: 'Kesehatan', value: currentMangsa.kesehatan },
                          { label: 'Karir', value: currentMangsa.karir },
                          { label: 'Rejeki', value: currentMangsa.rejeki },
                          { label: 'Warna', value: currentMangsa.warna },
                        ].map((item, i) => (
                          <div key={i} className="bg-[#f5f5f0]/50 p-4 rounded-2xl border border-[#5A5A40]/5">
                            <p className="text-[10px] uppercase tracking-widest text-[#5A5A40]/60 font-bold mb-1">{item.label}</p>
                            <p className="text-sm font-medium">{item.value || '-'}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {birthMangsa && (
                <div className="bg-[#5A5A40] text-white rounded-[32px] p-10 shadow-lg">
                  <h3 className="text-xs uppercase tracking-[0.3em] text-white/60 mb-6 font-bold">Mangsa Kelahiran Anda</h3>
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-1">
                      <p className="text-3xl font-bold mb-2">{birthMangsa.nama}</p>
                      <p className="text-white/70 italic mb-4">"{birthMangsa.candra}"</p>
                      <p className="leading-relaxed opacity-90">{birthMangsa.sifat}</p>
                    </div>
                    <div className="w-full md:w-64 space-y-4">
                      <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                        <p className="text-[10px] uppercase tracking-widest text-white/50 font-bold mb-1">Batu Permata</p>
                        <p className="text-sm">{birthMangsa.batu_permata || '-'}</p>
                      </div>
                      <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                        <p className="text-[10px] uppercase tracking-widest text-white/50 font-bold mb-1">Bunga</p>
                        <p className="text-sm">{birthMangsa.bunga || '-'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'haribaik' && (
            <motion.div
              key="haribaik"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-[32px] p-8 shadow-sm border border-[#5A5A40]/5">
                <label className="block text-xs font-bold text-[#5A5A40] mb-4 uppercase tracking-widest">Pilih Keperluan</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { id: 'nikah', label: 'Pernikahan', icon: Heart },
                    { id: 'pindah_rumah', label: 'Pindah Rumah', icon: Home },
                    { id: 'usaha', label: 'Buka Usaha', icon: Briefcase },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setKeperluan(item.id)}
                      className={`flex flex-col items-center gap-3 p-6 rounded-2xl transition-all border ${
                        keperluan === item.id 
                          ? 'bg-[#5A5A40] text-white border-[#5A5A40] shadow-md' 
                          : 'bg-[#f5f5f0] text-[#5A5A40] border-transparent hover:border-[#5A5A40]/20'
                      }`}
                    >
                      <item.icon size={24} />
                      <span className="text-sm font-bold">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-[32px] p-10 shadow-sm border border-[#5A5A40]/5">
                <div className="flex items-center gap-3 mb-8">
                  <Sparkles className="text-[#5A5A40]" size={24} />
                  <h3 className="text-xl font-bold">Rekomendasi Hari Baik</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {hariBaik.rekomendasi.map((hari, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4 p-5 bg-[#f5f5f0]/50 rounded-2xl border border-[#5A5A40]/5 group hover:bg-[#5A5A40] hover:text-white transition-all duration-300 cursor-default"
                    >
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:bg-white/20 transition-colors">
                        <span className="text-[#5A5A40] font-bold group-hover:text-white">{i + 1}</span>
                      </div>
                      <p className="font-medium">{hari}</p>
                      <ChevronRight className="ml-auto opacity-20 group-hover:opacity-100 transition-opacity" size={16} />
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-10 p-6 bg-[#f5f5f0] rounded-2xl border border-[#5A5A40]/10 flex gap-4 items-start">
                  <Info className="text-[#5A5A40] shrink-0" size={20} />
                  <p className="text-xs text-[#2c2c24]/60 leading-relaxed italic">
                    Perhitungan ini didasarkan pada sistem penanggalan Jawa tradisional. Disarankan untuk tetap berkonsultasi dengan ahli primbon atau sesepuh untuk hasil yang lebih spesifik sesuai dengan silsilah keluarga.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'ai' && (
            <motion.div
              key="ai"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="bg-white rounded-[32px] p-10 shadow-sm border border-[#5A5A40]/5 relative min-h-[400px]">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-[#5A5A40] rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Konsultasi Spiritual Digital</h3>
                    <p className="text-xs text-[#5A5A40]/60 uppercase tracking-widest font-bold">Powered by Gemini AI</p>
                  </div>
                </div>

                {isAiLoading ? (
                  <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <Loader2 className="w-12 h-12 text-[#5A5A40] animate-spin" />
                    <p className="text-[#5A5A40] italic animate-pulse">Menghubungkan dengan leluhur digital...</p>
                  </div>
                ) : aiResponse ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="max-w-none text-[#2c2c24]/80"
                  >
                    <div className="flex justify-end mb-6">
                      <button 
                        onClick={playTts}
                        disabled={isTtsLoading}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${isTtsLoading ? 'bg-[#5A5A40]/20 text-[#5A5A40]' : 'bg-[#5A5A40] text-white shadow-md hover:scale-105'}`}
                      >
                        {isTtsLoading ? <Loader2 size={16} className="animate-spin" /> : <Volume2 size={16} />}
                        {isTtsLoading ? 'Menyiapkan Suara...' : 'Dengarkan Wejangan'}
                      </button>
                    </div>
                    <div className="whitespace-pre-wrap leading-relaxed text-lg italic">
                      {aiResponse}
                    </div>
                    <button 
                      onClick={askAi}
                      className="mt-12 flex items-center gap-2 text-[#5A5A40] font-bold hover:underline"
                    >
                      <Send size={16} />
                      Minta Saran Baru
                    </button>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
                    <div className="max-w-md">
                      <p className="text-lg text-[#2c2c24]/60 italic mb-8">
                        "Gunakan kearifan masa lalu untuk menerangi langkah di masa depan."
                      </p>
                      <button 
                        onClick={askAi}
                        className="bg-[#5A5A40] text-white px-10 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-[#4a4a35] transition-all shadow-xl hover:scale-105"
                      >
                        <Sparkles size={20} />
                        Mulai Konsultasi
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 text-center border-t border-[#5A5A40]/10">
        <p className="text-xs uppercase tracking-widest text-[#5A5A40]/40 font-bold mb-2">© 2026 Primbon Jawa Modern</p>
        <p className="text-[10px] text-[#5A5A40]/30 max-w-xs mx-auto">
          Dibuat dengan ❤️ untuk melestarikan budaya Nusantara melalui teknologi.
        </p>
      </footer>
    </div>
  );
}
