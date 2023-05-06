import FollowerFeed from "@/components/followers/FollowerFeed";
import Head from "next/head";
import { useRouter } from "next/router";
import Header from "@/components/Header";

const FollowerView = () => {

    const router = useRouter();
    const { userId } = router.query;

    return ( 
        <>
        <Header label="Followers" showBackArrow/>
        <FollowerFeed userId={userId as string} />
        </>
        
     );
}
 
export default FollowerView;