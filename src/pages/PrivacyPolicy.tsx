import React from 'react';
import { PageHero } from '@/components/PageHero';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <PageHero 
        title="Política de Privacidad" 
        subtitle="Cómo protegemos y utilizamos tus datos personales"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white p-8 rounded-lg shadow-sm space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">1. Recolección de Información</h2>
            <p>
              En Pedro & Juan recolectamos información personal cuando te registras, realizas una compra o te suscribes a nuestro boletín. 
              Esto incluye tu nombre, dirección de correo electrónico, dirección de envío y número de teléfono.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">2. Uso de la Información</h2>
            <p>
              Utilizamos tu información para procesar tus pedidos, mejorar nuestro servicio de atención al cliente y enviarte actualizaciones sobre tus compras. 
              No compartimos tus datos personales con terceros con fines comerciales sin tu consentimiento.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">3. Seguridad de los Datos</h2>
            <p>
              Implementamos medidas de seguridad robustas para proteger tu información personal contra acceso no autorizado, alteración o divulgación. 
              Tus datos de pago son procesados de forma segura a través de pasarelas de pago encriptadas.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">4. Cookies</h2>
            <p>
              Utilizamos cookies para mejorar tu experiencia en nuestro sitio web, recordar tus preferencias y analizar el tráfico del sitio. 
              Puedes configurar tu navegador para rechazar las cookies, aunque esto podría limitar algunas funcionalidades.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">5. Contacto</h2>
            <p>
              Si tienes preguntas sobre nuestra política de privacidad, puedes contactarnos a través de info@pedroyjuan.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
