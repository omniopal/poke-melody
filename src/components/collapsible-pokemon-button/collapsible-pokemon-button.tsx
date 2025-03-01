import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse } from '@mui/material';
import React, { useState, PropsWithChildren } from 'react';
import './collapsible-pokemon-button.css';

export type CollapsiblePokemonButtonProps = PropsWithChildren & {
    generationName: string;
};

export const CollapsiblePokemonButton: React.FC<CollapsiblePokemonButtonProps> = (props) => {
    const {
        generationName,
        children
    } = props;

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleCollapse = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button className="generation-button" onClick={toggleCollapse}>
                <h2>{generationName}</h2>
                <div>
                    {isOpen ? <ExpandLess /> : <ExpandMore />}
                </div>
            </button>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <div className="pokemon-list">
                    {children}
                </div>
            </Collapse>
        </>
    )
}