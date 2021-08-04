import React, { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import './styles/game-component.css';
import 'react-toastify/dist/ReactToastify.css';
import AppConstants from './utils/constants';
import { API_EP } from './EndpointAPI';

export const GameComponent = () => {

    const [currentState, setCurrentState] = useState(AppConstants.GAME_STATE.BLUE);
    const [nextState, setNextState] = useState(AppConstants.GAME_STATE.BLUE);
    const prevState = useRef('');

    const checkNextState = async () => {
        try {
            await API_EP.get(AppConstants.API_CHECK_STATE, { params: { currentState, nextState } });
            setCurrentState(nextState);
            setNextState(nextState);
            prevState.current = currentState;
        } catch (err) {
            toast.error(`Not allowed from ${currentState} to ${nextState} !`);
            setNextState(currentState);
            setCurrentState(currentState);
        }
    };

    const onPlayButtonClick = (nextState) => {
        if (nextState === AppConstants.GAME_STATE.RESET) {
            setCurrentState(AppConstants.GAME_STATE.BLUE);
            setNextState(AppConstants.GAME_STATE.BLUE);
        } else if (nextState === currentState) {
            return ;
        } else if (prevState.current === AppConstants.GAME_STATE.YELLOW
            && nextState === AppConstants.GAME_STATE.YELLOW) {
            toast.error(`Not allowed to choose ${AppConstants.GAME_STATE.YELLOW} consecutively !`);
        } else {
            setNextState(nextState);
        }
    };

    const isSelectedState = (focusState) => {
        if (focusState === currentState) {
            return 'play-button--selected';
        }
        return '';
    }

    useEffect(() => {
        if (nextState !== currentState) {
            checkNextState();
        }
    }, [nextState]);

    return (
        <div className='main-game'>
            <div className='main-game__play'>
                <div className='main-game__play__blue play-button'>
                    <button
                        className={`play-button play-button-blue ${isSelectedState(AppConstants.GAME_STATE.BLUE)}`}
                        onClick={() => onPlayButtonClick(AppConstants.GAME_STATE.BLUE)}
                    >
                        {AppConstants.GAME_STATE.BLUE}
                    </button>
                </div>
                <div className='main-game__play__other'>
                    <button
                        className={`play-button play-button-other ${isSelectedState(AppConstants.GAME_STATE.GREEN)}`}
                        onClick={() => onPlayButtonClick(AppConstants.GAME_STATE.GREEN)}
                    >
                        {AppConstants.GAME_STATE.GREEN}
                    </button>
                    <button
                        className={`play-button play-button-other ${isSelectedState(AppConstants.GAME_STATE.YELLOW)}`}
                        onClick={() => onPlayButtonClick(AppConstants.GAME_STATE.YELLOW)}
                    >
                        {AppConstants.GAME_STATE.YELLOW}
                    </button>
                </div>
            </div>
            <button
                className='main-game__reset-button'
                onClick={() => onPlayButtonClick(AppConstants.GAME_STATE.RESET)}
            >
                {AppConstants.GAME_STATE.RESET}
            </button>
            <ToastContainer
                position="bottom-center"
                autoClose={1000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover />
        </div>
    )
};

export default GameComponent;