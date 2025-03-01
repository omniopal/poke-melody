import React, { useEffect, useRef, useState } from 'react';
import './maze.css';
import clsx from 'clsx';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';

type Direction = 'up' | 'right' | 'down' | 'left';

export const directionOrder: Direction[] = ['up', 'right', 'down', 'left'];
const imagePathMap: Record<Direction, string> = {
    up: 'Maze 1 path only 2.webp', // only right
    right: 'Maze 2 path only 2.webp', // no leaves
    down: 'Maze 3 path only 2.webp', // 4 ways
    left: 'Maze 4 path only 2.webp', // leaves
  };

export const Maze: React.FC = () => {
    const [rotationDegree, setRotationDegree] = useState(0);
    const [rotationDirection, setRotationDirection] = useState<Direction>('up');
    const [imagePath, setImagePath] = useState(`/images/Mazes/${imagePathMap[rotationDirection]}`);
    const [golfCourse, setGolfCourse] = useState<string>('First Fairway');
    const [turnsToLeft, setTurnsToLeft] = useState(false);
    const [turnsToRight, setTurnsToRight] = useState(false);
    const imageRef = useRef<HTMLImageElement>(null);

    const updateImagePath = () => {
        if (turnsToRight) {
            console.log(rotationDirection);

            if (rotationDirection === 'left') {
                setImagePath(`/images/Mazes/right Maze 4 path only 2.webp`);
            }

            if (rotationDirection === 'up') {
                setImagePath(`/images/Mazes/right Maze 2 path only 2.webp`);
            }

            if (rotationDirection === 'down') {
                setImagePath(`/images/Mazes/right Maze 3 path only 2.webp`);
            }

            if (rotationDirection === 'right') {
                setImagePath(`/images/Mazes/right Maze 1 path only 2.webp`);
            }

            return;
        }

        let path = imagePathMap[rotationDirection];

        if (turnsToLeft) {
            setImagePath(`/images/Mazes/left ${path}`);
            return;
        }

        setImagePath(`/images/Mazes/${path}`);
    };

    // useEffect(() => {
    //     const imageEl = imageRef.current;
    //     imageEl?.addEventListener('transitionend', updateImagePath);

    //     return () => {
    //         imageEl?.removeEventListener('transitionend', updateImagePath);
    //     }
    // }, [rotationDirection]);

    useEffect(() => {
        const imageEl = imageRef.current;
        imageEl?.addEventListener('transitionend', updateImagePath);

        return () => {
            imageEl?.removeEventListener('transitionend', updateImagePath);
        }
    }, [rotationDirection]);

    const calculateDegreeChange = (start: Direction, end: Direction): number => {
        const startIndex = directionOrder.indexOf(start);
        const endIndex = directionOrder.indexOf(end);
        let distance = endIndex - startIndex;

        if (distance === 3) {
            distance = -1;
        } else if (distance === -3) {
            distance = 1;
        }
        return distance * 90;
    }

    const handleClick = (direction: Direction) => {
        if (direction === rotationDirection) {
            updateImagePath();
        }

        if (rotationDirection !== direction) {
            const degreeChange = calculateDegreeChange(rotationDirection, direction);
            setRotationDegree(rotationDegree + degreeChange);

            setImagePath('');
            setRotationDirection(direction);
        }
    }

    const onChangeGolfCourse = (_: any, value: string) => {
        setGolfCourse(value);
    }

    const onTurnsToLeftChange = (_: any, value: boolean | null) => {
        if (turnsToRight) {
            setTurnsToRight(false);

            if (rotationDirection === 'left') {
                handleClick('up');
            }

            if (rotationDirection === 'up') {
                handleClick('right');
            }

            if (rotationDirection === 'right') {
                handleClick('down');
            }

            if (rotationDirection === 'down') {
                handleClick('left');
            }
        }

        if (value === true) {
            setTurnsToLeft(true);
            handleClick(rotationDirection);
        }

        if (value === false) {
            setTurnsToLeft(false);
        }

        // updateImagePath();

    }

    const onTurnsToRightChange = (_: any, value: boolean | null) => {
        if (value === true) {
            setTurnsToRight(true);

            if (rotationDirection === 'up') {
                handleClick('left');
            }

            if (rotationDirection === 'right') {
                handleClick('up');
            }

            if (rotationDirection === 'down') {
                handleClick('right');
            }

            if (rotationDirection === 'left') {
                handleClick('down');
            }
        }

        if (value === false) {
            setTurnsToRight(false);

            if (rotationDirection === 'left') {
                handleClick('up');
            }

            if (rotationDirection === 'up') {
                handleClick('right');
            }

            if (rotationDirection === 'right') {
                handleClick('down');
            }

            if (rotationDirection === 'down') {
                handleClick('left');
            }
        }

        if (turnsToLeft) {
            setTurnsToLeft(false);
            // updateImagePath();
        }
    }

    useEffect(() => {
        updateImagePath()
    }, [turnsToLeft]);

    return (
        <div className="maze-container">
            <div className="settings-container">
                <div className="select-golf-course">
                    <div className="header">Select Golf Course</div>
                    <ToggleButtonGroup
                        orientation='horizontal'
                        value={golfCourse}
                        exclusive
                        onChange={onChangeGolfCourse}
                    >
                        <ToggleButton value="First Fairway">
                            <div>First Fairway</div>
                        </ToggleButton>
                        <ToggleButton value="Final Fringe">
                            <div>Final Fringe</div>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
            </div>

            <div className="header">What do you see?</div>
            <div className="buttons">
                <div className="image-group">
                    <div className="image-and-text">
                        <img className={clsx("button", (rotationDirection === 'left' && !turnsToRight || rotationDirection === 'down' && turnsToRight) && "selected")} src="/images/Mazes/Maze 4 in game.webp" onClick={() => handleClick('left')}/>
                        <p>2 paths & leaves</p>
                    </div>
                    <div className="image-and-text">
                        <img className={clsx("button", (rotationDirection === 'right' && !turnsToRight || rotationDirection === 'up' && turnsToRight) && "selected")} src="/images/Mazes/Maze 2 in game.webp" onClick={() => handleClick('right')}/>
                        <p>2 paths & no leaves</p>
                    </div>
                </div>
                <div className="image-group">
                    <div className="image-and-text">
                        <img className={clsx("button", (rotationDirection === 'down' && !turnsToRight || rotationDirection === 'right' && turnsToRight) && "selected")} src="/images/Mazes/Maze 3 in game.webp" onClick={() => handleClick('down')}/>
                        <p>4 paths</p>
                    </div>
                    <div className="image-and-text">
                        <img className={clsx("button", (rotationDirection === 'up' && !turnsToRight || rotationDirection === 'left' && turnsToRight) && "selected")} src="/images/Mazes/Maze 1 in game.webp" onClick={() => handleClick('up')}/>
                        <p>1 path</p>
                    </div>
                </div>
            </div>

            {golfCourse === 'Final Fringe' &&
                <div className="settings">
                    <div className="setting">
                        <div className="setting-text">Does this maze exit to the left?</div>
                        <ToggleButtonGroup
                            orientation='horizontal'
                            value={turnsToLeft}
                            exclusive
                            onChange={onTurnsToLeftChange}
                        >
                            <ToggleButton value={true}>
                                <div>Yes</div>
                            </ToggleButton>
                            <ToggleButton value={false}>
                                <div>No</div>
                            </ToggleButton>
                        </ToggleButtonGroup>
                        <details className="details">
                            <summary className="summary-hover">How do I tell?</summary>
                            <div className="details-text">testing one two three</div>
                        </details>
                    </div>

                    <div className="setting">
                        <div className="setting-text">Does this maze exit to the right?</div>
                        <ToggleButtonGroup
                            orientation='horizontal'
                            value={turnsToRight}
                            exclusive
                            onChange={onTurnsToRightChange}
                        >
                            <ToggleButton value={true}>
                                <div>Yes</div>
                            </ToggleButton>
                            <ToggleButton value={false}>
                                <div>No</div>
                            </ToggleButton>
                        </ToggleButtonGroup>
                        <details className="details">
                            <summary className="summary-hover">How do I tell?</summary>
                            <div className="details-text">If the previous maze exited to the left, then the next maze will always exit to the right</div>
                        </details>
                    </div>
                </div>
                }

            

            <div className="solution-container">
                <img
                    ref={imageRef}
                    className="image"
                    src="/images/Mazes/Maze template.webp"
                    style={{ transform: `rotate(${rotationDegree}deg)`, transition: 'transform 0.5s ease-in-out' }}
                />
                <img 
                    className="image"
                    src={imagePath}
                />
            </div>
        </div>
    )
}