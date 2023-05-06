import useFollowers from "@/hooks/useFollowers";
import FollowerItem from "./FollowerItem";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useEffect, useState } from "react";

interface FollowerFeedProps {
    userId?: string;
}

const FollowerFeed: React.FC<FollowerFeedProps>  = ({
    userId
}) => {

    let { data: followers =[], mutate: mutateFollowers } = useFollowers(userId);
    const { data: currentUser } = useCurrentUser();

    if(followers.length == 0){
        return(
            <div
             className="
              text-neutral-600
              text-center
              p-6
              text-xl
             "
            >
                No Followers
            </div>
        )
    }
    return ( 
        <>
            <div className="sm:overflow-y-auto mb-[100px]"> 
                {followers.map((follower: Record<string, any>) =>{
                    if(follower.id != currentUser.id){
                    return (<FollowerItem
                        userId={userId}
                        key={follower.id}
                        data={follower}
                        />);
                    }
                        
                })}
            </div>   
        </> 
    );
}
 
export default FollowerFeed;