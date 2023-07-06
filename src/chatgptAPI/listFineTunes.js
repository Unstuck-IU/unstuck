import { openai } from "./index.js";

async function listFineTunes() {
  try {
    const response = await openai.listFineTunes();
    console.log("data: ", response.data.data);
  } catch (err) {
    console.log("error: ", err);
  }
}

listFineTunes();
// function will let you know when your personal model has be trained!
// run node listFineTunes.js to get a status on if the model is trained or not.
