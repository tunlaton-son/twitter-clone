import axios from "axios";
import { useCallback, useMemo, useState } from "react";
import useCurrentUser from "./useCurrentUser"
import useLoginModal from "./useLoginModal";
import useUser from "./useUser";
import toast from "react-hot-toast";

const useFollow = (userId: string) => {
    const {data: currentUser, mutate: mutateCurrentUser} = useCurrentUser();
    const {mutate: mutateFetchedUser} = useUser(userId);

    const loginModal = useLoginModal();
   
    const isFollowing = useMemo(() => {
        const list = currentUser?.followingIds || [];

        return list.includes(userId);
    }, [currentUser, userId]);

    const toggleFollow = useCallback(async () => {
        if(!currentUser) {
            return loginModal.onOpen();
        }

        try{

            let request;
           
            if(isFollowing) {
                request = () => axios.delete("/api/follow", { params: { userId }});
            }else{
                request = () => axios.post("/api/follow", { userId });
            }
            
            await request();

            mutateCurrentUser();
            mutateFetchedUser();

            toast.success("Success");
        }catch(error){
            toast.error("Something went wrong");
            console.log(error);
        }
    }, [
        currentUser, 
        isFollowing, 
        userId, 
        mutateCurrentUser, 
        mutateFetchedUser, 
        loginModal
    ]);

    return {
        isFollowing,
        toggleFollow
    }
} 

export default useFollow;