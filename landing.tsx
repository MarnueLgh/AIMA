import React, { useEffect, useState } from 'react';
import { ShoppingBag, Search, Menu, ArrowRight, Instagram } from 'lucide-react';

// ---------------------------------------------------------------------------
// AIMA — landing
// Tokens y discurso definidos en manual-aima.html. Reglas que no se rompen:
//   · "AIMA" es la única palabra en mayúsculas de toda la página.
//   · Cero color de acento: el único color lo pone el metal de la pieza.
//   · Una sola curva de easing en todas las transiciones.
//   · "always on" NO se dice de las piezas con perla.
// ---------------------------------------------------------------------------

// No hay lista de imágenes que mantener: la ruta se deduce del nombre.
// Basta con dejar public/img/<nombre>.jpg y aparece. Si el archivo no existe,
// el <img> se oculta solo y queda el degradado de acabado que va debajo.
// Los prompts, con estos mismos nombres, están en prompts-imagen.html.
const src = (name: string) => `/img/${name}.jpg`;

// Marcadores de acabado: el fondo que se ve mientras no haya foto.
const FINISHES: Record<string, string> = {
  dorado: 'linear-gradient(135deg,#E8E1D6 0%,#D9CBA8 38%,#C4A87A 68%,#EDE6DA 100%)',
  plateado: 'linear-gradient(135deg,#EFEDE9 0%,#D6D5D2 40%,#B9B9B6 70%,#EFEDE9 100%)',
  perla: 'linear-gradient(135deg,#FAF8F4 0%,#EDE6DC 45%,#DCD2C6 72%,#FAF8F4 100%)',
};

const PRODUCTS = [
  { name: 'arracada lisa', spec: 'acero 316L · baño de oro · Ø20 mm', price: 590, finish: 'dorado', img: 'p-arracada' },
  { name: 'cadena figaro', spec: 'acero 316L · baño de oro · 45 cm', price: 890, finish: 'dorado', img: 'p-figaro', tag: 'nueva' },
  { name: 'huggie perla', spec: 'acero 316L · plateado · perla 8 mm', price: 690, finish: 'perla', img: 'p-perla', pearl: true },
  { name: 'pulsera eslabón', spec: 'acero 316L · plateado · 18 cm', price: 690, finish: 'plateado', img: 'p-pulsera' },
  { name: 'choker rolo', spec: 'acero 316L · baño de oro · 38 cm', price: 790, finish: 'dorado', img: 'p-choker' },
  { name: 'tobillera fina', spec: 'acero 316L · plateado · 25 cm', price: 490, finish: 'plateado', img: 'p-tobillera' },
];

const STACK = [
  { name: 'arracada lisa', finish: 'dorado', img: 'stack-arracada' },
  { name: 'choker rolo', finish: 'dorado', img: 'stack-choker' },
  { name: 'tobillera fina', finish: 'plateado', img: 'stack-tobillera' },
];

// La perla no aparece aquí a propósito: es la única pieza que sí se quita.
const ALWAYS_ON = [
  { t: 'agua', d: 'alberca, mar, regadera', img: 'on-agua', finish: 'dorado' },
  { t: 'gym', d: 'sudor y pesas', img: 'on-gym', finish: 'plateado' },
  { t: 'dormida', d: 'no hay que acordarse', img: 'on-dormida', finish: 'dorado' },
  { t: 'diario', d: 'los 365 del año', img: 'on-diario', finish: 'plateado' },
];

const COMUNIDAD = [
  { img: 'com-selfie', finish: 'dorado', alt: 'stack de tres cadenas en un espejo' },
  { img: 'com-calle', finish: 'perla', alt: 'collar y arracadas en la calle' },
  { img: 'com-manos', finish: 'plateado', alt: 'dos muñecas mezclando dorado y plateado' },
];

const mxn = (n: number) => `$${n.toLocaleString('es-MX')} MXN`;

