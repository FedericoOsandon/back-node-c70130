const authentication = (req, res, next) => {
    if (req.session.username !== 'Fede' || !req.session.admin) {
        return res.status(401).send('Error de autenticación')
    }

    next()
}

module.exports = {authentication}