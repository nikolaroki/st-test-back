import fs from 'fs';
import path from 'path';

const { promisify } = require('util')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'companies.json'
);

const readCompanyAsync = promisify(fs.readFile)

const deleteCompany = async (id) => {
    const raw = await readCompanyAsync(p);
    const data = JSON.parse(raw);
    const companyIndex = data.findIndex(
        company => company.id === id
    );
    const existingCompany = data[companyIndex];
    let deletedCompany;
    if(existingCompany){
        deletedCompany = {...existingCompany}
        deletedCompany.status = 0;
        data[companyIndex] = deletedCompany;
        fs.writeFile(p, JSON.stringify(data), err => {
            console.log(err);
        });
    }

    return deletedCompany;
}




export default deleteCompany;