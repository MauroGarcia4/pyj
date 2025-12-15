import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'
import { CartProvider } from './contexts/CartContext'
import { BookingProvider } from './contexts/BookingContext'
 
// Runtime test: validar resolución de imports en dev
if (import.meta.env.DEV) {
  (async () => {
    try {
      await import('@/pages/Login')
      console.info('[import-check] Login resuelto correctamente')
    } catch (e) {
      console.error('[import-check] Error resolviendo Login:', e)
    }
  })()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <BookingProvider>
          <App />
        </BookingProvider>
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
)
