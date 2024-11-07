import type { Form } from '~/types/index';

export const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export const checkValue = (name: keyof typeof formData, formData: Form) => {
  if (name === 'email') {
    if (emailRegex.test(formData[name].value)) formData[name].isError = false;
    else formData[name].isError = true;
  } else {
    if (formData[name].value.length) formData[name].isError = false;
    else formData[name].isError = true;
  }
};
