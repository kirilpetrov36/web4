import React from 'react';
import axios from "axios";
import { Redirect } from 'react-router-dom';
import { PUT } from '../../Reducer/put';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import './RegPage.css';

const options0 = [
    { value: 'Admin', label: 'Admin' },
    { value: 'Regular', label: 'Regular' }
];

class RegPage extends React.Component {

    state = {
       login: '',
       password: '',
       confirm: '',
       selectedOption: '',
       boolConfirm: false,
       redirectMainPage: false
    }

    handleLogin = event => {
        this.setState({login: event.target.value})
    }

    handlePassword = event => {
        this.setState({password: event.target.value})
    }

    handleConfirm = event => {
        this.setState({confirm: event.target.value})
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption: selectedOption });
    };

    redirectMainPage = () => {
        this.setState({
            redirectMainPage: true
        })
    }

    async register() {
        var admin = '';
        if(this.state.password !== this.state.confirm)
            this.setState({boolConfirm: true});
        else{
            console.log(this.state.selectedOption);
            if (this.state.selectedOption.value === 'Admin'){
                console.log('lolka');
                admin = 1;
            } else {
                admin = 0
            }
            axios.get(`http://127.0.0.1:8000/web2app/register_react/${this.state.login}/${this.state.password}/${admin}`)
            .then( res => {         
                    this.props.store.dispatch(PUT( res['data'][1] ));
                    this.redirectMainPage();           
            })   
        } 
    }
    
    render() {
        if (this.state.redirectMainPage) {
            return <Redirect to={{
                pathname: '/main_page'
                }} 
            />
        }
        const { animatedComponents } = makeAnimated();
        const { selectedOption } = this.state;
        return (
            <div>
                <img src={require('./images/img_parallax.jpg')} alt="pics" className="bg-image" />
                <div className="bg-text">
                <div style={{fontSize: "50px", marginBottom: '20px'}}> Registration </div>
                <form  onSubmit={(e) => {
                            e.preventDefault();                           
                            this.register()
                        }} style={{width: '40%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <div style={{marginBottom: '5px', width: '100%'}}>
                        <input  type="text" placeholder="Username" required name = "Username1" onChange={this.handleLogin} style={{width: '100%'}}/>    
                    </div> 
                    <div style={{marginBottom: '5px', width: '100%'}}>
                        <input  type="password" placeholder="Password" required name = "Password1" onChange={this.handlePassword} style={{width: '100%'}}/>    
                    </div>
                    <div style={{marginBottom: '5px', width: '100%'}}>
                        <input  type="password" placeholder="Confirm password" required name = "Confirm_password1" onChange={this.handleConfirm} style={{width: '100%'}}/>    
                    </div>
                    {this.state.boolConfirm && <div className="reg-error"> Passwords don't match </div>}
                   
                        <Select 
                            placeholder={<div className='text'>Choose role</div>}
                            value={selectedOption}
                            options={options0}
                            onChange={this.handleChange}
                            styles={{
                                textAlign: 'center',
                                placeholder: (defaultStyles) => {
                                    return {
                                        ...defaultStyles,
                                        alignSelf: 'center',
                                    }
                                },

                                option: (provided, state) => ({
                                    ...provided,
                                    color: '#5F5F5F',
                                }),

                                control: (provided, state) => ({
                                    ...provided,
                                    border: 'none',
                                    borderRadius: '15px',
                                    color: '#5F5F5F',
                                }),

                                singleValue: (provided, state) => ({
                                    ...provided,
                                    alignSelf: 'center',
                                    textAlign: 'center',
                                })
                            }}
                        />
                        
                    <input type="submit" className="login_button" value="Create an account" style={{width: '100%'}}/>
                </form>
                </div>
            </div>

        )
    }
}

export default RegPage;