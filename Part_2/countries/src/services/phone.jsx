import axios from "axios";
const url = 'http://localhost:3001/persons';

const getContacts = () => {
   return axios.get(url);
}

const addContact = (contact) => {
   return  axios.post(url, contact);
}

const deleteContact = (contactId) => {
    return axios.delete(`${url}/${contactId}`);
}

const updateContact = (contact) => {
    return axios.put(`${url}/${contact.id}`, contact);
}
export default {
    getContacts,
    addContact,
    deleteContact,
    updateContact
}