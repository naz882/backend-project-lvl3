import { mkdir } from 'node:fs/promises';
import axios from 'axios';

export const makeName = (link) => {
    const myURL = new URL(link);
    const preprocess = link.split('//');
    const name = preprocess[1].replace(/[.\/]/gi, '-');
    const hostName = myURL.hostname.replace(/[.\/]/gi, '-');
    return [name, hostName];
}

export const createDirectory = async (path) => {
    try {
        const createDir = await mkdir(path, { recursive: true });
      } catch (err) {
        console.error(err.message);
    }

}

export const downloadImage = async (url, filepath) => {
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });
    return new Promise((resolve, reject) => {
        response.data.pipe(fs.createWriteStream(filepath))
            .on('error', reject)
            .once('close', () => resolve(filepath)); 
    });
}