import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    let reqBody = await request.json();
    const { username, email, password } = reqBody;

    //check if user already exists or not
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json({
        status: 400,
        message: "User already exists",
      });
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    //send verification email

    await sendEmail({
      email,
      emailType: "VERIFY",
      userId: savedUser._id,
    });

    return NextResponse.json({
      message: "User saved successfully",
      status: 201,
      success: true,
      savedUser,
    });
  } catch (error) {
    return NextResponse.json({
      message: `something went wrong ${error}`,
      status: 500,
    });
  }
}
