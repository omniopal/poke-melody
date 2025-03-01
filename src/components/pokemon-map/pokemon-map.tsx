'use client'

import React, { useRef, useState } from 'react';
import './pokemon-map.css';
import { LatLng, LatLngBounds } from 'leaflet';
import { Link, useMediaQuery, useTheme } from '@mui/material';
import clsx from 'clsx';
import { regionThemes } from './region-themes';
import { Region, RegionSelector } from './region-selector';
import { KantoMap } from './kanto/kanto-map';
import { JohtoMap } from './johto/johto-map';
import { StyledSwitch } from './StyledSwitch';
import { HoennMap } from './hoenn/hoenn-map';
import { SinnohMap } from './sinnoh/sinnoh-map';
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

const PokemonMap = () => {
    const [lastClickedTown, setLastClickedTown] = useState<string>('');
    const [result, setResult] = useState<'Correct!' | 'Wrong' | ''>('');
    const [score, setScore] = useState<number>(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [currentTheme, setCurrentTheme] = useState<string | null>(null);
    const [correctTowns, setCorrectTowns] = useState<string[]>([]);
    const [region, setRegion] = useState<Region>('Kanto');
    const [guesses, setGuesses] = useState<string[]>([]);
    const [shouldPlayOGTheme, setShouldPlayOGTheme] = useState(true);

    const theme = useTheme();
    const isSmallBreakpoint = useMediaQuery(theme.breakpoints.down(700));
    const center = isSmallBreakpoint ? new LatLng(800, 2102) : new LatLng(725, 2202);
    const zoom = isSmallBreakpoint ? -2 : -1;
    const height = isSmallBreakpoint ? "360px" : "500px";

    const bounds: LatLngBounds = new LatLngBounds(
        [0, 0], // Southwest
        [1600, 4405]  // Northeast
    );

    const playRandomSound = () => {
        if (!regionThemes[region]) return;

        // if (audioRef.current?.paused) {
        //     audioRef.current.play();
        //     return;
        // }

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        let randomTheme;
        if (shouldPlayOGTheme && regionThemes[region].ogTheme) {
            const currentRegionOgThemes = regionThemes[region].ogTheme;
            randomTheme = currentRegionOgThemes?.[Math.floor(Math.random() * currentRegionOgThemes.length)];
        } else {
            const currentRegionThemes = regionThemes[region].theme;
            randomTheme = currentRegionThemes[Math.floor(Math.random() * currentRegionThemes.length)];
        }

        if (randomTheme) {
            if (randomTheme.name === currentTheme) {
                playRandomSound();
                return;
            }
    
            const newAudio = new Audio(randomTheme.file);
            newAudio.volume = 0.05;
            newAudio.play();
    
            audioRef.current = newAudio;
            setCurrentTheme(randomTheme.name);
            setCorrectTowns(randomTheme.towns);
            setGuesses([]);
        }
    };

    const handleTownClick = (townName: string) => {
        setLastClickedTown(townName);
        if (!currentTheme) return;

        console.log(townName);

        // Correct guess
        if (correctTowns.includes(townName)) {
            setResult('Correct!');

            // TODO use this scoring structure or something similar for daily scores
            // const currentRegionSize = regionSizes[region];
            // const currentRoundScore = currentRegionSize - guesses.length;
            // setScore(score + currentRoundScore);

            setScore(score + 1);
            setGuesses([]);
            audioRef.current?.pause();
            playRandomSound();

        // Incorrect guess
        } else {
            if (!guesses.includes(townName)) {
                const updatedGuesses = [...guesses, townName];
                setGuesses(updatedGuesses);
            }

            setResult('Wrong');
        }
    };

    const onSelectorChange = (filter: Region) => {
        audioRef.current?.pause();
        setRegion(filter);
        setScore(0);
        setLastClickedTown('');

        if (region === 'Hoenn' || region === 'Sinnoh') {
            setShouldPlayOGTheme(false);
        }
    }

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
                newAudio.play();
                audioRef.current = newAudio;
                return;
            }
        })
    }

    return (
        <>
            <Link sx={{ marginBlockStart: '8px', marginInlineStart: '8px' }} className="logo-container" href="/pokemon">
                <img className="logo" src="/images/logo3.png" alt="PokeMelody logo" />
            </Link>
            <div className="header">
                <div className="region">
                    <h2>Region:</h2>
                    <RegionSelector region={region} onSelectorChange={onSelectorChange} />
                </div>
                <div className="score-container">
                    <p className="score-label">Score: </p>
                    <p className="score">{score}</p>
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
                    guesses={guesses}
                    center={center}
                    zoom={zoom}
                />
            }
            {region === 'Johto' &&
                <JohtoMap
                    handleTownClick={handleTownClick}
                    height={height}
                    bounds={bounds}
                    guesses={guesses}
                    center={center}
                    zoom={zoom}
                />
            }
            {region === 'Hoenn' &&
                <HoennMap
                    handleTownClick={handleTownClick}
                    height={height}
                    bounds={bounds}
                    guesses={guesses}
                    center={center}
                    zoom={zoom}
                />
            }
            {region === 'Sinnoh' &&
                <SinnohMap
                    handleTownClick={handleTownClick}
                    height={height}
                    bounds={bounds}
                    guesses={guesses}
                    center={center}
                    zoom={zoom}
                />
            }
            <div className="stuff">
                <p>Play a random theme and then click on which location it belongs to!</p>
                <div className="buttons">
                    <button
                        className="button"
                        onClick={() => {
                            if (audioRef.current?.paused) {
                                audioRef.current.play();
                            } else {
                                playRandomSound();
                            }
                        }}
                    >
                        <span className="button-icon"><PlayArrowIcon fontSize="small" /></span>Play Random Theme
                    </button>
                    <button className="button" onClick={() => audioRef.current?.pause()}>
                        <span className="button-icon"><PauseIcon fontSize="small" /></span>Pause
                    </button>
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
        </>
    )
}

export default PokemonMap;