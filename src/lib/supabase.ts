export const supabaseConfig = {
  url: (import.meta as any).env?.VITE_SUPABASE_URL || '',
  anonKey: (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '',
};

export const isSupabaseConfigured = Boolean(supabaseConfig.url && supabaseConfig.anonKey);

export const mockData = {
  products: [
    {
      id: '1',
      name: 'Alimento Premium Perro Adulto',
      description: 'Alimento balanceado para perros adultos',
      price: 12500,
      stock: 25,
      category: 'alimentos',
      images: ['https://images.unsplash.com/photo-1585499193151-0f50d54c4e5c?w=500&auto=format&fit=crop&q=60'],
      specifications: { peso: '15kg', marca: 'PremiumPet' }
    },
    {
      id: '2',
      name: 'Collar Antipulgas',
      description: 'Collar antipulgas para perros medianos',
      price: 3500,
      stock: 15,
      category: 'accesorios',
      images: ['https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500&auto=format&fit=crop&q=60'],
      specifications: { tamaño: 'mediano', duracion: '6 meses' }
    },
    {
      id: '3',
      name: 'Shampoo Hipoalergénico',
      description: 'Shampoo suave para mascotas sensibles',
      price: 2800,
      stock: 20,
      category: 'farmacia',
      images: ['https://images.unsplash.com/photo-1623945193950-8919634d284a?w=500&auto=format&fit=crop&q=60'],
      specifications: { volumen: '500ml', tipo: 'hipoalergénico' }
    },
    {
      id: '4',
      name: 'Cama Moises Redonda',
      description: 'Cama suave y confortable para perros',
      price: 18000,
      stock: 10,
      category: 'perros',
      images: ['https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=500&auto=format&fit=crop&q=60'],
      specifications: { tamaño: 'L', material: 'Algodón' }
    },
    {
      id: '5',
      name: 'Rascador Torre 3 Niveles',
      description: 'Torre rascador para gatos con juguetes',
      price: 25000,
      stock: 8,
      category: 'gatos',
      images: ['https://images.unsplash.com/photo-1545249390-6bdfa2a27c62?w=500&auto=format&fit=crop&q=60'],
      specifications: { altura: '1.2m', color: 'Beige' }
    },
    {
      id: '6',
      name: 'Pelota de Goma Resistente',
      description: 'Juguete interactivo para perros destructores',
      price: 4500,
      stock: 30,
      category: 'juguetes',
      images: ['https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=500&auto=format&fit=crop&q=60'],
      specifications: { material: 'Caucho', tamaño: 'M' }
    },
    {
      id: '7',
      name: 'Vitaminas Complex',
      description: 'Suplemento vitamínico para mascotas senior',
      price: 6500,
      stock: 12,
      category: 'farmacia',
      images: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60'],
      specifications: { contenido: '60 comprimidos' }
    }
  ],
  services: [
    {
      id: '1',
      type: 'veterinary',
      name: 'Consulta General',
      description: 'Revisión completa de salud general',
      price: 2500,
      duration_minutes: 30
    },
    {
      id: '2',
      type: 'veterinary',
      name: 'Vacunación',
      description: 'Aplicación de vacunas correspondientes',
      price: 1800,
      duration_minutes: 15
    },
    {
      id: '3',
      type: 'grooming',
      name: 'Baño y Corte Pequeño',
      description: 'Baño completo y corte de pelo para mascotas pequeñas',
      price: 3500,
      duration_minutes: 90
    }
  ],
  categories: [
    { id: '1', name: 'Alimentos', slug: 'alimentos', description: 'Alimentos balanceados y snacks para mascotas' },
    { id: '2', name: 'Accesorios', slug: 'accesorios', description: 'Collares, correas, juguetes y más' },
    { id: '3', name: 'Medicamentos', slug: 'medicamentos', description: 'Productos veterinarios y medicinas' },
    { id: '4', name: 'Higiene', slug: 'higiene', description: 'Shampoo, cepillos y productos de limpieza' }
  ]
};
