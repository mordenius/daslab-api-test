import * as UserService from "../services/user";
import * as AuthService from "../services/auth";
import { NextFunction, Request, Response } from "express";

/**
 * @swagger
 *
 * /users:
 *   get:
 *     description: Lists users
 *     tags: ['Users']
 *     security:
 *       - api_key: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: welcome
 */
export async function list(req: Request, res: Response, next: NextFunction) {
  return res.json(await UserService.list(req.query));
}

/**
 * @swagger
 *
 * /users/me:
 *   get:
 *     description: Get a user
 *     tags: ['Users']
 *     security:
 *       - api_key: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Your current user
 */
/**
 * @swagger
 *
 * /users/{userId}:
 *   get:
 *     description: Get a user
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
 *         description: Your current user
 */
export async function getById(req: Request, res: Response, next: NextFunction) {
  // return
  let userId = req.params.id;
  if (userId === "me") {
    if (req.user && req.user.id) {
      userId = req.user.id;
    } else {
      return res.status(401).json({
        message: "Must be logged in",
      });
    }
  } else {
    userId = parseFloat(userId);
  }
  if (!userId || Number.isNaN(userId)) {
    return res.status(403).json({
      message: "Invalid userId",
    });
  }
  try {
    await AuthService.adminOrMe(userId, req.user);
  } catch (e) {
    return res.status(401).json({
      message: "Invalid permission",
    });
  }
  return res.json(await UserService.getById(userId));
}

/**
 * @swagger
 *
 * /users/{userId}:
 *   put:
 *     description: Update a user
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
 *         description: Your current user
 */
export async function update(req: Request, res: Response, next: NextFunction) {
  let userId = req.params.id;
  if (userId === "me") {
    if (req.user && req.user.id) {
      userId = req.user.id;
    } else {
      return res.status(401).json({
        message: "Must be logged in",
      });
    }
  } else {
    userId = parseFloat(userId);
  }
  if (!userId || Number.isNaN(userId)) {
    return res.status(403).json({
      message: "Invalid userId",
    });
  }
  try {
    await AuthService.adminOrMe(userId, req.user);
  } catch (e) {
    return res.status(401).json({
      message: "Invalid permission",
    });
  }
  return res.json(await UserService.updateById(userId, req.body));
}

/**
 * @swagger
 *
 * /users/{userId}:
 *   delete:
 *     description: Remove a user
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
 *         description: Ok
 */
export async function remove(req: Request, res: Response, next: NextFunction) {
  let userId = req.params.id;
  if (userId === "me") {
    if (req.user && req.user.id) {
      userId = req.user.id;
    } else {
      return res.status(401).json({
        message: "Must be logged in",
      });
    }
  } else {
    userId = parseFloat(userId);
  }
  if (!userId || Number.isNaN(userId)) {
    return res.status(403).json({
      message: "Invalid userId",
    });
  }
  try {
    await AuthService.adminOrMe(userId, req.user);
  } catch (e) {
    return res.status(401).json({
      message: "Invalid permission",
    });
  }
  return res.json(await UserService.removeById(userId));
}
