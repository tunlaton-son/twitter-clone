import Avatar from "../Avatar";
import { useRouter } from "next/router";
import { useCallback } from "react";
import useFollow from "@/hooks/useFollow";
import Button from "../Button";


interface FollowerItemProps {
    userId?:string;
    data:Record<string, any>
}

const FollowerItem: React.FC<FollowerItemProps> = ({data, userId}) => {


    const router = useRouter();
    const goToUser = useCallback((event:any) => {
        event.stopPropagation();
       
        router.push(`/users/${data.id}`);
      },[router, data.id]);

      const { isFollowing, toggleFollow} = useFollow(data.id);

      
    return ( 
        <div
        className="
         border-b-[1px]
         border-neutral-800
         p-5
         cursor-pointer
         hover:bg-neutral-900
         transition
        "
    >
        <div className="flex flex-row items-start gap-3">
            <Avatar userId={data.id}/>
            <div className="flex justify-between w-full">
            <div
                 className="
                  flex flex-col items-start gap-l-2 gap-r-2
                 "
                >
                    <p  
                        onClick={goToUser}
                        className="
                            text-white
                            fonst-semibold
                            cursor-pointer
                            hover:underline
                    ">{data.name}</p>
                    <p 
                        onClick={goToUser}
                        className="
                            text-neutral-500
                            cursor-pointer
                            hover:underline
                            hidden
                            md:block
                        ">
                        @{data.username}
                    </p>
                    <p
                      className="
                      text-white
                      fonst-semibold
                    "
                    >
                        {data.bio}
                    </p>
                </div>
                <div className="flex p-2">
                    <Button 
                            secondary={!isFollowing} 
                            outline={isFollowing} 
                            label={isFollowing ? "Unfollow" : "Follow"} 
                            onClick={() => {toggleFollow()}}
                    />
                </div>
            </div>
        </div> 
    </div>
    );
}
 
export default FollowerItem;