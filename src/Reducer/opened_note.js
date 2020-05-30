export const OPEN = (theme) => ({ type: 'OPEN', theme})

const openedNoteReducer = (state = ' ', action) => {
    console.log(action.all);
    switch (action.type) {
        case 'OPEN':
            return action.theme
        default:
            return state;
    }
}

export default openedNoteReducer;
