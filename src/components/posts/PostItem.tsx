import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import Avatar from "../Avatar";
import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from "react-icons/ai";
import useLike from "@/hooks/useLike";
import Image from "next/image";

interface PostItemProps {
    userId?:string;
    data:Record<string, any>
}

const PostItem: React.FC<PostItemProps> = ({data, userId}) => {

   const router = useRouter();
   const loginModal = useLoginModal();

   const { data: currentUser } = useCurrentUser();
   
   const {hasLiked, toggleLike} = useLike({postId: data.id, userId});

   const goToUser = useCallback((event:any) => {
     event.stopPropagation();
    
     router.push(`/users/${data.user.id}`);
   },[router, data.user.id]);

   const goToPost = useCallback(() => {

    router.push(`/posts/${data.id}`);
   }, [router, data.id]);

   const onLike = useCallback((event: any) => {
    event.stopPropagation();

    if(!currentUser){
        return loginModal.onOpen();
    }

    toggleLike();
   }, [loginModal, currentUser, toggleLike]);

   const createdAt = useMemo(() => {
        if(!data?.createdAt){
            return null;
        }

        return formatDistanceToNowStrict(new Date(data.createdAt));
   }, [data?.createdAt]); 

   const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;
 
    return ( 
        <div
            onClick={goToPost}
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
            <Avatar userId={data.user.id}/>
            <div>
                <div
                 className="
                  flex flex-row items-center gap-2
                 "
                >
                    <p  
                        onClick={goToUser}
                        className="
                            text-white
                            fonst-semibold
                            cursor-pointer
                            hover:underline
                    ">{data.user.name}</p>
                    <span 
                        onClick={goToUser}
                        className="
                            text-neutral-500
                            cursor-pointer
                            hover:underline
                            hidden
                            md:block
                        ">
                        @{data.user.username}
                    </span>
                    <span className="text-neutral-500 text-sm">
                        {createdAt}
                    </span>
                </div>
                <div className="text-white mt-1 w-full">
                   {data.body} 
                </div>
               <div>
                    <div className="flex flex-col items-center h-auto overflow-y-auto m-2 ">
                    {
                            data.postImages ? (
                                data.postImages.map((base64:any, index:number) => (
                                    
                                            <Image
                                                className="rounded-xl mt-1"
                                                key={index}
                                                src={base64}
                                                width={404}
                                                height={404}
                                                alt="Uploaded image"
                                            />
                                    
                                    ))
                                        
                                    ):(
                                        <p className="text-white"></p>
                                    )
                                }
                    </div>
                </div>
                <div className="flex flex-row items-center mt-3 gap-10">
                    <div
                        className="
                            flex
                            flex-row
                            items-center
                            text-neutral-500
                            gap-2
                            cursor-pointer
                            transition
                            hover:text-sky-500
                        "
                    >
                        <AiOutlineMessage size={20}/>
                        <p>
                            {data.comments?.length || 0}
                        </p>
                    </div>
                    <div
                        onClick={onLike}
                        className="
                            flex
                            flex-row
                            items-center
                            text-neutral-500
                            gap-2
                            cursor-pointer
                            transition
                            hover:text-[#F91880]
                        "
                    >
                        <LikeIcon size={20} color={hasLiked ? "#F91880":"" }/>
                        <p>
                            {data.likedIds.length}
                        </p>
                    </div>
                </div>
            </div>
         </div>

        </div>
     );
}
 
export default PostItem;