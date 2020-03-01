import fs from 'fs';
import path from 'path';

const { promisify } = require('util')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'companies.json'
);

const readCompanyAsync = promisify(fs.readFile)

const addCompany = async (newData) => {
    const raw = await readCompanyAsync(p);
    const data = JSON.parse(raw);
    const maxId = data.reduce((prev, current) => (prev.id > current.id) ? prev.id : current.id);
    const newCompany = {...newData.input };
    newCompany.id = maxId + 1;
    data.push(newCompany);
    fs.writeFile(p, JSON.stringify(data), err => {
        console.log(err);
    });
    return newCompany;
}




export default addCompany;