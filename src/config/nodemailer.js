import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    //secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "cmadrid1985@gmail.com",
      pass: "acmtbnldfsvsgmwm",
    },
  });

  export default transporter