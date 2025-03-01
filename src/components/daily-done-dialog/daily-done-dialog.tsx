import React, { useEffect, useState } from 'react';
import { Alert, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Link, Snackbar, SnackbarCloseReason } from "@mui/material"
import './daily-done-dialog.css';
import ShareIcon from '@mui/icons-material/Share';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

type DialogDoneDialogProps = {
    isOpen: boolean;
    setIsDialogOpen: (isOpen: boolean) => void;
}

export const DailyDoneDialog = (props: DialogDoneDialogProps) => {
    const { isOpen, setIsDialogOpen } = props;
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [localGuesses, setLocalGuesses] = useState<string[]>([]);

    useEffect(() => {
        const localGuesses = localStorage.getItem('guesses');
        if (localGuesses) {
            setLocalGuesses(localGuesses.split(','));
        }
    }, [isOpen])
 
    const onShareButtonClick = async () => {
        const iteration = getPokeMelodyIteration();
        let results = `🎵 PokéMelody #${iteration} results:\n`;

        const localGuesses = localStorage.getItem('guesses');
        // if (localGuesses) {
        //     const guessesArray = localGuesses.split(',');
        //     setLocalGuesses(guessesArray);
        //     guessesArray.forEach((guess, index) => {
        //         let currentRound = `🎵 #${index + 1}: `;
        //         const numGuess = Number.parseInt(guess);
        //         for (let i = 0; i < numGuess; i++) {
        //             if (numGuess - 1 === i) {
        //                 currentRound = currentRound + '✅\n';
        //             } else {
        //                currentRound = currentRound + '❌'; 
        //             }
        //         }
                
        //         results = results + currentRound;
        //     });
        //     results = results + `Total guesses: ${getTotalGuesses(guessesArray)}`;
        // }

        if (localGuesses) {
            const guessesArray = localGuesses.split(',');
            setLocalGuesses(guessesArray);

            for (let i = 0; i < guessesArray.length; i++) {
                let numGuess = Number.parseInt(guessesArray[i]);

                const test = '▁ ▂ ▃ ▄ ▅ ▆ ▇';

                // Kanto
                if (i === 0 || i === 1) {
                    if (numGuess === 1) {
                        results = results + '▁';
                    }

                    if (numGuess === 2 || numGuess === 3) {
                        results = results + '▂';
                    }

                    if (numGuess === 4 || numGuess === 5) {
                        results = results + '▃';
                    }

                    if (numGuess === 6) {
                        results = results + '▄';
                    }

                    if (numGuess === 7 || numGuess === 8) {
                        results = results + '▅';
                    }

                    if (numGuess === 9 || numGuess === 10) {
                        results = results + '▆';
                    }

                    if (numGuess === 11) {
                        results = results + '▇';
                    }
                }

                // Johto
                if (i === 2 || i === 3) {
                    if (numGuess === 1) {
                        results = results + '▁';
                    }

                    if (numGuess === 2 || numGuess === 3) {
                        results = results + '▂';
                    }

                    if (numGuess === 4 || numGuess === 5) {
                        results = results + '▃';
                    }

                    if (numGuess === 6 || numGuess === 7) {
                        results = results + '▄';
                    }

                    if (numGuess === 8) {
                        results = results + '▅';
                    }

                    if (numGuess === 9 || numGuess === 10) {
                        results = results + '▆';
                    }

                    if (numGuess === 10) {
                        results = results + '▇';
                    }
                }

                // Hoenn
                if (i === 4 || i === 5) {
                    if (numGuess === 1) {
                        results = results + '▁';
                    }

                    if (numGuess >= 2 && numGuess <= 4) {
                        results = results + '▂';
                    }

                    if (numGuess >= 5 && numGuess <= 7) {
                        results = results + '▃';
                    }

                    if (numGuess >= 8 && numGuess <= 10) {
                        results = results + '▄';
                    }

                    if (numGuess >= 11 && numGuess <= 13) {
                        results = results + '▅';
                    }

                    if (numGuess === 14 || numGuess === 15) {
                        results = results + '▆';
                    }

                    if (numGuess === 16 || numGuess === 17) {
                        results = results + '▇';
                    }
                }

                // Sinnoh
                if (i === 6 || i === 7) {
                    if (numGuess === 1) {
                        results = results + '▁';
                    }

                    if (numGuess >= 2 && numGuess <= 4) {
                        results = results + '▂';
                    }

                    if (numGuess >= 5 && numGuess <= 7) {
                        results = results + '▃';
                    }

                    if (numGuess >= 8 && numGuess <= 10) {
                        results = results + '▄';
                    }

                    if (numGuess >= 11 && numGuess <= 13) {
                        results = results + '▅';
                    }

                    if (numGuess === 14 || numGuess === 15) {
                        results = results + '▆';
                    }

                    if (numGuess >= 16 && numGuess <= 18) {
                        results = results + '▇';
                    }
                }

                if (i === 7) {
                    results = results + '\n';
                } else {
                    results = results + ' ';
                }
            }

            results = results + `🏁 Total guesses: ${getTotalGuesses(guessesArray)}`;
        }

        try {
            await navigator.clipboard.writeText(results);
            setIsSnackbarOpen(true);
        } catch (err) {
            console.error('Failed to copy results to clipboard:', err);
        }
    }

    const handleSnackbarClose = (
        event: React.SyntheticEvent | Event,
        reason?: SnackbarCloseReason,
      ) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setIsSnackbarOpen(false);
    };

    const getTotalGuesses = (guesses: string[]) => {
        let total = 0;
        guesses.forEach((guess) => {
            total += Number.parseInt(guess);
        })
        return total;
    }

    function getPokeMelodyIteration() {
            const start = new Date('2025-02-18').getTime();
            const correctStart = new Date().toLocaleDateString('en-CA', {
                timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            });
            const today = new Date(correctStart).getTime()
            const timeDiff = Math.abs(start - today);
            return Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;
          }

    return (
        <Dialog
            className="dialog"
            open={isOpen}
            PaperProps={{ sx: { backgroundColor: 'hsl(198, 50%, 10%)', border: '1px solid hsl(258, 80%, 80%);', borderRadius: '24px' } }}
        >
            <Snackbar
                open={isSnackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity="success"
                    variant="filled"
                >
                    Results copied to clipboard
                </Alert>
            </Snackbar>
            <DialogTitle className="dialog-title" sx={{ paddingBlockEnd: 0 }}>
                <p>Thanks for playing today!</p>
            </DialogTitle>
            <DialogContent className="dialog-content">
                <h3 className="your-results">Your PokéMelody #{getPokeMelodyIteration()} results:</h3>
                <table className="table">
                    <tbody>
                        {localGuesses.map((guess, index) => (
                            <tr className="tr" key={index}>
                                <td className="td">
                                    <MusicNoteIcon sx={{ dispaly: 'flex', color: 'hsl(258, 80%, 80%)' }}/>
                                    <div>#{index + 1}:</div>
                                </td>
                                <td>{guess} {Number.parseInt(guess) === 1 ? 'guess' : 'guesses'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="total-guesses">Total guesses: <span className="your-results">{getTotalGuesses(localGuesses)}</span></div>
                <button className="share-button" onClick={onShareButtonClick}>
                    Copy <ShareIcon fontSize='small'/>
                </button>
                <Link sx={{ textDecoration: 'none', color: 'hsl(198, 50%, 10%)', fontWeight: 600, padding: 0 }} className="link" href="/freeplay" onClick={() => setIsDialogOpen(false)}>
                    Go to Free Play
                </Link>
            </DialogContent>
            {/* <DialogActions>
                <Link sx={{ textDecoration: 'none', color: 'hsl(198, 50%, 10%)', fontWeight: 600, padding: 0 }} className="link" href="/freeplay" onClick={() => setIsDialogOpen(false)}>
                    Go to Free Play
                </Link>
            </DialogActions> */}
        </Dialog>
    )
}