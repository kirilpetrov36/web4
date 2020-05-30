import React from 'react';
import axios from "axios";
import { Redirect } from 'react-router-dom';
import { PUT } from '../../Reducer/put';
import './NewNote.css';
import background2 from './img_parallax.jpg';

var back = {
    width: "100%",
    height: "100%",
    backgroundImage: "url(" + background2 + ")",
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
};


class NewNote extends React.Component {

    state = {
        theme: '',
        text: '',
        mainPageRedirect: false,
        username: this.props.username,
        err: false
    }

    handleTheme = event => {
        this.setState({theme: event.target.value})
    }

    handleText = event => {
        this.setState({text: event.target.value})
    }

    
    redirectMainPage = () => {
        console.log('redirect');
        this.setState({
            mainPageRedirect: true
        })
    }

    async send_note() {
        const body = {
            text: this.state.text,
            theme: this.state.theme
        };
        console.log(body)
        var data = new FormData();
        data.append( "json", JSON.stringify( body ) );
        axios.get(`http://127.0.0.1:7000/web2app/save_note_react/${this.props.store.getState()['allInfo'][0][0]}/${this.state.theme}/${this.state.text}`)
        .then( res => {         
                this.props.store.dispatch(PUT( res['data'][1] ));
                console.log('it works');
                console.log( res['data'][1] );
                this.redirectMainPage();         
        })    
    }
   

    render() {
        if (this.state.mainPageRedirect) {
            return <Redirect to={{
                pathname: '/main_page'
                }} 
            />
        }

       
        return (
           <div style={back}>
                <form onSubmit={(e) => {
                            e.preventDefault();                           
                            this.send_note()
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
                        <textarea name="theme" placeholder="Тема" style={{height:"50px"}} onChange={this.handleTheme}></textarea>
                        <textarea name="text" placeholder="Оставьте ваш текст " className="text" onChange={this.handleText}></textarea>                  
                        <button type="submit" className="save-button">Save</button>
                    </div>
                </form>
           </div>
        )
    }
}

export default NewNote;