import React from 'react';
import { useAppSelector } from '../hooks';
import { Dialog, DialogContent, Typography, Button } from '@mui/material';
import { posterURL } from '../constants';
import { ITrailer } from '../interfaces';
import ReactPlayer from 'react-player';

interface MovieModalProps {
    onClose: () => void;
    trailer: ITrailer;
}

const MovieModal: React.FC<MovieModalProps> = ({ onClose, trailer }) => {
    const modalMovie = useAppSelector((state) => state.movieReducer.modalMovie);

    if (!modalMovie) {
        return null;
    }

    const trailerType = trailer.results.find(
        (video) => video.type === 'Trailer'
    );

    return (
        <Dialog open={true} onClose={onClose}>
            <DialogContent>
                <div>
                    <Typography variant="h5" gutterBottom>
                        {modalMovie.title}
                    </Typography>
                    <img src={`${posterURL}${modalMovie.poster_path}`} alt={modalMovie.title} />
                    <Typography variant="body1" paragraph>
                        {modalMovie.overview}
                    </Typography>
                    <Typography variant="body2">
                        Release Date: {modalMovie.release_date}
                    </Typography>
                    {trailerType && (
                        <ReactPlayer
                            url={`https://www.youtube.com/watch?v=${trailerType.key}`}
                            width="100%"
                            height="550px"
                            autoPlay={false}
                        />
                    )}
                    <Button onClick={onClose}>Close</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export { MovieModal };