// --- CSS que Tailwind no cubre: el marco, la curva única y el botón direccional ---
const CSS = `
:root{
  --papel:#FDFCFA; --hueso:#F4F1EC; --arena:#E8E1D6; --linea:#DDD7CC;
  --grafito:#26262A; --grafito-suave:#6B6A67;
  --ease:cubic-bezier(.76,0,.24,1); --dur:.7s; --dur-rapido:.25s;
}
.aima{ background:var(--papel); color:var(--grafito); font-family:"Instrument Sans",Archivo,Helvetica,Arial,sans-serif; }
.aima-marco{ padding:0 2.25vw 2.25vw; }
@media (max-width:640px){ .aima-marco{ padding:0 1rem 1rem; } }
.aima-display{ font-family:Aboreto,Georgia,serif; letter-spacing:.24em; }
.aima :focus-visible{ outline:2px solid var(--grafito); outline-offset:3px; border-radius:2px; }
.aima a, .aima button{ transition:color var(--dur-rapido) var(--ease), opacity var(--dur-rapido) var(--ease); }
.aima-skip{ position:absolute; left:-9999px; }
.aima-skip:focus{ position:static; display:inline-block; padding:.5rem 1rem; }

/* relleno direccional: entra por el borde por el que entró el cursor */
.rb{ position:relative; overflow:hidden; border:0; background:transparent; cursor:pointer;
  color:var(--grafito); box-shadow:inset 0 0 0 1px currentColor; border-radius:999px;
  font-size:.8rem; font-weight:500; letter-spacing:.02em; padding:.65rem 2rem; line-height:1.5; }
.rb--solid{ color:var(--papel); background:var(--grafito); box-shadow:none; }
.rb-hit{ position:absolute; inset:0; z-index:2; clip-path:var(--hit); }
.rb-hit[data-i="1"]{ --hit:polygon(0 0,100% 0,50% 50%) }
.rb-hit[data-i="2"]{ --hit:polygon(100% 0,100% 100%,50% 50%) }
.rb-hit[data-i="3"]{ --hit:polygon(0 100%,100% 100%,50% 50%) }
.rb-hit[data-i="4"]{ --hit:polygon(0 0,0 100%,50% 50%) }
.rb-fill{ position:absolute; inset:0; display:inline-flex; align-items:center; justify-content:center;
  background:var(--grafito); color:var(--papel); border-radius:999px;
  clip-path:var(--clip); opacity:0; visibility:hidden;
  transition:clip-path var(--dur-rapido) ease, opacity 0s var(--dur-rapido), visibility 0s var(--dur-rapido); }
.rb--solid .rb-fill{ background:var(--papel); color:var(--grafito); }
.rb-fill[data-i="1"]{ --clip:inset(0 0 100% 0 round 999px) }
.rb-fill[data-i="2"]{ --clip:inset(0 0 0 100% round 999px) }
.rb-fill[data-i="3"]{ --clip:inset(100% 0 0 0 round 999px) }
.rb-fill[data-i="4"]{ --clip:inset(0 100% 0 0 round 999px) }
.rb-hit[data-i="1"]:hover ~ .rb-fill[data-i="1"],
.rb-hit[data-i="2"]:hover ~ .rb-fill[data-i="2"],
.rb-hit[data-i="3"]:hover ~ .rb-fill[data-i="3"],
.rb-hit[data-i="4"]:hover ~ .rb-fill[data-i="4"]{
  --clip:inset(0 0 0 0 round 999px); opacity:1; visibility:visible;
  transition:clip-path var(--dur-rapido) ease, opacity 0s, visibility 0s; }

@media (prefers-reduced-motion:reduce){ .aima *{ transition-duration:.01ms !important; animation-duration:.01ms !important } }
`;

// --- Componentes ---

const Button = ({ children, solid = false, className = '', ...props }: any) => (
  <button type="button" className={`rb ${solid ? 'rb--solid' : ''} ${className}`} {...props}>
    <span>{children}</span>
    {[1, 2, 3, 4].map((i) => (
      <span key={`h${i}`} className="rb-hit" data-i={i} />
    ))}
    {[1, 2, 3, 4].map((i) => (
      <span key={`f${i}`} className="rb-fill" data-i={i} aria-hidden="true">
        {children}
      </span>
    ))}
  </button>
);

