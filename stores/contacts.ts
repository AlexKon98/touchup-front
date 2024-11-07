import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import type { ContactItem } from '~/api/modules/contacts/types';

const useContactsStore = defineStore('contacts', () => {
  const { $api } = useNuxtApp();

  const isInitialized = ref<boolean>(false);
  const isFetching = ref<boolean>(true);
  const contact = ref<ContactItem | null>(null);
  const contacts = ref<ContactItem[]>([]);
  const search = ref('');

  const updateSearch = (text: string) => {
    search.value = text;
  };

  watch(() => search.value, (val) => {
    if (!val.length) contacts.value.forEach(cnt => cnt.isVisible = true);
    else {
      contacts.value.forEach(cnt => {
        if (cnt.name.toLowerCase().includes(val.toLowerCase())) cnt.isVisible = true;
        else cnt.isVisible = false;
      })
    }
  }, { immediate: true });

  const initialize = async () => {
    if (isInitialized.value) return;

    try {
      isFetching.value = true;

      const res = await $api.contacts.getContacts();

      res.forEach(cnt => cnt.isVisible = true);

      contacts.value = res;

      isInitialized.value = true;
    } catch (err) {
      console.error('Ошибка при загрузке контактов:', err);
    } finally {
      isFetching.value = false;
    }
  };

  const getContactById = async (id: number) => {
    try {
      isFetching.value = true;

      if (!contact.value || contact.value.id !== id) {
        const res = await $api.contacts.getContactById(id);
        contact.value = res;
      }
    } catch (err) {
      console.error('Ошибка при загрузке контакта:', err);
    } finally {
      isFetching.value = false;
    }
  };

  const updateContact = async (data: ContactItem) => {
    try {
      isFetching.value = true;

      const res = await $api.contacts.changeContactById(data);

      if (res) {
        const item = contacts.value.find(cnt => cnt.id === res.id);

        if (item) {
          item.name = res.name;
          item.phone = res.phone;
          item.email = res.email;
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      isFetching.value = false;
    }
  };

  const addNewContact = async (item: Partial<ContactItem>) => {
    try {
      const res = await $api.contacts.addNewContact(item);
      contacts.value.push({
        ...res,
        isVisible: res.name.toLowerCase().includes(search.value.toLowerCase()) || !search.value.length
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteContact = async (id: number) => {
    try {
      const res = await $api.contacts.deleteContactById(id);

      res.forEach(cnt => {
        if (!search.value.length) cnt.isVisible = true;
        else {
          if (cnt.name.toLowerCase().includes(search.value.toLowerCase())) cnt.isVisible = true;
          else cnt.isVisible = false;
        }
      });

      contacts.value = res;
    } catch (err) {
      console.log(err);
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
    updateSearch
  };
});

export const useContacts = async () => {
  const contactsStore = useContactsStore();

  if (!contactsStore.isInitialized) {
    await contactsStore.initialize();
  }

  return contactsStore;
};