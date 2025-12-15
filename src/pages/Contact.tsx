import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { PageHero } from '@/components/PageHero';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { PhoneIcon, MapPinIcon, ClockIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const schema = yup.object({
  name: yup.string().required('El nombre es requerido'),
  email: yup.string().email('Email inválido').required('El email es requerido'),
  phone: yup.string(),
  message: yup.string().required('El mensaje es requerido'),
}).required();

type FormData = yup.InferType<typeof schema>;

export default function Contact() {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data: FormData) => {
    // Mock send
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero 
        title="Contáctanos"
        subtitle="Estamos aquí para ayudarte. Escríbenos y te responderemos a la brevedad."
        backgroundImage="https://images.unsplash.com/photo-1596272875729-ed2c21ebbbda?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Envíanos un mensaje</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <Input
                id="name"
                label="Nombre completo"
                placeholder="Tu nombre"
                error={errors.name?.message}
                {...register('name')}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  id="email"
                  type="email"
                  label="Correo electrónico"
                  placeholder="tu@email.com"
                  error={errors.email?.message}
                  {...register('email')}
                />
                <Input
                  id="phone"
                  label="Teléfono (opcional)"
                  placeholder="+54 ..."
                  error={errors.phone?.message}
                  {...register('phone')}
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className={`flex w-full rounded-md border bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent ${errors.message ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'}`}
                  placeholder="¿En qué podemos ayudarte?"
                  {...register('message')}
                />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
              </div>

              <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
                Enviar Mensaje
              </Button>

              {sent && (
                <div className="bg-green-50 text-green-700 p-4 rounded-md text-center animate-fade-in">
                  ¡Gracias! Tu mensaje ha sido enviado. Te responderemos pronto.
                </div>
              )}
            </form>
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Información de Contacto</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-brand-primary/10 text-brand-primary">
                      <MapPinIcon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Ubicación</h3>
                    <p className="mt-1 text-gray-600">San Nicolás de los Arroyos, Buenos Aires, Argentina</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-brand-primary/10 text-brand-primary">
                      <PhoneIcon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Teléfono & WhatsApp</h3>
                    <p className="mt-1 text-gray-600">+54 9 346 123-4567</p>
                    <a href="https://wa.me/5490000000000" target="_blank" rel="noopener" className="text-sm font-medium text-brand-primary hover:text-brand-deep mt-1 inline-block">
                      Enviar WhatsApp &rarr;
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-brand-primary/10 text-brand-primary">
                      <EnvelopeIcon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                    <p className="mt-1 text-gray-600">contacto@pedroyjuan.com</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-brand-primary/10 text-brand-primary">
                      <ClockIcon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Horarios</h3>
                    <div className="mt-1 text-gray-600 space-y-1">
                      <p><span className="font-medium">Lun - Vie:</span> 9:00 - 19:00</p>
                      <p><span className="font-medium">Sáb:</span> 9:00 - 13:00</p>
                      <p><span className="font-medium">Dom:</span> Cerrado</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="aspect-video w-full overflow-hidden rounded-2xl shadow-sm border border-gray-100">
              <iframe
                title="Mapa Pedro y Juan"
                loading="lazy"
                className="w-full h-full"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3302.232!2d-60.2!3d-33.33!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b78e6f1c1:0x0!2sSan%20Nicol%C3%A1s%20de%20los%20Arroyos!5e0!3m2!1ses-419!2sar!4v0000000"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
