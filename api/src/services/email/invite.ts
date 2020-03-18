import { keys } from '../../config';

const invite = (token: string, orgName: string): string => `
  <!DOCTYPE html>
    <html lang="en" style="margin: 0px;padding: 0px;">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body style="background-color: #222222;font-family: Source Sans Pro;text-align: center;overflow: hidden;margin: 0px;padding: 0px;">
      <div class="main" style="max-width: 568px;height: 700px;min-height: 100%;margin: 90px auto 24px;position: relative;">
        <h1 style="margin: 0px;padding: 0px;font-style: normal;font-weight: bold;color: #ffffff;font-size: 44px;line-height: 55px;padding-bottom: 80px;border-bottom: 1px solid  #ffffff;">Girbil</h1>
        <div class="content" style="max-width: 369px;margin: 90px auto 24px;">
          <h2 style="font-style: normal;font-weight: bold;color: #ffffff;font-size: 24px;line-height: 30px;">You’re Invited to ${orgName}!</h2>
          <div class="info" style="margin-bottom: 70px;">
            <p style="font-style: normal;font-weight: normal;font-size: 14px;line-height: 22px;color: #C9C9C9;">Create your account on Girbil to start collaborating with your co-workers.</p>
            <p style="font-style: normal;font-weight: normal;font-size: 14px;line-height: 22px;color: #C9C9C9;">Girbil is the first asynchronous video collaboration tool built for remote work teams. Enjoy! 🐭</p>
          </div>
          <a href=${keys.url}/invite/accept?emailToken=${token}>
            <button style="margin-bottom: 200px;width: 153px;height: 41px;color: #ffffff;font-family: Source Sans Pro;font-size: 16px;font-weight: bold;line-height: 14px;border: none;background: #33AB77;border-radius: 6px;">Accept Invitation</button>
          </a>
        </div>
        <p class="footer" style="font-style: normal;font-weight: normal;font-size: 14px;line-height: 22px;color: #C9C9C9;">Giribil is made with ❤️ around the world by a remote team.</p>
      </div>
    </body>
    </html>
  `;

export default invite;
