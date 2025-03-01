import React, { useState } from 'react';
import './game-collection-list.css';
import { CollapsibleConsoleButton } from '../collapsible-console-button/collapsible-console-button';
import * as gameCollectionDataJson from '../../data/game-collection-data.json';
import { GameInfo } from '../game-info/game-info';
import { getPhysicalGameType } from '../../utils/get-physical-game-type';
import Image from 'next/image';
import { NoGamesWarning } from '../no-games-warning/no-games-warning';
import { Filters } from '../filters/filters';
import { getGameBoxType } from 'src/utils/get-game-box-type';


type GameCollectionListProps = {};

export type ListFilter = 'all-games' | 'owned-games' | 'unowned-games';

interface Game {
    title: string;
    boxArt: string;
    hasGame: boolean;
    hasCase: boolean;
    hasManual?: boolean;
    hasPlayed: boolean;
    image?: string;
    releaseDate: string;
}

interface Console {
    name: string;
    image: string;
    releaseDate: string;
    games: Game[];
}

export const GameCollectionList: React.FC<GameCollectionListProps> = () => {
    const [filterValue, setFilterValue] = useState<ListFilter>('all-games');
    const [openIndices, setOpenIndices] = useState<number[]>([]);
    const gameData: { consoles: Console[] } = gameCollectionDataJson;

    const onFilterChange = (filter: ListFilter) => {
        setFilterValue(filter);
    }

    const addOpenIndex = (index: number) => {
        if (!openIndices.includes(index)) {
            setOpenIndices(openIndices.concat([index]));
        }
    }

    const removeOpenIndex = (index: number) => {
        if (openIndices.includes(index)) {
            setOpenIndices(openIndices.filter((i) => i !== index));
        }
    }

    return (
        <div className="background">
            <div className="jacobs-games">
                <Image className="jacobs-games-image" src={'/images/jacobs-games.png'} alt="TODO" sizes="100vw" style={{ width: '100%', height: 'auto' }} height={0} width={0} />
            </div>
            <div className="filters-container">
                <Filters onFilterChange={onFilterChange} />
            </div>
            <nav className="game-collection-list">
                {gameData.consoles.map((console, index) => {
                    const physicalGameType = getPhysicalGameType(console.name);
                    const boxType = getGameBoxType(console.name);
                    const isLast = index === gameData.consoles.length - 1;

                    return (
                        <div key={index}>
                            <CollapsibleConsoleButton
                                consoleIndex={index}
                                consoleName={console.name}
                                consoleImage={console.image}
                                consoleReleaseDate={console.releaseDate}
                                top={index === 0}
                                bottom={isLast}
                                addOpenIndex={addOpenIndex}
                                removeOpenIndex={removeOpenIndex}
                                openIndices={openIndices}
                                Warning={<NoGamesWarning filter={filterValue} isLast={isLast} />}
                            >
                                {console.games
                                    .filter((game) => {
                                        return (filterValue === "owned-games" && game.hasGame) || 
                                                (filterValue === "unowned-games" && !game.hasGame) || 
                                                filterValue === "all-games";    
                                    })
                                    .map((game, gameIndex) => {
                                        const isVeryLastGame = isLast && (gameIndex === console.games.length - 1)

                                        return (<div key={gameIndex}>
                                            <GameInfo 
                                                text={game.title}
                                                boxArt={game.boxArt}
                                                personalCopyImage={game.image}
                                                gameReleaseDate={game.releaseDate}
                                                physicalGameType={physicalGameType}
                                                boxType={boxType}
                                                isVeryLastGame={isVeryLastGame}
                                                chipInfo={{
                                                    hasGame: game.hasGame,
                                                    hasBox: game.hasCase,
                                                    hasManual: game.hasManual,
                                                    hasPlayed: game.hasPlayed,
                                                }}
                                            />
                                        </div>)
                                    })
                                }
                            </CollapsibleConsoleButton>
                        </div>
                    )
                })}
            </nav>
        </div>
    );
}