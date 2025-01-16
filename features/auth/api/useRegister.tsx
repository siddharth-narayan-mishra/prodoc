import { client } from "@/lib/rpc";
import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<
  (typeof client.api.auth.register)["$post"]
>;
type RequestType = InferRequestType<(typeof client.api.auth.register)["$post"]>;

export const useRegister = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }): Promise<ResponseType> => {
      const response = await client.api.auth.register.$post({ json });

      if (!response.ok) {
        console.log("error");
      }

      return response.json() as Promise<ResponseType>;
    },
  });

  return mutation;
};
