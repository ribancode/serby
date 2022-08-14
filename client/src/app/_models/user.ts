import { Role } from "./role";

export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    role: Role;
    data : Token;
}

export class Token {
    token : string;
}

export class SubCategories{
    id : number;
}

export interface categoryResonse {
    Success : string;
    data : categoryData;
    message : string;
    ststus : number;
}

export interface categoryData{
    created_at: any;
   description: string;
    id: number;
    image: string;
    status: string;
    title:  string;
    updated_at: any;
}

export interface subCategoryResonse{
    Success : string;
    data : subCategoryData;
    message : string;
    ststus : number;
} 

export interface subCategoryData{
    created_at: any;
   description: string;
    id: number;
    image: string;
    status: string;
    title:  string;
    updated_at: any;
}
