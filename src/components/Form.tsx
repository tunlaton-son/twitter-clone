import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import usePosts from "@/hooks/usePosts";
import useRegisterModal from "@/hooks/useRegisterModal";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Button from "./Button";
import Avatar from "./Avatar";
import usePost from "@/hooks/usePost";
import {BsFillImageFill} from "react-icons/bs";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { FaMinus } from "react-icons/fa";
import usePreviewImageModal from "@/hooks/usePreviewImageModal";
import useTweetModal from "@/hooks/useTweetModal";

interface FormProps {
    placeholder: string;
    isComment?:boolean;
    postId?:string;
}

const Form:React.FC<FormProps> = ({
    placeholder,
    isComment,
    postId
}) => {

    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const {data: currentUser} = useCurrentUser();
    const {mutate: mutatePosts} = usePosts();
    const {mutate: mutatePost} = usePost(postId as string);
    const previewImageModal = usePreviewImageModal();

    const [body, setBody] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [postImages, setPostImages] = useState<string[]>([]);

    const tweetModal = useTweetModal();


    const onSubmit = useCallback( async () =>{
        try{
            setIsLoading(true);

            const url = isComment ? `/api/comments?postId=${postId}` : "/api/posts";

            await axios.post(url, { body, postImages });

            toast.success("Tweet Created!");

            setBody("");
            setPostImages([]);
            mutatePosts();
            mutatePost();
            tweetModal.onClose();

        }catch(error){
            toast.error("Something went wrong")
            console.log(error);
        }finally{
            setIsLoading(false);
        }
    }, [body, mutatePosts, mutatePost]);

    const handleFileChosen = async (file:any) => {
        return new Promise((resolve, reject) => {
          let fileReader = new FileReader();
          fileReader.onload = (event:any) => {
            resolve(fileReader.result);
            setPostImages([...postImages, event.target.result]);
          };
          fileReader.onerror = reject;
          fileReader.readAsDataURL(file);
        });
      }

    const handleDrop = useCallback( async (files: any) => {
        const results = await Promise.all(files.map(async (file:any) => {
            const fileContents = await handleFileChosen(file);
            return fileContents;
          }));
    }, [postImages]);

    const { getRootProps, getInputProps } = useDropzone({
        maxFiles: 4,
        multiple:true,
        onDrop: handleDrop,
        accept: {
            "image/jpeg": [],
            "image/png": []
        }
    });

    const handleDelete = useCallback((image:string) => {
       
        setPostImages(postImages.filter(item => item !== image));
    },[postImages]);
    
  

    return ( 
        <div className="border-b-[1px] border-neutral-800 px-5 py-2">
            { currentUser ? (
                <div className="flex flex-row gap-4">
                    <div>
                        <Avatar userId={currentUser?.id}/> 
                    </div>
                    <div className="w-full">
                        <textarea
                            disabled={isLoading}
                            onChange={(e) => setBody(e.target.value)}
                            value={body}
                            className="
                                disabled:opacity-80
                                peer
                                resize-none
                                mt-3
                                w-full
                                bg-black
                                ring-0
                                outline-none
                                text-[20px]
                                placeholder-neutral-500
                                text-white
                            "
                            placeholder={placeholder}
                        >
                        </textarea>
                        <div className="grid grid-cols-2 gap-2">
                            {
                            postImages ? (
                                postImages.map((base64:any, index) => (
                                    <div className="relative" key={index}>
                                        <div className="absolute top-3 left-3 z-10 rounded-full bg-[#4b4f53]  w-[34px] h-[34px] flex items-center justify-center cursor-pointer hover:opacity-80">
                                            <FaMinus
                                            color="white"
                                        
                                            onClick={() => handleDelete(base64)}
                                            />
                                        </div>
                                        <Image
                                            className="h-auto max-w-full rounded-lg m-2"
                                            
                                            src={base64}
                                            height="245"
                                            width="245"
                                            alt="Uploaded image"
                                        />
                                        
                                    </div>
                                
                                ))
                                    
                                ):(
                                    <p className="text-white"></p>
                                )
                            }
                         </div>
                        <hr
                            className="
                             opacity-0
                             peer-focus:opacity-100
                             h-[1px]
                             w-full
                             border-neutral-800
                             transition
                            "
                        />
                       
                        <div className="mt-4 flex flew-row w-full">
                            <div className="mt-4 flex flex-row justify-start w-full items-center">
                                <div
                                 {...getRootProps({
                                    className: "rounded-full hover:bg-[#1D9BF0]/[0.1]  hover:transition w-[44px] h-[44px] flex items-center justify-center cursor-pointer duration-[200ms]"
                                })}
                                >
                                    <BsFillImageFill
                                    color="#0ea5e9"
                                    className=" opacity-100 hover:opacity-100"
                                    size={15}
                                    />
                                      <input onChange={handleDrop} {...getInputProps()}/>
                                </div>
                           
                            </div>
                            <div className="mt-4 flex flex-row justify-end">
                                <Button 
                                disabled={isLoading || !body}
                                onClick={onSubmit}
                                label="Tweet"/>
                            </div>
                        </div>
                       
                    </div>    
                </div>
            ):(
            <div className="py-8">
                <h1
                  className="
                   text-white
                   text-2xl
                   text-center
                   mb-4
                   font-bold
                  "
                >
                    Welcome to Twitter
                </h1>
                <div className="flex flex-row items-center justify-center gap-4">
                    <Button label="Login" onClick={loginModal.onOpen}/>
                    <Button 
                        label="Register" 
                        onClick={registerModal.onOpen}
                        secondary
                    />
                </div>
            </div>
            )}
        </div>
     );
}
 
export default Form;