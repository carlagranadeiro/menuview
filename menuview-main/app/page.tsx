"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { Utensils, Globe, ChevronRight, Smartphone, Camera, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

const languages = [
  { code: "pt", label: "Português", flag: "🇵🇹" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
];

export default function LandingPage() {
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const [showQR, setShowQR] = useState(false);
  const router = useRouter();

  const handleSelectLanguage = (langCode: string) => {
    setSelectedLang(langCode);
    // Store in localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("menuview-lang", langCode);
    }
    // Navigate to menu
    setTimeout(() => {
      router.push(`/menu?lang=${langCode}`);
    }, 400);
  };

  const menuUrl = typeof window !== "undefined" 
    ? `${window.location.origin}/menu` 
    : "https://menuview.vercel.app/menu";

  return (
    <main className="min-h-screen bg-surface-950 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }} />
      </div>

      {/* Hero Section */}
      <section className="relative px-6 pt-16 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto text-center"
        >
          {/* Logo */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-primary-600 mb-8 shadow-lg shadow-primary-600/20">
            <Utensils className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white mb-3">
            Menu<span className="text-primary-500">View</span>
          </h1>
          <p className="text-surface-400 text-lg mb-2">
            Descubra o sabor em cada imagem
          </p>
          <p className="text-surface-500 text-sm">
            Menu digital interativo para restaurantes
          </p>
        </motion.div>
      </section>

      {/* Features */}
      <section className="px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-md mx-auto grid grid-cols-3 gap-4"
        >
          {[
            { icon: Camera, label: "Fotos Reais" },
            { icon: Globe, label: "Multilingue" },
            { icon: Sparkles, label: "Filtros" },
          ].map((feature, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl glass-light"
            >
              <feature.icon className="w-6 h-6 text-primary-400" />
              <span className="text-xs text-surface-300">{feature.label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Language Selection */}
      <section className="px-6 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-md mx-auto"
        >
          <h2 className="text-sm font-medium text-surface-400 uppercase tracking-wider mb-4 text-center">
            Escolha o seu idioma
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {languages.map((lang, i) => (
              <motion.button
                key={lang.code}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 * i }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectLanguage(lang.code)}
                className={`flex items-center gap-3 p-4 rounded-2xl border transition-all duration-200 ${
                  selectedLang === lang.code
                    ? "bg-primary-600 border-primary-500 text-white"
                    : "bg-surface-900/50 border-surface-800 text-surface-200 hover:border-surface-600 hover:bg-surface-800"
                }`}
              >
                <span className="text-2xl">{lang.flag}</span>
                <span className="font-medium">{lang.label}</span>
                {selectedLang === lang.code && (
                  <ChevronRight className="w-4 h-4 ml-auto" />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* QR Code Section */}
      <section className="px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-md mx-auto"
        >
          <button
            onClick={() => setShowQR(!showQR)}
            className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl glass-light text-surface-300 hover:text-white transition-colors"
          >
            <Smartphone className="w-5 h-5" />
            <span className="text-sm font-medium">
              {showQR ? "Esconder QR Code" : "Mostrar QR Code do Menu"}
            </span>
          </button>

          <AnimatePresence>
            {showQR && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-6 rounded-2xl glass-light flex flex-col items-center"
              >
                <div className="bg-white p-4 rounded-xl">
                  <QRCodeSVG
                    value={menuUrl}
                    size={180}
                    level="M"
                    includeMargin={false}
                  />
                </div>
                <p className="mt-4 text-sm text-surface-400 text-center">
                  Aponte a câmara do telemóvel para aceder ao menu
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 text-center">
        <p className="text-xs text-surface-600">
          Powered by MenuView © 2026
        </p>
      </footer>
    </main>
  );
}
