import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import { Template } from './components/Template'
import { SeniorContextProvider } from './contexts/SeniorContext'
import './index.css'
import { History } from './routes/history'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <SeniorContextProvider>
        <Template>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/historico" element={<History />} />
            </Routes>
          </BrowserRouter>
        </Template>
      </SeniorContextProvider>
    </ChakraProvider>
  </React.StrictMode>
)
