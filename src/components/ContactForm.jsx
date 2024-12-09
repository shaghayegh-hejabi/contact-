import React, { useState, useEffect } from 'react';
import { useContacts } from '../context/ContactContext';
import { toast } from 'react-toastify'; 

import 'react-toastify/dist/ReactToastify.css';

const ContactForm = () => {
  const { addContact, editingContact, setEditingContact, updateContact } = useContacts();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (editingContact) {
      setFirstName(editingContact.firstName);
      setLastName(editingContact.lastName);
      setEmail(editingContact.email);
      setPhone(editingContact.phone);
    }
  }, [editingContact]);

  
  const validateForm = () => {
    let isValid = true;

    
    if (!firstName.trim()) {
      toast.error('First name is required.');
      isValid = false;
    }

   
    if (!lastName.trim()) {
      toast.error('Last name is required.');
      isValid = false;
    }

    
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email.trim()) {
      toast.error('Email is required.');
      isValid = false;
    } else if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address.');
      isValid = false;
    }

    
    const phoneRegex = /^[0-9]{10}$/;
    if (!phone.trim()) {
      toast.error('Phone number is required.');
      isValid = false;
    } else if (!phoneRegex.test(phone)) {
      toast.error('Please enter a valid 10-digit phone number.');
      isValid = false;
    }

    return isValid;
  };

  
  const handleSubmit = () => {
    if (validateForm()) {
      if (editingContact) {
        updateContact(editingContact.id, { firstName, lastName, email, phone });
        setEditingContact(null);
      } else {
        addContact({ firstName, lastName, email, phone });
      }
     
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
    }
  };

  return (
    <form className="my-4" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="First Name"
        className="border p-2 m-2"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        className="border p-2 m-2"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="border p-2 m-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone Number"
        className="border p-2 m-2"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button
        type="button"
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        {editingContact ? 'Save' : 'Add'}
      </button>
      {editingContact && (
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
          onClick={() => setEditingContact(null)}
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default ContactForm;
