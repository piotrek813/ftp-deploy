# ftp-deploy

> Quick way to deploy your app to ftp server.

## How to use

### Install

`npm i`

`yarn add`

### In order this to work you need to create few enviromental variables:

- FTP_HOST=ftp.example.com
- FTP_USER=user
- FTP_PASSWD=password
- REMOTE_DIR=/path/to/folder/on/server/
- LOCAL_DIR=/path/to/local/folder

**If you don't specify LOCAL_DIR /public folder will be used. Not specifing any other variable will cause error when script will try to connect to server**

### Cli usage

- ftp-deloy --help
- ftp-deploy - will start script that sends files to server. (Earlier you have to specify env variables like is showed above)
- ftp-deploy --addConfig - this add circleci config to your project that install depencies, build your app and start ftp-deploy. If you already have created config this will overwrite it.
- ftp-deploy --packageManager - only have any effect with flag --addConfig. You can specify wich package manager you want to use to build project on circleci. Yarn is default one and you can also use npm.