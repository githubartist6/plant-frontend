import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './component/store/auth.jsx';
import { CartProvider } from './Context/CartContext.jsx';
import SplashCursor from './SplashCursor.jsx';
// import "react-toastify/dist/ReactToastify.css"

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <StrictMode>
      <CartProvider>
        {/* <SplashCursor /> */}
        <App />
      </CartProvider>
    </StrictMode>,
  </AuthProvider>
)
