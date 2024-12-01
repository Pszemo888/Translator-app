  export interface UserRegistrationResponse {
    id: number;
    username: string;
    email: string;
  }
  
  export interface User {
    id: string;
    username: string;
    role: string;
  }
  
  export interface UserLoginResponse {
    message: string;
    token: string;
    user: User;
  }