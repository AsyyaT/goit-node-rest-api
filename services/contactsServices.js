import Contact from "../db/Contact.js";

export const listContacts = async (query) => {
  return Contact.findAll({where: query});
};

export const getContactById = async (query) => {
  return Contact.findOne({where: query});
};

export const removeContact = async (query) => {
  const contact = await getContactById(query);
  if (!contact) return null;
  await contact.destroy();
  return contact;
};

export const addContact = async (data) => {
  return Contact.create(data);
};

export const updateContact = async (query, data) => {
  const contact = await getContactById(query);
  if (!contact) return null;
  await contact.update(data);
  return contact;
};

export const updateStatusContact = async (query, data) => {
  const contact = await getContactById(query);
  if (!contact) return null;
  await contact.update(data);
  return contact;
};

export const contactsByStatus = async (query, data) => {
  const contacts = await listContacts(query);
  if (!contacts) return null;
  return contacts;
};