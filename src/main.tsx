import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import QueryProviderWrapper from './provider/query.provider.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter basename="/">
            <QueryProviderWrapper>
                <App />
                <ToastContainer />
            </QueryProviderWrapper>
        </BrowserRouter>
    </StrictMode>
);
