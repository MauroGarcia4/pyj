import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Appointment {
  id: string;
  userId: string;
  serviceId: string;
  serviceName: string;
  serviceType: 'veterinary' | 'grooming';
  date: string;
  time: string;
  petName: string;
  petType: string;
  petBreed: string;
  petAge: number;
  petWeight: number;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  price: number;
  duration: number;
  createdAt: string;
}

interface BookingContextType {
  appointments: Appointment[];
  bookAppointment: (appointment: Omit<Appointment, 'id' | 'createdAt'>) => Promise<void>;
  cancelAppointment: (id: string) => Promise<void>;
  getAvailableSlots: (date: string, serviceId: string) => string[];
  getUserAppointments: (userId: string) => Appointment[];
  loading: boolean;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);

  // Cargar citas desde localStorage
  useEffect(() => {
    const savedAppointments = localStorage.getItem('pedro-y-juan-appointments');
    if (savedAppointments) {
      setAppointments(JSON.parse(savedAppointments));
    }
  }, []);

  // Guardar citas en localStorage
  useEffect(() => {
    localStorage.setItem('pedro-y-juan-appointments', JSON.stringify(appointments));
  }, [appointments]);

  const bookAppointment = async (appointmentData: Omit<Appointment, 'id' | 'createdAt'>) => {
    setLoading(true);
    try {
      const newAppointment: Appointment = {
        ...appointmentData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };
      
      setAppointments(prev => [...prev, newAppointment]);
      
      // Simular envío de confirmación por email (en producción esto sería real)
      console.log('Cita agendada:', newAppointment);
      
    } catch (error) {
      console.error('Error al agendar cita:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (id: string) => {
    setLoading(true);
    try {
      setAppointments(prev => prev.map(apt => 
        apt.id === id ? { ...apt, status: 'cancelled' as const } : apt
      ));
    } catch (error) {
      console.error('Error al cancelar cita:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getAvailableSlots = (date: string, serviceId: string): string[] => {
    // Obtener duración del servicio
    const service = mockData.services.find(s => s.id === serviceId);
    if (!service) return [];

    const serviceDuration = service.duration_minutes;
    
    // Ventanas de atención: mañana y tarde
    const windows = [
      { startHour: 8, startMinute: 30, endHour: 13, endMinute: 0 },
      { startHour: 17, startMinute: 0, endHour: 20, endMinute: 30 },
    ];

    // Generar slots de tiempo basados en la duración del servicio
    const slots: string[] = [];
    for (const w of windows) {
      const startTotal = w.startHour * 60 + w.startMinute;
      const endTotal = w.endHour * 60 + w.endMinute;
      for (let t = startTotal; t < endTotal; t += serviceDuration) {
        const hour = Math.floor(t / 60);
        const minute = t % 60;
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

        const isSlotAvailable = !appointments.some(apt => 
          apt.date === date && 
          apt.time === time && 
          apt.status !== 'cancelled'
        );

        if (isSlotAvailable) {
          slots.push(time);
        }
      }
    }
    
    return slots;
  };

  const getUserAppointments = (userId: string): Appointment[] => {
    return appointments.filter(apt => apt.userId === userId);
  };

  const value = {
    appointments,
    bookAppointment,
    cancelAppointment,
    getAvailableSlots,
    getUserAppointments,
    loading,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

// Mock de datos mientras no tengamos Supabase
const mockData = {
  services: [
    {
      id: '1',
      type: 'veterinary' as const,
      name: 'Consulta General',
      description: 'Revisión completa de salud general',
      price: 2500,
      duration_minutes: 30
    },
    {
      id: '2',
      type: 'veterinary' as const,
      name: 'Vacunación',
      description: 'Aplicación de vacunas correspondientes',
      price: 1800,
      duration_minutes: 15
    },
    {
      id: '3',
      type: 'grooming' as const,
      name: 'Baño y Corte Pequeño',
      description: 'Baño completo y corte de pelo para mascotas pequeñas',
      price: 3500,
      duration_minutes: 90
    }
  ]
};
