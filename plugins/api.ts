import { $fetch, type FetchOptions } from 'ofetch';

import ContactsModule from '~/api/modules/contacts';

interface IApiInstance {
  contacts: ContactsModule
}

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  const fetchOptions: FetchOptions = {
    baseURL: config.public.baseURL,
    // credentials: 'include',
  };

  const apiFetcher = $fetch.create(fetchOptions);

  const modules: IApiInstance = {
    contacts: new ContactsModule(apiFetcher)
  };

  return {
    provide: {
      api: modules
    }
  };
});