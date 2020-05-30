import React from 'react';
import './MainPage.css';
import './buttons.css'
import './NotesList.css';
import './Note.css';
import { Redirect } from 'react-router-dom';

function MainPage() {
    return (     
             <Redirect to={{
                    pathname: '/notes_list'
                    }} 
                />
    )
}

export default MainPage;