import { config } from "dotenv";
config({ path: "../.env" });

import { Configuration, OpenAIApi } from "openai";
import readline from "readline";

console.log(process.env.CHAT_API_KEY);

const configuration = new Configuration({
  apiKey: process.env.CHAT_API_KEY,
});
export const openai = new OpenAIApi(configuration);

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
userInterface.prompt();

userInterface.on("line", async (input) => {
  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: input }],
  });
  console.log(res.data.choices[0].message.content);
});
