import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/sonner";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.accounts.$post>;
type RequestTyhpe = InferRequestType<typeof client.api.accounts.$post>["json"];

export const useCreateAccount = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestTyhpe
    >({
        mutationFn: async (json) => {
            const response = await client.api.accounts.$post({ json });
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Account created");
            queryClient.invalidateQueries({ queryKey: ["accounts"] });
        },
        onError: () => {
            toast.error("Failed to crate account");
        },
    });

    return mutation;
};
