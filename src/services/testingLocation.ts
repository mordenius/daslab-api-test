import { getManager } from "typeorm";

import { TestingLocation } from "../entities/testingLocation";

export async function getById(
    locationId: number
): Promise<TestingLocation | null> {
    return new Promise(async function (resolve, reject) {
        const testingLocationRepository = getManager().getRepository(
            TestingLocation
        );
        const location = await testingLocationRepository.findOne({
            id: locationId,
        });
        resolve(location || null);
    });
}

export async function create(create): Promise<TestingLocation[]> {
    return new Promise(async function (resolve, reject) {
        const testingLocationRepository = getManager().getRepository(
            TestingLocation
        );
        const locations = await testingLocationRepository.create({ ...create });
        resolve(locations);
    });
}

export async function updateById(
    locationId: number,
    update
): Promise<TestingLocation | null> {
    return new Promise(async function (resolve, reject) {
        const testingLocationRepository = getManager().getRepository(
            TestingLocation
        );
        const location = await testingLocationRepository.findOne({
            id: locationId,
        });
        if (!location) return reject("No such testing location");
        // only some fields should be able to be updated
        location.latiture = update.latiture;
        location.longitude = update.longitude;
        location.formattedAddress = update.formattedAddress;
        location.plannedTimeArrive = update.plannedTimeArrive;
        resolve(testingLocationRepository.save(location));
    });
}

export async function update(
    location: TestingLocation,
    update
): Promise<TestingLocation | null> {
    return new Promise(async function (resolve, reject) {
        const testingLocationRepository = getManager().getRepository(
            TestingLocation
        );
        if (!location) return reject("No such testing location");
        location.latiture = update.latiture;
        location.longitude = update.longitude;
        location.formattedAddress = update.formattedAddress;
        location.plannedTimeArrive = update.plannedTimeArrive;
        resolve(testingLocationRepository.save(location));
    });
}

export async function removeById(locationId: number): Promise<"ok" | never> {
    return new Promise(async function (resolve, reject) {
        const testingLocationRepository = getManager().getRepository(
            TestingLocation
        );
        const location = await testingLocationRepository.findOne({
            id: locationId,
        });
        if (!location) return reject("No such testing location");
        await testingLocationRepository.remove(location);
        resolve("ok");
    });
}

export async function remove(location: TestingLocation): Promise<"ok" | never> {
    return new Promise(async function (resolve, reject) {
        let testingLocationRepository = getManager().getRepository(
            TestingLocation
        );
        if (!location) return reject("No such testing location");
        await testingLocationRepository.remove(location);
        resolve("ok");
    });
}

export async function list(query = {}): Promise<TestingLocation[]> {
    return new Promise(function (resolve, reject) {
        const testingLocationRepository = getManager().getRepository(
            TestingLocation
        );
        const locations = testingLocationRepository.find({
            ...query,
            relations: ["user"],
        });
        resolve(locations);
    });
}
