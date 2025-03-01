import { romanize } from "./romanize";

export function getGenerationName(generation: number) {
    if (!generation) {
        return 'Starters';
    }

    return `Generation ${romanize(generation)}`
}
