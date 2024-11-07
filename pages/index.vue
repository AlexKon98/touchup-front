<template>
  <div class="main">
    <section class="main__search">
      <div class="container">
        <h1>Contacts</h1>

        <SearchBar />
      </div>
    </section>

    <section class="main__add">
      <div class="container">
        <h2>Add new contact:</h2>

        <ContactsForm />
      </div>
    </section>

    <section class="main__list" v-if="contacts.isInitialized">
      <div class="container">
        <h2>Contacts list:</h2>

        <ContactsList :contacts="contacts.contacts" v-if="contacts.contacts.length && !contacts.isFetching" />

        <div v-if="!contacts.isFetching && !contacts.contacts.length">
          No contacts found
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import ContactsList from '~/components/Main/ContactsList.vue';
import ContactsForm from '~/components/Main/Forms/ContactForm.vue';
import SearchBar from '~/components/Main/Forms/SearchBar.vue';

const contacts = await useContacts();

onServerPrefetch(async () => {
  if (!contacts.isInitialized) {
    await contacts.initialize();
  }
});
</script>

<style lang="scss" scoped>
.main {
  flex: 1;
  padding: 10px 0;
}
</style>