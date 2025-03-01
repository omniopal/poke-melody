import React from 'react';
import './no-games-warning.css'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import clsx from 'clsx';

type NoGamesWarning = {
    filter: string;
    isLast: boolean;
};

export const NoGamesWarning: React.FC<NoGamesWarning> = (props) => {
    const { filter, isLast } = props;
    const noOwnedGames = "I own no games for this console";
    const noUnownedGames = "I own all of the games for this console";
    const noGames = "No games have been added for this console yet";

    return (
        <div className={(clsx("warning-container", isLast && "last-warning"))}>
            {filter === 'owned-games' &&
                <>
                    <div className="warning-text">{noOwnedGames}</div>
                    <SentimentVeryDissatisfiedIcon className="face-icon" />
                </>
            }
            {filter === 'unowned-games' &&
                <>
                    <div className="warning-text">{noUnownedGames}</div>
                    <SentimentSatisfiedAltIcon className="face-icon" />
                </>
            }
            {filter === 'all-games' &&
                <>
                    <div className="warning-text">{noGames}</div>
                    <SentimentVeryDissatisfiedIcon className="face-icon" />
                </>
            }
        </div>
    )
}