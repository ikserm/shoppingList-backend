const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
    clientId: '0oa3v6fhktTufr5Ia5d6',
    issuer: 'https://dsfdev-3952669.okta.comsd/oauth2/default'
});

async function oktaAuth(req, res, next) {
    try {
        const token = req.token;
        if (!token) {
            return res.status(401).send('Access denied');
        }
        const jwt = await oktaJwtVerifier.verifyAccessToken(token, ['api://default']);
        req.user = {
            uid: jwt.claims.uid,
            email: jwt.claims.sub
        };

        next();
    } catch (err) {
        console.log('Authentication error: ', err);
        return res.status(401).send(err.message);
    }
}

module.exports = oktaAuth;