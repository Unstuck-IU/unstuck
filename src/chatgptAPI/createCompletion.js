import { openai } from "./index.js";

//after we've ran listFineTunes well will copy the model ID into 'model' and we will run in node to see if our model was trained successfully!

async function createCompletion() {
  try {
    const response = await openai.createCompletion({
      model: "davinci:ft-inceptionu-aric-2023-07-06-00-23-41",
      prompt: "Canadian Aboriginals",
      max_tokens: 100,
    });
    if (response.data) {
      console.log("choices: ", response.data.choices);
    }
  } catch (err) {
    console.log("err: ", err);
  }
}

createCompletion();
