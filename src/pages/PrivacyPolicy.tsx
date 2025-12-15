import React from 'react';
import { PageHero } from '@/components/PageHero';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <PageHero 
        title="Política de Privacidad" 
        subtitle="Cómo protegemos y utilizamos sus datos personales"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white p-8 rounded-lg shadow-sm space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">1. Recolección de información</h2>
            <p>
              Recopilamos información personal cuando se registra, realiza una compra o se suscribe a nuestro boletín. 
              Esto incluye su nombre, dirección de correo electrónico, dirección de envío y número de teléfono.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">2. Uso de la información</h2>
            <p>
              Utilizamos su información para procesar pedidos, mejorar nuestro servicio de atención al cliente y enviarle actualizaciones sobre sus compras. 
              No compartimos sus datos personales con terceros con fines comerciales sin su consentimiento.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">3. Seguridad de los datos</h2>
            <p>
              Implementamos medidas de seguridad robustas para proteger su información personal contra acceso no autorizado, alteración o divulgación. 
              Sus datos de pago se procesan de forma segura a través de pasarelas de pago encriptadas.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">4. Cookies</h2>
            <p>
              Utilizamos cookies para mejorar su experiencia en nuestro sitio web, recordar sus preferencias y analizar el tráfico. 
              Puede configurar su navegador para rechazar cookies, aunque esto podría limitar algunas funcionalidades.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">5. Contacto</h2>
            <p>
              Si tiene preguntas sobre esta política de privacidad, puede contactarnos a través de info@pedroyjuan.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
