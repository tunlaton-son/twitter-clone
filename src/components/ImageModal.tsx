import { useCallback, useEffect } from "react";
import { AiOutlineClose} from "react-icons/ai";

import Button from "./Button";
import Image from "next/image";
import PostFeed from "./posts/PostFeed";
import usePost from "@/hooks/usePost";
import PostItem from "./posts/PostItem";
import Form from "./Form";
import CommentFeed from "./posts/CommentFeed";
import { ClipLoader } from "react-spinners";

interface ImageModalProps {
    isOpen?:boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    base64:string;
    postData:Record<string, any>;
}

const ImageModal: React.FC<ImageModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    base64,
    postData
}) => {
    
    let { data: fetchedPost, isLoading } = usePost(postData?.id as string);

    const handleClose = useCallback(() => {
        if(disabled){
            return;
        }

        onClose();
    }, [disabled, onClose]);

    const handleSubmit = useCallback(() => {
        if(disabled){
            return;
        }   

        onSubmit();
    }, [disabled, onSubmit]);

    if(!isOpen){
        return null;
    }

    

    if(isLoading || !fetchedPost){
        return(
            <div className="flex justify-center items-center h-full">
                <ClipLoader color="lightblue" size={80}/>
            </div>
        )
    }

    
    return ( 
       <>
        <div
         className="
         justify-center
         items-center
         flex
         overlow-x-hidden
         overflow-y-hidden
         fixed
         inset-0
         z-50
         outline-none
         focus:outline-none
         bg-neutral-800
         bg-opacity-10
         h-full
         "
        >
           <div
           className="
           relative
           w-full
           lg:w-full
           my-6
           mx-auto
           lg:max-w-full
           h-full
           lg:h-full
           "
           >
            <div
             className="
              h-full
              lg:h-full
              
              shadow-lg
              relative
              flex
              flex-col
              w-full
              outline-none
              focus:outline-none
              bg-neutral-800/[0.9]
             "
            >
               
                {/** Body */}
                <div className="relative flex-auto w-full overflow-y-hidden h-full">

                <button
                            className="
                            p-1
                            ml-auto
                            border-0
                            text-white
                            hover:opacity-70
                            transition
                            absolute
                            top-3
                            left-3
                            z-60
                            rounded-full 
                            bg-black
                            "
                        onClick={handleClose}
                        >
                            <AiOutlineClose size={20}/>
                        </button>
                    <div className="text-white w-full h-full flex grid grid-flow-row-dense lg:grid-cols-3  ">
                        <div className="col-span-2 p-5 flex justify-center items-center h-full">
                            

                            <Image                    
                                className="rounded-xl mt-1"
                                src={base64}
                                width="504"
                                height="504"
                                alt="Uploaded image"
                            />
                        </div>
                        <div className="p-5 bg-black h-full overflow-y-auto hidden lg:block">
                            <div className="mt-5 mb-[100px]">
                                <PostItem data={fetchedPost} isImagePreview/>
                                <Form 
                                postId={fetchedPost.id as string}
                                isComment
                                placeholder="Tweet your reply"
                                />
                                <CommentFeed comments={fetchedPost?.comments}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>     
        </div>
       </>
     );
}
 
export default ImageModal;