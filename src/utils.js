import { mkdir } from 'node:fs/promises';

export const makeName = (link) => {
    const preprocess = link.split('//');
    const name = preprocess[1].replace(/[.\/]/gi, '-');
    return name + '.html';
}

export const createDirectory = async (path) => {
    try {
        const createDir = await mkdir(path, { recursive: true });
        console.log(`created ${createDir}`);
      } catch (err) {
        console.error(err.message);
    }

}