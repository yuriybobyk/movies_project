import React from 'react';
import {useAppSelector} from '../hooks';
import {Dialog, DialogContent, Typography, Button} from '@mui/material';
import {ITrailer} from '../interfaces';
import MuiModal from '@mui/material/Modal'
import ReactPlayer from 'react-player';
import {XIcon} from "@heroicons/react/solid";

interface MovieModalProps {
    onClose: () => void;
    trailer: ITrailer;
}

const MovieModal: React.FC<MovieModalProps> = ({onClose, trailer}) => {
    const modalMovie = useAppSelector((state) => state.movieReducer.modalMovie);

    if (!modalMovie) {
        return null;
    }

    const trailerType = trailer && trailer.results.find(
        (video) => video.type === 'Trailer'
    );

    return (
        <MuiModal open={true} onClose={onClose}
                  className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide">
            <>
                <button
                    onClick={onClose}
                    className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
                >
                    <XIcon className="h-6 w-6"/>
                </button>
                <div className="relative pt-[56.25%]">
                    {trailerType && (
                        <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${trailerType.key}`}
                            width="100%"
                            height="100%"
                            style={{position: 'absolute', top: '0', left: '0'}}
                            autoPlay={false}
                        />
                    )}
                </div>
            </>
        </MuiModal>
    );
};

export {MovieModal};
