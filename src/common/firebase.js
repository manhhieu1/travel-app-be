import firebase from "firebase-admin";
// import configJsonFirebase from "../../firebase-service.json" assert { type: "json" };
// const configJsonFirebase = require("../../firebase-service.json");
import { readFile } from "fs/promises";
const configJsonFirebase = JSON.parse(
  await readFile(new URL("../../firebase-service.json", import.meta.url))
);

firebase.initializeApp({
  credential: firebase.credential.cert(configJsonFirebase),
});

const subscribeTopic = (token, topic) => {
  // const registrationTokens =[token]
  firebase
    .messaging()
    .subscribeToTopic(token, topic)
    .then((response) => {
      // See the MessagingTopicManagementResponse reference documentation
      // for the contents of response.
      console.log("Successfully subscribed to topic:", response);
    })
    .catch((error) => {
      console.log("Error subscribing to topic:", error);
    });
};

const unsubscribeTopic = (token, topic) => {
  firebase
    .messaging()
    .unsubscribeFromTopic(token, topic)
    .then((response) => {
      // See the MessagingTopicManagementResponse reference documentation
      // for the contents of response.
      console.log("Successfully unsubscribed from topic:", response);
    })
    .catch((error) => {
      console.log("Error unsubscribing from topic:", error);
    });
};

const sendMessageToTopic = async (topic, title, body, payload) => {
  const message = {
    data: payload,
    notification: {
      title: title,
      body: body,
    },
    // topic: topic,
  };
  firebase
    .messaging()
    .sendToTopic(topic, message)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.error(err);
    });
};

const sendMessageToTopics = async (userIds, title, content, payload) => {
  // The topic name can be optionally prefixed with "/topics/".

  let condition = "";

  for (const userId of userIds) {
    if (condition) {
      condition += " || '" + userId + "' in topics";
    } else {
      condition += "'" + userId + "' in topics";
    }
  }

  var message = {
    data: payload,
    notification: {
      title: title,
      body: content,
    },
    condition: condition,
  };
  // Send a message to devices subscribed to the provided topic.
  firebase
    .messaging()
    .send(message)
    .then(async (response) => {
      // Response is a message ID string.
      // eslint-disable-next-line no-console
      console.log(`Successfully sent message to ${condition}:`, response);
      return userIds;
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log("Error sending message:", error, message);
    });
};

export default {
  sendMessageToTopic,
  subscribeTopic,
  unsubscribeTopic,
  sendMessageToTopics,
};
