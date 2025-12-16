import React, { useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { mockData } from '../lib/supabase';
import { ShoppingCartIcon, CalendarIcon, TruckIcon, ShieldCheckIcon, CreditCardIcon, SparklesIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useCart } from '../contexts/CartContext';
import { Button } from '@/components/ui/Button';

const Home: React.FC = () => {
  const { addToCart } = useCart();
  const featuredProducts = useMemo(() => mockData.products, []);

  // Mock Categories for Retail Feel
  const categories = [
    { name: 'Perros', image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=400&q=80', slug: 'perros' },
    { name: 'Gatos', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80', slug: 'gatos' },
    { name: 'Alimentos', image: '/img/categoria-de-aliementos.jpeg', slug: 'alimentos' },
    { name: 'Farmacia', image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=400&q=80', slug: 'farmacia' },
    { name: 'Juguetes', image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=400&q=80', slug: 'juguetes' },
    { name: 'Accesorios', image: '/img/accesorios-animales.jpg', slug: 'accesorios' },
  ];

  const promos = [
    {
      title: 'BBVA – 30% de ahorro',
      subtitle: 'Martes y jueves',
      detail: 'Tope de reintegro mensual de $3.500 en un pago',
      color: 'bg-blue-600',
    },
    {
      title: 'BBVA – 3 cuotas sin interés',
      subtitle: 'Viernes y sábados',
      detail: 'Financiación en 3 cuotas sin interés',
      color: 'bg-blue-700',
    },
    {
      title: 'Cuenta DNI – 40% de ahorro',
      subtitle: 'Todos los días',
      detail: 'Tope de reintegro semanal de $4.000',
      color: 'bg-green-600',
    },
    {
      title: 'Naranja X – 5 cuotas cero interés',
      subtitle: 'Todos los días',
      detail: 'Aplicable sobre precio de lista',
      color: 'bg-orange-600',
    },
  ];

  const promoRef = useRef<HTMLDivElement | null>(null);
  const featuredRef = useRef<HTMLDivElement | null>(null);

  const scrollPromos = (delta: number) => {
    const el = promoRef.current;
    if (!el) return;
    el.scrollBy({ left: delta, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Retail Hero Slider (Single Banner Style) */}
      <section className="relative bg-brand-deep">
        <div className="absolute inset-0 overflow-hidden">
           <img 
            src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1950&q=80" 
            alt="Mascotas Banner" 
            className="w-full h-full object-cover opacity-20"
           />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col items-start justify-center min-h-[500px] animate-fade-in-up">
          <span className="bg-brand-secondary text-white px-4 py-1 rounded-full text-sm font-semibold mb-6 tracking-wide uppercase">
            Nueva Colección 2025
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6 max-w-3xl">
            Soluciones integrales para el cuidado de su mascota<br/>
            <span className="text-brand-light">con precios competitivos.</span>
          </h1>
          <p className="text-xl text-gray-200 mb-10 max-w-2xl">
            Envío sin cargo en su primera compra. Alimentos premium, accesorios y farmacia veterinaria en un único lugar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/products">
              <Button size="lg" className="w-full sm:w-auto px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1">
                Ver promociones
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 bg-white text-brand-deep hover:bg-gray-100 font-semibold">
                Solicitar turno
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges Bar */}
      <div className="bg-white border-b border-gray-100 shadow-sm relative z-10 -mt-8 mx-4 md:mx-auto max-w-7xl rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center animate-fade-in-up">
        <div className="flex flex-col items-center justify-center">
          <TruckIcon className="h-8 w-8 text-brand-primary mb-2" />
          <h3 className="font-bold text-gray-900">Envíos ágiles</h3>
          <p className="text-sm text-gray-600 font-medium">En toda San Nicolás en 24 horas</p>
        </div>
        <div className="flex flex-col items-center justify-center md:border-l md:border-r border-gray-100">
          <CreditCardIcon className="h-8 w-8 text-brand-primary mb-2" />
          <h3 className="font-bold text-gray-900">Financiación</h3>
          <p className="text-sm text-gray-600 font-medium">Hasta 3 y 6 cuotas sin interés</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <ShieldCheckIcon className="h-8 w-8 text-brand-primary mb-2" />
          <h3 className="font-bold text-gray-900">Transacciones seguras</h3>
          <p className="text-sm text-gray-600 font-medium">Protección de datos garantizada</p>
        </div>
      </div>

      {/* Categories Grid (Circles) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center md:text-left">¿Qué desea buscar?</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
          {categories.map((cat, i) => (
            <Link key={cat.name} to={`/products?category=${cat.slug}`} className="group flex flex-col items-center animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-md group-hover:shadow-xl group-hover:border-brand-primary transition-all duration-300">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <span className="mt-3 font-medium text-gray-700 group-hover:text-brand-primary transition-colors">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Promotional Banners Grid */}
      <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative rounded-2xl overflow-hidden h-64 group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80" 
              alt="Promo Perros" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex flex-col justify-center p-8">
              <span className="text-brand-light font-bold text-sm uppercase tracking-wider mb-2">Solo por hoy</span>
              <h3 className="text-3xl font-bold text-white mb-4">20% OFF en <br/>Alimentos premium</h3>
              <Link to="/products?category=alimentos">
                <Button size="sm" className="w-fit bg-white text-black hover:bg-gray-100 border-none">Ver catálogo</Button>
              </Link>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden h-64 group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80" 
              alt="Promo Gatos" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-deep/80 to-transparent flex flex-col justify-center p-8">
              <span className="text-brand-light font-bold text-sm uppercase tracking-wider mb-2">Novedades</span>
              <h3 className="text-3xl font-bold text-white mb-4">Juguetes para <br/>gatos felices</h3>
              <Link to="/products?category=juguetes">
                <Button size="sm" className="w-fit bg-white text-black hover:bg-gray-100 border-none">Comprar ahora</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Promociones Bancarias */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Promociones bancarias</h2>
          <div className="hidden md:flex items-center gap-2">
            <button aria-label="Anterior" onClick={() => scrollPromos(-320)} className="p-2 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50">
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button aria-label="Siguiente" onClick={() => scrollPromos(320)} className="p-2 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50">
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div
          className="flex gap-4 overflow-x-auto overflow-y-hidden snap-x snap-mandatory pb-2 pr-2 scrollbar-hidden"
          style={{ WebkitOverflowScrolling: 'touch', overscrollBehaviorX: 'contain', touchAction: 'pan-x pinch-zoom' }}
          ref={promoRef}
        >
          {promos.map((p, i) => (
            <div key={p.title} className="snap-center min-w-[280px] sm:min-w-[320px] bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1" style={{ animationDelay: `${i * 120}ms` }}>
              <div className="h-2 rounded-t-xl w-full" style={{ backgroundColor: 'transparent' }}>
                {/* color strip via gradient utility replaced by inline style when necessary */}
              </div>
              <div className="p-5">
                <div className="flex items-center mb-3">
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center text-white ${p.color}`}>
                    <CreditCardIcon className="h-5 w-5" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-md font-semibold text-gray-900 leading-tight">{p.title}</h3>
                    <p className="text-xs text-gray-600">{p.subtitle}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">{p.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-4">Sujeto a condiciones de cada banco/medio de pago. Verifique términos aplicables al momento de la compra.</p>
      </section>

      {/* Featured Products (Retail Cards) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Promociones destacadas</h2>
            <p className="text-gray-600 mt-1 font-medium">Aproveche precios exclusivos</p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button aria-label="Anterior" onClick={() => featuredRef.current?.scrollBy({ left: -340, behavior: 'smooth' })} className="p-2 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50">
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button aria-label="Siguiente" onClick={() => featuredRef.current?.scrollBy({ left: 340, behavior: 'smooth' })} className="p-2 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50">
              <ChevronRightIcon className="h-5 w-5" />
            </button>
            <Link to="/products" className="text-brand-primary font-medium hover:text-brand-deep ml-2">
              Ver todo &rarr;
            </Link>
          </div>
        </div>
        
        <div
          className="flex gap-6 overflow-x-auto overflow-y-hidden snap-x snap-mandatory pb-2 pr-2 scrollbar-hidden"
          style={{ WebkitOverflowScrolling: 'touch', overscrollBehaviorX: 'contain', touchAction: 'pan-x' }}
          ref={featuredRef}
        >
          {featuredProducts.map((product) => (
            <div key={product.id} className="snap-center min-w-[280px] sm:min-w-[320px] lg:min-w-[340px] bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col group relative overflow-hidden">
              {/* Badges */}
              <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                  Oferta
                </span>
                {product.stock < 5 && (
                  <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                    Últimos
                  </span>
                )}
              </div>

              <div className="relative h-60 bg-gray-100 overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Quick Action Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/50 to-transparent flex justify-center">
                   <Button 
                      size="sm" 
                      className="w-full shadow-lg bg-white text-brand-deep hover:bg-gray-50 border-none"
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.images[0]
                        });
                      }}
                    >
                      <ShoppingCartIcon className="h-4 w-4 mr-2" />
                      Agregar al carrito
                    </Button>
                </div>
              </div>
              
              <div className="p-4 flex-1 flex flex-col">
                <div className="mb-2">
                  <span className="text-xs text-gray-600 font-bold uppercase">{product.category}</span>
                  <Link to={`/products`} className="block mt-1">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-brand-primary transition-colors min-h-[2.5rem]">
                      {product.name}
                    </h3>
                  </Link>
                </div>
                
                <div className="mt-auto">
                   <div className="flex items-baseline space-x-2">
                      <span className="text-xl font-bold text-gray-900">${product.price.toLocaleString()}</span>
                      <span className="text-sm text-gray-600 font-semibold line-through">${(product.price * 1.2).toLocaleString()}</span>
                   </div>
                   <div className="mt-2 flex items-center text-green-800 text-xs font-bold">
                      <CreditCardIcon className="h-3 w-3 mr-1" />
                      3 cuotas sin interés
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
          <Link to="/products">
            <Button variant="outline" className="w-full">Ver todo el catálogo</Button>
          </Link>
        </div>
      </section>

      {/* Services Banner */}
      <section className="py-16 bg-gray-50 animate-fade-in-up">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-brand-primary rounded-3xl overflow-hidden shadow-2xl relative">
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
               <div className="grid md:grid-cols-2 items-center relative z-10">
                  <div className="p-10 md:p-16 text-white">
                     <div className="flex items-center space-x-2 mb-4 text-white">
                        <SparklesIcon className="h-5 w-5" />
                        <span className="uppercase tracking-widest font-bold text-sm">Servicio destacado</span>
                     </div>
                     <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">
                        Su mascota merece <br/>la mejor atención
                     </h2>
                     <p className="text-lg text-white mb-8 max-w-md">
                        Disponemos de clínica veterinaria de última generación y peluquería especializada. Reserve su turno en línea en segundos.
                     </p>
                     <Link to="/services">
                        <Button className="bg-white text-brand-primary hover:bg-gray-100 border-none px-8 py-3 text-lg font-bold">
                           Reservar turno
                        </Button>
                     </Link>
                  </div>
                  <div className="h-full min-h-[300px] bg-cover bg-center" style={{ backgroundImage: "url('/img/pedroyjuan.jpg')" }}>
                  </div>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
};

export default Home;
