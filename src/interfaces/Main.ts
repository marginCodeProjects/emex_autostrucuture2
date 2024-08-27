import React from "react";

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

export interface IProcessManagementProps{
   setFile:React.Dispatch<React.SetStateAction<string>>
    file:string
    filterId:string|null
}
export interface IFileUploadPageProps {
    setFile: React.Dispatch<React.SetStateAction<string>>
}
export interface StatusMessage {
    Status: "Парсер не запущен" | "Товары спаршены, подождите, идет сохранение" | "Все прокси забанены, подождите, идет редактирование" | "Парсер не запущен | Данные сохранены" | "Парсер работает";

}

export interface PercentMessage {
    Start_file: null | string;
    Percent_banned_list: number;
    Percent_parsing_goods: number;
}
export type StatusMessageKeys = 'PARSING_COMPLETED' | 'ALL_PROXIES_BANNED' | 'PARSER_NOT_STARTED_DATA_SAVED' | 'PARSER_RUNNING';
export interface StatusMessagesType {
    [key: string]: string; // Используем строковые ключи
  }