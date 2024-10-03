const bcrypt = require('bcrypt')

exports.createHash      = passsword => bcrypt.hashSync(passsword, bcrypt.genSaltSync(10))
exports.isValidPassword =  (passsword, userPassword) => bcrypt.compareSync(passsword, userPassword)