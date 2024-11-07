<template>
  <div class="contact-page">
    <div class="container">
      <h1 v-if="contacts.contact">Change contact data:</h1>

      <p v-if="isMessageVisible" class="contact-page__message">Data has been changed</p>

      <form @submit.prevent="checkFormAndSend" class="contact-page__form" v-if="contacts.contact">
        <label for="name" class="contact-page__label">
          <span>Name:</span>
          <input
            class="p-inputtext"
            @blur="checkValue('name', formData)"
            :class="{error: formData.name.isError}"
            type="text"
            v-model="formData.name.value"
          >
        </label>

        <label for="name" class="contact-page__label" v-if="contacts.contact">
          <span>Phone:</span>
          <InputMask
            type="phone"
            @blur="checkValue('phone', formData)"
            :class="{error: formData.phone.isError}"
            v-model="formData.phone.value"
            mask="+7 999 999 99 99"
          />
        </label>

        <label for="name" class="contact-page__label">
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

      <h1 v-else>Cant find contact with this id</h1>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import InputMask from 'primevue/inputmask';
import type { Form } from '~/types/index';
import { checkValue } from '~/helpers/check';

const route = useRoute();

const isMessageVisible = ref(false);

const contacts = await useContacts();
await contacts.getContactById(Number(route.params.id));

const formData = reactive<Form>({
  name: {
    value: contacts.contact?.name || '',
    isError: false
  },
  phone: {
    value: contacts.contact?.phone || '',
    isError: false
  },
  email: {
    value: contacts.contact?.email || '',
    isError: false
  }
});

const isValid = computed(() => {
  return formData.email.isError === false && formData.name.isError === false && formData.phone.isError === false;
});

const checkFormAndSend = async () => {
  Object.keys(formData).forEach(key => {
    checkValue(key as keyof Form, formData);
  });

  if (isValid.value) {
    try {
      isMessageVisible.value = false;

      await contacts.updateContact({
        id: Number(route.params.id),
        name: formData.name.value,
        phone: formData.phone.value,
        email: formData.email.value
      });

      isMessageVisible.value = true;

      setTimeout(() => {
        isMessageVisible.value = false;
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style lang="scss" scoped>
.contact-page {
  padding: 10px 0;

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

  &__form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__message {
    margin-bottom: 20px;
    color: green;
  }
}
</style>