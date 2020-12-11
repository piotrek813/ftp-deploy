const ftp = require('basic-ftp');
require('dotenv').config();

host = process.env.FTP_HOST;
user = process.env.FTP_USER;
password = process.env.FTP_PASSWD;
remoteDir = process.env.REMOTE_DIR;
localDir = process.env.LOCAL_DIR || 'public/';

async function deploy() {
  const client = new ftp.Client(600600);
  client.ftp.verbose = true;
  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWD,
      secure: true,
      secureOptions: { rejectUnauthorized: false },
    });
    await client.ensureDir(remoteDir);
    await client.clearWorkingDir();
    await client.uploadFromDir(`${process.cwd()}/${localDir}`);
  } catch (err) {
    console.log(err);
  }
  client.close();
}

module.exports = deploy;