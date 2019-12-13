const MD5 = require('crypto-js/md5');


const hashPassword = (p) => {
return MD5(p).toString()
}

export { hashPassword };