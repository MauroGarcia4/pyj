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
      images: ['/img/alimentos.png'],
      specifications: { peso: '15kg', marca: 'PremiumPet' }
    },
    {
      id: '2',
      name: 'Collar Antipulgas',
      description: 'Collar antipulgas para perros medianos',
      price: 3500,
      stock: 15,
      category: 'accesorios',
      images: ['/img/collar-tea-mediano.png'],
      specifications: { tamaño: 'mediano', duracion: '6 meses' }
    },
    {
      id: '3',
      name: 'Shampoo Hipoalergénico',
      description: 'Shampoo suave para mascotas sensibles',
      price: 2800,
      stock: 20,
      category: 'farmacia',
      images: ['/img/shampoo.jpg'],
      specifications: { volumen: '500ml', tipo: 'hipoalergénico' }
    },
    {
      id: '4',
      name: 'Cama Moises Redonda',
      description: 'Cama suave y confortable para perros',
      price: 18000,
      stock: 10,
      category: 'perros',
      images: ['/img/cama-moises.jpg'],
      specifications: { tamaño: 'L', material: 'Algodón' }
    },
    {
      id: '5',
      name: 'Rascador Torre 3 Niveles',
      description: 'Torre rascador para gatos con juguetes',
      price: 25000,
      stock: 8,
      category: 'gatos',
      images: ['/img/rascador.jpg'],
      specifications: { altura: '1.2m', color: 'Beige' }
    },
    {
      id: '6',
      name: 'Pelota de Goma Resistente',
      description: 'Juguete interactivo para perros destructores',
      price: 4500,
      stock: 30,
      category: 'juguetes',
      images: ['/img/pelota.png'],
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
