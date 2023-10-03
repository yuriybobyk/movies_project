import React from 'react';
import { useAppSelector } from '../hooks';
import { Dialog, DialogContent, Typography, Button } from '@mui/material';
import {posterURL} from "../constants";

interface MovieModalProps {
    onClose: () => void;
}

const MovieModal: React.FC<MovieModalProps> = ({ onClose }) => {
    const modalMovie = useAppSelector((state) => state.movieReducer.modalMovie);

    return (
        <Dialog open={!!modalMovie} onClose={onClose}>
            <DialogContent>
                {modalMovie && (
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
                        <Button onClick={onClose}>Close</Button>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export {MovieModal}
