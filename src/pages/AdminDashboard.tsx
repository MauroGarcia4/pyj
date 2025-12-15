import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useBooking } from '../contexts/BookingContext';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { appointments } = useBooking();
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'confirmed' | 'cancelled' | 'completed'>('all');

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Acceso no autorizado</h1>
          <p className="text-gray-600">No tienes permisos para acceder a esta página.</p>
        </div>
      </div>
    );
  }

  const filteredAppointments = appointments.filter(apt => 
    filterStatus === 'all' || apt.status === filterStatus
  );

  const stats = {
    total: appointments.length,
    pending: appointments.filter(apt => apt.status === 'pending').length,
    confirmed: appointments.filter(apt => apt.status === 'confirmed').length,
    today: appointments.filter(apt => 
      apt.date === new Date().toISOString().split('T')[0]
    ).length
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Panel de Administración
          </h1>
          <p className="text-gray-600">
            Gestión de citas y servicios
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
            <div className="text-gray-600">Total Citas</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-gray-600">Pendientes</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-2xl font-bold text-brand-deep">{stats.confirmed}</div>
            <div className="text-gray-600">Confirmadas</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-2xl font-bold text-blue-600">{stats.today}</div>
            <div className="text-gray-600">Hoy</div>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <div className="flex space-x-2">
            {(['all', 'pending', 'confirmed', 'cancelled', 'completed'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  filterStatus === status
                    ? 'bg-brand-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {status === 'all' ? 'Todas' : 
                 status === 'pending' ? 'Pendientes' :
                 status === 'confirmed' ? 'Confirmadas' :
                 status === 'cancelled' ? 'Canceladas' : 'Completadas'}
              </button>
            ))}
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Citas ({filteredAppointments.length})
            </h2>
          </div>
          
          {filteredAppointments.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No hay citas para mostrar
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <div key={appointment.id} className="p-6 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {appointment.serviceName}
                      </h3>
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        appointment.status === 'confirmed' ? 'bg-brand-light text-brand-deep' :
                        appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {appointment.status === 'pending' ? 'Pendiente' :
                         appointment.status === 'confirmed' ? 'Confirmada' :
                         appointment.status === 'cancelled' ? 'Cancelada' : 'Completada'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Appointment Details */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Cita</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p><strong>Fecha:</strong> {appointment.date}</p>
                        <p><strong>Horario:</strong> {appointment.time}</p>
                        <p><strong>Duración:</strong> {appointment.duration} min</p>
                        <p><strong>Precio:</strong> ${appointment.price.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Pet Information */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Mascota</h4>
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

                    {/* Owner Information */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Dueño</h4>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p><strong>ID Usuario:</strong> {appointment.userId}</p>
                        <p><strong>Servicio:</strong> {appointment.serviceType === 'veterinary' ? 'Veterinario' : 'Peluquería'}</p>
                        {appointment.notes && (
                          <p><strong>Notas:</strong> {appointment.notes}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
