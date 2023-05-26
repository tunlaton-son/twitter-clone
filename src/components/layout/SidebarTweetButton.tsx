import useLoginModal from "@/hooks/useLoginModal";
import  { useRouter }   from "next/router";
import { useCallback } from "react";
import { FaFeather } from "react-icons/fa";
import useTweetModal from "@/hooks/useTweetModal";
import useCurrentUser from '@/hooks/useCurrentUser';
 
const SidebarTweetButton = () => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const { data: currentUser } = useCurrentUser(); 
    const tweetModal = useTweetModal();

    const onClick = useCallback(() => {
        
       
        if(currentUser){
            tweetModal.onOpen();
        }else{
            loginModal.onOpen();
        }

    }, [loginModal, tweetModal]);

    return ( 
        <div  onClick={onClick}>
            <div 
                className="
                    mt-6
                    lg:hidden
                    rounded-full
                    h-14
                    w-14
                    p-4
                    flex
                    items-center
                    justify-center
                    bg-sky-500
                    hover:bg-opacity-80
                    transition
                    cursor-pointer
                "
            >
                <FaFeather size={24} color="white"/>
            </div>
            <div
                className="
                mt-6
                hidden
                lg:block
                px-4
                py-2
                rounded-full
                bg-sky-500
                hover:bg-opacity-90
                cursor-pointer
                transition
                "
            >
                <p className="
                hidden
                lg:block
                text-center
                font-semibild
                text-white
                text-[20px]
                ">
                    Tweet
                </p>
            </div>
        </div>
     );
}
 
export default SidebarTweetButton;