import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useBooking } from '@/contexts/BookingContext';
import { mockData } from '@/lib/supabase';
import { CalendarIcon, ClockIcon, UserIcon, HeartIcon, ScaleIcon, CalendarDaysIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { PageHero } from '@/components/PageHero';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const BookService: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { bookAppointment, getAvailableSlots, loading } = useBooking();

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [petInfo, setPetInfo] = useState({
    name: '',
    type: 'perro',
    breed: '',
    age: '',
    weight: '',
    notes: ''
  });

  // Obtener información del servicio
  const service = mockData.services.find(s => s.id === serviceId);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (service && selectedDate) {
      const slots = getAvailableSlots(selectedDate, service.id);
      setAvailableSlots(slots);
    }
  }, [user, navigate, service, selectedDate, getAvailableSlots]);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    setSelectedTime('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!service || !selectedDate || !selectedTime || !user) return;

    try {
      await bookAppointment({
        userId: user.id,
        serviceId: service.id,
        serviceName: service.name,
        serviceType: service.type as 'veterinary' | 'grooming',
        date: selectedDate,
        time: selectedTime,
        petName: petInfo.name,
        petType: petInfo.type,
        petBreed: petInfo.breed,
        petAge: parseInt(petInfo.age),
        petWeight: parseFloat(petInfo.weight),
        notes: petInfo.notes,
        status: 'pending',
        price: service.price,
        duration: service.duration_minutes
      });

      alert('¡Cita agendada con éxito! Te contactaremos para confirmar.');
      navigate('/appointments');
    } catch (error) {
      console.error('Error al agendar cita:', error);
      alert('Error al agendar la cita. Por favor, intenta nuevamente.');
    }
  };

  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30); // 30 días en el futuro
    return maxDate.toISOString().split('T')[0];
  };

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Servicio no encontrado</h1>
        <Button onClick={() => navigate('/services')}>
          Volver a Servicios
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHero 
        title={`Reservar ${service.name}`}
        subtitle={service.description}
        backgroundImage="https://images.unsplash.com/photo-1596272875729-ed2c21ebbbda?auto=format&fit=crop&w=1350&q=80"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Service Summary Banner */}
          <div className="bg-brand-surface p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
            <div>
              <h2 className="text-lg font-bold text-brand-deep">Resumen del Servicio</h2>
              <p className="text-gray-600 text-sm mt-1">{service.name}</p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-6">
               <div className="flex flex-col items-center sm:items-end">
                  <span className="text-xs text-gray-600 uppercase font-bold">Precio</span>
                  <span className="text-xl font-bold text-gray-900">${service.price.toLocaleString()}</span>
               </div>
               <div className="flex flex-col items-center sm:items-end">
                  <span className="text-xs text-gray-600 uppercase font-bold">Duración</span>
                  <span className="text-xl font-bold text-gray-900">{service.duration_minutes} min</span>
               </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            {/* Pet Information */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center pb-2 border-b border-gray-100">
                <HeartIcon className="h-6 w-6 mr-2 text-brand-primary" />
                Información de tu mascota
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Nombre de la mascota *"
                  value={petInfo.name}
                  onChange={(e) => setPetInfo({...petInfo, name: e.target.value})}
                  placeholder="Ej: Max"
                  required
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de mascota *
                  </label>
                  <select
                    required
                    value={petInfo.type}
                    onChange={(e) => setPetInfo({...petInfo, type: e.target.value})}
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent bg-white"
                  >
                    <option value="perro">Perro</option>
                    <option value="gato">Gato</option>
                    <option value="ave">Ave</option>
                    <option value="roedor">Roedor</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                
                <Input
                  label="Raza"
                  value={petInfo.breed}
                  onChange={(e) => setPetInfo({...petInfo, breed: e.target.value})}
                  placeholder="Ej: Labrador"
                />
                
                <Input
                  label="Edad (años) *"
                  type="number"
                  min={0}
                  max={30}
                  value={petInfo.age}
                  onChange={(e) => setPetInfo({...petInfo, age: e.target.value})}
                  required
                />
                
                <Input
                  label="Peso (kg) *"
                  type="number"
                  min={0.1}
                  step={0.1}
                  value={petInfo.weight}
                  onChange={(e) => setPetInfo({...petInfo, weight: e.target.value})}
                  required
                />

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notas adicionales (opcional)
                  </label>
                  <textarea
                    rows={3}
                    value={petInfo.notes}
                    onChange={(e) => setPetInfo({...petInfo, notes: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    placeholder="¿Algo que debamos saber? Alergias, comportamiento, etc."
                  />
                </div>
              </div>
            </div>

            {/* Date Selection */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center pb-2 border-b border-gray-100">
                <CalendarDaysIcon className="h-6 w-6 mr-2 text-brand-primary" />
                Seleccionar fecha y hora
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fecha *</label>
                    <input
                      type="date"
                      required
                      value={selectedDate}
                      onChange={(e) => handleDateChange(e.target.value)}
                      min={getMinDate()}
                      max={getMaxDate()}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    />
                 </div>
                 
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Horarios Disponibles *</label>
                    {selectedDate ? (
                      availableSlots.length > 0 ? (
                        <div className="grid grid-cols-3 gap-2">
                          {availableSlots.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedTime(slot)}
                              className={`px-2 py-2 text-sm rounded-md border transition-all ${
                                selectedTime === slot
                                  ? 'bg-brand-primary text-white border-brand-primary shadow-md'
                                  : 'bg-white text-gray-700 border-gray-300 hover:border-brand-primary hover:text-brand-primary'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-red-500 bg-red-50 p-3 rounded-md">No hay turnos disponibles para esta fecha.</p>
                      )
                    ) : (
                      <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-md">Selecciona una fecha primero.</p>
                    )}
                 </div>
              </div>
            </div>

            {/* User Information (Read-only) */}
            <div className="mb-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <UserIcon className="h-5 w-5 mr-2 text-brand-primary" />
                Tus datos de contacto
              </h2>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                   <span className="block text-gray-500 text-xs uppercase font-bold">Nombre</span>
                   <span className="text-gray-900 font-medium">{user?.fullName}</span>
                </div>
                <div>
                   <span className="block text-gray-500 text-xs uppercase font-bold">Email</span>
                   <span className="text-gray-900 font-medium">{user?.email}</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={!selectedDate || !selectedTime || loading}
              isLoading={loading}
            >
              <CheckCircleIcon className="h-5 w-5 mr-2" />
              Confirmar Reserva
            </Button>
            <p className="text-center text-xs text-gray-500 mt-4">
               Al confirmar, aceptas nuestros términos de servicio y política de cancelación.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookService;
