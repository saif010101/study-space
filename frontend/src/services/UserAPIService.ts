import {http} from "./http.ts";
import type {RegisterFormData} from "../types/RegisterFormData.ts";
import type {LoginFormData} from "../types/LoginFormData.ts";

export class UserAPIService {
    static async registerUser(userData: RegisterFormData): Promise<void> {
        await http.post('users/register', userData);
    }

    static async loginUser(userData: LoginFormData): Promise<void> {
        await http.post('auth/login', userData);
    }

    static async getUser(username: string): Promise<void> {
        await http.post('users/get-user', {username});
    }


}