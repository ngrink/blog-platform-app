import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import reportWebVitals from './reportWebVitals';

import { StoreContext, store } from './app/store';
import { AuthProvider } from './modules/auth/auth.context';
import { App } from './App';
import { theme } from './utils/libs/chakra';
import { ToastContainer } from './utils/libs/chakra/toast';
import './utils/libs/fontawesome';
import './assets/css/index.css';


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        },
        staleTime: 0
    }
})

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StoreContext.Provider value={store}>
    <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
            <BrowserRouter>
                <AuthProvider>
                    <App />
                    <ToastContainer />
                </AuthProvider>
            </BrowserRouter>
        </ChakraProvider>
        <ReactQueryDevtools />
    </QueryClientProvider>
  </StoreContext.Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
