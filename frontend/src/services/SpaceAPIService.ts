import {http} from "./http.ts";

interface Space {
    space_id: number;
    name: string;
}

interface UserSpace {
    user_id:  number;
    space_id: string;
    space: Space;
}

export class SpaceAPIService {
    static async createSpace(name : string): Promise<void> {
        await http.post('spaces', { name });
    }

    static async getSpaces(): Promise<UserSpace[]> {
        const response = await http.get('spaces');
        return response.data;
    }

    static async editSpace(space_id: number, name: string): Promise<void> {
        await http.patch(`spaces/${space_id}`, { name });
    }

    static async deleteSpace(space_id: number): Promise<void> {
        await http.delete(`spaces/${space_id}`);
    }

}