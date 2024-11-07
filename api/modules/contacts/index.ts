import type { ContactItem } from './types';

import FetchFactory from '../../factory';

class PostsModule extends FetchFactory {
  async getContacts() {
    return await this.call<Promise<Array<ContactItem>>>('GET', '/contacts');
  }

  async getContactById(id: number) {
    return await this.call<Promise<ContactItem>>('GET', '/contacts/' + id);
  }

  async deleteContactById(id: number) {
    return await this.call<Promise<ContactItem[]>>('DELETE', '/contacts/' + id);
  }

  async changeContactById(item: ContactItem) {
    return await this.call<Promise<ContactItem>>('PUT', '/contacts/' + item.id, item);
  }

  async addNewContact(item: Partial<ContactItem>) {
    return await this.call<Promise<ContactItem>>('POST', '/contacts', item);
  }
}

export default PostsModule;
