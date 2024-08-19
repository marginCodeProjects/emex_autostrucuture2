export interface IUserLogin{
    username:string
    password:string
}
export interface ILoginProps {
    onLoginSuccess: (isSuccess:boolean) => void;
}
export interface IHeaderProps {
    onLogoutSuccess: (isSuccess:boolean) => void;
}