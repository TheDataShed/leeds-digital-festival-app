/* eslint-disable no-console, prefer-promise-reject-errors */
const azure = require('azure-storage');
const fs = require('fs');
const filePath = require('path');


const blobService = azure.createBlobService(process.env.storage_key);
const storageCollection = '$web';

const files = [];
const rootPath = './';
const buildPath = 'build/';


const contentTypes = {
  '.js': 'text/javascript',
  '.map': 'text/javascript',
  '.json': 'application/json',
  '.html': 'text/html',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.xml': 'text/xml',
  '.txt': 'text/plain',
};

/**
 * Checks if a path is a folder
 * @param {String} path
 * @return {Boolean} is folder
 */
function isFolder(path) {
  return Object.keys(contentTypes).filter((type) => path.indexOf(type) > -1).length === 0;
}

/**
 * Function to read in a folder and build up a list of files
 * @param {String} route
 */
function readFolder(route) {
  const sub = fs.readdirSync(route);
  sub.forEach((elm) => {
    const localPath = (`${route}/${elm}`).replace(rootPath, '');
    if (isFolder(elm)) {
      readFolder(rootPath + localPath);
    }
    files.push(localPath);
  });
}

readFolder(rootPath + buildPath);
Promise.all(files.map((file) => new Promise((resolve, reject) => {
  const contentType = contentTypes[filePath.extname(file)];
  if (contentType) {
    blobService.createBlockBlobFromLocalFile(storageCollection, file.replace(`${buildPath}/`, ''), file, { contentSettings: { contentType } }, (err) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  }
  return reject(`No matching file type ${filePath.extname(file)} for file ${file}`);
})))
  .then(() => {
    console.log('Done :)');
  })
  .catch((err) => {
    console.error('Error', err);
  });
