import {http} from "./http.ts";

interface Room {
    room_id: number;
    name: string;
}

export class RoomAPIService {

    static async getRooms(space_id : number): Promise<Room[]> {
        const response = await http.get(`/rooms/space/${space_id}`);
        return response.data;
    }

    static async createRoom(space_id : number, name: string): Promise<void> {
        const response = await http.post(`/rooms/space/${space_id}`, {name});
        return response.data;
    }
}