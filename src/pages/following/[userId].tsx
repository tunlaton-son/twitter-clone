import FollowingFeed from "@/components/following/FollowingFeed";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "@/components/Header";

const FollowingView = () => {

    const router = useRouter();
    const { userId } = router.query;

    return ( 
        <>
        <Header label="Following" showBackArrow/>
        <FollowingFeed userId={userId as string} />
        </>
        
     );
}
 
export default FollowingView;