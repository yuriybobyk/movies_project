import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import animationData from '../assets/Animation - 1695209379363.json';

const Animation = ({ onAnimationComplete }: { onAnimationComplete: () => void }) => {
    const [animationVisible, setAnimationVisible] = useState(true);

    useEffect(() => {
        if (animationVisible) {
            setAnimationVisible(true);
        } else {
            onAnimationComplete();
        }
    }, [animationVisible, onAnimationComplete]);

    const animationWidth = 200;
    const animationHeight = 200;

    return (
        <div className="flex justify-center items-center h-screen">
            <div style={{ display: animationVisible ? 'block' : 'none' }}>
                <Lottie
                    animationData={animationData}
                    height={animationHeight}
                    width={animationWidth}
                    loop={false}
                    onComplete={() => setAnimationVisible(false)}
                />
            </div>
        </div>
    );
};

export default Animation;
