const User = require('../models/User');

const auth = async (req, res, next) => {
    const authorization = req.get('Authorization');
    if (!authorization) {
        return res.status(404).send({error: 'Unauthorized'})
    }
    const user = await User.findOne({token: authorization});
    if (!user) {
        return res.status(401).send({error: 'No user found with this token. Token incorrect'});
    }
    req.user = user;
    next();
};

module.exports = auth;