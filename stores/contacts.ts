import type { Contact } from '~/types';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

interface ContactResponse {
  contact: Contact;
}

const useContactsStore = defineStore('contacts', () => {
  const isInitialized = ref<boolean>(false);
  const isFetching = ref<boolean>(true);
  const contact = ref<Contact | null>(null);
  const contacts = ref<Contact[]>([]);
  const search = ref('');

  const updateSearch = (text: string) => {
    search.value = text;
  };

  watch(
    () => search.value,
    (val) => {
      contacts.value.forEach(cnt => {
        cnt.isVisible = !val.length || cnt.name.toLowerCase().includes(val.toLowerCase());
      });
    },
    { immediate: true }
  );

  const initialize = async () => {
    if (isInitialized.value) return;

    try {
      isFetching.value = true;
      const { data } = await useFetch<Contact[]>('/api/contacts');
      if (data.value) {
        data.value.forEach(cnt => (cnt.isVisible = true));
        contacts.value = data.value;
        isInitialized.value = true;
      }
    } catch (err) {
      console.error('Ошибка при загрузке контактов:', err);
    } finally {
      isFetching.value = false;
    }
  };

  const getContactById = async (id: number) => {
    try {
      isFetching.value = true;
      const { data } = await useFetch<Contact>(`/api/contacts/${id}`);
      if (data.value) {
        contact.value = data.value;
      }
    } catch (err) {
      console.error('Ошибка при загрузке контакта:', err);
    } finally {
      isFetching.value = false;
    }
  };

  const updateContact = async (contact: Contact) => {
    try {
      isFetching.value = true;

      const { data } = await useFetch<ContactResponse>(`/api/contacts/${contact.id}`, {
        method: 'PUT',
        body: contact,
      });
      if (data.value) {
        const updatedContact = data.value.contact;

        const index = contacts.value.findIndex(cnt => cnt.id === updatedContact.id);

        if (index !== -1) {
          contacts.value[index].name = updatedContact.name;
          contacts.value[index].email = updatedContact.email;
          contacts.value[index].phone = updatedContact.phone;
        }
      } else {
        console.error("Ошибка: data.value пустое или не содержит данные контакта.");
      }
    } catch (err) {
      console.error('Ошибка при обновлении контакта:', err);
    } finally {
      isFetching.value = false;
    }
  };

  const addNewContact = async (item: Partial<Contact>) => {
    try {
      const { data } = await useFetch<{message: string, contact: Contact}>('/api/contacts', {
        method: 'POST',
        body: item,
      });
      if (data.value) {
        contacts.value.push({
          ...data.value.contact,
          isVisible: !search.value.length || data.value.contact.name.toLowerCase().includes(search.value.toLowerCase()),
        });
      }
    } catch (err) {
      console.error('Ошибка при добавлении нового контакта:', err);
    }
  };

  const deleteContact = async (id: number) => {
    try {
      await useFetch(`/api/contacts/${id}`, { method: 'DELETE' });
      contacts.value = contacts.value.filter(cnt => cnt.id !== id);
      contacts.value.forEach(cnt => {
        cnt.isVisible = !search.value.length || cnt.name.toLowerCase().includes(search.value.toLowerCase());
      });
    } catch (err) {
      console.error('Ошибка при удалении контакта:', err);
    }
  };

  return {
    isInitialized,
    isFetching,
    search,
    contact,
    contacts,
    initialize,
    getContactById,
    updateContact,
    addNewContact,
    deleteContact,
    updateSearch,
  };
});

export const useContacts = async () => {
  const contactsStore = useContactsStore();
  if (!contactsStore.isInitialized) {
    await contactsStore.initialize();
  }
  return contactsStore;
};