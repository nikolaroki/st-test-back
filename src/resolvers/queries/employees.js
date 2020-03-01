import fs from 'fs';
import path from 'path';

const { promisify } = require('util')

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'employees.json'
);

const readEmployeeAsync = promisify(fs.readFile)

const returnEmployees = async() =>{
  const raw = await readEmployeeAsync(p);
  const data = JSON.parse(raw);
  return data;
}

export default returnEmployees;
