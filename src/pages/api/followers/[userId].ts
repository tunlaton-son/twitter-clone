import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";

import serverAuth from "../../../../prisma/serverAuth";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
){

    if(req.method != "GET"){
        return res.status(405).end();
    }

    try{
        const { currentUser } = await serverAuth(req, res);
        const { userId } = req.query;

        if(!userId || typeof userId != "string"){
            throw new Error("Invalid ID");
        }

        let followers  = await prisma.user.findMany({
            where: {
                
                followingIds:{
                    has: userId
                }
            }
        });

        return res.status(200).json(followers);
    }catch(error){
        console.log(error);
        return res.status(400).end();
    }
}