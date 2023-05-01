import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";

interface PostFeedProps {
    userId?: string;
}


const PostFeed: React.FC<PostFeedProps> = ({userId}) => {

    const { data: posts =[] } = usePosts(userId);
    return ( 
       <>
        <div className="sm:overflow-y-auto mb-[100px]"> 
            {posts.map((post: Record<string, any>) =>(
                <PostItem
                userId={userId}
                key={post.id}
                data={post}
                />
            ))}
        </div>   
       </>
     );
}
 
export default PostFeed;