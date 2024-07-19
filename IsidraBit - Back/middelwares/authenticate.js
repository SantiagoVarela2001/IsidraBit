import config from "../config.js";

const SECRET_TOKEN = config.TOKEN;

const authenticate = (req, res, next) => {
    const { authorization } = req.headers;

    if (authorization !== SECRET_TOKEN) {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    next();
};

export default authenticate;
