// much of the code is copied from the storage example
// given in class

const {Pool} = require('pg');

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

exports.allMailboxes = async () => {
  const select = 'SELECT DISTINCT mailbox FROM mail';
  const query = {
    text: select,
  };
  const {rows} = await pool.query(query);
  const Mailboxes = [];
  for (row of rows) {
    Mailboxes.push(row.mailbox);
  }
  return Mailboxes;
};

getId = async (mail) => {
  const select = 'SELECT id from mail WHERE email = $1';
  const query = {
    text: select,
    values: [mail],
  };
  const {rows} = await pool.query(query);
  return rows[0].id;
};

exports.selectMailbox = async (box) => {
  const select = 'SELECT email FROM mail WHERE mailbox = $1';
  const query = {
    text: select,
    values: [box],
  };
  const {rows} = await pool.query(query);
  const MailBox = [];
  for (const row of rows) {
    MailBox.push(row.mail);
  }
  return MailBox;
};

exports.selectMail = async (id) => {
  const select = 'SELECT email from mail WHERE id = $1';
  const query = {
    text: select,
    values: [id],
  };
  const {rows} = await pool.query(query);
  return rows.length == 1? rows[0].mail : undefined;
};

getFrom = async () => {
  const select = 'SELECT DISTINCT email from mail WHERE mailbox = $1';
  const query = {
    text: select,
    values: ['sent'],
  };
  const {rows} = await pool.query(query);
  return rows[0].mail.from;
};

exports.insertMail = async (mail) => {
  const from = await getFrom();
  const time = new Date();
  mail.from.name = from.name;
  mail.from.email = from.email;
  mail.sent = time.toISOString();
  mail.received = time.toISOString();
  const select = 'INSERT INTO mail(mailbox, email) VALUES ($1, $2)';
  const query = {
    text: select,
    values: ['sent', mail],
  };
  await pool.query(query);
  const id = await getId(mail);
  mail.id = id;
  return mail;
};

exports.getMailbox = async (id) => {
  const select = 'SELECT mailbox FROM mail WHERE id = $1';
  const query = {
    text: select,
    values: [id],
  };
  const {rows} = await pool.query(query);
  return rows.length == 1? rows[0].mailbox : undefined;
};

exports.changeMailbox = async (id, mailbox) => {
  const update = 'UPDATE mail SET mailbox = $1 WHERE id = $2';
  const query = {
    text: update,
    values: [mailbox, id],
  };
  await pool.query(query);
};

console.log(`Connected to database '${process.env.POSTGRES_DB}'`);
