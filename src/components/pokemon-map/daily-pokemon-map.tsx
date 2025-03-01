'use client'

import React, { useEffect, useRef, useState } from 'react';
import './daily-pokemon-map.css';
import { LatLng, LatLngBounds } from 'leaflet';
import { Link, useMediaQuery, useTheme } from '@mui/material';
import clsx from 'clsx';
import { regionThemes, Theme } from './region-themes';
import { Region } from './region-selector';
import { KantoMap } from './kanto/kanto-map';
import { JohtoMap } from './johto/johto-map';
import { StyledSwitch } from './StyledSwitch';
import { getRegionFromTown } from './utils/get-region-from-town';
import { DailyDoneDialog } from './daily-done-dialog';
import { HoennMap } from './hoenn/hoenn-map';
import { SinnohMap } from './sinnoh/sinnoh-map';
import { getDailyThemes, getOgDailyThemes } from './utils/get-daily-themes';
import { getRemasteredGameNamesFromRegion } from './utils/get-game-names-from-region';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

export type MapProps = {
    handleTownClick: (townName: string) => void;
    height: string;
    bounds: LatLngBounds;
    guesses: string[];
    center: LatLng,
    zoom: number,
};

const DailyPokemonMap = () => {
    const [lastClickedTown, setLastClickedTown] = useState<string>('');
    const [result, setResult] = useState<'Correct!' | 'Wrong' | ''>('');
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [currentTheme, setCurrentTheme] = useState<string | null>(null);
    const [correctTowns, setCorrectTowns] = useState<string[]>([]);
    const [region, setRegion] = useState<Region>('Kanto');
    const [guesses, setGuesses] = useState<number[]>([]);
    const [currentRoundGuesses, setCurrentRoundGuesses] = useState<string[]>([]);
    const [shouldPlayOGTheme, setShouldPlayOGTheme] = useState(true);
    const [dailyThemes, setDailyThemes] = useState<Theme[]>([]);
    const [ogDailyThemes, setOgDailyThemes] = useState<Theme[]>([]);
    const [dailyThemeIndex, setDailyThemeIndex] = useState<number>(0);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const theme = useTheme();
    const isSmallBreakpoint = useMediaQuery(theme.breakpoints.down(700));
    const center = isSmallBreakpoint ? new LatLng(800, 2102) : new LatLng(725, 2202);
    const zoom = isSmallBreakpoint ? -2 : -1;
    const height = isSmallBreakpoint ? "360px" : "500px";

    const bounds: LatLngBounds = new LatLngBounds(
        [0, 0], // Southwest
        [1600, 4405]  // Northeast
    );

    useEffect(() => {
        const index = localStorage.getItem('themeIndex');
        if (index) {
            const numIndex = Number.parseInt(index);
            console.log('0');
            const townName = dailyThemes[numIndex - 1]?.towns[0];
            console.log(townName);
            const region = getRegionFromTown(townName);
            setRegion(region);
        } else if (dailyThemes[0]?.towns) {
            console.log('1');
            const townName = dailyThemes[0].towns[0];
            const region = getRegionFromTown(townName);
            setRegion(region);
        }

        // Auto-play the next track when the user has already started the game
        // Don't auto-play once the daily game is done (if they re-visit the page)
        if (dailyThemeIndex > 1 && dailyThemeIndex <= 8) {
            playTheme();
        }
    }, [dailyThemeIndex]);

    const playTheme = () => {
        const one = localStorage.getItem('themeIndex');
        console.log('In playTheme -- themeIndex: ' + one);

        const two = localStorage.getItem('date');
        console.log('In playTheme -- date: ' + two);

        if (!regionThemes[region]) return;

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        if (!shouldPlayOGTheme && dailyThemeIndex <= dailyThemes.length && dailyThemes.length > 0) {
            console.log(`index: ${dailyThemeIndex}`);
            const theme = dailyThemes[dailyThemeIndex-1];

            const newAudio = new Audio(theme.file);
            newAudio.volume = 0.05;
            newAudio.autoplay = true;
            newAudio.play();

            audioRef.current = newAudio;
            setCurrentTheme(theme.name);
            setCorrectTowns(theme.towns);
        }

        if (shouldPlayOGTheme && dailyThemeIndex <= ogDailyThemes.length && ogDailyThemes.length > 0) {
            console.log(`index: ${dailyThemeIndex}`);
            const theme = ogDailyThemes[dailyThemeIndex-1];

            const newAudio = new Audio(theme?.file);
            newAudio.volume = 0.05;
            newAudio.autoplay = true;
            newAudio.play();

            audioRef.current = newAudio;
            if (theme) {
                setCurrentTheme(theme.name);
                setCorrectTowns(theme.towns);
            }
            console.log('2');
        }
    };

    const handleTownClick = (townName: string) => {
        setLastClickedTown(townName);
        if (!currentTheme) return;

        console.log(townName);

        // Correct guess
        if (correctTowns.includes(townName)) {
            setResult('Correct!');
            
            const updatedGuesses = [...guesses, currentRoundGuesses.length + 1];
            setGuesses(updatedGuesses);

            setCurrentRoundGuesses([]);
            audioRef.current?.pause();

            console.log('dailyThemeIndex: ' + dailyThemeIndex);
            console.log(`other: ${dailyThemes.length - 1}`);
            if (dailyThemeIndex === dailyThemes.length) {
                localStorage.setItem('guesses', updatedGuesses.toString());
                setIsDialogOpen(true);
            } else {
                const index = localStorage.getItem('themeIndex');
                if (index) {
                    const numIndex = Number.parseInt(index);
                    localStorage.setItem('themeIndex', `${numIndex + 1}`);
                    localStorage.setItem('guesses', updatedGuesses.toString());
                }
                setDailyThemeIndex(dailyThemeIndex + 1);
                
                // if (dailyThemeIndex % 2 === 0) {
                //     setLastClickedTown('');
                // }
            }
            
        // Incorrect guess
        } else {
            if (!currentRoundGuesses.includes(townName)) {
                const updatedCurrentRoundGuesses = [...currentRoundGuesses, townName];
                setCurrentRoundGuesses(updatedCurrentRoundGuesses);
            }

            setResult('Wrong');
        }
    };

    const onThemeVersionToggle = () => {
        setShouldPlayOGTheme(!shouldPlayOGTheme);
        
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        const themes = shouldPlayOGTheme ? regionThemes[region].theme : regionThemes[region].ogTheme;
        themes?.forEach((theme) => {
            if (theme.towns.includes(correctTowns[0])) {
                const newAudio = new Audio(theme.file);
                newAudio.volume = 0.05;
                newAudio.autoplay = true;
                newAudio.play();
                audioRef.current = newAudio;
                return;
            }
        })
    }

    useEffect(() => {
        const localDate = localStorage.getItem('date');
        const correctStart = new Date().toLocaleDateString('en-CA', {
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        });
        const today = new Date(correctStart).toISOString().split('T')[0];

        // Reset on new day
        if (localDate && localDate != today) {
            localStorage.setItem('date', today);
            localStorage.setItem('themeIndex', '1');
            localStorage.removeItem('guesses');
        }

        const themeIndex = localStorage.getItem('themeIndex');

        // Initialize local date (for first time players & after clearing application storage)
        if (!localDate) {
            localStorage.setItem('date', today);
        }

        console.log("Local Date: " + localDate);
        console.log("Today: " + today);
        console.log("Theme Index: " + themeIndex);

        // Always pop dialog when user has already completed today's puzzle
        if (localDate === today && themeIndex === '8') {
            setIsDialogOpen(true);
        }

        // const dailyThemes = getDailyThemes();
        const dailyThemes = getDailyThemes();
        const ogDailyThemes = getOgDailyThemes();
        console.log(dailyThemes);
        setDailyThemes(dailyThemes);
        setOgDailyThemes(ogDailyThemes);

        // Haven't finished today's, left and came back mid-way through
        const localIndex = localStorage.getItem('themeIndex');
        if (localIndex && Number.parseInt(localIndex) < 8) {
            const numIndex = Number.parseInt(localIndex);
            const townName = dailyThemes[numIndex - 1]?.towns[0];
            console.log(townName);
            const region = getRegionFromTown(townName);
            setRegion(region);
        }
        
        if (!localIndex) {
            localStorage.setItem('themeIndex', '1');
            setDailyThemeIndex(1);
            const townName = dailyThemes[0].towns[0];
            const region = getRegionFromTown(townName);
            setRegion(region);
        }

        const localGuesses = localStorage.getItem('guesses');
        if (localGuesses) {
            const guessesArray = localGuesses.split(',');
            let numGuessesArray: number[] = [];
            guessesArray.forEach((strGuess) => {
                numGuessesArray.push(Number.parseInt(strGuess));
            });
            setGuesses(numGuessesArray);
        }

        if (localIndex && Number.parseInt(localIndex) < 8) {
            console.log('peaches');
            setDailyThemeIndex(Number.parseInt(localIndex));
        } else {
            // console.log('pears')
            // setDailyThemeIndex(0);
        }
    }, []);

    return (
        <>
            <Link sx={{ marginBlockStart: '8px', marginInlineStart: '8px' }} className="logo-container" href="/pokemon">
                <img className="logo" src="/images/logo3.png" alt="PokeMelody logo" />
            </Link>
            <div className="header">
                <div className="region">
                    <h2>Region: <span className="region-name">{region}</span></h2>
                </div>
                <div className="score-container">
                    <p className="score-label">Round: </p>
                    <p className="score">{localStorage.getItem('themeIndex')} / {dailyThemes.length}</p>
                </div>
                <div className="town-name-display">
                        <p className="town-name-title">Last town selected: </p>
                        <p className="town-name">{lastClickedTown || 'awaiting selection...'}</p>
                </div>
            </div>
            {region === 'Kanto' &&
                <KantoMap
                    handleTownClick={handleTownClick}
                    height={height}
                    bounds={bounds}
                    guesses={currentRoundGuesses}
                    center={center}
                    zoom={zoom}
                />
            }
            {region === 'Johto' &&
                <JohtoMap
                    handleTownClick={handleTownClick}
                    height={height}
                    bounds={bounds}
                    guesses={currentRoundGuesses}
                    center={center}
                    zoom={zoom}
                />
            }
            {region === 'Hoenn' &&
                <HoennMap
                    handleTownClick={handleTownClick}
                    height={height}
                    bounds={bounds}
                    guesses={currentRoundGuesses}
                    center={center}
                    zoom={zoom}
                />
            }
            {region === 'Sinnoh' &&
                <SinnohMap
                    handleTownClick={handleTownClick}
                    height={height}
                    bounds={bounds}
                    guesses={currentRoundGuesses}
                    center={center}
                    zoom={zoom}
                />
            }
            <div className="stuff">
                <div className="buttons">
                    <button
                        className="daily-button"
                        onClick={() => {
                            if (audioRef.current?.paused) {
                                audioRef.current.play();
                            } else {
                                playTheme();
                            }
                        }}
                    >
                        <span className="button-icon"><PlayArrowIcon fontSize="small" /></span>Play
                    </button>
                    <button className="daily-button" onClick={() => audioRef.current?.pause()}>
                        <span className="button-icon"><PauseIcon fontSize="small" /></span>Pause
                    </button>
                    {/* <button className="button" onClick={() => {
                        localStorage.setItem('themeIndex', '1');
                        setDailyThemeIndex(0);
                        setGuesses([]); 
                        // setIsDialogOpen(true);
                    }}>
                        Reset
                    </button> */}
                </div>
                {regionThemes[region]?.ogTheme &&
                    <div className="theme-version-toggle">
                        <div className="play-original-theme">Play remastered {getRemasteredGameNamesFromRegion(region)} themes</div>
                        <StyledSwitch
                            onChange={onThemeVersionToggle}
                        />
                    </div>
                }
                {/* <div className="results">
                    {result && <div className={clsx(result === 'Correct!' ? "correct" : "wrong")}>{result}</div>}
                </div> */}
            </div>
            <DailyDoneDialog isOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
        </>
    )
}

export default DailyPokemonMap;