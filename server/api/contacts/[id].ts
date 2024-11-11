import { promises as fs } from 'fs';
import { join } from 'path';
import { getRouterParam, readBody } from 'h3';
import type { Contact } from '~/types';

const dataFilePath = join(process.cwd(), 'server', 'data.json');

async function readContacts() {
  const data = await fs.readFile(dataFilePath, 'utf-8');
  return JSON.parse(data);
}

async function writeContacts(data: Contact) {
  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
}

export default defineEventHandler(async (event) => {
  const id = Number(getRouterParam(event, 'id'));
  const method = event.method;

  const contacts = await readContacts();
  const contactIndex = contacts.findIndex((contact: Contact) => contact.id === id);

  if (method === 'GET') {
    if (contactIndex === -1) {
      return { error: `Contact with ID ${id} not found` };
    }
    return contacts[contactIndex];
  } else if (method === 'PUT') {
    if (contactIndex === -1) {
      return { error: `Contact with ID ${id} not found` };
    }

    const updatedData = await readBody(event);
    contacts[contactIndex] = { ...contacts[contactIndex], ...updatedData };
    await writeContacts(contacts);

    return { message: 'Contact updated successfully', contact: contacts[contactIndex] };
  } else if (method === 'DELETE') {
    if (contactIndex === -1) {
      return { error: `Contact with ID ${id} not found` };
    }

    contacts.splice(contactIndex, 1);
    await writeContacts(contacts);

    return { message: 'Contact deleted successfully' };
  } else {
    return { message: 'Method not allowed' };
  }
});
