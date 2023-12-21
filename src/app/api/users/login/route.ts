import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    //check if user exists or not
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        status: 400,
        message: "User do not exists, Please SignUp",
      });
    }

    //check password

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({
        status: 400,
        message: "Invalid Password",
      });
    }

    //create token
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    if (!process.env.TOKEN_SECRET) {
      return NextResponse.json({
        status: 400,
        message: "JSON WEB TOKEN IS NOT AVAILABLE",
      });
    }

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });
    
    const response = NextResponse.json({
        message:"Login Successful",
        success: true,
        status: 200
    })

    response.cookies.set("token", token, {
        httpOnly: true
    })

    return response

  } catch (error) {
    return NextResponse.json({
      message: `something went wrong ${error}`,
      status: 500,
    });
  }
}
