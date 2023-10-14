import { WebClient } from "@slack/web-api";
import * as config from "../config/config";

export const sendMessage = async (message: string) => {
  const { logging, token } = config.slack;

  const webClient = new WebClient(token);
  await webClient.chat.postMessage({ channel: logging, text: message });
};
