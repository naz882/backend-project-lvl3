import { fileURLToPath } from 'url';
import os from 'os'
import { promises as fs } from 'fs'
import path, { dirname } from 'path';
import downloadPage from '../src/index.js';
import nock from 'nock';
import _ from 'lodash';

nock.disableNetConnect();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const test_page = getFixturePath('test.html');
const result = getFixturePath('result-test.html');

let tempdir;
let pathToFinalFile

beforeEach( async () => {
    await fs.unlink(tempdir).catch(_.noop);
    tempdir = await fs.mkdtemp(path.join(os.tmpdir(), 'page-loader-'));
    pathToFinalFile = path.join(tempdir, 'example-com.html')
})

test('test1', async () => {
    const website = await fs.readFile(test_page);
    const finalResult = await fs.readFile(result);
    nock('https://example.com')
        .get('/')
        .reply(200, website);
    await downloadPage('https://example.com', tempdir);
    const downloadedPage = await fs.readFile(pathToFinalFile, 'utf-8');
    await exepct(downloadedPage).toEqual(finalResult.toString());
})