import nodemailer from 'nodemailer';

export const sendEmail = async ({email, subject, message}) => {
    

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: subject,
            html: message,
        });
}