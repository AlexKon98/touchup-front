<template>
  <div class="contact">
    <button class="contact__delete" @click="deleteContact(contact.id)">x</button>

    <div class="contact__name contact__label">
      <span>Name:</span> <NuxtLink :to="'/' + contact.id" class="contact__info">{{ contact.name }}</NuxtLink>
    </div>
    <div class="contact__phone contact__label">
      <span>Phone:</span> <a class="contact__info" :href="'tel:' + contact.phone">{{ contact.phone }}</a>
    </div>
    <div class="contact__email contact__label">
      <span>Phone:</span> <a class="contact__info" :href="'mailto:' + contact.email">{{ contact.email }}</a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ContactItem } from '~/api/modules/contacts/types';

defineProps<{
  contact: ContactItem
}>();

const { deleteContact } = await useContacts();
</script>

<style lang="scss" scoped>
.contact {
  position: relative;
  display: flex;
  flex-direction: column;
  padding-right: 25px;
  gap: 5px;

  &__label {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  &__info {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__delete {
    font-size: 16px;
    position: absolute;
    right: 0;
    top: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid;
    border-radius: 8px;
    padding: 0;
    padding-bottom: 2px;
    background-color: transparent;
    color: red;

    &:hover {
      color: white;
      background-color: red;
    }
  }
}
</style>
