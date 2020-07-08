const cp = require('child_process');

class Registry {
  open() {
    return new Promise((resolve, reject) => {
      cp.exec('regedit', (err, stdout) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(stdout);
      });
    });
  }

  get(keyName, valueName) {
    return new Promise((resolve, reject) => {
      cp.exec(`REG QUERY "${keyName}" /v "${valueName}"`, (err, stdout) => {
        if (err) {
          reject(err);
          return;
        }
        const res = stdout.split(' ').filter(item => item !== '');
        resolve(res);
      });
    });
  }

  add(keyName, valueName, type, data) {
    return new Promise((resolve, reject) => {
      cp.exec(`REG ADD "${keyName}" /v "${valueName}" /t "${type}" /d "${data}" /f`, (err, stdout) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(stdout);
      });
    });
  }
}

export default new Registry();