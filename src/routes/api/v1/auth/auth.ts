import Router from 'koa-router';
import Joi from 'joi';
import { getRepository } from 'typeorm';
import User from '../../../../entity/User';
import { validateBody } from '../../../../lib/utils';

const auth = new Router();

auth.post('/register/local', async ctx => {
  console.log('/register/local');

  type RequestBody = {
    form: {
      username: string;
      password: string;
      email: string;
    };
  };
  const schema = Joi.object().keys({
    form: Joi.object()
      .keys({
        username: Joi.string()
          .regex(/^[a-z0-9-_]+$/)
          .min(3)
          .max(16)
          .required(),
        password: Joi.string()
          .min(3)
          .max(20)
          .required(),
        email: Joi.string()
          .min(3)
          .max(16)
          .required()
      })
      .required()
  });

  if (!validateBody(ctx, schema)) return false;
  const {
    form: { username, password, email }
  }: RequestBody = ctx.request.body;

  // create user
  const userRepo = getRepository(User);
  const user = new User();
  user.is_certified = true;
  user.email = email;
  user.username = username;
  user.password = password;

  await userRepo.save(user);

  ctx.body = {
    ...user
  };
});
export default auth;
