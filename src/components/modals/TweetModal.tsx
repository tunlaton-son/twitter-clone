import axios from "axios";
import useTweetModal from "@/hooks/useTweetModal";
import Modal from "../Modal";
import { useCallback, useState } from "react";
import Form from "../Form";
import { toast } from "react-hot-toast";

const TweetModal = () => {

  const tweetModal = useTweetModal();
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
        if(isLoading){
            return;
        }

        tweetModal.onOpen();
    }, [isLoading, tweetModal]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Form placeholder="What's happening?"/>
        </div>

    )

    const onSubmit = useCallback(async () => {
        try{
            
            setIsLoading(true);

            tweetModal.onClose();       
        }catch(error){
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }, [tweetModal]);

  return (
    <Modal
        disabled={isLoading}
        isOpen={tweetModal.isOpen}
        title=""
        actionLabel=""
        onClose={tweetModal.onClose}
        body={bodyContent}
        onSubmit={onSubmit}
        isHideFooter={true}

   />
  )
}

export default TweetModal