import { create } from "zustand";

interface PreviewImageModalStore {
    isOpen: boolean;
    image: string;
    postData: Record<string, any>;
    onOpen: (base64: string, postData: Record<string, any>) => void;
    onClose: () => void;
};

const usePreviewImageModal = create<PreviewImageModalStore>((set) => ({
    isOpen: false,
    image:"",
    postData:[],
    onOpen: (base64: string, postData: Record<string, any>) => set({ isOpen: true, image:base64, postData }),
    onClose: () => set({ isOpen: false }),
}))

export default usePreviewImageModal;