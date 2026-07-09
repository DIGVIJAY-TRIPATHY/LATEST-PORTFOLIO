import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

const sendContactNotification = async ({
    name,
    email,
    subject,
    message,
}) => {
    await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_EMAIL,
        subject: `New Contact Form Submission - ${subject}`,
        html: `
            <h2>New Contact Request</h2>

            <p><strong>Name:</strong> ${name}</p>

            <p><strong>Email:</strong> ${email}</p>

            <p><strong>Subject:</strong> ${subject}</p>

            <p><strong>Message:</strong></p>

            <p>${message}</p>
        `,
    });
};

const sendAutoReply = async ({
    name,
    email,
}) => {
    await transporter.sendMail({
        from: `"Digvijay Tripathy" <${process.env.SMTP_USER}>`,
        to: email,
        subject: "Thanks for contacting me!",
        html: `
            <h2>Hello ${name} 👋</h2>

            <p>
                Thank you for contacting me through my portfolio.
            </p>

            <p>
                I have received your message and will get back to you as soon as possible.
            </p>

            <br/>

            <p>Regards,</p>

            <h3>Digvijay Tripathy</h3>
        `,
    });
};

export {
    sendContactNotification,
    sendAutoReply,
};