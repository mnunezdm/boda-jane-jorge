import useSWR from "swr";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { getCurrentUser } from "../provider/user";

export function useUser({ redirectTo } = {}) {
  const { data, error, isValidating } = useSWR("me", getCurrentUser);

  const finished = Boolean(data) || Boolean(error);
  const hasUser = Boolean(data?.username);

  const router = useRouter();

  useEffect(() => {
    if (isValidating || !finished) return;
    if (redirectTo && (!hasUser || error)) {
      router.replace(redirectTo);
    }
  }, [redirectTo, error, isValidating, finished, hasUser, router]);

  return {
    isValidating,
    isLoading: !finished,
    isError: Boolean(error),
    error,
    user: data,
  };
}
