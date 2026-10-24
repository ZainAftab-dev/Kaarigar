import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { StoreProvider } from './context/StoreContext'
import App from './App'
import './index.css'

// The live site uses clean URLs (BrowserRouter + Vercel rewrites).
// The single-file demo build uses HashRouter so it can open straight from a folder.
const Router = import.meta.env.MODE === 'demo' ? HashRouter : BrowserRouter

// Old links like /#/product/p1 still work: move them to /product/p1
if (Router === BrowserRouter && window.location.hash.startsWith('#/')) {
  window.history.replaceState(null, '', window.location.hash.slice(1))
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <StoreProvider>
        <App />
      </StoreProvider>
    </Router>
  </StrictMode>,
)
