import db from '../models/sub-model.js';

export async function getAllSubs(req, res) {
  try {
    const subscriptions = await db.find().sort({reminderDate: -1});
    res.send(subscriptions);
    res.status(200);

  } catch (err) {
    console.log('ERROR in SUB controller GET from db', err);
    res.status(500);
  }
}

export async function postOneSub(req, res) {
  try {
    const sub = req.body;
    const createdSub = await db.create({
      icon: sub.icon,
      price: sub.price,
      title: sub.title,
      start: sub.start,
      prettyStart: sub.prettyStart,
      cycle: sub.cycle,
      reminderDate: sub.reminderDate,
    });
    res.send(createdSub);
    res.status(201);

  } catch (err) {
    console.log('ERROR in SUB controller POST from db', err);
    res.status(500);
  }
}

export async function editSub(req, res) {
  try {
    const updates = req.body;
    console.log(req.body);

    const query = {_id: updates.id};
    const updatedSub = await db.findOneAndUpdate(query, {
      icon: updates.icon,
      price: updates.price,
      title: updates.title,
      start: updates.start,
      prettyStart: updates.prettyStart,
      cycle: updates.cycle,
      reminderDate: updates.reminderDate,
    }, {new: true})
    res.send(updatedSub);
    res.status(201);

  } catch (err) {
    console.log('ERROR in SUB controller PUT from db', err);
    res.status(500);
  }
}

export async function deleteSub(req, res) {
  try {
    const subId = req.body.id;
    await db.findOneAndDelete({_id: subId});
    res.sendStatus(202);

  } catch (err) {
    console.log('ERROR in SUB controller DELETE from db', err);
    res.status(500);

  }

}

