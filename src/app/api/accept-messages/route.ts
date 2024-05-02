import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import { use } from "react";

export async function POST(request: Request){
    await dbConnect();

    const session =await getServerSession(authOptions)
    const user: User =session?.user as User;

    if(!session || !session.user){
        return Response.json({
            success: false,
            message: 'NOt Authenticated',
        },
    { status: 401 })
    }
    const userId =user._id
}