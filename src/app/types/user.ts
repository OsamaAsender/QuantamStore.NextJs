// types/user.ts
export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
    createdAt: string;
    [key: string]: unknown;
  }
  