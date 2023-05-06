import ImageModal from "../ImageModal";
import axios from "axios";
import useLoginModal from "@/hooks/useLoginModal";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react"; 

import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import Input from "../Input";
import usePreviewImageModal from "@/hooks/usePreviewImageModal";

const PreviewImageModal = () => {

    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const previewImageModal = usePreviewImageModal();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onToggle = useCallback(() => {
        if(isLoading){
            return;
        }

        registerModal.onClose();
        loginModal.onOpen();
    }, [isLoading, registerModal, loginModal]);

    const onSubmit = useCallback(async () => {
        try{
            
            setIsLoading(true);

            await axios.post("/api/register", {
                email,
                password,
                username,
                name
            });

            toast.success("Account created.");

            signIn("credentials", {
                email,
                password
            });
           
            registerModal.onClose();       
        }catch(error){
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }, [registerModal, email, password, username, name]);

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <Input
             placeholder="Email"
             onChange={(e) => setEmail(e.target.value)}
             value={email}
             disabled={isLoading}
            />
             <Input
             placeholder="Name"
             onChange={(e) => setName(e.target.value)}
             value={name}
             disabled={isLoading}
            />
             <Input
             placeholder="Username"
             onChange={(e) => setUsername(e.target.value)}
             value={username}
             disabled={isLoading}
            />
            <Input
             placeholder="Password"
             onChange={(e) => setPassword(e.target.value)}
             value={password}
             disabled={isLoading}
             type="password"
            />
        </div>

    )

    const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
            <p>Already have an account?
                <span
                 onClick={onToggle}
                 className="
                 text-white
                 cursor-pointer
                 hover:underline
                 "
                > Sign in</span>
            </p>
        </div>
    )
    return ( 

        <div>
          <ImageModal
            disabled={isLoading}
            isOpen={previewImageModal.isOpen}
            title="Create an account"
            actionLabel="Register"
            onClose={previewImageModal.onClose}
            onSubmit={onSubmit}
            body={bodyContent}
            footer={footerContent}
            base64={previewImageModal.image}
            postData={previewImageModal.postData}
            />  
        </div>
     );
}
 
export default PreviewImageModal;