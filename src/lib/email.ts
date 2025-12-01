import emailjs from "emailjs-com";

export const sendEmail = async ({
  from_name,
  from_email,
  time,
  subject,
  message,
}: {
  from_name: string;
  from_email: string;
  time?: Date;
  subject: string;
  message: string;
}) => {
  return emailjs.send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
    {
      from_name,
      from_email,
      time: time ? time.toString() : new Date().toString(),
      subject,
      message,
    },
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
  );
};