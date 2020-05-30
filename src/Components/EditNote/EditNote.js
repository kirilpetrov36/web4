import React from 'react';
import axios from "axios";
import { Redirect } from 'react-router-dom';
import { PUT } from '../../Reducer/put';
import './NewNote.css';
import background2 from './img_parallax.jpg';
import {faTrashAlt} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

var back = {
    width: "100%",
    height: "100%",
    backgroundImage: "url(" + background2 + ")",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
};


class EditNote extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            theme: '',
            text: '',
            mainPageRedirect: false,
            err: false,
            username: this.props.store.getState()['allInfo'][0][0],
            theme_old: this.props.store.getState()['openedNote'][0]
        };

        this.handleTheme = this.handleTheme.bind(this);
        this.handleText = this.handleText.bind(this);
        }

    handleTheme = event => {
        console.log('theme');
        console.log(event.target.value);
        this.setState({theme: event.target.value})
    }

    handleText = event => {
        this.setState({text: event.target.value})
    }
   
    redirectMainPage = () => {
        this.setState({
            mainPageRedirect: true
        })
    }

    delete = () => {
        axios.get(`http://127.0.0.1:8000/web2app/delete_note_react/${this.state.username}/${this.state.theme_old}`)
        .then( res => {         
            this.props.store.dispatch(PUT( res['data'][1] ));
            this.redirectMainPage();
        })   
    }

    async edit_note() {
        var theme_new = this.state.theme;
        var text = '';
        if (this.state.text === ''){
            text = this.props.store.getState()['openedNote'][1];
        } else {
            text = this.state.text;
        }
        console.log(theme_new);

        if (theme_new === ''){
            theme_new = this.state.theme_old;
        }
      

        axios.get(`http://127.0.0.1:8000/web2app/edit_note_react/${this.state.username}/${this.state.theme_old}/${theme_new}/${text}`)
        .then( res => {         
                this.props.store.dispatch(PUT( res['data'][1] ));     
        })    
    }
   

    render() {
        if (this.state.mainPageRedirect) {
            return <Redirect to={{
                pathname: '/main_page'
                }} 
            />
        }

        const theme = this.props.store.getState()['openedNote'][0];
        const text = this.props.store.getState()['openedNote'][1];
       
        return (
           <div style={back}>
                <form onSubmit={(e) => {
                            e.preventDefault();                           
                            this.edit_note()
                                .then(() => {
                                    if (this.state.err === false) {
                                        console.log("успіх");
                                        
                                    }
                                    else {
                                        alert('Неправильні данні для входу');
                                    }
                                })
                                .catch(() => {
                                    console.log(11)
                                })

                        }}>
                    <div className="bg-text">
                        <p style={{fontSize:"50px"}}> Theme </p>               
                        <textarea name="theme" placeholder="Тема" style={{height:"50px"}} onChange={this.handleTheme}>{theme}</textarea>
                        <textarea name="text" placeholder="Оставьте ваш текст " className="text" onChange={this.handleText}>{text}</textarea>
                        <div className="buttons-cont">
                            <button onClick={this.redirectMainPage} className="button_back">Back</button>               
                            <button type="submit" className="save-button">Save</button>
                            <button onClick={this.delete} className="Delete"><FontAwesomeIcon icon={faTrashAlt} size="2x"/></button>
                        </div>
                    </div>
                </form>
           </div>
        )
    }
}

export default EditNote;