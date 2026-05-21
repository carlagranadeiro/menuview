# MenuView — Menu Digital para Restaurantes

Menu digital moderno e interativo para restaurantes, com fotos reais dos pratos, suporte multilingue e QR Code integrado.

## ✨ Funcionalidades

- **📱 QR Code** — Acesso instantâneo ao menu via telemóvel
- **🌍 Multilingue** — PT, EN, ES (extensível)
- **🖼️ Fotos reais** — Visualização apelativa dos pratos
- **🔍 Pesquisa & Filtros** — Vegetariano, vegan, sem glúten, populares
- **📋 Detalhes completos** — Ingredientes, alergénios, preços
- **⚡ Performance** — Next.js 15, otimizado para mobile
- **🎨 Design moderno** — Estilo Uber Eats / Airbnb

## 🛠️ Tech Stack

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animações)
- **Supabase** (base de dados)
- **Vercel** (deploy)

## 🚀 Deploy na Vercel

1. **Fork / Clone** este repositório
2. **Cria projeto** na [Vercel](https://vercel.com)
3. **Conecta** o repositório GitHub
4. **Configura variáveis** de ambiente (Supabase)
5. **Deploy!**

### Variáveis de Ambiente

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 📦 Instalação Local

```bash
# Clone
git clone https://github.com/carlagranadeiro/menuview.git
cd menuview

# Instala dependências
npm install

# Configura env
cp .env.local.example .env.local
# Edita .env.local com as tuas credenciais Supabase

# Corre em dev
npm run dev
```

## 🗄️ Base de Dados Supabase

1. Cria projeto em [supabase.com](https://supabase.com)
2. Executa o SQL em `supabase/schema.sql`
3. Copia URL e Anon Key para `.env.local`

## 📁 Estrutura

```
menuview/
├── app/
│   ├── page.tsx              # Landing page (QR + idiomas)
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Estilos globais
│   └── (routes)/
│       ├── menu/
│       │   └── page.tsx      # Menu principal
│       └── menu/[id]/
│           └── page.tsx      # Detalhes do prato
├── components/
│   └── ui/                   # Componentes reutilizáveis
├── lib/
│   ├── utils.ts              # Helpers
│   ├── supabase.ts           # Cliente Supabase
│   ├── data.ts               # Mock data (demo)
│   └── i18n.ts               # Traduções
├── types/
│   └── index.ts              # Tipos TypeScript
└── supabase/
    └── schema.sql            # Schema SQL
```

## 📝 Roadmap

- [ ] Painel admin para restaurantes
- [ ] Pedidos via WhatsApp
- [ ] Modo offline (PWA)
- [ ] Avaliações e reviews
- [ ] Analytics de visualizações

## 📄 Licença

MIT © 2026 MenuView
