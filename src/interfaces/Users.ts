export interface IUserLogin{
    username:string
    password:string
}

export interface AuthState {
    isAuthenticated: boolean;
    username: string;
  }
export interface ILoginProps {
    onLoginSuccess: (isSuccess:boolean,username:string) => void;
}
export interface IHeaderProps {
    onLogoutSuccess: (isSuccess:boolean,username:string) => void;
    username:string
}