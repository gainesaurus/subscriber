import db from '../models/notify-model.js';
import tokenDb from '../models/user-token-model.js';
import { sendReminderToClient } from '../notify.js';
// //takes token and data object as params.

export async function postSubNotification(req, res) {
  try {
    const notifyInfo = req.body;
    // const createdInfo = await db.create({
    //   userId: notifyInfo.userId,
    //   title: notifyInfo.title,
    //   price: notifyInfo.price,
    //   delay: notifyInfo.delay,
    // });

    const userToken = await tokenDb.findOne({userId:notifyInfo.userId})
    const messageData = {
      title: notifyInfo.title,
      body:`you are about to be billed $${notifyInfo.price} from ${notifyInfo.title}!`
    }
    const delay = notifyInfo.delay; //15; //will send the delay time from the client side!
    console.log(delay);

    //this is so hacky! look into CRON JOBS
    setTimeout(async () => {
      sendReminderToClient(userToken.token, messageData);
    }, delay);

    //res.send(createdInfo);
    res.sendStatus(201);


  } catch (err) {
    console.log('ERROR in NOTIFY controller POST from db', err);
    res.status(500);
  }
}