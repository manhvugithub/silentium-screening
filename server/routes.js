import { Router } from 'express';

import  { checkNextStateValid } from './gameFunctions.js';
const router = Router();

router.get("/", (req, res) => {
  res.status(200).send("Hello !!!");
});

router.get('/api/transition', function (req, res) {
  const { nextState, currentState } = req.query;
  console.log("Current state: ", currentState);
  console.log("Next state: ", nextState);
  // Check and compare
  try {
    const isNextStateValid = checkNextStateValid(currentState, nextState);
    if (isNextStateValid) {
        return res.status(200).send('Ok');
    }
    return res.status(400).send('Wrong State !!!');
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

/**
 * Error handler if pointing wrong endpoint
 * You must map your end-point before these lines
 */
router.get('*', (req, res, next) => {
  const error = new Error(`Routing not found !!!`);
  error.statusCode = 301;
  next(error);
});

export default router;
