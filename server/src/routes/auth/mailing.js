function resetPasswordHTML(otp) {
    let date = new Date();
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP for Password Reset</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content p {
            color: #666666;
            line-height: 1.5;
        }
        .otp {
            font-size: 24px;
            font-weight: bold;
            color: #333333;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            padding: 10px 0;
            color: #999999;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="content">
            <p>Dear User,</p>
            <p>You requested to reset your password. Please use the following OTP to proceed:</p>
            <div class="otp">${otp}</div>
            <p>This OTP is valid for 10 minutes.</p>
            <p>If you did not request this OTP, please ignore this email and do not share this OTP with anyone.</p>
        </div>
        <div class="footer">
            <p>© ${date.getFullYear()} Genesisio. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`
}
function generateOnboardingEmailHtml(fullname) {
    let date = new Date()
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Genesisio</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 50px auto;
            background: #fff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .content {
            text-align: center;
        }
        .content h1 {
            color: #333;
        }
        .content p {
            color: #666;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            background-color: #1BA098;
            color: #fffff;
            text-decoration: none;
            border-radius: 5px;
        }
        .footer {
            text-align: center;
            padding: 10px 0;
            color: #999;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="content">
            <h1>Welcome to Genesisio, ${fullname}</h1>
            <p>Thank you for choosing us as your trusted crypto brokerage partner. We're excited to have you on board!</p>
            <a href="https://genesisio.xyz/genesisio/" class="button">Get Started</a>
        </div>
        <div class="footer">
            &copy; ${date.getFullYear()} Genesisio. All rights reserved.
        </div>
    </div>
</body>
</html>
`;
}
function generateUpgradeEmail(fullname, instruction) {
    let date = new Date();
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Upgrade Your Account Tier</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content h1 {
            color: #333333;
        }
        .content p {
            color: #666666;
            line-height: 1.5;
        }
        .a{
            color: #ffffff;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: #ffffff;
            background-color: #1BA098;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
        .footer {
            text-align: center;
            padding: 10px 0;
            color: #999999;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="content">
            <h1>Upgrade Your Account Tier</h1>
            <p>Dear customer,</p>
            <p>We are excited to offer you an opportunity to upgrade your account tier and enjoy exclusive benefits. By upgrading, you will gain access to premium features and enhanced services tailored to your needs.</p>
            <p>Here are your instructions from the admin on how to proceed:</p>
            <p>${instruction}</p>
            <a href="https://genesisio.xyz/genesisio/upgrade" class="button">Upgrade Now</a>
            <p>If you have any questions, feel free to contact our support team.</p>
        </div>
        <div class="footer">
            © ${date.getFullYear()} Genesisio. All rights reserved.
        </div>
    </div>
</body>
</html>
`;
}
function generateEmailHtml(recipientName, otp) {
    let date = new Date();
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Complete Your Registration</title>
            <style>
                body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
                .container { width: 100%; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
                .content { padding: 20px; text-align: center; }
                .content h1 { color: #333333; }
                .content p { color: #666666; line-height: 1.5; }
                .otp { font-size: 24px; font-weight: bold; color: #333333; margin: 20px 0; }
                .footer { text-align: center; padding: 10px 0; color: #999999; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="content">
                    <h1>Complete Your Registration</h1>
                    <p>Dear ${recipientName},</p>
                    <p>Thank you for choosing our crypto brokerage services. To complete your registration, please use the OTP below:</p>
                    <div class="otp">${otp}</div>
                    <p>If you did not request this, please ignore this email.</p>
                </div>
                <div class="footer">
                    &copy; ${date.getFullYear()} Genesisio. All rights reserved.
                </div>
            </div>
        </body>
        </html>
    `;
}
export { resetPasswordHTML, generateOnboardingEmailHtml, generateUpgradeEmail, generateEmailHtml }