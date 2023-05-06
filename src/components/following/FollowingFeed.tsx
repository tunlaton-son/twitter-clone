import useFollowing from "@/hooks/useFollowing";
import FollowingItem from "./FollowingItem";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useEffect, useState } from "react";

interface FollowingFeedProps {
    userId?: string;
}

const FollowingFeed: React.FC<FollowingFeedProps>  = ({
    userId
}) => {

    let { data: following =[], mutate: mutateFollowing } = useFollowing(userId);
    const { data: currentUser } = useCurrentUser();

    if(following.length == 0){
        return(
            <div
             className="
              text-neutral-600
              text-center
              p-6
              text-xl
             "
            >
                No Following
            </div>
        )
    }
    return ( 
        <>
            <div className="sm:overflow-y-auto mb-[100px]"> 
                {following.map((person: Record<string, any>) =>(
                  
                     <FollowingItem
                        userId={userId}
                        key={person.id}
                        data={person}
                        />
                 
                ))}
            </div>   
        </> 
    );
}
 
export default FollowingFeed;