// El degradado de acabado va siempre de fondo y la foto encima. Si la foto no
// existe todavía, se oculta sola y queda el degradado: nunca se ve un icono roto.
const Media = ({ img, finish, alt = '', className = '', children }: any) => (
  <div
    className={`relative overflow-hidden rounded-[12px] ${className}`}
    style={{ background: FINISHES[finish] }}
  >
    {img && (
      <img
        src={src(img)}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
      />
    )}
    {children}
  </div>
);

const ProductCard = ({ name, spec, price, finish, tag, pearl, img }: any) => (
  <article className="flex flex-col gap-3">
    <Media img={img} finish={finish} alt={`${name} — ${spec}`} className="aspect-[4/5]">
      {tag && (
        <span className="absolute top-3 left-3 text-[10px] tracking-[0.12em] px-2 py-1 rounded-full bg-[#FDFCFA] text-[#26262A]">
          {tag}
        </span>
      )}
    </Media>
    <div className="flex flex-col flex-grow">
      <h3 className="text-[15px] font-medium tracking-[-0.01em]">{name}</h3>
      <p className="text-[12px] text-[#6B6A67] mt-1 font-mono">{spec}</p>
      {pearl && <p className="text-[12px] text-[#6B6A67] mt-1 italic">la única que sí te quitas</p>}
      <div className="flex items-center justify-between mt-4 gap-3">
        <span className="text-[14px] font-medium tabular-nums">{mxn(price)}</span>
        <Button className="!px-4 !py-1.5 !text-[11px]">al carrito</Button>
      </div>
    </div>
  </article>
);

// --- Página ---

