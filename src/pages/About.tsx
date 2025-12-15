import React from 'react';
import { PageHero } from '@/components/PageHero';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero 
        title="Pedro & Juan"
        subtitle="Más que una veterinaria, somos una familia dedicada al bienestar de tus mascotas en San Nicolás de los Arroyos."
        backgroundImage="https://images.unsplash.com/photo-1599443015574-be5fe8a05783?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      />

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Nuestra Misión</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            "Proveer servicios veterinarios y de cuidado animal de la más alta calidad, 
            creando un ambiente seguro y amoroso donde cada mascota es tratada como parte de nuestra propia familia."
          </p>
        </div>
      </section>

      {/* History Timeline */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Nuestra Historia</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-brand-primary/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Fundación</h3>
            <p className="text-gray-600 relative z-10">
              Nacimos con la idea de acercar productos y servicios de calidad para mascotas de la ciudad, comenzando como un pequeño consultorio.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-brand-secondary/10 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Crecimiento</h3>
            <p className="text-gray-600 relative z-10">
              Gracias a la confianza de nuestros clientes, sumamos peluquería canina y ampliamos nuestro catálogo, priorizando siempre marcas confiables y seguras.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-brand-light/20 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Actualidad</h3>
            <p className="text-gray-600 relative z-10">
              Hoy digitalizamos procesos para reservas online y compras con entrega ágil, manteniendo la calidez humana que nos caracteriza.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-16 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Nuestro Equipo</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { 
                name: 'Dr. Pedro', 
                role: 'Director Médico Veterinario', 
                bio: 'Especialista en clínica general y cirugía con más de 15 años de experiencia cuidando vidas.',
                image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
              },
              { 
                name: 'Juan', 
                role: 'Estilista Canino Profesional', 
                bio: 'Experto en cortes de raza y baños terapéuticos. Su paciencia y amor por los animales es inigualable.',
                image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
              },
              { 
                name: 'María', 
                role: 'Atención al Cliente', 
                bio: 'La sonrisa que te recibe. Se encarga de que tu experiencia y la de tu mascota sea perfecta.',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
              },
            ].map((m) => (
              <div key={m.name} className="flex flex-col items-center text-center group">
                <div className="relative w-40 h-40 mb-6 rounded-full overflow-hidden shadow-lg border-4 border-white ring-2 ring-brand-primary/20 group-hover:ring-brand-primary transition-all duration-300">
                  <img src={m.image} alt={m.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{m.name}</h3>
                <p className="text-sm font-semibold text-brand-primary uppercase tracking-wide mt-1 mb-3">{m.role}</p>
                <p className="text-gray-600 max-w-xs leading-relaxed">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
