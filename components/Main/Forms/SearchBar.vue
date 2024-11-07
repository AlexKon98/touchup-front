<template>
  <form @submit.prevent class="search">
    <label for="search">
      <span>Find contact:</span>
      <input type="text" :value="contacts.search" ref="input" @input="updateSearch" />
    </label>
  </form>
</template>

<script lang="ts" setup>
const contacts = await useContacts();

const input = ref<HTMLInputElement>();

const updateSearch = () => {
  if (input.value) {
    contacts.updateSearch(input.value.value);
  }
}
</script>

<style lang="scss" setup>
.search {
  display: flex;
  margin-bottom: 30px;

  label {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 5px;

    input {
      flex: 1;
    }
  }
}
</style>
