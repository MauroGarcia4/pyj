import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { mockData } from '@/lib/supabase';
import { Bars3Icon, XMarkIcon, ShoppingCartIcon, UserIcon, MagnifyingGlassIcon, MapPinIcon, ChatBubbleOvalLeftIcon } from '@heroicons/react/24/outline';
import { Facebook, Instagram } from 'lucide-react';
import logoUrl from '../../brand/logo.png?url'

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      // Intelligent redirect: Check if term matches any service
      const hasServiceMatch = mockData.services.some(service => 
        service.name.toLowerCase().includes(term) || 
        service.description.toLowerCase().includes(term) ||
        service.type.toLowerCase().includes(term)
      );

      if (hasServiceMatch) {
        navigate(`/services?search=${encodeURIComponent(searchTerm)}`);
      } else {
        navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Productos', href: '/products' },
    { name: 'Servicios', href: '/services' },
    { name: 'Nosotros', href: '/about' },
    { name: 'Contacto', href: '/contact' },
  ];

  useEffect(() => {
    const base = 'Pedro & Juan';
    const path = location.pathname;
    let title = base;
    if (path === '/products') title = `Productos | ${base}`;
    else if (path === '/services') title = `Servicios | ${base}`;
    else if (path.startsWith('/book-service')) title = `Reservar Servicio | ${base}`;
    else if (path === '/appointments') title = `Mis Citas | ${base}`;
    else if (path === '/cart') title = `Carrito | ${base}`;
    else if (path === '/login') title = `Ingresar | ${base}`;
    else if (path === '/register') title = `Registrarse | ${base}`;
    else if (path === '/about') title = `Nosotros | ${base}`;
    else if (path === '/contact') title = `Contacto | ${base}`;
    else if (path === '/privacy') title = `Política de Privacidad | ${base}`;
    else if (path === '/terms') title = `Términos y Condiciones | ${base}`;
    document.title = title;
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Bar - Retail Style */}
      <div className="bg-brand-deep text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Mobile static links */}
          <div className="sm:hidden flex justify-between items-center">
            <Link to="/contact" className="hover:text-brand-light">Soporte</Link>
            <a href="https://maps.app.goo.gl/1PH98RB4i8n2FN7NA" target="_blank" rel="noopener" className="hover:text-brand-light">Sucursales</a>
            {!user && <Link to="/register" className="hover:text-brand-light font-semibold">Crear cuenta</Link>}
          </div>
          {/* Mobile ticker (promos) */}
          <div className="ticker sm:hidden mt-1">
            <div className="ticker-track flex items-center gap-6 whitespace-nowrap">
              <span className="font-medium">Envío sin cargo en compras superiores a $50.000</span>
              <span className="font-medium">Hasta 3 cuotas sin interés</span>
              {/* duplicate for seamless loop */}
              <span className="font-medium">Envío sin cargo en compras superiores a $50.000</span>
              <span className="font-medium">Hasta 3 cuotas sin interés</span>
            </div>
          </div>
          {/* Desktop */}
          <div className="hidden sm:flex justify-between items-center">
            <div className="flex items-center">
              <span className="font-medium">Envío sin cargo en compras superiores a $50.000</span>
              <span className="mx-3">•</span>
              <span className="font-medium">Hasta 3 cuotas sin interés</span>
            </div>
            <div className="flex space-x-4">
              <Link to="/contact" className="hover:text-brand-light transition-colors">Soporte</Link>
              <a href="https://maps.app.goo.gl/1PH98RB4i8n2FN7NA" target="_blank" rel="noopener" className="hover:text-brand-light transition-colors">Sucursales</a>
              {!user && <Link to="/register" className="hover:text-brand-light transition-colors font-semibold">Crear cuenta</Link>}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 gap-4">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img src={logoUrl} alt="Pedro y Juan" className="h-12 md:h-14" />
            </Link>

            {/* Search Bar (Retail Style) - Hidden on mobile, visible on md+ */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-6">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Busque productos o servicios para su mascota"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full h-10 pl-4 pr-20 rounded-full border border-gray-300 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary bg-gray-50 text-sm text-gray-700 placeholder:text-gray-500 transition-all"
                />
                {searchTerm && (
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      navigate('/products');
                    }}
                    className="absolute right-10 top-0 h-10 w-8 flex items-center justify-center text-gray-400 hover:text-gray-600"
                  >
                    <XMarkIcon className="h-5 w-5" />
                  </button>
                )}
                <button 
                  onClick={handleSearch}
                  className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center text-gray-500 hover:text-brand-primary rounded-r-full"
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-2 sm:space-x-6">
               {/* Search Icon Mobile */}
               <button className="md:hidden p-2 text-gray-700">
                  <MagnifyingGlassIcon className="h-6 w-6" />
               </button>

              {/* User Menu */}
              {user ? (
                <div className="relative group hidden sm:block">
                  <button className="flex items-center space-x-1 p-2 text-gray-700 hover:text-brand-primary">
                    <UserIcon className="h-6 w-6" />
                    <div className="flex flex-col text-left">
                      <span className="text-xs text-gray-500">Hola,</span>
                      <span className="text-sm font-semibold leading-none">{user.fullName.split(' ')[0]}</span>
                    </div>
                  </button>
                  {/* Dropdown */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border border-gray-100">
                    <Link to="/appointments" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Mis Citas</Link>
                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Cerrar Sesión</button>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="hidden sm:flex items-center space-x-1 p-2 text-gray-700 hover:text-brand-primary">
                  <UserIcon className="h-6 w-6" />
                  <div className="flex flex-col text-left">
                    <span className="text-xs text-gray-500">Bienvenido</span>
                    <span className="text-sm font-semibold leading-none">Iniciar sesión</span>
                  </div>
                </Link>
              )}

              {/* Cart */}
              <Link to="/cart" className="relative p-2 text-gray-700 hover:text-brand-primary transition-colors group">
                <div className="flex items-center">
                  <ShoppingCartIcon className="h-7 w-7" />
                  {itemCount > 0 && (
                    <span className="absolute top-0 right-0 sm:right-auto sm:left-6 bg-brand-primary text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                      {itemCount}
                    </span>
                  )}
                </div>
              </Link>

              {/* Mobile Menu Toggle */}
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-gray-700 hover:text-brand-primary">
                {isMenuOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
              </button>
            </div>
          </div>

          {/* Secondary Navigation (Categories) - Desktop */}
          <nav className="hidden md:flex space-x-8 py-3 border-t border-gray-100 overflow-x-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive(item.href) ? 'text-brand-primary' : 'text-gray-600 hover:text-brand-primary'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
            <div className="px-4 py-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-3 rounded-md text-base font-medium ${
                    isActive(item.href)
                      ? 'bg-brand-light/30 text-brand-deep'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {!user && (
                 <Link
                  to="/login"
                  className="block px-3 py-3 rounded-md text-base font-medium text-brand-primary bg-gray-50 mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Iniciar Sesión / Registrarse
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children ? children : <Outlet />}
      </main>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/5493364022033?text=Hola%20Pedro%20%26%20Juan%2C%20quiero%20hacer%20una%20consulta"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Enviar mensaje por WhatsApp"
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 group"
      >
        <span className="sr-only">WhatsApp</span>
        <div className="h-11 w-11 md:h-14 md:w-14 rounded-full shadow-md md:shadow-lg transition-colors flex items-center justify-center" style={{ backgroundColor: '#25D366' }}>
          <ChatBubbleOvalLeftIcon className="h-5 w-5 md:h-7 md:w-7 text-white" />
        </div>
        <div className="hidden md:block absolute right-full mr-2 bottom-0 translate-y-1/2 bg-white text-gray-700 text-xs rounded-full px-3 py-1 shadow-sm border border-gray-200 opacity-0 group-hover:opacity-100">
          Chatear por WhatsApp
        </div>
      </a>

      {/* Footer Retail Style */}
      <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="col-span-1 md:col-span-1">
              <img src={logoUrl} alt="Pedro y Juan" className="h-10 mb-4 grayscale opacity-70" />
              <p className="text-gray-600 text-sm leading-relaxed">
                 Tienda especializada en mascotas en San Nicolás. Todo para el bienestar de su compañero en un único lugar.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Ayuda</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><Link to="/contact" className="hover:text-brand-primary">Contacto</Link></li>
                <li><Link to="/about" className="hover:text-brand-primary">Sobre Nosotros</Link></li>
                <li><a href="https://maps.app.goo.gl/1PH98RB4i8n2FN7NA" target="_blank" rel="noopener" className="hover:text-brand-primary">Sucursales</a></li>
                <li><Link to="/shipping" className="hover:text-brand-primary">Envíos</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Redes sociales</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="https://www.facebook.com/pedroyjuan.sn/?locale=es_LA" target="_blank" rel="noopener" className="flex items-center hover:text-brand-primary">
                    <Facebook className="h-4 w-4 mr-2" /> Facebook
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/pedroyjuan/?hl=es-la" target="_blank" rel="noopener" className="flex items-center hover:text-brand-primary">
                    <Instagram className="h-4 w-4 mr-2" /> Instagram
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center"><MapPinIcon className="h-4 w-4 mr-2"/> San Nicolás de los Arroyos, Buenos Aires</li>
                <li className="flex items-center"><UserIcon className="h-4 w-4 mr-2"/> +54 9 3364 02-2033</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>© 2025 Pedro & Juan. Todos los derechos reservados.</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
               <Link to="/privacy" className="hover:text-brand-primary transition-colors">Privacidad</Link>
               <Link to="/terms" className="hover:text-brand-primary transition-colors">Términos</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
