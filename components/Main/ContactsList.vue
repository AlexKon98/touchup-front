<template>
  <TransitionGroup name="list" tag="ul" class="contacts">
    <template v-for="contact in contacts" :key="contact.id">
      <li v-if="contact.isVisible">
        <ContactItem :contact="contact" />
      </li>
    </template>
  </TransitionGroup>
</template>

<script lang="ts" setup>
import type { Contact } from '~/types';
import ContactItem from './ContactItem.vue';

defineProps<{
  contacts: Contact[]
}>();
</script>

<style lang="scss" scoped>
.contacts {
  display: flex;
  flex-direction: column;
  gap: 8px;

  li {
    width: 100%;
    padding: 5px;
    border: 1px solid;
    border-radius: 8px;
  }
}


.list-enter-active,
.list-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>