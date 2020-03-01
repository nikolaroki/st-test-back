import fs from 'fs';
import path from 'path';

const { promisify } = require('util')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'companies.json'
);

const readCompanyAsync = promisify(fs.readFile)

const editCompany = async (newData) => {
    const raw = await readCompanyAsync(p);
    const data = JSON.parse(raw);
    const companyIndex = data.findIndex(
        company => company.id === newData.id
    );
    const existingCompany = data[companyIndex];
    let updatedCompany;
    if(existingCompany){
        updatedCompany = {...newData.input}
        updatedCompany.id = newData.id;
        data[companyIndex] = updatedCompany;
        fs.writeFile(p, JSON.stringify(data), err => {
            console.log(err);
        });
    }

    return updatedCompany;
}




export default editCompany;