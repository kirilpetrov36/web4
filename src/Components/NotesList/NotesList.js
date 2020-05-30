import React from 'react';
import './NotesList.css';
import './Note.css';

import './MainPage.css';
import './buttons.css'
import { Redirect } from 'react-router-dom';
import { OPEN } from '../../Reducer/opened_note';


class NotesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user_notes: this.props.store.getState()['allInfo'][1],
            user: this.props.store.getState()['allInfo'][0],
            redirectNewNote: false,
            redirectUsers: false,
            redirectLogOut: false
        }
    }

    redirectNewNote = () => {
        this.setState({
            redirectNewNote: true
        })
    }

    redirectUsers = () => {
        console.log("users");
        this.setState({
            redirectUsers: true
        });
    }

    redirectLogOut = () => {
        this.setState({
            redirectLogOut: true
        })
    }

    redirectOpenNote = (theme, text) => {
        this.props.store.dispatch(OPEN([theme, text]))
        this.setState({
            redirectOpenNote: true
        })
    }

  
    render() {
        if (this.state.redirectNewNote) {
            return <Redirect to={{
                pathname: '/new_note_main'
                }} 
            />
        } else if (this.state.redirectUsers) {
            return <Redirect to={{
                pathname: '/users'
                }} 
            />
        } else if (this.state.redirectLogOut) {
            return <Redirect to={{
                pathname: '/'
                }} 
            />
        } else if (this.state.redirectOpenNote) {
            return <Redirect to={{
                pathname: '/edit_note'
                }} 
            />
        }
        return (
            <div>           
            <div className="container">
            
                <div className="upper-container">
                    <p id="MyNOTES"> MyNOTES </p>
                </div>
                <div className="down-container">
                    <div className="button butt5" style={{color: 'white'}}> {this.state.user[0]} </div>
                    <form onSubmit={(e) => {
                            e.preventDefault();                           
                            this.redirectNewNote() }}> 
                        <button className="sort-button" style={{width: '160px'}} type="submit"> New note </button>
                    </form>
                    { this.state.user[3] &&
                        <form onSubmit={(e) => {
                            e.preventDefault();                           
                            this.redirectUsers() }}> 
                            <button className="sort-button" style={{width: '160px'}}> Users </button>
                        </form>
                    }
                    <form onSubmit={(e) => {
                            e.preventDefault();                           
                            this.redirectLogOut() }}> 
                        <button className="sort-button" style={{width: '160px'}}> Log out </button>
                    </form>
                </div>
                        
                <div className="main">
                    {this.state.user_notes.map((num, key) => {
                        return (<form onSubmit={(e) => {
                            e.preventDefault();                           
                            this.redirectOpenNote(num[0], num[1]) }} className="button-note">
                        <button className="item" type="submit">
                            <h1 style={{alignSelf: 'center'}}>{num[0]}</h1>
                            <h2 style={{alignSelf: 'center'}}>{num[1]}</h2>						
                        </button>
                    </form> )
                    })}
                </div>

            </div>
            
        </div>
        )
    }
}

export default NotesList;