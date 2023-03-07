const apiController = require("./controller");

//The first ste to authenticate the google API

apiController.autoReplyAuthentication();

// Second step is to set the auto reply message which has to be sent to the user

apiController.settingAutoReply();

// Last step wher the actual response is sent to the user

apiController.sendingResponse();
