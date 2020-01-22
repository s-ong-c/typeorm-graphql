import Koa from 'koa';
import routes from './routes';
import { createConnection } from 'typeorm';
import bodyParser from 'koa-bodyparser';
const app = new Koa();
app.use(bodyParser());
app.use(routes.routes()).use(routes.allowedMethods());
async function initalize() {
  try {
    await createConnection();
    console.log('Postgres RDBMS connection is establishde');
  } catch (e) {
    console.log(e);
  }
}
initalize();

export default app;
