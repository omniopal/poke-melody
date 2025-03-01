import React, { JSX, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

type RevealProps = {
    children: JSX.Element;
    width?: 'fit-content' | '100%';
    withSlide?: boolean;
}

export const Reveal = (props: RevealProps) => {
    const { children, width = '100%', withSlide } = props;
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const mainControls = useAnimation();
    const slideControls = useAnimation();

    useEffect(() => {
        if (isInView) {
            mainControls.start('visible');
            slideControls.start('visible');
        }
    }, [isInView])

    return (
        <div ref={ref} style={{ position: 'relative', width, overflow: 'hidden' }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, x: -125 },
                    visible: { opacity: 1, x: 0 },
                }}
                initial='hidden'
                animate={mainControls}
                transition={{ duration: 0.5, delay: 0.25 }}
            >
                {children}
            </motion.div>
            {withSlide && <motion.div
                variants={{
                    hidden: { left: 0 },
                    visible: { left: '100%' },
                }}
                initial='hidden'
                animate={slideControls}
                transition={{ duration: 0.5, ease: 'easeIn' }}
                style={{
                    position: 'absolute',
                    top: 4,
                    bottom: 4,
                    left: 0,
                    right: 0,
                    background: 'rgb(255,1,1)',
                    zIndex: 20,
                }}
            />}
        </div>
    )
}