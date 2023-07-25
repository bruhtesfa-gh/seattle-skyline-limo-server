import express from 'express'
export interface RequestResponseNext {
    req: express.Request;
    res: express.Response;
    next: express.NextFunction;
}
export interface CustomRequest extends Request {
    user?: any;
}

export interface CustomResponse extends Response {
    customMethod?: () => void;
}




