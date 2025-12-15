import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { mockData } from '../lib/supabase';
import { useCart } from '../contexts/CartContext';
import { ShoppingCartIcon, MagnifyingGlassIcon, FunnelIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import { PageHero } from '@/components/PageHero';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const Products: React.FC = () => {
  const { addToCart } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const categoryParam = searchParams.get('category') || '';
  
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });

  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '');
    setSelectedCategory(searchParams.get('category') || '');
  }, [searchParams]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Optional: update URL as user types, or just keep local state
    // For now let's keep local state for the input, but sync with URL on mount/update
  };

  const filteredProducts = mockData.products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero 
        title="Catálogo de Productos"
        subtitle="Encuentre todo lo necesario para el bienestar y la felicidad de su mascota."
        backgroundImage="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1350&q=80"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in-up">
        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-10">
          <div className="flex items-center mb-6">
            <FunnelIcon className="h-5 w-5 text-brand-primary mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">Filtros de búsqueda</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-5">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Buscar por nombre o descripción"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="md:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-10 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
              >
                <option value="">Todas las categorías</option>
                {mockData.categories.map(category => (
                  <option key={category.id} value={category.slug}>{category.name}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-4 flex items-center space-x-2">
              <Input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => setPriceRange({...priceRange, min: Number(e.target.value)})}
              />
              <span className="text-gray-400">-</span>
              <Input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value)})}
              />
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Mostrando <span className="font-semibold text-gray-900">{filteredProducts.length}</span> resultados
          </p>
        </div>

        {/* Products Grid (Updated Retail Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative overflow-hidden">
               {/* Badges */}
               <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                  Oferta
                </span>
                {product.stock < 5 && (
                  <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                    Últimas unidades
                  </span>
                )}
              </div>

              <div className="relative h-60 bg-gray-100 overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
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
              
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-gray-600 font-bold uppercase mb-1">
                    {product.category}
                  </div>
                  <h3 className="text-md font-semibold text-gray-900 mb-2 leading-tight hover:text-brand-primary transition-colors cursor-pointer">
                    {product.name}
                  </h3>
                  
                  {/* Specs Tags */}
                  {Object.keys(product.specifications).length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {Object.entries(product.specifications).slice(0, 2).map(([key, value]) => (
                        <span key={key} className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-800 border border-gray-200">
                          {value}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-50">
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

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100 mt-8">
            <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-300" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No se encontraron productos</h3>
            <p className="mt-1 text-sm text-gray-500">Pruebe ajustar los filtros de búsqueda.</p>
            <div className="mt-6">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                  setPriceRange({ min: 0, max: 50000 });
                }}
              >
                Limpiar filtros
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
