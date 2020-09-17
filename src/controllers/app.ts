import { NextFunction, Request, Response } from "express";
import * as pck from "../../package.json";

/**
 * @swagger
 *
 * /:
 *   get:
 *     description: Status of the application
 *     tags: ['Core']
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: welcome
 */
export async function hello(req: Request, res: Response, next: NextFunction) {
    return res.json({
        message: res.__('api-welcome'),
        apiVersion: pck.version,
    });
}

/**
 * @swagger
 *
 * /404:
 *   get:
 *     description: Page not found
 *     tags: ['Misc']
 *     produces:
 *       - application/json
 *     responses:
 *       404:
 *         description: Page not found
 */
export async function notFound(req: Request, res: Response, next: NextFunction) {
    return res.status(404).json({
        message: 'Page not found',
        apiVersion: pck.version
    });
}