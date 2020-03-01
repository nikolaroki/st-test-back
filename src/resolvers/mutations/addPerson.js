import fs from 'fs';
import path from 'path';

const { promisify } = require('util')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'persons.json'
);

const readPersonAsync = promisify(fs.readFile)

const addPerson = async (newData) => {
    const raw = await readPersonAsync(p);
    const data = JSON.parse(raw);
    const maxId = data.reduce((prev, current) => (prev.id > current.id) ? prev.id : current.id);
    const newPerson = {...newData.input };
    newPerson.id = maxId+1;
    data.push(newPerson);
    fs.writeFile(p, JSON.stringify(data), err => {
        console.log(err);
    });
    return newPerson;
}




export default addPerson;