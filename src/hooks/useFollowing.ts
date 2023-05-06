import useSWR from "swr";
import fetcher from "@/libs/fetcher";

const useFollowing= (userId?: string) => {
    const url = userId ? `/api/following/${userId}` : null;
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

export default useFollowing;