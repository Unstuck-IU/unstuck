import { openai } from "./index.js";
import fs from "fs";

async function upload() {
  try {
    const response = await openai.createFile(fs.createReadStream("./data_prepared.jsonl"), "fine-tune");
    console.log("File ID: ", response.data.id);
  } catch (error) {
    console.log("error", error);
  }
} //console.log gives you the file ID that we are going to copy and paste into another created file that we will call "createFineTune"
upload();
