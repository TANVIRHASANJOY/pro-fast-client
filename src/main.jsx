import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { RouterProvider } from "react-router-dom";
import { router } from './router/router';
import AOS from 'aos';
import 'aos/dist/aos.css'; 

// 1. Import TanStack Query components
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import AuthProvider from './Contexts/AuthContexts/AuthProvider';

// 2. Create a Query Client instance
const queryClient = new QueryClient();

AOS.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-urbanist max-w-7xl mx-auto'>
      {/* 3. Wrap with QueryClientProvider */}
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
        
        {/* Optional: DevTools helps you debug your data fetching */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  </StrictMode>,
)