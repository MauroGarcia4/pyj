import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { mockData } from '../lib/supabase';
import { HeartIcon, ScissorsIcon, ClockIcon, CurrencyDollarIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { PageHero } from '@/components/PageHero';
import { Button } from '@/components/ui/Button';

const Services: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [selectedType, setSelectedType] = useState<'all' | 'veterinary' | 'grooming'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const query = searchParams.get('search');
    if (query) {
      setSearchTerm(query);
      setSelectedType('all'); // Reset type filter when searching
    } else {
      setSearchTerm('');
    }
  }, [searchParams]);

  const filteredServices = mockData.services.filter(service => {
    const matchesType = selectedType === 'all' || service.type === selectedType;
    const matchesSearch = searchTerm === '' || 
                          service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'veterinary':
        return <HeartIcon className="h-8 w-8 text-brand-primary" />;
      case 'grooming':
        return <ScissorsIcon className="h-8 w-8 text-brand-secondary" />;
      default:
        return <HeartIcon className="h-8 w-8 text-brand-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero 
        title="Nuestros Servicios"
        subtitle="Cuidamos la salud y bienestar de tus mascotas con servicios veterinarios de calidad y peluquería profesional."
        backgroundImage="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Service Type Filter */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
            <button
              onClick={() => setSelectedType('all')}
              className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                selectedType === 'all'
                  ? 'bg-brand-primary text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setSelectedType('veterinary')}
              className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                selectedType === 'veterinary'
                  ? 'bg-brand-primary text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              Veterinaria
            </button>
            <button
              onClick={() => setSelectedType('grooming')}
              className={`px-6 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                selectedType === 'grooming'
                  ? 'bg-brand-primary text-white shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              Peluquería
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col h-full overflow-hidden group">
              <div className="p-8 flex-1">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-brand-primary/10 rounded-xl group-hover:bg-brand-primary/20 transition-colors">
                    {getServiceIcon(service.type)}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gray-900 leading-tight">
                      {service.name}
                    </h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mt-1 ${
                      service.type === 'veterinary' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-teal-100 text-teal-800'
                    }`}>
                      {service.type === 'veterinary' ? 'Clínica' : 'Estética'}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div className="flex items-center text-gray-600">
                    <ClockIcon className="h-5 w-5 mr-1.5 text-gray-500" />
                    <span className="text-sm font-medium">{service.duration_minutes} min</span>
                  </div>
                  <div className="flex items-center text-brand-deep">
                    <span className="text-2xl font-bold">${service.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="px-8 pb-8 pt-0">
                <Link to={`/book-service/${service.id}`}>
                  <Button className="w-full shadow-md">
                    Reservar Turno
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10 lg:p-14 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                ¿Por qué elegir nuestros servicios?
              </h2>
              <div className="space-y-6">
                {[
                  'Profesionales veterinarios certificados con años de experiencia.',
                  'Instalaciones modernas y equipamiento de última generación.',
                  'Trato personalizado, cariñoso y libre de estrés para tu mascota.',
                  'Protocolos estrictos de higiene y seguridad.'
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircleIcon className="h-6 w-6 text-brand-secondary flex-shrink-0 mr-3" />
                    <p className="text-gray-600 font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-64 lg:h-auto bg-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1623366302587-b38b1ddaefd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                alt="Veterinario examinando perro" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
