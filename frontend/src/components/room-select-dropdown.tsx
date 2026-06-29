import { NativeSelect, NativeSelectOption } from "#components/ui/native-select";
import { useQuery } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../store/hooks.ts";
import { RoomAPIService } from "../services/RoomAPIService.ts";
import { setRoom } from "../store/slices/roomSlice.ts";
import { useEffect } from "react";
import {Label} from "#components/ui/label";

export const RoomSelectDropdown = () => {
  const currentSpace = useAppSelector((state) => state.spaceReducer.space);
  const dispatch = useAppDispatch();
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["rooms", currentSpace.space_id],
    queryFn: () => RoomAPIService.getRooms(currentSpace.space_id),
  });

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const room_id = parseInt(event.target.value, 10);
    const name = event.target.options[event.target.selectedIndex].text;
    dispatch(setRoom({ room_id, name }));
  };

  useEffect(() => {
    // if there is at least one room, set the current room to be the first room by default
    if (!isLoading && isSuccess && data.length > 0) {
      dispatch(setRoom(data[0]));
    }
  }, [isLoading]);

  return (
    <>
      <Label htmlFor="room">Select Room</Label>
      <NativeSelect id="room" onChange={handleSelectChange} disabled={isLoading} className="mr-auto">
        {isLoading && (
          <NativeSelectOption value="">Loading Rooms ...</NativeSelectOption>
        )}
        {!isLoading &&
          isSuccess &&
          data?.map((room) => (
            <NativeSelectOption key={room.room_id} value={room.room_id}>
              {room.name}
            </NativeSelectOption>
          ))}
        {!isLoading && isSuccess && data.length === 0 && (
          <NativeSelectOption value="">No rooms created</NativeSelectOption>
        )}
        {!isLoading && !isSuccess && (
          <NativeSelectOption value="">Failed to load rooms</NativeSelectOption>
        )}
      </NativeSelect>
    </>
  );
};
