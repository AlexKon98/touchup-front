<template>
  <form @submit.prevent="checkFormAndSend" class="form">
    <label for="name" class="form__label">
      <span>Name:</span>
      <input
        class="p-inputtext"
        @blur="checkValue('name', formData)"
        :class="{error: formData.name.isError}"
        type="text"
        v-model="formData.name.value"
      >
    </label>

    <label for="name" class="form__label">
      <span>Phone:</span>
      <InputMask
        type="phone"
        @blur="checkValue('phone', formData)"
        :class="{error: formData.phone.isError}"
        v-model="formData.phone.value"
        mask="+7 999 999 99 99"
      />
    </label>

    <label for="name" class="form__label">
      <span>Email:</span>
      <input
        class="p-inputtext"
        @blur="checkValue('email', formData)"
        :class="{error: formData.email.isError}"
        type="text"
        v-model="formData.email.value"
      />
    </label>

    <button type="submit">Send</button>
  </form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import type { Form } from '~/types/index';
import { checkValue } from '~/helpers/check';

const contacts = await useContacts();

const formData = reactive<Form>({
  name: {
    value: '',
    isError: false
  },
  phone: {
    value: '',
    isError: false
  },
  email: {
    value: '',
    isError: false
  }
});

const isValid = computed(() => {
  return (formData.email.isError === false && formData.name.isError === false && formData.phone.isError === false);
});

const checkFormAndSend = async () => {
  Object.keys(formData).forEach(key => {
    checkValue(key as keyof Form, formData);
  });

  if (isValid.value) {
    await contacts.addNewContact({
      name: formData.name.value,
      phone: formData.phone.value,
      email: formData.email.value
    });

    formData.name.value = '';
    formData.email.value = '';
    formData.phone.value = '';
  }
};
</script>

<style lang="scss" scoped>
.form {
  margin-bottom: 30px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  &__label {
    display: flex;
    align-items: center;
    gap: 5px;

    input {
      flex: 1;
      padding: 2px;

      &.error {
        border-color: red !important;
      }
    }
  }
}
</style>
