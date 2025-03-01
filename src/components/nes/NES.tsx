import { useState } from "react";
import './NES.css';
import clsx from "clsx";
// import Typewriter from 'typewriter-effect';

type NESProps = {};

export const NES: React.FC<NESProps> = () => {

    const [poweredOn, setPoweredOn] = useState(false);
        const [resetButtonClicked, setResetButtonClicked] = useState(false);
        const [resetButtonKey, setResetButtonKey] = useState(0);
    
        const handlePowerButtonMouseDown = () => {
            setPoweredOn(!poweredOn);
        }
    
        const handleResetButtonDown = () => {
            setResetButtonKey(resetButtonKey + 1);
            setResetButtonClicked(true);
        }
    
        const handleResetButtonUp = () => {
            setResetButtonClicked(false);
        }

    return (
        <>
            <div className="nes-top">
                <div className="nes-top-left">
                    <div className="cart-slot-outline">
                        <div className="cart-slot-text name">
                            I am Jacob Mauro
                        </div>
                        <div className="cart-slot-text title">
                            {/* <Typewriter
                                key={resetButtonKey}
                                options={{
                                    wrapperClassName: 'typewriter',
                                    cursorClassName: 'typewriter-cursor',
                                    strings: ['Software Engineer', 'UI/UX Enthusiast', 'Video Game Collector', 'Husband'],
                                    autoStart: true,
                                    loop: true,
                                    cursor: '_',
                                }}
                            /> */}
                        </div>
                    </div>
                </div>
                <div className="nes-top-middle"></div>
                <div className="nes-top-right"></div>
            </div>
            <div className="nes-middle" />
            <div className="nes-bottom">
                <div className="nes-bottom-left">
                    <div className="buttons">
                        <div className={clsx("power-light", poweredOn ? "powered-on" : "powered-off")} />
                        <div 
                            className={clsx("power-button", "nes-buttons", poweredOn && "nes-buttons-pushed")}
                            onMouseDown={handlePowerButtonMouseDown}
                        >
                            <div className="nes-buttons-text">Power</div>
                        </div>
                        <div 
                            className={clsx("reset-button", "nes-buttons", resetButtonClicked && "nes-buttons-pushed")}
                            onMouseDown={handleResetButtonDown}
                            onTouchStart={handleResetButtonDown}
                            onMouseUp={handleResetButtonUp}
                            onTouchEnd={handleResetButtonUp}
                        >
                            <div className="nes-buttons-text">Reset</div>
                        </div>
                    </div>
                </div>
                <div className="nes-bottom-middle">
                    <div className="controller-ports">
                        <div className="controller-port-container">
                            <div className="controller-port">
                                <div className="connector-row">
                                    <div className="controller-port-connector">
                                        <div className="pin" />
                                    </div>
                                    <div className="controller-port-connector hidden-connector" />
                                </div>
                                <div className="connector-row">
                                    <div className="controller-port-connector">
                                        <div className="pin" />
                                    </div>
                                    <div className="controller-port-connector">
                                        <div className="pin" />
                                    </div>
                                </div>
                                <div className="connector-row">
                                    <div className="controller-port-connector">
                                        <div className="pin" />
                                    </div>
                                    <div className="controller-port-connector">
                                        <div className="pin" />
                                    </div>
                                </div>
                                <div className="connector-row">
                                    <div className="controller-port-connector">
                                        <div className="pin" />
                                    </div>
                                    <div className="controller-port-connector">
                                        <div className="pin" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="controller-port-container second-controller-port">
                            <div className="controller-port">
                                <div className="connector-row">
                                    <div className="controller-port-connector">
                                        <div className="pin" />
                                    </div>
                                    <div className="controller-port-connector hidden-connector" />
                                </div>
                                <div className="connector-row">
                                    <div className="controller-port-connector">
                                        <div className="pin" />
                                    </div>
                                    <div className="controller-port-connector">
                                        <div className="pin" />
                                    </div>
                                </div>
                                <div className="connector-row">
                                    <div className="controller-port-connector">
                                        <div className="pin" />
                                    </div>
                                    <div className="controller-port-connector">
                                        <div className="pin" />
                                    </div>
                                </div>
                                <div className="connector-row">
                                    <div className="controller-port-connector">
                                        <div className="pin" />
                                    </div>
                                    <div className="controller-port-connector">
                                        <div className="pin" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="nes-bottom-right"></div>
            </div>
        </>
    );
}