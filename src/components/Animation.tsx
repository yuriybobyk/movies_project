import React, { useState, useEffect, useRef } from 'react';
import Lottie from 'lottie-react';
import animationData from '../assets/Animation - 1695209379363.json';
import soundFile from '../assets/soindFile.mp3';

const Animation = ({ onAnimationComplete }: { onAnimationComplete: () => void }) => {
    const [animationVisible, setAnimationVisible] = useState(true);
    const [audioStarted, setAudioStarted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handleAnimationStart = () => {
        setAudioStarted(true);

        if (audioRef.current) {
            audioRef.current.play().catch(error => {
                console.error('Audio play error:', error);
            });
        }
    };

    const handleAnimationComplete = () => {
        onAnimationComplete();
    };

    useEffect(() => {
        if (animationVisible) {
            setAnimationVisible(true);
            handleAnimationStart();
        } else {
            handleAnimationComplete();
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
                    onComplete={() => {
                        setAnimationVisible(false);
                    }}
                />
            </div>
            <audio ref={audioRef}>
                <source src={soundFile} type="audio/mpeg" />
            </audio>
        </div>
    );
};

export default Animation;
