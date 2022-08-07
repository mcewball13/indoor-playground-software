const { google } = require("googleapis");


    const oAuth2Client = new google.auth.OAuth2(
        process.env.OAUTH_CLIENT_ID,
        process.env.OAUTH_CLIENT_SECRET,
        process.env.OAUTH_REDIRECT_URI
    );

    oAuth2Client.setCredentials({refresh_token: process.env.OAUTH_REFRESH_TOKEN});


module.exports = oAuth2Client;