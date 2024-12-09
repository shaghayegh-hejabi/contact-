import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchContacts = async () => {
    try {
      const response = await api.get('/contacts');
      let filtered = response.data;

      if (searchTerm) {
        filtered = filtered.filter(
          (contact) =>
            contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contact.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (sortOrder === 'desc') {
        filtered.sort((a, b) => b.firstName.localeCompare(a.firstName));
      } else {
        filtered.sort((a, b) => a.firstName.localeCompare(b.firstName));
      }

      setContacts(filtered);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [searchTerm, sortOrder]);

  const addContact = async (contact) => {
    await api.post('/contacts', contact);
    fetchContacts();
    toast.success('Contact added successfully!');
  };

  const deleteContact = async (id) => {
    await api.delete(`/contacts/${id}`);
    fetchContacts();
    toast.error('Contact deleted!');
  };

  const updateContact = async (id, updatedContact) => {
    await api.put(`/contacts/${id}`, updatedContact);
    fetchContacts();
    toast.info('Contact updated!');
  };

  return (
    <ContactContext.Provider
      value={{
        contacts,
        addContact,
        deleteContact,
        updateContact,
        editingContact,
        setEditingContact,
        toggleSortOrder: () => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'),
        sortOrder,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const useContacts = () => useContext(ContactContext);
