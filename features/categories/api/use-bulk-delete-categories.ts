import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";


import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.categories["bulk-delete"]["$post"]>;
type RequestTyhpe = InferRequestType<typeof client.api.categories["bulk-delete"]["$post"]>["json"];

export const useBulkDeleteCategories = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestTyhpe
    >({
        mutationFn: async (json) => {
            const response = await client.api.categories["bulk-delete"]["$post"]({
                json
            });
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Categories deleted");
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            // TODO: Also invalidate summary
        },
        onError: () => {
            toast.error("Failed to delete categories");
        },
    });

    return mutation;
};
