import { ogKantoThemes, kantoThemes } from '../components/kanto/themes';
import { ogJohtoThemes, johtoThemes } from '../components/johto/themes';
import { Region } from '../components/region-selector/region-selector';
import { hoennThemes, ogHoennThemes } from '../components/hoenn/themes';
import { sinnohThemes, ogSinnohThemes } from '../components/sinnoh/themes';

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
