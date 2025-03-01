import { kantoTowns } from './kanto/towns';
import { johtoTowns } from './johto/towns';
import { Region } from './region-selector';

export const regionSizes: Record<Region, number> = {
    Kanto: kantoTowns.length,
    Johto: johtoTowns.length,
};
