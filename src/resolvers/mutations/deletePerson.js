import fs from 'fs';
import path from 'path';

const { promisify } = require('util')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'persons.json'
);

const readPersonAsync = promisify(fs.readFile)

const deletePerson = async (id) => {
    const raw = await readPersonAsync(p);
    const data = JSON.parse(raw);
    const personIndex = data.findIndex(
        person => person.id === id
    );
    const existingPerson = data[personIndex];
    let deletedPerson;
    if(existingPerson){
        deletedPerson = {...existingPerson}
        deletedPerson.status = 0;
        data[personIndex] = deletedPerson;
        fs.writeFile(p, JSON.stringify(data), err => {
            console.log(err);
        });
    }

    return deletedPerson;
}




export default deletePerson;