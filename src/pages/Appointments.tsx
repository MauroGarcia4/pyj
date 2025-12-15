import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon, ClockIcon, CurrencyDollarIcon, XCircleIcon } from '@heroicons/react/24/outline';

const Appointments: React.FC = () => {
  const { user } = useAuth();
  const { getUserAppointments, cancelAppointment, loading } = useBooking();
  
  const userAppointments = getUserAppointments(user?.id || '');
  
  const handleCancelAppointment = async (appointmentId: string) => {
    if (confirm('¿Estás seguro de que deseas cancelar esta cita?')) {
      try {
        await cancelAppointment(appointmentId);
        alert('Cita cancelada con éxito');
      } catch (error) {
        console.error('Error al cancelar cita:', error);
        alert('Error al cancelar la cita');
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-brand-light text-brand-deep';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendiente';
      case 'confirmed':
        return 'Confirmada';
      case 'cancelled':
        return 'Cancelada';
      case 'completed':
        return 'Completada';
      default:
        return status;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Por favor inicia sesión</h1>
          <p className="text-gray-600 mb-4">Debes iniciar sesión para ver tus citas.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mis Citas
          </h1>
          <p className="text-gray-600">
            Aquí puedes ver y gestionar tus citas agendadas
          </p>
        </div>

        {userAppointments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <CalendarIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No tienes citas agendadas
            </h2>
            <p className="text-gray-600 mb-6">
              Agenda una cita para tu mascota en nuestros servicios de veterinaria o peluquería.
            </p>
            <a
              href="/services"
              className="bg-brand-primary text-white px-6 py-2 rounded-md hover:bg-brand-deep transition-colors"
            >
              Ver Servicios
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {userAppointments.map((appointment) => (
              <div key={appointment.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {appointment.serviceName}
                    </h3>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                      {getStatusText(appointment.status)}
                    </span>
                  </div>
                  {appointment.status === 'pending' && (
                    <button
                      onClick={() => handleCancelAppointment(appointment.id)}
                      disabled={loading}
                      className="text-red-600 hover:text-red-800 disabled:opacity-50"
                      title="Cancelar cita"
                    >
                      <XCircleIcon className="h-6 w-6" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Appointment Details */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Detalles de la cita</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        <span>
                          {format(new Date(appointment.date), 'EEEE d \'de\' MMMM \'de\' yyyy', { locale: es })}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-2" />
                        <span>{appointment.time} - {appointment.duration} minutos</span>
                      </div>
                      <div className="flex items-center">
                        <CurrencyDollarIcon className="h-4 w-4 mr-2" />
                        <span className="font-medium">${appointment.price.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Pet Information */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Información de la mascota</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><strong>Nombre:</strong> {appointment.petName}</p>
                      <p><strong>Tipo:</strong> {appointment.petType}</p>
                      {appointment.petBreed && (
                        <p><strong>Raza:</strong> {appointment.petBreed}</p>
                      )}
                      <p><strong>Edad:</strong> {appointment.petAge} años</p>
                      <p><strong>Peso:</strong> {appointment.petWeight} kg</p>
                    </div>
                  </div>
                </div>

                {appointment.notes && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-md">
                    <h4 className="font-medium text-gray-900 mb-2">Notas</h4>
                    <p className="text-sm text-gray-600">{appointment.notes}</p>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs text-gray-500">
                    Cita agendada el {format(new Date(appointment.createdAt), 'd \'de\' MMMM \'de\' yyyy', { locale: es })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;
