import Link from 'next/link';
import './navbar.css';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ModeIcon from '@mui/icons-material/Mode';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

type NavBarProps = {};

export const NavBar: React.FC<NavBarProps> = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const theme = useTheme();
    const isSmallBreakpoint = useMediaQuery(theme.breakpoints.down(900));

    const toggleDrawer = (newOpen: boolean) => {
        setIsDrawerOpen(newOpen);
    }

    return (
        <div className="navbar">
            <div className="home">
                <img className="me-pic" src="/images/finalMePic.webp" alt="pic" />
                <Link style={{ textDecoration: 'none' }} href="/homepage">Jacob Mauro</Link>
            </div>
            {isSmallBreakpoint ? (
                <div>
                    <div className="menu-icon" onClick={() => toggleDrawer(true)}>
                        <MenuIcon />
                    </div>
                    <Drawer open={isDrawerOpen} onClose={() => toggleDrawer(false)}>
                        <Box sx={{ width: 250, color: 'white', backgroundColor: 'rgb(2, 6, 23)', height: '100%' }} role="presentation" onClick={() => toggleDrawer(false)}>
                            <List>
                                <ListItem disablePadding>
                                    <Link style={{ textDecoration: 'none' }} href="/homepage">
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <HomeIcon sx={{ color: 'white' }} />
                                            </ListItemIcon>
                                            <ListItemText primary='Home' />
                                        </ListItemButton>
                                    </Link>
                                </ListItem>
                                <ListItem disablePadding>
                                    <Link style={{ textDecoration: 'none' }} href="/">
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <SportsEsportsIcon sx={{ color: 'white' }} />
                                            </ListItemIcon>
                                            <ListItemText primary='Video Game Collection' />
                                        </ListItemButton>
                                    </Link>
                                </ListItem>
                                <ListItem disablePadding>
                                    <Link style={{ textDecoration: 'none' }} href="/draftlocke">
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <ModeIcon sx={{ color: 'white' }} />
                                            </ListItemIcon>
                                            <ListItemText primary='Draftlocke' />
                                        </ListItemButton>
                                    </Link>
                                </ListItem>
                                <ListItem disablePadding>
                                    <Link style={{ textDecoration: 'none' }} href="/mazes">
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <SearchIcon sx={{ color: 'white' }} />
                                            </ListItemIcon>
                                            <ListItemText primary='Toontown Mazes Guide' />
                                        </ListItemButton>
                                    </Link>
                                </ListItem>
                            </List>
                        </Box>
                    </Drawer>
                </div>
            ) : (
                <nav>
                    <ul className="navbar-list">
                        <li className="navbar-list-item">
                            <Link style={{ textDecoration: 'none' }} href="/">Video Game Collection</Link>
                        </li>
                        <li className="navbar-list-item">
                            <Link style={{ textDecoration: 'none' }} href="/draftlocke">Draftlocke</Link>
                        </li>
                        <li className="navbar-list-item">
                            <Link style={{ textDecoration: 'none' }} href="/homepage">Toontown Mazes Guide</Link>
                        </li>
                    </ul>
                </nav>
            )}
        </div>
    )
}