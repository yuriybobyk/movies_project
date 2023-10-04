import React from 'react';
import { useAppSelector } from '../hooks';
import { Dialog, DialogContent, Typography, Button } from '@mui/material';
import { posterURL } from "../constants";
import { ITrailer } from "../interfaces";
import YouTube from "react-youtube";

interface MovieModalProps {
    onClose: () => void;
    trailer: ITrailer;
}

const MovieModal: React.FC<MovieModalProps> = ({ onClose, trailer }) => {
    const modalMovie = useAppSelector((state) => state.movieReducer.modalMovie);

    if (!modalMovie) {
        // Handle the case when modalMovie is null
        return null; // or any other desired behavior
    }

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogContent>
                <div>
                    <Typography variant="h5" gutterBottom>
                        {modalMovie.title}
                    </Typography>
                    <img
                        src={`${posterURL}${modalMovie.poster_path}`}
                        alt={modalMovie.title}
                    />
                    <Typography variant="body1" paragraph>
                        {modalMovie.overview}
                    </Typography>
                    <Typography variant="body2">
                        Release Date: {modalMovie.release_date}
                    </Typography>
                    <div>
                        {trailer?.results[0] && (
                            <YouTube
                                videoId={trailer.results[0].key}
                                opts={{ width: 1150, height: 550 }}
                            />
                        )}
                    </div>
                    <Button onClick={onClose}>Close</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export { MovieModal };
