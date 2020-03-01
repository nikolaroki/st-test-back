import Koa from 'koa';
import koaBody from 'koa-bodyparser';
import cors from '@koa/cors';
import helmet from 'koa-helmet';
import Router from 'koa-router';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ApolloServer, AuthenticationError } from 'apollo-server-koa';
import fs from 'fs';
import path from 'path';
import cookie from 'koa-cookie';

import typeDefs from './schema.gql';
import resolvers from './resolvers';
import { endpointURL, isDevelopment } from './utils/config';



const { promisify } = require('util')

const SECRET_KEY = 'my-secret';

const context = ({ ctx }) => {
const token = ctx.cookies.get('jwt') || ''
  try {
    const { id, email, role } = jwt.verify(token, SECRET_KEY);
    return  {id, email, role}
  } catch (e) {
    throw new AuthenticationError(
      'Authentication token is invalid, please log in'
    )
  }
}





const optionsCors = {
  origin: 'http://localhost:3000',
  credentials: true
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  debug: isDevelopment,
  cors: false
});

const app = new Koa();
const router = new Router()


app.use(cookie());
app.use(helmet());
app.use(koaBody());
app.use(cors(optionsCors));


server.applyMiddleware({ app, cors: false })


const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'employees.json'
);

const readEmployeeAsync = promisify(fs.readFile)

const returnEmployee = async () => {
  const raw = await readEmployeeAsync(p);
  const data = JSON.parse(raw)
  return data;
}





router.post('/login', async ctx => {
  const { email, password } = ctx.request.body
  const users = await returnEmployee();
  // eslint-disable-next-line no-shadow
  const user = users.find(user => user.email === email)

  if (!user) {
    ctx.response.status=401; 
    ctx.body={
        success:false,
        message: `Could not find account: ${email} or password is not matching 1`,
      }
    return
  }
  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    ctx.response.status=401; 
    ctx.body={
        success:false,
        message: `Could not find account: ${email} or password is not matching 2`,
      }
    return
  }

 
  const token = jwt.sign(
    { 
      email: user.email,
      id: user.id, 
      role: user.role,
      last_name:user.last_name,
      first_name:user.first_name, },
    SECRET_KEY
  )

  ctx.cookies.set('jwt', token, {
    httpOnly: false
  })

  ctx.body = {
    success: true,
    role: user.role
  }
})

app.use(router.routes())
  .use(router.allowedMethods());


export default app;