const jwt = require('jsonwebtoken')
const verifyToken = function (req, res, next) {

    var authorization = req.headers['authorization'];
    if (authorization) {
        // console.log('authorization', authorization);
        var tokenBearer = authorization.split(' ');
        var token = tokenBearer[1];

        jwt.verify(token, 'randomkey', function (err, decoded) {
            if (err) {
                return res.status(403).send('unauthorized');
            }
            else {
        //    console.log(decoded);
           req.user_id=decoded.id
                next();
            }
        });
    }
    else {
        return res.status(403).send('tokenmissing');
    }
};

module.exports={verifyToken}