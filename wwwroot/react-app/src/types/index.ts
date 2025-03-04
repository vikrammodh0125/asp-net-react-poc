export type Schema<T> = T & { id: string };

export type BulkUpsertItem<T> = T & {
  id?: string;
  isDeleted?: boolean;
};

export interface Note {
  content: string;
}

export interface User {
  name: string;
  email: string;

  dob?: string
  code?: string;
  ssn?: string;
  gender?: string;
  unit?:string;
  streetAddress?: string;
  city?: string;
  state?: string;
  zipcode?: string;
  country?: string;
}
