const db = require('./database');
const UUID = new RegExp(['^[0-9a-f]{8}-[0-9a-f]{4}-[0-5]',
  '[0-9a-f]{3}-[089ab][0-9a-f]{3}-',
  '[0-9a-f]{12}$/i']);

/**
 * 
 * @param {array} inbox
 * @return {array} outbox
 */
function sortMail(inbox) {
  let next;
  for (let i = 0; i < inbox.length; i++) {
    next = inbox[i];
    for (let j = i; j < inbox.length; j++) {
      if (inbox[i].sent < inbox[j].sent) {
        inbox[i] = inbox[j];
        inbox[j] = next;
        next = inbox[i];
      }
    }
  }
  return inbox;
}

const parseMailbox = async (name) => {
  let box;
  if (name == 'Starred') {
    box = await db.getStarred();
    for (let i = 0; i < box.length; i++) {
      box[i] = box[i].email;
    }
  } else {
    box = await db.selectMailbox(name);
  }
  for (let i = 0; i < box.length; i++) {
    box[i].id = await db.getId(box[i]);
    box[i].mailbox = name;
  }
  box = sortMail(box);
  return box
}

/**
 * Sends full mailbox(es)
 * @param {object} req
 * @param {object} res
 */
exports.getMailbox = async (req, res) => {
  const mailboxes = await db.allMailboxes();
  const mailbox = req.query.mailbox;
  const retBoxes = [];
  let box;
  if (mailbox) {
    if (mailboxes.includes(mailbox)) {
      box = await parseMailbox(mailbox);
      res.status(200).json(box);
    } else if (mailbox == 'Starred') {
      box = await parseMailbox(mailbox);
      res.status(200).json(box);
    } else {
      res.status(404).send('Mailbox:"'+mailbox+'" not found.');
    }
  } else {
    for (let i = 0; i < mailboxes.length; i++) {
      box = await parseMailbox(mailboxes[i]);
      retBoxes.push({name: mailboxes[i], mailbox: box});
    }
    res.status(200).json(retBoxes);
  }
};

const getRead = async (mailbox) => {
  let box;
  if (mailbox == 'Starred') {
    box = await db.getStarred();
    return box.length;
  } else {
    box = await db.selectMailbox(mailbox);
    let count = 0;
    for (let i = 0; i < box.length; i++) {
      if (box[i].read == false) {
        count++;
      }
    }
    return count;
  }
};

exports.getMailboxes = async (req, res) => {
  const mailNames = await db.allMailboxes();
  mailNames.push('Starred');
  const mailboxes = [];
  let count;
  let pair;
  for (let i = 0; i < mailNames.length; i++) {
    count = await getRead(mailNames[i]);
    pair = {name: mailNames[i], count: count};
    mailboxes.push(pair);
  }
  if (mailboxes) {
    res.status(200).json(mailboxes);
  } else {
    res.status(500).send('No Mailboxes found');
  }
}

/**
 * Sends a specific email based on UUID
 * @param {object} req
 * @param {object} res
 */
exports.getEmail = async (req, res) => {
  if (req.params.id.match(UUID)) {
    const mail = await db.selectMail(req.params.id);
    if (mail) {
      res.status(200).json(mail);
    } else {
      res.status(404).send('No mail found with UUID:"'+req.params.id+'"');
    }
  } else {
    res.status(404).send('No mail found with UUID:"'+req.params.id+'"');
  }
};

/**
 * Posts an email to the sent mailbox and sends full email back
 * @param {object} req
 * @param {object} res
 */
exports.postEmail = async (req, res) => {
  const email = {
    'id': undefined,
    'to': {
      'name': req.body['to-name'],
      'email': req.body['to-email'],
    },
    'from': {
      'name': undefined,
      'email': undefined,
    },
    'sent': undefined,
    'content': req.body.content,
    'subject': req.body.subject,
    'received': undefined,
  };
  const fullEmail = await db.insertMail(email);
  res.status(201).json(fullEmail);
};

/**
 * Puts an email by id into a Mailbox
 * @param {object} req
 * @param {object} res
 */
exports.putEmail = async (req, res) => {
  const fromBox = await db.getMailbox(req.params.id);
  if (req.query.mailbox == 'sent') {
    if (fromBox != 'sent') {
      res.status(409).send('Email cannot be moved to sent');
    }
  }
  if (fromBox == undefined) {
    res.status(404).send('Email by UUID: "'+req.params.id+'" Not Found');
  } else {
    await db.changeMailbox(req.params.id, req.query.mailbox);
    res.status(204).send('Email put');
  }
};

exports.putStarred = async (req, res) => {
  const id = req.params.id;
  const starred = req.query.star;
  if (typeof(starred) === 'boolean') {
    await db.changeStarred(id, starred);
    res.status(200).send('Starred Changed');
  } else {
    res.status(404).send('Not Found');
  }
}

exports.setRead = async (req, res) => {
  const id = req.params.id;
  const read = req.query.read;
  // console.log(id, read);
  if (typeof(read) === 'boolean') {
    await db.changeRead(id, read);
    res.status(200).send('Read Changed');
  } else {
    res.status(400).send('Illegal request. "Read" not boolean');
  }
}

