import React from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

import { ContactProvider } from './context/ContactContext';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

function App() {
  return (
    
    
      <ContactProvider>
        <div>
          <ToastContainer position="top-right" autoClose={3000} />
          <div className="container mx-auto p-4">
            <ContactForm />
            <ContactList />
          </div>
        </div>
      </ContactProvider>
    
  );
}

export default App;
