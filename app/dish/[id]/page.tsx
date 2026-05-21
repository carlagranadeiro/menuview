'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

const dishes = [
  { id: '1', name: 'Shoyu Ramen', price: 12.50, img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800', 
    desc: 'Caldo à base de soja, chashu pork, ovo mollete, cebolinho e rebentos de bambu.' },
  { id: '2', name: 'Miso Ramen', price: 13.00, img: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=800',
    desc: 'Caldo rico de miso, carne de porco moída, milho doce, manteiga e cebolinho.' },
  { id: '3', name: 'Tonkotsu Ramen', price: 14.50, img: 'https://images.unsplash.com/photo-1614563637806-1d0e645e0940?w=800',
    desc: 'Caldo cremoso de ossos de porco cozidos 12h, chashu, óleo de alho negro e ovo marinado.' },
  { id: '4', name: 'Spicy Tan Tanmen', price: 15.00, img: 'https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?w=800',
    desc: 'Caldo de gergelim com chili, porco moído picante, bok choy e amendoim moído.' },
  { id: '5', name: 'Gyoza', price: 6.50, img: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=800',
    desc: 'Dumplings japoneses recheados com porco, grelhados até ficarem crocantes.' },
  { id: '6', name: 'Mochi Matcha', price: 5.50, img: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800',
    desc: 'Bolinhos de arroz glutinoso recheados com gelado de matcha.' },
];

export default function DishPage() {
  const params = useParams();
  const dish = dishes.find(d => d.id === params.id);

  if (!dish) return <div style={{ padding: 40, textAlign: 'center', color: '#fff', background: '#0a0a0a', minHeight: '100vh' }}>Prato não encontrado</div>;

  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: 20, fontFamily: 'system-ui, sans-serif', background: '#0a0a0a', color: '#fff', minHeight: '100vh' }}>
      <Link href="/" style={{ color: '#e85d04', textDecoration: 'none' }}>← Voltar ao Menu</Link>
      
      <div style={{ marginTop: 20 }}>
        <img src={dish.img} alt={dish.name} style={{ width: '100%', borderRadius: 16, maxHeight: 400, objectFit: 'cover' }} />
        
        <div style={{ marginTop: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontSize: 28, margin: 0 }}>{dish.name}</h1>
            <span style={{ fontSize: 24, color: '#e85d04', fontWeight: 'bold' }}>{dish.price.toFixed(2)}€</span>
          </div>
          <p style={{ color: '#aaa', lineHeight: 1.6, fontSize: 16 }}>{dish.desc}</p>
        </div>
      </div>
    </main>
  );
}
