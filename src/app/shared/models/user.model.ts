export interface Role {
  id: number;
  name: string;
}

export interface Permission {
  id: number;
  name: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: Role;
  permissions: Permission[];
  created_at: string;
}