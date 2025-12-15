import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { TrashIcon, PlusIcon, MinusIcon, ShieldCheckIcon, CreditCardIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();

  const handleCheckout = () => {
    // Aquí iría la integración con MercadoPago
    alert('Funcionalidad de pago en desarrollo. Próximamente disponible.');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
          Tu Carrito de Compras
          <span className="ml-3 text-sm font-normal text-gray-500 bg-gray-200 px-3 py-1 rounded-full">{items.length} productos</span>
        </h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCartIcon className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Tu carrito está vacío</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">Parece que aún no has agregado nada. Explora nuestro catálogo y encuentra lo mejor para tu mascota.</p>
            <Link to="/products">
              <Button size="lg">
                Ir a la Tienda
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                  <h2 className="font-semibold text-gray-900">Productos</h2>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 text-xs font-medium uppercase tracking-wide hover:underline"
                  >
                    Vaciar carrito
                  </button>
                </div>
                <div className="divide-y divide-gray-100">
                  {items.map((item) => (
                    <div key={item.id} className="p-6 flex flex-col sm:flex-row items-center gap-6 hover:bg-gray-50 transition-colors">
                      <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-gray-500 text-sm mb-2">Código: #{item.id.substring(0, 6)}</p>
                        <p className="text-brand-primary font-semibold">${item.price.toLocaleString()}</p>
                      </div>
                      
                      <div className="flex items-center space-x-3 bg-white border border-gray-200 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 rounded-md hover:bg-gray-100 text-gray-600 disabled:opacity-50"
                          disabled={item.quantity <= 1}
                        >
                          <MinusIcon className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-medium text-gray-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 rounded-md hover:bg-gray-100 text-gray-600"
                        >
                          <PlusIcon className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="text-right min-w-[100px]">
                        <p className="text-lg font-bold text-gray-900">
                          ${(item.price * item.quantity).toLocaleString()}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 text-xs mt-2 flex items-center justify-end w-full"
                        >
                          <TrashIcon className="h-3 w-3 mr-1" /> Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Shipping Info */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-start space-x-4">
                <div className="bg-brand-light/30 p-2 rounded-full">
                  <ShieldCheckIcon className="h-6 w-6 text-brand-deep" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Garantía de Satisfacción</h3>
                  <p className="text-sm text-gray-500 mt-1">Si no estás conforme con tu compra, tienes 30 días para realizar cambios o devoluciones.</p>
                </div>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
                <h2 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Resumen del Pedido</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Envío</span>
                    <span className="text-green-600 font-medium">Gratis</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Descuentos</span>
                    <span>-$0.00</span>
                  </div>
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <div className="flex justify-between items-end">
                      <span className="text-lg font-bold text-gray-900">Total</span>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-brand-deep">${total.toLocaleString()}</span>
                        <p className="text-xs text-gray-500 mt-1">IVA incluido</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleCheckout}
                  size="lg"
                  className="w-full mb-4 shadow-lg hover:shadow-xl transform transition-transform active:scale-95"
                >
                  <LockClosedIcon className="h-5 w-5 mr-2" />
                  Finalizar Compra
                </Button>
                
                <div className="flex justify-center space-x-2 mb-6 opacity-60 grayscale">
                  <CreditCardIcon className="h-6 w-6" />
                  {/* Mock card icons */}
                  <div className="h-6 w-8 bg-gray-200 rounded"></div>
                  <div className="h-6 w-8 bg-gray-200 rounded"></div>
                  <div className="h-6 w-8 bg-gray-200 rounded"></div>
                </div>

                <Link
                  to="/products"
                  className="block text-center text-sm text-gray-500 hover:text-brand-primary font-medium underline"
                >
                  Continuar comprando
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper component since ShoppingCartIcon was not imported in the empty state
function ShoppingCartIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
    </svg>
  );
}

export default Cart;
