import {http} from "./http.ts";

interface Space {
    space_id:  number;
    name: string;
}

export class SpaceAPIService {
    static async createSpace(name : string): Promise<void> {
        await http.post('spaces', { name });
    }

    static async getSpaces(): Promise<Space[]> {
        const response = await http.get('spaces');
        return response.data;
    }

    static async editSpace(space_id: number, name: string): Promise<void> {
        await http.patch(`spaces/${space_id}`, { name });
    }

}