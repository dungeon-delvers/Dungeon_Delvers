import cors from 'cors';
import express from 'express';
import { Application, json } from 'express';
import session from 'express-session';

export default (app: Application) => {
  app.get('/status', (_req, res) => {
    res.status(200).end();
  });

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');

  app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true },
    }),
  );
  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());
  // Transforms the raw string of req.body into json
  app.use(json());
  app.use(express.static(process.cwd() + '/public'));
};
