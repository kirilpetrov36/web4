import { combineReducers } from 'redux';
import  putReducer from './put';
import  openedNoteReducer from './opened_note';

let reducers = combineReducers({
    allInfo: putReducer,
    openedNote: openedNoteReducer
})

export default reducers;