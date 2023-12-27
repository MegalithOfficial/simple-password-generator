import { ChakraProvider } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import React from 'react';
import PasswordGenerator from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <PasswordGenerator />
    </ChakraProvider>
  </React.StrictMode>
);