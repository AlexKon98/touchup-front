import { FetchOptions } from 'ohmyfetch';

declare module '#app' {
  interface NuxtApp {
    $fetch<T = unknown>(url: string, options?: FetchOptions): Promise<T>;
  }
}

export { };