import { ogKantoThemes, kantoThemes } from './kanto/themes';
import { ogJohtoThemes, johtoThemes } from './johto/themes';
import { Region } from './region-selector';
import { hoennThemes, ogHoennThemes } from './hoenn/themes';
import { sinnohThemes, ogSinnohThemes } from './sinnoh/themes';

export type Theme = {
    name: string;
    file: string;
    towns: string[];
}

export const regionThemes: Record<Region, { ogTheme: Theme[], theme: Theme[] }> = {
    Kanto: { ogTheme: ogKantoThemes, theme: kantoThemes },
    Johto: { ogTheme: ogJohtoThemes, theme: johtoThemes },
    Hoenn: { ogTheme: ogHoennThemes, theme: hoennThemes },
    Sinnoh: { ogTheme: ogSinnohThemes, theme: sinnohThemes },
};
