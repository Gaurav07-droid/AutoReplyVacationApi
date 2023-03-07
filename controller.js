const dotenv = require("dotenv");
const { google } = require("googleapis");

dotenv.config({ path: "./config.env" });

const gmail = google.gmail({
  version: "v1",
  auth: "https://accounts.google.com/o/oauth2/auth",
});

const oauth2Client = new google.auth.OAuth2(
  process.env.client_id,
  process.env.client_secret,
  process.env.redirect_url
);

// permission for the gmail scope
const scopes = [
  "https://www.googleapis.com/auth/gmail.readonly",
  "https://www.googleapis.com/auth/gmail.send",
];

const url = oauth2Client.generateAuthUrl({
  access_type: "online",
  scope: scopes,
});

console.log(`Authorized by visiting this url: ${url}`);

exports.autoReplyAuthentication = async () => {
  const res = await gmail.users.settings.getVacation({
    userId: "me",
  });

  return res;
};

exports.settingAutoReply = async () => {
  const res = await gmail.users.settings.updateVacation({
    userId: "me",
    requestBody: {
      enableAutoReply: true,
      responseSubject: "Auto-reply subject",
      responseBodyHtml: "Auto-reply message",
      restrictToContacts: false,
      restrictToDomain: false,
      startTime: Date.now(),
      endTime: Date.now() + 10 * 24 * 60 * 60 * 1000,
    },
  });

  return res;
};

const message = `Subject: This is an Auto reply message\n\nI am not available for for the response of any kind of query as i am on vacations. Please contact Mr. jhon snow for any query for the same. Thank you`;

exports.sendingResponse = async () => {
  try {
    let res = await gmail.users.messages.send({
      userId: "me",
      requestBody: {
        raw: Buffer.from(message).toString("base64"),
      },
    });

    return res;
  } catch (err) {
    console.log(err, "💥");
  }
};
