import useSWR from "swr";
import { getConfirmations } from "../provider/confirmation";

export const useConfirmations = () => {
  const { data, error, isValidating } = useSWR(
    "confirmations",
    getConfirmations
  );

  return {
    confirmations: data,
    isValidating,
    error,
  };
};
