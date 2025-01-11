import { User } from "./user.model";

export interface ApiResponse<T> {
    successful: boolean;
    message: {
      en: string;
      ar: string;
    };
    data: T | null; // Data can be null in case of errors
  }
  
  export interface AuthResponseData {
    user: User;
    token: string;
  }
  