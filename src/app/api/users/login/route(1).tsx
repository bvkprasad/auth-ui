import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        console.log(reqBody);
        //check if user exists
        const user = await User.findOne({email})
        console.log("user is available", user);
        if(!user) return NextResponse.json({message: "User doesn't exist"}, {status: 400});
        const isValidPwd = await bcryptjs.compare(password, user.password)
        if(!isValidPwd){
            console.log("Invalid password");
            return NextResponse.json({message: "Invalid password"}, {status: 400});
        }
        
        //create jwt token data
        const tokenData = {
            id: user._id,
            username: user.username,
            isAdmin: user.isAdmin,
            email: user.email
        }
        //create jwt token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"});
        const response : NextResponse = NextResponse.json({message: "User logged in successfully", success: true}, {status: 200});
        response.cookies.set("token", token, {
            httpOnly: true,
        });
        return response;
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
}