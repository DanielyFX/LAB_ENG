import fs from 'node:fs';
import path from 'node:path';

function getPath(name: string){
    return path.resolve('server','src','schemas', `${name}.json`);
}

function getSchemaByFileName(name: string){
    const path = getPath(name);
    return fs.readFileSync(path);
}

export {getSchemaByFileName};