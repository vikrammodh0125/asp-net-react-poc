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
}
