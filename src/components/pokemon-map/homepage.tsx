import { useMediaQuery, useTheme } from '@mui/material';
import Link from 'next/link';
import './homepage.css';

export const Homepage = () => {
    const theme = useTheme();
    const isSmallBreakpoint = useMediaQuery(theme.breakpoints.down(700));
    
    return (
        <>
            <div className="homepage">
                <img className="logo" src="/images/logo3.png" alt="" />
                <h1>Poké{isSmallBreakpoint && <br />}Melody</h1>
                <div className="options">
                    <Link className="link" href="/freeplay">Free Play</Link>
                    <Link className="link" href="/daily">Daily</Link>
                </div>
            </div>
            <footer>
                <a className="created-by" href="https://x.com/JacobMauro4">Created by OmniOpal</a>
                <p className="disclaimer">PokéMelody is an independent project and is not affiliated with or endorsed by Nintendo and does not own or claim any rights to Nintendo's trademarks or intellectual property.</p>
            </footer>
        </>
    );
};