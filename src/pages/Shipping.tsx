import React from 'react';
import { PageHero } from '@/components/PageHero';
import { Button } from '@/components/ui/Button';
import { MapPinIcon, PhoneIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export default function Shipping() {
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <PageHero 
        title="Envíos"
        subtitle="Modalidad de entrega presencial en San Nicolás de los Arroyos, Buenos Aires"
        backgroundImage="/img/envios.jpg"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white p-8 rounded-lg shadow-sm space-y-6 text-gray-700 animate-fade-in-up">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Alcance y modalidad</h2>
            <p className="mb-3">
              Actualmente operamos con retiro presencial y coordinación directa de entregas en la ciudad de San Nicolás de los Arroyos.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Retiro en sucursal con comprobante de compra.</li>
              <li>Coordinación por WhatsApp para horarios y disponibilidad.</li>
              <li>Entregas presenciales sujetas a disponibilidad y radio de cobertura.</li>
            </ul>
          </section>
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
              <div className="flex items-center text-gray-900 font-semibold mb-2">
                <MapPinIcon className="h-5 w-5 mr-2 text-brand-primary" />
                Sucursal
              </div>
              <p className="text-sm text-gray-600 mb-4">San Nicolás de los Arroyos, Buenos Aires</p>
              <a
                href="https://maps.app.goo.gl/1PH98RB4i8n2FN7NA"
                target="_blank"
                rel="noopener"
                className="text-brand-primary font-medium hover:text-brand-deep"
              >
                Ver en Google Maps →
              </a>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
              <div className="flex items-center text-gray-900 font-semibold mb-2">
                <PhoneIcon className="h-5 w-5 mr-2 text-brand-primary" />
                Coordinación
              </div>
              <p className="text-sm text-gray-600 mb-4">WhatsApp y teléfono</p>
              <a
                href="https://wa.me/5493364022033"
                target="_blank"
                rel="noopener"
                className="text-brand-primary font-medium hover:text-brand-deep"
              >
                +54 9 3364 02-2033
              </a>
            </div>
          </section>
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Horarios</h2>
            <div className="flex items-start">
              <ClockIcon className="h-5 w-5 mr-2 text-brand-primary mt-0.5" />
              <div className="text-sm text-gray-700 space-y-1">
                <p><span className="font-medium">Lun - Sáb:</span> 08:30 - 13:00 | 17:00 - 20:30</p>
                <p><span className="font-medium">Dom:</span> Cerrado</p>
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Consideraciones</h2>
            <p className="text-gray-700">
              Las entregas presenciales se coordinan previamente y pueden requerir validación de identidad. Para consultas sobre cobertura o disponibilidad, contáctenos por WhatsApp.
            </p>
          </section>
          <section className="pt-4">
            <div className="flex gap-3">
              <a
                href="https://maps.app.goo.gl/1PH98RB4i8n2FN7NA"
                target="_blank"
                rel="noopener"
              >
                <Button variant="outline">Ver sucursal</Button>
              </a>
              <Link to="/contact">
                <Button>Contactar</Button>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
