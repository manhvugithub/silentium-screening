import AppConstants from "./utils/constants.js";

export const checkNextStateValid = (currentState, nextState) => {
    const allStateDict = AppConstants.ALL_STATE_DICT;
    const allState = Object.keys(allStateDict);
    if (!currentState || !nextState || !allState.includes(nextState) || !allState.includes(currentState)) {
        throw new Error('Params is invalid !!!')
    }
    if (allStateDict[currentState].includes(nextState)) return true;
    return false;
};
