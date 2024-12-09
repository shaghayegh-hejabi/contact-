import React from 'react';
import { useContacts } from '../context/ContactContext';

const ContactList = () => {
  const {
    contacts,
    deleteContact,
    toggleSortOrder,
    sortOrder,
    setSearchTerm,
    setEditingContact,
  } = useContacts();

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-50 rounded-lg shadow-lg">
      <input
        type="text"
        placeholder="Search by name, email, or phone..."
        className="border p-3 w-full mb-6 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <button
        onClick={toggleSortOrder}
        className="bg-blue-500 text-white px-6 py-2 rounded-full mb-6 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Sort: {sortOrder === 'asc' ? 'A-Z' : 'Z-A'}
      </button>

      <ul className="list-none space-y-4"> 
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <li
              key={contact.id}
              className="bg-white border border-gray-200 list-none rounded-lg p-4 flex justify-between items-center shadow hover:shadow-lg transition-shadow duration-200"
            >
              <span className="text-lg text-gray-800">
                {contact.firstName} {contact.lastName} - {contact.email} - {contact.phone}
              </span>
              <div className="space-x-2">
                <button
                  onClick={() => setEditingContact(contact)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-full hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteContact(contact.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500">No contacts found.</li>
        )}
      </ul>
    </div>
  );
};

export default ContactList;
