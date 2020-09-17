import * as winston from "winston";
import * as admin from "firebase-admin";
import { NextFunction, Request, Response } from "express";

import * as UserService from "../services/user";

export async function mustBeUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (!req.headers.idtoken) {
        return res.status(401).json({
            message: "Authorization header required",
            type: "invalid_auth_header",
        });
    }
    // idToken comes from the client app, normally we use firebase but for the test we simplify
    let tokens = [];
    tokens["testuser"] = {
        uid: 1,
        email: "test@test.com",
        email_verified: true,
        phone_number: "",
    };
    tokens["testadmin"] = {
        uid: 2,
        email: "test-admin@test.com",
        email_verified: true,
        phone_number: "",
    };
    let decodedToken = tokens[req.headers.idtoken];
    if (decodedToken && decodedToken.uid) {
        let uid = decodedToken.uid;
        req.user = await UserService.getByUid(uid, decodedToken);
        if (!req.user.id) {
            winston.error("[Auth][mustBeUser] no user id", decodedToken);
            return res.status(401).json({
                message: "Invalid auth user",
                type: "invalid_auth_user",
            });
        }
        return next();
    } else {
        winston.error("[Auth][mustBeUser] token decrypt");
        return res.status(401).json({
            message: "Invalid auth token",
            type: "invalid_auth_token",
        });
    }
}

export async function canBeUser(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (!req.headers.idtoken) return next();
    return exports.mustBeUser(req, res, next);
}

export async function mustBeAdmin(
    req: Request,
    res: Response,
    next: NextFunction
) {
    return exports.mustBeUser(req, res, () => {
        if (req.user && req.user.email === "test-admin@test.com") {
            return next();
        } else {
            winston.error("[Auth][mustBeAdmin] no admin");
            return res.status(401).json({
                message: "Invalid auth permissions",
                type: "invalid_auth_permissions",
            });
        }
    });
}
