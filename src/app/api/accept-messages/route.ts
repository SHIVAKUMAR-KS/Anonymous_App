import { AcceptMessageSchema } from './../../../schemas/acceptMessageSchema';
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
    const {acceptMessages} =await request.json()

    try {
        const updatedUser =await UserModel.findByIdAndUpdate(
            userId,
            {isAcceptingMessage: acceptMessages},
            {new:true}
        )
        if(!updatedUser){
            return Response.json({
                success: false,
                message: 'failed to update status to accept messages',
            },
            {status:401}
        )
        }
        return Response.json({
            success: true,
            message: 'Message acceptance status updated successfully',
            updatedUser
        }, {status:200})

    } catch (error) {
        console.log("failed to update status to accept messages");

        return Response.json({
            success: false,
            message: 'failed to update status to accept messages',
        },
        {status:500}
    )
    }

}
