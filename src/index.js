import axios from "axios";
import fs from 'node:fs/promises'
import { createDirectory, makeName, downloadImage } from "./utils.js";
import { cwd } from 'node:process';
import path from 'path';
import cheerio from 'cheerio';

export const downloadPage = async (website, pathtoFile) => {

  const fileName = makeName(website)[0];
  const hostName = makeName(website)[1];
  const newPathtoFile = path.join(pathtoFile, fileName + '.html');
  const newPathtoDirectory = path.join(pathtoFile, fileName + '_files')

  let html; 
  return axios.get(website).then(resp => {
    html = resp.data;
  }).then(() => {
    try {
      const createAssetDir = fs.mkdir(newPathtoDirectory, { recursive: true });
    } catch (err) {
      console.error(err.message);
    }
  }).then(() => {
    const $ = cheerio.load(html)
    $('img').each((i, el) => {
      const link = $(el).attr('src');
      const newPath = path.join(newPathtoDirectory,'-',link.replace(/[\/]/gi, '-'))
      downloadImage(link, newPath);
      console.log(link);
    });
  }).then(() => {
    fs.writeFile(newPathtoFile, html, (err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
  });
}


export default (website, path = cwd()) => {
  return downloadPage(website, path);
}