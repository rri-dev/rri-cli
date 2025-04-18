import { Request, Response, NextFunction } from "express";

function forceHttps(req: Request, res: Response, next: NextFunction) {
    // within heroku we can trust the x-forwarded-proto header
    // https://devcenter.heroku.com/articles/http-routing#heroku-headers
    const shouldForceHttps = process.env.NODE_ENV !== 'development';
    if (shouldForceHttps && req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    return next();
}

export {
    forceHttps
}