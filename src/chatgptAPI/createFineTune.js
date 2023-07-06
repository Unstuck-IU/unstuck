import { openai } from "./index.js";
//after we have uploaded the file, we will copy the file ID and paste into "training_file"

async function createFineTune() {
  try {
    const response = await openai.createFineTune({
      training_file: "file-kGWhArjoybNcru6dzOtY2QTn",
      model: "davinci",
    });
    console.log("response: ", response);
  } catch (err) {
    console.log("error: ", err.response.data.error);
  }
}

createFineTune();
