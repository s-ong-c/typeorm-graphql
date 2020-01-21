import Router from 'koa-router';
const v1 = new Router();

v1.get('/check', ctx => {
  ctx.body = {
    version: 'v1'
  };
});

export default v1;
