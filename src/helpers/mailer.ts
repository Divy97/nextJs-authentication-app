import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "b88ee2bc53a9a9",
        pass: "4637467e19823e",
      },
    });

    const mailOptions = {
      from: "divy@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
      html: `
            <p> Click 
                <a href="${
                  process.env.DOMAIN
                }/verifyEmail?token=${hashedToken}">
                    Here
                </a>
                to ${
                  emailType === "VERIFY"
                    ? "Verify Your Email"
                    : "Reset Your Password"
                }     
            </p>
        `,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
    
  } catch (error: any) {
    throw new Error(error);
  }
};
