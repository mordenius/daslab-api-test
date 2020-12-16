import { Express } from 'express-serve-static-core'
import { createdServer } from '../../bootstrap/server'

let server: Express

beforeAll(async () => {
  server = await createdServer()
}, 20000)

import * as testingLocationService from "../testingLocation";

describe("testingLocationService", () => {
    it("getById", async () => {
        const response = await testingLocationService.getById(9999);
        expect(response).toEqual(null);
    });

    it("list", async () => {
        const response = await testingLocationService.list({});
        expect(typeof response).toEqual("object");
    });

    it("create", async () => {
        const response = await testingLocationService.create({});
        expect(typeof response).toEqual("object");
    });

    it("update", async () => {
        try {
            const response = await testingLocationService.update(
                { id: 9999, userId: 7777, longitude: 39.4876384, latiture: -40.9873623, plannedTimeArrive: Date.now(), formattedAddress: "Ocean" } as any,
                { id: 9999 }
            );

            expect(true).toBe(false);
        } catch (e) {
            expect(e.message).toBe("SQLITE_CONSTRAINT: FOREIGN KEY constraint failed");
        }
    });

    it("update by invalid id", async () => {
        try {
            const response = await testingLocationService.updateById(9999, {
                id: 9999,
            } as any);
            expect(true).toBe(false);
        } catch (e) {
            expect(e).toBe("No such testing location");
        }
    });

    it("remove not existed entity", async () => {
        const response = await testingLocationService.remove({
            id: 9999,
        } as any);
        expect(response).toBe("ok");
    });

    it("remove by id with not existed id", async () => {
        try {
            const response = await testingLocationService.removeById(9999);
            expect(true).toBe(false);
        } catch (e) {
            expect(e).toBe("No such testing location");
        }
    });
});
