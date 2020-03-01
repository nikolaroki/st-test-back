import fs from 'fs';
import path from 'path';

const { promisify } = require('util')

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'persons.json'
);

const readPersonAsync = promisify(fs.readFile)

const returnPerson = async(id) =>{
  const raw = await readPersonAsync(p);
  const data = JSON.parse(raw);
  const activeData = data.filter(acData => acData.status===1)
  const thePerson = activeData.find(p => p.id === id) 
  return thePerson;
}

export default returnPerson;
