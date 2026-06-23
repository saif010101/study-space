import axios from 'axios';
import type {RegisterFormData} from "../types/RegisterFormData.ts";
import type {LoginFormData} from "../types/LoginFormData.ts";

export class UserAPIService {
    static async registerUser(userData: RegisterFormData): Promise<void> {
        await axios.post('http://localhost:3000/api/v1/user/register', userData);
    }

    static async loginUser(userData: LoginFormData): Promise<void> {
        await axios.post('http://localhost:3000/api/v1/user/login', userData);
    }

    static async getUser(username: string): Promise<void> {
        await axios.post(`http://localhost:3000/api/v1/user/get-user`, {username});
    }


}