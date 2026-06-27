import {useQueryClient} from "@tanstack/react-query";



export function invalidateQuery(queryKey: string[]) {
    const queryClient = useQueryClient();
    queryClient.invalidateQueries({queryKey: queryKey});
}