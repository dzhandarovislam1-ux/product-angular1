export function add(a: number, b: number): number {
  return a + b;
}

export type UploadStatus = 'loading' | 'success' | 'error';
export let uploadStatus: UploadStatus = 'loading';

export type TextFormat = 'uppercase' | 'lowercase' | 'capitalize';
export let textFormat: TextFormat = 'uppercase';

export interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

export interface AdminUser extends User {
  role: string;
  permissions: string[];
}

export function formatString(str: string, format: TextFormat): string {
  switch (format) {
    case 'uppercase':
      return str.toUpperCase();
    case 'lowercase':
      return str.toLowerCase();
    case 'capitalize':
      if (str.length === 0) return str;
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    default:
      return str;
  }
}

export function removeChar(str: string, charToRemove: string): string {
  return str.replaceAll(charToRemove, '');
}

export const users: User[] = [
  { id: 1, name: 'Алексей', email: 'alex@example.com', age: 25 },
  { id: 2, name: 'Мария', email: 'maria@example.com' },
  { id: 3, name: 'Иван', email: 'ivan@example.com', age: 17 },
  { id: 4, name: 'Елена', email: 'elena@example.com', age: 30 },
];

export const adultUsers: User[] = users.filter(
  (user) => user.age !== undefined && user.age >= 18
);
