import { getManager } from "typeorm";
import * as winston from "winston";

export async function adminOrMe(userId: number, user) {
    return new Promise(async function (resolve, reject) {
        if (Number.isNaN(userId)) return reject('Invalid user id');
        if (userId === user.id) { // me
            return resolve();
        }
        if (!user.roles || !user.roles.length) return reject('No roles');
        for (let i = 0; i < user.roles.length; i++) {
            const role = user.roles[i];
            if (role.type === 'admin') { // admin
                return resolve();
            }
        }
        return reject('No admin roles');
    })
}

export async function adminOnly(user) {
    return new Promise(async function (resolve, reject) {
        if (!user || !user.roles || !user.roles.length) return reject('No roles');
        for (let i = 0; i < user.roles.length; i++) {
            const role = user.roles[i];
            if (role.type === 'admin') {
                return resolve();
            }
        }
        return reject('No admin roles');
    })
}
