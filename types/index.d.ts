export interface ContactField {
  value: string;
  isError: boolean;
}

export interface Form {
  name: ContactField;
  phone: ContactField;
  email: ContactField;
}
