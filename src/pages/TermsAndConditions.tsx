import React from 'react';
import { PageHero } from '@/components/PageHero';

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <PageHero 
        title="Términos y Condiciones" 
        subtitle="Reglas y regulaciones para el uso de nuestro sitio web"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-white p-8 rounded-lg shadow-sm space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">1. Aceptación de los Términos</h2>
            <p>
              Al acceder y utilizar el sitio web de Pedro & Juan, aceptas cumplir con estos términos y condiciones. 
              Si no estás de acuerdo con alguna parte de estos términos, te pedimos que no utilices nuestro sitio.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">2. Compras y Pagos</h2>
            <p>
              Todos los precios están en pesos argentinos e incluyen IVA. Nos reservamos el derecho de cambiar los precios en cualquier momento. 
              El pago debe realizarse en el momento de la compra a través de los métodos de pago habilitados.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">3. Envíos y Devoluciones</h2>
            <p>
              Realizamos envíos dentro de la zona de cobertura especificada. Los tiempos de entrega son estimados. 
              Aceptamos devoluciones dentro de los 30 días posteriores a la compra, siempre que el producto esté en su estado original.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">4. Propiedad Intelectual</h2>
            <p>
              Todo el contenido de este sitio, incluyendo textos, gráficos, logotipos e imágenes, es propiedad de Pedro & Juan y está protegido por las leyes de propiedad intelectual.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-2">5. Modificaciones</h2>
            <p>
              Nos reservamos el derecho de modificar estos términos y condiciones en cualquier momento. 
              Los cambios entrarán en vigencia inmediatamente después de su publicación en el sitio web.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
