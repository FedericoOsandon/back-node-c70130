const { createTransport } = require('nodemailer')
const { configObject } = require('../config')

const transport = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: configObject.gmail_user,
        pass: configObject.gmail_pass
    }
})
// console.log(configObject.gmail_pass)
// console.log(configObject.gmail_user)

exports.sendEmail = async ( { userClient='', subject='', html='' } ) => {
    await transport.sendMail({
        from: `Coder test <${configObject.gmail_user}>`,
        to: userClient,
        subject,
        html,
        attachments: [{
            filename: 'nodejs.png',
            path: './src/utils/nodejs.png',
            cid: 'nodejs'
        }]
    })
}