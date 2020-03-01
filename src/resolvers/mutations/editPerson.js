import fs from 'fs';
import path from 'path';

const { promisify } = require('util')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'persons.json'
);

const readPersonAsync = promisify(fs.readFile)

const editPerson = async (newData) => {
    const raw = await readPersonAsync(p);
    const data = JSON.parse(raw);
    const personIndex = data.findIndex(
        person => person.id === newData.id
    );
    const existingPerson = data[personIndex];
    let updatedPerson;
    if(existingPerson){
        updatedPerson = {...newData.input}
        updatedPerson.id = newData.id;
        data[personIndex] = updatedPerson;
        fs.writeFile(p, JSON.stringify(data), err => {
            console.log(err);
        });
    }

    return updatedPerson;
}




export default editPerson;