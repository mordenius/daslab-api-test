import { getManager } from "typeorm";
import * as winston from "winston";

import { User } from "../entities/user";
// export type UserType = { success: false } | { success: true; userId: string }

export async function getById(userId: number) {
    return new Promise(async function (resolve, reject) {
        let userRepository = getManager().getRepository(User);
        let u = await userRepository.findOne(
            { id: userId },
            { relations: ["roles"] }
        );
        resolve(u || null);
    });
}

export async function getByUid(uid: string, firebaseUser) {
    return new Promise(async function (resolve, reject) {
        let userRepository = getManager().getRepository(User);
        let u = await userRepository.findOne({ uid });
        if (!u) {
            winston.info("[Auth] Create user", firebaseUser);
            let newUser = await userRepository.create({
                uid,
                email: firebaseUser.email,
                emailVerified: firebaseUser.email_verified,
                phoneNumber: firebaseUser.phone_number || "",
            });
            await userRepository.save(newUser);
            u = await userRepository.findOne({ uid }, { relations: ["roles"] });
        } else if (
            u.email !== firebaseUser.email ||
            u.emailVerified !== firebaseUser.email_verified ||
            u.phoneNumber !== firebaseUser.phone_number
        ) {
            winston.info("[Auth] Update user", firebaseUser);
            u.email = firebaseUser.email;
            u.emailVerified = firebaseUser.email_verified;
            u.phoneNumber = firebaseUser.phone_number;
            await userRepository.save(u);
        }
        resolve(u);
    });
}

export async function updateById(userId: number, update) {
    return new Promise(async function (resolve, reject) {
        let userRepository = getManager().getRepository(User);
        let u = await userRepository.findOne(
            { id: userId },
            { relations: ["roles"] }
        );
        if (!u) return reject("No such user");
        // only some fields should be able to be updated
        u.createdOnTheme = update.createdOnTheme;
        u.createdOnPlatform = update.createdOnPlatform;
        await userRepository.save(u);
        resolve(u);
    });
}

export async function removeById(userId: number) {
    return new Promise(async function (resolve, reject) {
        let userRepository = getManager().getRepository(User);
        let u = await userRepository.findOne(
            { id: userId },
            { relations: ["roles"] }
        );
        if (!u) return reject("No such user");
        await userRepository.remove(u);
        resolve("ok");
    });
}

export async function list(query) {
    return new Promise(function (resolve, reject) {
        let userRepository = getManager().getRepository(User);
        let u = userRepository.find({ relations: ["roles"] });
        resolve(u || null);
    });
}
