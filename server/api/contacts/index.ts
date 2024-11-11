import { promises as fs } from 'fs';
import { join } from 'path';
import { readBody } from 'h3';
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
  const method = event.method;

  if (method === 'GET') {
    const contacts = await readContacts();
    return contacts;
  } else if (method === 'POST') {
    const newContact = await readBody(event);
    const contacts = await readContacts();

    newContact.id = contacts.length + 1;

    contacts.push(newContact);
    await writeContacts(contacts);

    return { message: 'Contact added successfully', contact: newContact };
  } else {
    return { message: 'Method not allowed' };
  }
});
