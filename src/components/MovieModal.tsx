import React, { useState } from 'react';
import {useAppSelector} from '../hooks';
import {ITrailer} from '../interfaces';
import MuiModal from '@mui/material/Modal'
import ReactPlayer from 'react-player';
import {PlusIcon, ThumbUpIcon, VolumeOffIcon, VolumeUpIcon, XIcon} from "@heroicons/react/solid";
import { FaPause, FaPlay } from 'react-icons/fa';

interface MovieModalProps {
    onClose: () => void;
    trailer: ITrailer;
}

const MovieModal: React.FC<MovieModalProps> = ({onClose, trailer}) => {
    const modalMovie = useAppSelector((state) => state.movieReducer.modalMovie);
    const [muted, setMuted] = useState(false);
    const [play, setPlay] = useState(false);

    if (!modalMovie) {
        return null;
    }


    const trailerType = trailer && trailer.results.find(
        (video) => video.type === 'Trailer'
    );

    
    const voteAverage = modalMovie!.vote_average*10;
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
                            playing={play}
                            muted={muted}
                        />
                    )}
                    <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
                        <div className="flex space-x-2">
                            <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]" onClick={()=>setPlay(!play)}>
                                {play? (
                                   <FaPause className="h-7 w-7 text-black"/> 
                                ):(
                                    <FaPlay className="h-7 w-7 text-black"/>
                                )}
                            </button>
                            <button className="modalButton">
                                <PlusIcon className="h-7 w-7"/>
                            </button>
                            <button className="modalButton">
                                <ThumbUpIcon className="h-7 w-7"/>
                            </button>
                        </div>
                        <button className="modalButton" onClick={()=> setMuted(!muted)}>
                                {muted? (
                                    <VolumeOffIcon className="h-6 w-6"/>
                                ): (
                                    <VolumeUpIcon className="h-6 w-6"/>
                                )}
                            </button>
                    </div>
                </div>
                <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
                    <div className="space-y-6 text-lg">
                        <div className="flex items-center space-x-2 text-sm">
                            <p className="font-semibold text-green-400">{Math.floor(voteAverage)}% Match</p>
                            <p className="font-light">{modalMovie?.release_date || modalMovie.first_air_date}</p>
                            <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">HD</div>
                        </div>
                        <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
                            <p className="w-5/6">{modalMovie?.overview}</p>
                            <div className="flex flex-col space-y-3 text-sm">
                            <div>
                                <span className="text-[gray]">Genres: </span>
                                {modalMovie.genres.map((genre)=>genre.name).join(', ')}
                            </div>
                            <div>
                                <span className="text-[gray]">Original language: </span>
                                {modalMovie?.original_language}
                            </div>
                            <div>
                                <span className="text-[gray]">Total votes: </span>
                                {modalMovie?.vote_count}
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </MuiModal>
    );
};

export {MovieModal};
