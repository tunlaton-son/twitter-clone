
import Header from "@/components/Header";
import Form from "@/components/Form";
import PostFeed from "@/components/posts/PostFeed";
import BottomBar from "@/components/layout/Bottombar";

export default function Home() {
  return (
    <>
      
        <Header label="Home"/>
        <div className="mt-5">
        <Form placeholder="What's happening?"/>
        <PostFeed />
        </div>
        
    </>
  )
}
