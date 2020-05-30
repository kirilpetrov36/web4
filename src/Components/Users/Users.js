import React from 'react';
import './Users.css';
import axios from "axios";
import { Redirect } from 'react-router-dom';

class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],       
            user_current: this.props.store.getState()['allInfo'][0],
            redirectMainPage: false
        };

    this.delete_user = this.delete_user.bind(this);
    this.make_admin = this.make_admin.bind(this);
    this.backMainPage = this.backMainPage.bind(this);
    }


    async get_users() {
        console.log("was got");
        axios.get(`http://127.0.0.1:7000/web2app/get_users_react`)
        .then( res => {         
               this.setState({users: res['data'][1]});
               console.log(res);
        })    
    }

    delete_user = (user) => {
        let temp = [];
        for (var i = 0; i < this.state.users.length; i++){
            if (this.state.users[i][0] !== user[0]){
                temp.push(this.state.users[i]);               
            }
        }
        this.setState({users: temp});
        if (user[0] !== undefined){
            axios.get(`http://127.0.0.1:7000/web2app/delete_user_react/${user[0]}`)
        }
    }

    make_admin = (user) => {
        let temp = [];
        for (var i = 0; i <  this.state.users.length; i++){
            if (this.state.users[i][0] === user[0]){
                user[3] = true;
                temp.push(user);
            } else {
                temp.push(this.state.users[i])
            }
        }
        this.setState({users: temp});
        axios.get(`http://127.0.0.1:7000/web2app/make_admin_react/${user[0]}`)
    }

    backMainPage = () => {
        this.setState({
            redirectMainPage: true
        })
    }

    render() {
        if (this.state.users.length === 0){
            this.get_users();
        }
        console.log(this.state.users);
        if (this.state.redirectMainPage){
            return <Redirect to={{
                pathname: '/main_page'
                }} 
            />
        }
       
        return (
            <div>
                <div className="main" style={{marginTop: '10%'}}>
                    <div className="users-cont"> <div className="user-text">Users </div> </div>
                    {this.state.users.map((user) => { return (
                        <div className="user-cont">
                            {user[3] && <div className="username" > {user[0]} - admin </div>}			
                            {!user[3] && <div className="username" > {user[0]}</div>}                            
                            {user[2] === 1 && <div className="username"> {user[2]} note</div>}
                            {user[2] !== 1 && <div className="username"> {user[2]} notes </div>}	
                            {user[0] !== this.state.user_current[0] && user[3] !== true &&
                                <div style={{display: 'flex', 'flexDirection': 'row', height: '50px'}}>
                                    <div className="make-admin-cont">
                                        <form onSubmit={(e) => {
                                            e.preventDefault();                           
                                            this.make_admin(user)
                                        }} >
                                        <button class="make-admin" type="submit">make admin</button>
                                        </form>						
                                    </div>
                                    <div className="make-admin-cont">
                                        <form onSubmit={(e) => {
                                                e.preventDefault();                           
                                                this.delete_user(user)
                                            }} >
                                        <button className="delete-user" type="submit" onClick={this.delete_user}>delete</button>
                                        </form>		
                                    </div>
                                </div>
                            }
                            {user[0] !== this.state.user_current[0] && user[3] === true &&
                                <div style={{display: 'flex', 'flexDirection': 'row', height: '50px'}}>
                                    <div className="make-admin-cont">
                                        <form onSubmit={(e) => {
                                                e.preventDefault();                           
                                                this.delete_user(user)
                                            }} >
                                        <button className="delete-user" type="submit" onClick={this.delete_user}>delete</button>
                                        </form>		
                                    </div>
                                </div>
                            }
                        </div>)
                    })}                      
                    <div className="back-button-cont">
                        <button className="login_button_back" type="submit" onClick={this.backMainPage}>back</button>		
                    </div>              
                </div>
            </div>

        )
    }
}

export default LoginPage;