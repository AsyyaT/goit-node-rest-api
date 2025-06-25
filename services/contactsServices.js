import Contact from "../db/Contact.js";

export const listContacts = async () => {
  return Contact.findAll();
};

export const getContactById = async (contactId) => {
  return Contact.findByPk(contactId);
};

export const removeContact = async (contactId) => {
  const contact = await getContactById(contactId);
  if (!contact) return null;
  await contact.destroy();
  return contact;
};

export const addContact = async (data) => {
  return Contact.create(data);
};

export const updateContact = async (contactId, data) => {
  const contact = await getContactById(contactId);
  if (!contact) return null;
  await contact.update(data);
  return contact;
};

export const updateStatusContact = async (contactId, data) => {
  const contact = await getContactById(contactId);
  if (!contact) return null;
  await contact.update(data);
  return contact;
};
