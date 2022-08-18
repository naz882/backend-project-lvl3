import axios from "axios";
import fs from 'node:fs/promises'
import { createDirectory, makeName } from "./utils.js";
import { cwd } from 'node:process';
import path from 'path';

export const downloadPage = async (website, pathtoFile) => {

  const fileName = makeName(website);
  const newPath = path.join(pathtoFile, fileName);
  let files; 
  return axios.get(website).then(resp => {
    files = resp.data;
  }).then(() => {
    fs.opendir(pathtoFile, (err, dir) => {
      if (err) console.log("Error:", err);
      else {
        fs.writeFile(fileName, files, (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
        });
      }
    })
  
  });
}


export default (website, path) => {
  return downloadPage(website, path = cwd());
}