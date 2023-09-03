import nodemailer from "nodemailer";


class MailService {
    static transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    static async sendMail(to, subject, message) {
        await MailService.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject,
            text: "",
            html: message,
        });
    }

    static async sendActivationMail(to, link) {
        const subject = `Подтверждение аккаунта на ${process.env.DOMAIN}`;
        const message = `
            <p>
                На сайте ${process.env.DOMAIN} в ${new Date().toLocaleString()} вы прошли регистрацию.<br>
                Для подтверждения аккаунта перейдите по ссылке<br>
                <a href=${link}>${link}</a>
            </p>
            <p style="font-style: italic; color: #aaa">
                Если это были не вы, просто проигнорируйте письмо, возможно кто-то ввел ваш адрес по ошибке
            </p>
        `;
        MailService.sendMail(to, subject, message);
    }

    static async sendResetPasswordMail(to, link) {
        const subject = `Сброс пароля на сайте ${process.env.EXTERNAL_API_URL}`;
        const message = `
            <p>
              На сайте ${process.env.EXTERNAL_API_URL} в ${new Date().toLocaleString()} вы запросили сброс пароля.<br>
              Для сброса перейдите по ссылке<br>
              <a href=${link}>${link}</a>
            </p>
            <p style="font-style: italic; color: #aaa">
              Если это были не вы, просто проигнорируйте письмо, возможно кто-то ввел ваш адрес по ошибке
            </p>
        `;
        MailService.sendMail(to, subject, message);
  }
}

export { MailService };
