import fs from 'fs';
import path from 'path';

const { promisify } = require('util')

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'companies.json'
);

const readCompanyAsync = promisify(fs.readFile)

const returnCompany = async() =>{
  const raw = await readCompanyAsync(p);
  const data = JSON.parse(raw);
  const activeData = data.filter(acData => acData.status === 1)
  return activeData;
}

export default returnCompany;