import React from 'react';
import {useSelector} from 'react-redux';
import { Redirect } from 'react-router-dom';


function NewNoteMain() {
    let username = useSelector(state => state.allInfo[0][0]);
   
        return (
                <Redirect to={{
                    pathname: '/new_note',
                    state: {1: username}
                    }} 
                />
        )
}

export default NewNoteMain;