import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$patch"]>;
type RequestTyhpe = InferRequestType<typeof client.api.categories[":id"]["$patch"]>["json"];

export const useEditCategory = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestTyhpe
    >({
        mutationFn: async (json) => {
            const response = await client.api.categories[":id"]["$patch"]({
                json,
                param: { id }
            });
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Category update");
            queryClient.invalidateQueries({ queryKey: ["category", { id }] });
            queryClient.invalidateQueries({ queryKey: ["categories"] });
            // TODO: Invalidate summary and transactions
        },
        onError: () => {
            toast.error("Failed to edit category");
        },
    });

    return mutation;
};
