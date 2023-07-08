const { sign } = require('jsonwebtoken');

const createAccessToken = (userId: any) => {
    return sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m'
    })
};

const createRefreshToken = (userId: any) => {
    return sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d'
    })
};

const sendAccessToken = (res: any, req: any, accesstoken: any) => {
    res.send({
        accesstoken: accesstoken,
        email: req.query.email,
    });
}

const sendRefreshToken = (res: any, refreshtoken: any) => {
    res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true,
        path: '/refresh_token',
        sameSite: 'none',
        secure: true
    })
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken
}