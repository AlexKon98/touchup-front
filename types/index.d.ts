export interface ContactField {
  value: string;
  isError: boolean;
}

export interface Form {
  name: ContactField;
  phone: ContactField;
  email: ContactField;
}

export interface Contact {
  id: number,
  name: string,
  phone: string,
  email: string,
  isVisible?: boolean
}