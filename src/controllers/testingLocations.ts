import * as TestingLocationService from "../services/testingLocation";
import * as AuthService from "../services/auth";
import { NextFunction, Request, Response } from "express";

async function _isAuth(
    req: Request,
    res: Response
): Promise<{ res: Response; message: string | null; userId: any }> {
    let userId = req.params.id;
    if (userId === "me") {
        if (req.user && req.user.id) {
            userId = req.user.id;
            return {
                res,
                message: null,
                userId,
            };
        } else {
            return {
                res: res.status(401),
                message: "Must be logged in",
                userId,
            };
        }
    } else {
        userId = parseFloat(userId);
    }
    if (!userId || Number.isNaN(userId)) {
        return {
            res: res.status(403),
            message: "Invalid userId",
            userId,
        };
    }
    return {
        res,
        message: null,
        userId,
    };
}

/**
 * @swagger
 *
 * /users/me/testingLocations:
 *   get:
 *     description: Get list of testing locations for authorised user
 *     tags: ['Users']
 *     security:
 *       - api_key: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of testing locations fot current user
 */
/**
 * @swagger
 *
 * /users/{userId}/testingLocations:
 *   get:
 *     description: List of testing locations for unique user
 *     tags: ['Users']
 *     security:
 *       - api_key: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: List of testing locations
 */
export async function list(req: Request, res: Response, next: NextFunction) {
    const { res: response, message, userId } = await _isAuth(req, res);

    try {
        await AuthService.adminOrMe(userId, req.user);
        return response.json(
            message || (await TestingLocationService.list({ userId }))
        );
    } catch (e) {
        return res.status(401).json({ message: "Invalid permission" });
    }
}

/**
 * @swagger
 *
 * /testingLocations:
 *   get:
 *     description: List of all testing locations
 *     tags: ['Users']
 *     security:
 *       - api_key: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: List of testing locations
 */
export async function adminList(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { res: response, message } = await _isAuth(req, res);
    if (message) return response.json(message);

    try {
        await AuthService.adminOnly(req.user);
        return response.json(await TestingLocationService.list());
    } catch (e) {
        return res.status(401).json({ message: "Invalid permission" });
    }
}

/**
 * @swagger
 *
 * /users/{userId}/testingLocations/{locationId}:
 *   get:
 *     description: Specific testing location for unique user
 *     tags: ['Users']
 *     security:
 *       - api_key: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *       - name: locationId
 *         in: path
 *         description: Testing Location ID
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: List of testing locations
 */
export async function getById(req: Request, res: Response, next: NextFunction) {
    const { res: response, message, userId } = await _isAuth(req, res);
    if (message) return response.json(message);

    try {
        await AuthService.adminOrMe(userId, req.user);
        return response.json(
            await TestingLocationService.getById(req.params.locationId)
        );
    } catch (e) {
        return res.status(401).json({ message: "Invalid permission" });
    }
}

/**
 * @swagger
 *
 * /users/{userId}/testingLocations:
 *   get:
 *     description: Create testing location for unique user
 *     tags: ['Users']
 *     security:
 *       - api_key: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: List of testing locations
 */
export async function create(req: Request, res: Response, next: NextFunction) {
    const { res: response, message, userId } = await _isAuth(req, res);

    return response.json(
        message ||
            (await TestingLocationService.create({ ...req.body, userId }))
    );
}

/**
 * @swagger
 *
 * /users/{userId}/testingLocations/{locationId}:
 *   put:
 *     description: Update a testing locations for specified user
 *     tags: ['Users']
 *     security:
 *       - api_key: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *       - name: locationId
 *         in: path
 *         description: Testing Location ID
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Updated testing location
 */
export async function userUpdate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    let { res: response, message, userId } = await _isAuth(req, res);

    const location = await TestingLocationService.getById(
        req.params.locationId
    );

    try {
        await AuthService.adminOrMe(userId, req.user);
    } catch (e) {
        return res.status(401).json({ message: "Invalid permission" });
    }

    return response.json(
        message || (await TestingLocationService.update(location, req.body))
    );
}

/**
 * @swagger
 *
 * /users/{userId}/testingLocations/{locationId}:
 *   delete:
 *     description: Remove a testing locations for specified user
 *     tags: ['Users']
 *     security:
 *       - api_key: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: User ID
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *       - name: locationId
 *         in: path
 *         description: Testing Location ID
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *     responses:
 *       200:
 *         description: Ok
 */
export async function userRemove(
    req: Request,
    res: Response,
    next: NextFunction
) {
    let { res: response, message, userId } = await _isAuth(req, res);

    const location = await TestingLocationService.getById(
        req.params.locationId
    );

    try {
        await AuthService.adminOrMe(userId, req.user);
    } catch (e) {
        return res.status(401).json({ message: "Invalid permission" });
    }

    return response.json(
        message || (await TestingLocationService.remove(location))
    );
}
