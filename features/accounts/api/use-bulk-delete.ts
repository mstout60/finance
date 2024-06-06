import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.accounts["bulk-delete"]["$post"]>;
type RequestTyhpe = InferRequestType<typeof client.api.accounts["bulk-delete"]["$post"]>["json"];

export const useBulkDeleteAccounts = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestTyhpe
    >({
        mutationFn: async (json) => {
            const response = await client.api.accounts["bulk-delete"]["$post"]({
                json
            });
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Account deleted");
            queryClient.invalidateQueries({ queryKey: ["accounts"] });
            // TODO: Also invalidate summary
        },
        onError: () => {
            toast.error("Failed to delete accounts");
        },
    });

    return mutation;
};
