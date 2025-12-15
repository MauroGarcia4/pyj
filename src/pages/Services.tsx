import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { mockData } from '../lib/supabase';
import { HeartIcon, ScissorsIcon, ClockIcon, CurrencyDollarIcon, CheckCircleIcon, ShieldCheckIcon, PhoneIcon, CalendarIcon, CreditCardIcon } from '@heroicons/react/24/outline';
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
        title="Servicios Profesionales"
        subtitle="Atención clínica y estética con estándares profesionales, equipamiento moderno y trato libre de estrés."
        backgroundImage="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1350&q=80"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in-up">
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
            <div key={service.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col h-full overflow-hidden group animate-fade-in-up">
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

                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center"><ShieldCheckIcon className="h-4 w-4 mr-2 text-brand-secondary" /> Protocolos de higiene certificados</li>
                  <li className="flex items-center"><ClockIcon className="h-4 w-4 mr-2 text-gray-500" /> Puntualidad y turnos confirmados</li>
                  <li className="flex items-center"><CurrencyDollarIcon className="h-4 w-4 mr-2 text-gray-500" /> Precios claros y opciones de pago</li>
                </ul>
                
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
                    Reservar turno
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Professional Quality Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-fade-in-up">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10 lg:p-14 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Beneficios concretos para vos
              </h2>
              <div className="space-y-6">
                {[
                  { text: 'Agenda online 24/7 y confirmación inmediata de turnos', Icon: CalendarIcon },
                  { text: 'Recordatorios y seguimiento por WhatsApp', Icon: PhoneIcon },
                  { text: 'Atención puntual y tiempos de espera reducidos', Icon: ClockIcon },
                  { text: 'Medios de pago flexibles y financiación disponible', Icon: CreditCardIcon },
                ].map(({ text, Icon }, index) => (
                  <div key={index} className="flex items-start">
                    <Icon className="h-6 w-6 text-brand-secondary flex-shrink-0 mr-3" />
                    <p className="text-gray-600 font-medium">{text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative bg-gray-100 rounded-2xl overflow-hidden h-64 sm:h-72 md:h-96 lg:h-[420px]">
              <img 
                src="/img/servicios.jpg" 
                alt="Servicios profesionales Pedro y Juan" 
                className="absolute inset-0 w-full h-full object-cover object-[50%_40%] sm:object-[50%_45%] md:object-[50%_55%] lg:object-[50%_60%]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/10 via-black/5 to-transparent" />
            </div>
          </div>
        </div>

        {/* How We Work */}
        <section className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Cómo trabajamos</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: 'Reserva', desc: 'Elija servicio y horario', icon: CalendarIcon },
              { title: 'Evaluación', desc: 'Diagnóstico y plan', icon: HeartIcon },
              { title: 'Tratamiento', desc: 'Procedimiento y cuidados', icon: ScissorsIcon },
              { title: 'Seguimiento', desc: 'Recomendaciones y control', icon: ShieldCheckIcon },
            ].map(({ title, desc, icon: Icon }, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm animate-fade-in-up" style={{ animationDelay: `${i * 120}ms` }}>
                <Icon className="h-6 w-6 text-brand-primary" />
                <h4 className="mt-3 font-semibold text-gray-900">{title}</h4>
                <p className="text-gray-600 text-sm mt-1">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Banner */}
        <div className="mt-16 bg-brand-surface rounded-2xl border border-gray-100 p-8 flex flex-col md:flex-row md:items-center md:justify-between animate-fade-in-up">
          <div>
            <h3 className="text-xl font-bold text-brand-deep">¿Listo para agendar?</h3>
            <p className="text-gray-700 mt-1">Reserve su turno online o contáctenos por consultas rápidas.</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-3">
            <Link to="/services">
              <Button className="shadow">Ver servicios</Button>
            </Link>
            <Link to="/book-service/1">
              <Button variant="outline">Reservar ahora</Button>
            </Link>
          </div>
        </div>

        {/* Contact hint */}
        <div className="mt-6 flex items-center text-gray-600">
          <PhoneIcon className="h-5 w-5 mr-2" />
          Emergencias y consultas: +54 9 3364 02-2033
        </div>
      </div>
    </div>
  );
};

export default Services;
