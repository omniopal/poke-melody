import seedrandom from "seedrandom";
import { regionThemes, Theme } from "../region-themes";
import { Region } from "../region-selector";

const getUniqueRandomTheme = (themes: Theme[], firstTheme: Theme, rng: seedrandom.PRNG) => {
    let secondTheme;
    do {
        secondTheme = themes[Math.floor(rng() * themes.length)];
    } while (secondTheme?.name === firstTheme?.name);
    return secondTheme;
};

const getRandomThemesForRegion = (region: Region, rng: seedrandom.PRNG, og?: boolean) => {
    const themes = og ? regionThemes[region].ogTheme : regionThemes[region].theme;
    const firstTheme = themes[Math.floor(rng() * themes.length)];
    const secondTheme = getUniqueRandomTheme(themes, firstTheme, rng);
    return [firstTheme, secondTheme];
};

export const getDailyThemes = () => {
    const correctStart = new Date().toLocaleDateString('en-CA', {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
    const today = new Date(correctStart).toISOString().split('T')[0];
    const rng = seedrandom(today);

    return [
        ...getRandomThemesForRegion('Kanto', rng),
        ...getRandomThemesForRegion('Johto', rng),
        ...getRandomThemesForRegion('Hoenn', rng),
        ...getRandomThemesForRegion('Sinnoh', rng),
    ];
};

export const getOgDailyThemes = () => {
    const correctStart = new Date().toLocaleDateString('en-CA', {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
    const today = new Date(correctStart).toISOString().split('T')[0];
    const rng = seedrandom(today);

    return [
        ...getRandomThemesForRegion('Kanto', rng, true),
        ...getRandomThemesForRegion('Johto', rng, true),
        ...getRandomThemesForRegion('Hoenn', rng, true),
        ...getRandomThemesForRegion('Sinnoh', rng, true),
    ];
};