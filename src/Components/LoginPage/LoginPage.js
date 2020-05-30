import React from 'react';
import './LoginPage.css';
import axios from "axios";
import { Link, Redirect } from 'react-router-dom';
import { PUT } from '../../Reducer/put';


class LoginPage extends React.Component {

    state = {
        login: ' ',
        password: ' ',
        err: false,
        redrirect: false,
        all: {},
        errLogin: false
    }

    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: '/main_page',
                state: this.state.all 
                }} 
            />
        }
    }

    handleLogin = event => {
        this.setState({login: event.target.value})
    }

    handlePassword = event => {
        this.setState({password: event.target.value})
    }

    async login() {
        const body = {
            username: this.state.login,
            password: this.state.password
        };
        var data = new FormData();
        data.append( "json", JSON.stringify( body ) );
        axios.get(`http://127.0.0.1:7000/web2app/check_react_login/${this.state.login}/${this.state.password}`)
        .then( res => {
            console.log(res['data'][0]);
                if (res['data'][0] === 'ivalid'){
                    this.setState({errLogin: true});
                    console.log('worked');
                } else {         
                this.props.store.dispatch(PUT( res['data'][1] ));
                console.log('it works');
                console.log( res['data'][1] );
                this.setRedirect();
            }

          
        })    
    }


    render() {
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: '/main_page'
                }} 
            />
        }
        return (
            <div>
                <img src={require('./images/img_parallax.jpg')} alt="pics" className="bg-image" />
                <div className="bg-text">
                    <p style={{fontSize: "50px"}}> Member login </p>                  
                        <form onSubmit={(e) => {
                            e.preventDefault();                           
                            this.login()
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

                        }} style={{width: '60%'}}>
                            <div style={{marginBottom: '5px', width: '100%'}}>
                                <input  type="text" 
                                        placeholder="Login" 
                                        name="username"
                                        required 
                                        onChange={this.handleLogin} />    
                            </div> 
                            <div>
                                <input  type="password" 
                                        placeholder="Password"
                                        name="password" 
                                        required 
                                        onChange={this.handlePassword} />    
                            </div>
                            { this.state.errLogin && <div className="login-error">Invalid login or password</div>}
                            <div style={{display: 'flex', flexDirection: 'column'}}>
                                <input className="login_button" type="submit" value="Login"></input>
                                <Link to="/register_page" className="acc"> Create your account </Link>
                            </div>
                        </form>
                    
                    
                </div>
               
            </div>

        )
    }
}

export default LoginPage;