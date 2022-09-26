const asyncHandler = require("express-async-handler");

const firebaseAdmin = require('firebase-admin');

const authVerification = asyncHandler(async (req, res, next) => {
    const appCheckToken = req.header('X-Firebase-AppCheck');

    if (!appCheckToken) {
        res.status(401);
        return next('Unauthorized');
    }

    try {
        const appCheckClaims = await firebaseAdmin.appCheck().verifyToken(appCheckToken);

        // If verifyToken() succeeds, continue with the next middleware
        // function in the stack.
        return next();
    } catch (err) {
        res.status(401);
        return next('Not authorized, token not found');
    }
});

module.exports = { authVerification };
