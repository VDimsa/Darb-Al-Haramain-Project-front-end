export interface ApiResponse<T> {
    successful: boolean;
    message: {
      en: string;
      ar: string;
    };
    data?: T; // Optional data field
  }
  
  export interface AuthResponseData {
    user?: User;
    token?: string;
  }
  
  export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    created_at: string;
  }