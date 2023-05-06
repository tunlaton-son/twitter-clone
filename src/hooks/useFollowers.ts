import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useFollowers= (userId?: string) => {
    const url = userId ? `/api/followers/${userId}` : null;
    const { 
        data, 
        error, 
        isLoading, 
        mutate 
    } = useSWR(url, fetcher);

    return {
        data,
        error,
        isLoading,
        mutate
    }

};

export default useFollowers;