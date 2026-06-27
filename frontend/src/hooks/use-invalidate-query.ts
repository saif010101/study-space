import {useQueryClient} from "@tanstack/react-query";

export const UseInvalidateQuery = () => {
    const queryClient = useQueryClient();

    return (queryKey : string[]) => queryClient.invalidateQueries({queryKey: queryKey});
}
