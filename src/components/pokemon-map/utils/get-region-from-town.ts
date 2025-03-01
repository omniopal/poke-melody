import { kantoTowns } from "../kanto/towns";
import { johtoTowns } from "../johto/towns";
import { hoennTowns } from "../hoenn/towns";

export const getRegionFromTown = (townName: string): string => {
    for (const town of kantoTowns) {
        if (town.name === townName) {
            return 'Kanto';
        }
    }

    for (const town of johtoTowns) {
        if (town.name === townName) {
            return 'Johto';
        }
    }

    for (const town of hoennTowns) {
        if (town.name === townName) {
            return 'Hoenn';
        }
    }

    return 'Sinnoh';
}