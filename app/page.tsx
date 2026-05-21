'use client';

import { useState } from 'react';
import Link from 'next/link';

const dishes = [
  { id: '1', name: 'Shoyu Ramen', price: 12.50, img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400', cat: 'Ramen' },
  { id: '2', name: 'Miso Ramen', price: 13.00, img: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=400', cat: 'Ramen' },
  { id: '3', name: 'Tonkotsu Ramen', price: 14.50, img: 'https://images.unsplash.com/photo-1614563637806-1d0e645e0940?w=400', cat: 'Ramen' },
  { id: '4', name: 'Spicy Tan Tanmen', price: 15.00, img: 'https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?w=400', cat: 'Especial' },
  { id: '5', name: 'Gyoza', price: 6.50, img: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400', cat: 'Entrada' },
  { id: '6', name: 'Mochi Matcha', price: 5.50, img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400', cat: 'Sobremesa' },
];

export default function Home() {
  const [showQR, setShowQR] = useState(false);
  const [lang, setLang] = useState('pt');
  
  const url = typeof window !== 'undefined' ? window.location.href : 'https://menuview.vercel.app';

  const t = {
    pt: { title: 'MenuView', subtitle: 'Descubra o sabor em cada imagem', menu: 'Menu', qr: 'QR Code' },
    en: { title: 'MenuView', subtitle: 'Discover flavor in every image', menu: 'Menu', qr: 'QR Code' },
    es: { title: 'MenuView', subtitle: 'Descubre el sabor en cada imagen', menu: 'Menú', qr: 'QR Code' }
  }[lang];

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: 20, fontFamily: 'system-ui, sans-serif', background: '#0a0a0a', color: '#fff', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', marginBottom: 30 }}>
        <div style={{ fontSize: 48, marginBottom: 10 }}>🍜</div>
        <h1 style={{ fontSize: 32, margin: 0 }}>{t.title}</h1>
        <p style={{ color: '#888', marginTop: 5 }}>{t.subtitle}</p>
        
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginTop: 15 }}>
          {['pt', 'en', 'es'].map(l => (
            <button key={l} onClick={() => setLang(l)} 
              style={{ padding: '8px 16px', borderRadius: 20, border: 'none', 
                background: lang === l ? '#e85d04' : '#333', color: '#fff', cursor: 'pointer' }}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <button onClick={() => setShowQR(!showQR)} 
        style={{ width: '100%', padding: 15, borderRadius: 12, border: '1px solid #333', 
          background: '#1a1a1a', color: '#fff', cursor: 'pointer', marginBottom: 20 }}>
        {showQR ? '✕ Esconder QR' : '📱 ' + t.qr}
      </button>

      {showQR && (
        <div style={{ textAlign: 'center', padding: 20, background: '#1a1a1a', borderRadius: 12, marginBottom: 20 }}>
          <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`} 
            alt="QR Code" style={{ borderRadius: 8 }} />
          <p style={{ color: '#888', fontSize: 14, marginTop: 10 }}>Aponte a câmara do telemóvel</p>
        </div>
      )}

      <h2 style={{ fontSize: 20, marginBottom: 15 }}>🍽️ {t.menu}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 15 }}>
        {dishes.map(dish => (
          <Link key={dish.id} href={`/dish/${dish.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ borderRadius: 16, overflow: 'hidden', background: '#1a1a1a', cursor: 'pointer', border: '1px solid #333' }}>
              <img src={dish.img} alt={dish.name} style={{ width: '100%', height: 180, objectFit: 'cover' }} />
              <div style={{ padding: 15 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ margin: 0, fontSize: 16 }}>{dish.name}</h3>
                  <span style={{ color: '#e85d04', fontWeight: 'bold' }}>{dish.price.toFixed(2)}€</span>
                </div>
                <span style={{ color: '#666', fontSize: 12 }}>{dish.cat}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <p style={{ textAlign: 'center', color: '#444', marginTop: 40, fontSize: 12 }}>
        Powered by MenuView © 2026
      </p>
    </main>
  );
}