export default function App() {
  const [heroOk, setHeroOk] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Aboreto&family=Instrument+Sans:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className="aima aima-marco min-h-screen selection:bg-[#26262A] selection:text-[#FDFCFA]">
      <style>{CSS}</style>
      <a href="#main" className="aima-skip">ir al contenido</a>

      {/* Banner: píldora flotante, no barra pegada */}
      <div className="mx-auto mb-3 mt-4 w-fit rounded-full bg-[#F4F1EC] px-4 py-1.5 text-[11px] tracking-[0.09em] text-[#6B6A67]">
        envío gratis desde $899
      </div>

      <header className="sticky top-0 z-50 rounded-b-[12px] bg-[#FDFCFA]">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <a href="#" className="aima-display text-2xl flex-shrink-0 pl-[0.24em]">AIMA</a>

          <nav className="hidden md:flex items-center gap-8 text-[13px] text-[#6B6A67]">
            <a href="#catalogo" className="hover:text-[#26262A]">aretes</a>
            <a href="#catalogo" className="hover:text-[#26262A]">collares</a>
            <a href="#catalogo" className="hover:text-[#26262A]">pulseras</a>
            <a href="#stack" className="text-[#26262A] relative after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:bg-[#26262A]">el stack</a>
          </nav>

          <div className="flex items-center gap-5 text-[#6B6A67]">
            <button className="hidden sm:block hover:text-[#26262A]" aria-label="buscar"><Search size={19} strokeWidth={1.5} /></button>
            <button className="relative hover:text-[#26262A]" aria-label="bolsa, 2 piezas">
              <ShoppingBag size={19} strokeWidth={1.5} />
              <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#26262A] text-[10px] text-[#FDFCFA] tabular-nums">2</span>
            </button>
            <button className="md:hidden hover:text-[#26262A]" aria-label="menú"><Menu size={22} strokeWidth={1.5} /></button>
          </div>
        </div>
      </header>

      <main id="main">
        {/* Hero — el color del texto depende de si la foto cargó, así que se
            decide en tiempo de ejecución y no adivinando. */}
        <section className="relative mt-3 overflow-hidden rounded-[12px] bg-[#E8E1D6]">
          <img
            src={src('hero')}
            alt="cuello con tres cadenas mezclando dorado y plateado"
            className="absolute inset-0 h-full w-full object-cover"
            onLoad={() => setHeroOk(true)}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              setHeroOk(false);
            }}
          />
          {/* Velo solo bajo el texto: sin él, blanco sobre foto clara es ilegible */}
          {heroOk && (
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/55 to-transparent" />
          )}
          <div className={`relative flex min-h-[26rem] flex-col items-start justify-end gap-5 p-8 sm:p-14 ${heroOk ? 'text-[#FDFCFA]' : 'text-[#26262A]'}`}>
            <h1 className="max-w-[14ch] text-[clamp(2.6rem,8vw,5rem)] font-normal leading-[0.98] tracking-[-0.03em] text-balance">
              arma tu stack.<br />no te lo quitas.
            </h1>
            <p className="max-w-[46ch] text-[15px] leading-relaxed opacity-80">
              acero 316L con baño de oro y plata. agua, sudor, gym, regadera. dormida.
            </p>
            <Button solid>shop el stack</Button>
          </div>
        </section>

        {/* El stack: el producto más rentable del catálogo */}
        <section id="stack" className="scroll-mt-20 mx-auto max-w-7xl px-4 py-20 sm:px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#6B6A67]">tres piezas, un solo look</p>
              <h2 className="text-[clamp(1.9rem,4.5vw,3rem)] leading-none tracking-[-0.03em]">el stack esencial</h2>
            </div>
            <p className="max-w-[38ch] text-[14px] leading-relaxed text-[#6B6A67]">
              dorado con plateado, sin regla que lo prohíba. las tres piezas están hechas para traerse juntas y para no quitarse.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-6">
            {STACK.map((p) => (
              <div key={p.name} className="flex flex-col gap-2">
                <Media img={p.img} finish={p.finish} alt={p.name} className="aspect-square" />
                <span className="text-[12px] text-[#6B6A67]">{p.name}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <span className="text-[20px] font-medium tabular-nums">{mxn(1490)}</span>
            <span className="text-[13px] text-[#6B6A67] line-through tabular-nums">{mxn(1870)} por separado</span>
            <Button>llevarme el stack</Button>
          </div>
        </section>

        {/* Catálogo */}
        <section id="catalogo" className="scroll-mt-20 mx-auto max-w-7xl px-4 pb-20 sm:px-6">
          <div className="mb-10 flex items-end justify-between gap-4">
            <h2 className="text-[clamp(1.9rem,4.5vw,3rem)] leading-none tracking-[-0.03em]">shop por pieza</h2>
            <a href="#" className="text-[13px] underline underline-offset-4 hover:text-[#6B6A67]">ver todo</a>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-8">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.name} {...p} />
            ))}
          </div>
        </section>

        {/* always on — la prueba, con su excepción declarada */}
        <section className="rounded-[12px] bg-[#F4F1EC] px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2">
              <div>
                <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[#6B6A67]">por qué no te la quitas</p>
                <h2 className="mb-6 text-[clamp(1.9rem,4.5vw,3rem)] leading-none tracking-[-0.03em]">always on</h2>
                <p className="max-w-[46ch] text-[15px] leading-relaxed text-[#6B6A67]">
                  acero inoxidable 316L, el mismo grado que se usa en material quirúrgico, con baño PVD de 1 a 3 micras.
                  no lleva cobre, así que no reacciona con el sudor y no te pinta la piel de verde. no se oxida, no se opaca
                  y no hay que guardarla en una cajita.
                </p>
                <p className="mt-6 max-w-[46ch] text-[14px] leading-relaxed text-[#6B6A67]">
                  <strong className="font-medium text-[#26262A]">la excepción:</strong> las piezas con perla sí se quitan.
                  el cloro, el perfume y el sudor opacan la perla. es la única de la línea que pide cuidado, y preferimos decirlo.
                </p>
              </div>

              {/* Texto debajo de la foto, nunca encima: sobre imagen variable el
                  contraste no se puede garantizar y ahí es donde esto se rompe. */}
              <ul className="grid grid-cols-2 gap-4 sm:gap-5">
                {ALWAYS_ON.map((c) => (
                  <li key={c.t} className="flex flex-col gap-2">
                    <Media img={c.img} finish={c.finish} alt={`${c.t}: ${c.d}`} className="aspect-square" />
                    <div>
                      <span className="block text-[16px] font-medium">{c.t}</span>
                      <span className="mt-0.5 block text-[13px] leading-snug text-[#6B6A67]">{c.d}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Comunidad */}
        <section className="mx-auto max-w-7xl px-4 py-24 text-center sm:px-6">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[#6B6A67]">#aimastack</p>
          <h2 className="mx-auto mb-6 max-w-[18ch] text-[clamp(1.9rem,4.5vw,3rem)] leading-none tracking-[-0.03em] text-balance">
            enséñanos cómo lo stackeaste
          </h2>
          <p className="mx-auto mb-10 max-w-[48ch] text-[15px] leading-relaxed text-[#6B6A67]">
            súbelo con el hashtag y etiquétanos. cada semana subimos los stacks que más nos gustan, y quien salga se lleva
            la siguiente pieza.
          </p>
          <div className="mx-auto mb-10 grid max-w-3xl grid-cols-3 gap-3 sm:gap-5">
            {COMUNIDAD.map((c) => (
              <Media key={c.img} img={c.img} finish={c.finish} alt={c.alt} className="aspect-[3/4]" />
            ))}
          </div>
          <div className="flex justify-center">
            <Button>seguir en instagram</Button>
          </div>
        </section>
      </main>

      <footer className="rounded-[12px] bg-[#F4F1EC] px-4 pb-10 pt-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 grid grid-cols-2 gap-10 md:grid-cols-4">
            <div className="col-span-2 md:col-span-1">
              <a href="#" className="aima-display mb-5 block text-xl pl-[0.24em]">AIMA</a>
              <p className="mb-5 max-w-[26ch] text-[13px] leading-relaxed text-[#6B6A67]">
                acero 316L con baño de oro y plata. hecho para no quitarse.
              </p>
              <a href="#" className="text-[#6B6A67] hover:text-[#26262A]" aria-label="instagram">
                <Instagram size={19} strokeWidth={1.5} />
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="mb-1 text-[11px] font-semibold uppercase tracking-[0.12em]">shop</h3>
              {['aretes', 'collares', 'pulseras', 'el stack'].map((l) => (
                <a key={l} href="#catalogo" className="text-[13px] text-[#6B6A67] hover:text-[#26262A]">{l}</a>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="mb-1 text-[11px] font-semibold uppercase tracking-[0.12em]">info</h3>
              {['cuidado de tus piezas', 'envíos y devoluciones', 'sobre aima', 'contacto'].map((l) => (
                <a key={l} href="#" className="text-[13px] text-[#6B6A67] hover:text-[#26262A]">{l}</a>
              ))}
            </div>

            <div className="col-span-2 md:col-span-1">
              <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.12em]">newsletter</h3>
              <p className="mb-4 max-w-[30ch] text-[13px] leading-relaxed text-[#6B6A67]">
                avisos de drops y restocks. 10% en tu primera pieza.
              </p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="mail" className="sr-only">tu correo</label>
                <input
                  id="mail"
                  type="email"
                  required
                  placeholder="tu correo"
                  className="flex-1 border-b border-[#DDD7CC] bg-transparent py-2 text-[13px] placeholder:text-[#6B6A67] focus:border-[#26262A] focus:outline-none"
                />
                <button type="submit" className="text-[#26262A] hover:text-[#6B6A67]" aria-label="suscribirme">
                  <ArrowRight size={19} strokeWidth={1.5} />
                </button>
              </form>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-3 border-t border-[#DDD7CC] pt-8 text-[12px] text-[#6B6A67] md:flex-row">
            <p>© 2026 AIMA. todos los derechos reservados.</p>
            <div className="flex gap-4"><span>MXN ($)</span><span>español</span></div>
          </div>
        </div>
      </footer>
    </div>
  );
}
