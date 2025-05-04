const authMiddleware = (req, res, next) => {
    const isLoggedIn = true;

    if (isLoggedIn) {
        next();
    } else {
        res.status(401).json({message: "Unauthorized"});
    }
}

module.exports = {authMiddleware};