import Header from "@/components/Header";
import PostItem from "@/components/posts/PostItem";
import usePost from "@/hooks/usePost";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";
import Form from "@/components/Form";
import CommentFeed from "@/components/posts/CommentFeed";

const PostView = () => {

    const router = useRouter();
    const { postId } = router.query;

    const { data: fetchedPost, isLoading } = usePost(postId as string);
    
    if(isLoading || !fetchedPost){
        return(
            <div className="flex justify-center items-center h-full">
                <ClipLoader color="lightblue" size={80}/>
            </div>
        )
    }
    
    return ( 
        <>
        <Header label="Tweet" showBackArrow/>
        <div className="mt-5 mb-[100px]">
            <PostItem data={fetchedPost} />
            <Form 
            postId={postId as string}
            isComment
            placeholder="Tweet your reply"
            />
            <CommentFeed comments={fetchedPost?.comments}/>
       </div>
        
        </>
     );
}
 
export default PostView;