import useCurrentUser from "@/hooks/useCurrentUser";
import { BsHouseFill, BsBellFill } from 'react-icons/bs';
import { FaUser } from  'react-icons/fa';
import SidebarItem from "./SidebarItem";
import { signOut } from 'next-auth/react';
import { BiLogOut } from 'react-icons/bi';

const BottomBar = () => {

    const { data: currentUser } = useCurrentUser();

    const items = [
        {
            label: 'Home',
            href: '/',
            icon: BsHouseFill,
            auth: false
        },
        {
            label: 'Notifications',
            href:'/notifications',
            icon: BsBellFill,
            auth: true
        },
        {
            label: 'Profile',
            href: `/users/${currentUser?.id}`,
            icon: FaUser,
            auth: true
        }
    ];



    return ( 
        
       
            <div className='flex 
                            flex-row 
                            justify-center 
                            fixed
                            border-t-[1px]
                            border-neutral-800 
                            inset-x-0 
                            bottom-0  
                            md:hidden block
                            bg-black
                            opacity-90
                            mt-auto
                            h-auto
                    
                            '>
                {items.map((item) =>(
                    <SidebarItem
                        key={item.href}
                        label=""
                        href={item.href}
                        icon={item.icon}
                        auth={item.auth}
                    />
                ))}
                {currentUser && (
                        <SidebarItem onClick={() => signOut()} icon={BiLogOut} label='Logout'/>
                    )}
            </div>
       
      
     );
}
 
export default BottomBar;