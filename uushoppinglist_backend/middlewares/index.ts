import express, {Request, Response, NextFunction} from 'express';

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error?.status || 400).json({
        inputData: Object.keys(req.body).length === 0 ? null : req.body,
        error: {
            message: error?.message || null,
            code: error?.code
        },
        result: null
    })
}

export const responseBuilder = (result: any, req: Request, res: Response, next: NextFunction) => {
    if (result?.status !== undefined) {
        next(result)
        return;
    }
    res.send({
        inputData: Object.keys(req.body).length === 0 ? null : req.body,
        error: null,
        result: result
    })
}
