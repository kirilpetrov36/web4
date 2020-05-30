import React from 'react';
import LoginPage from './Components/LoginPage/LoginPage';
import MainPage from './Components/MainPage/MainPage';
import NewNoteMain from './Components/NewNoteMain/NewNoteMain';
import {createStore} from 'redux';
import { Route } from 'react-router-dom';
import reducers from './Reducer/store';
import { Provider } from 'react-redux';
import NewNote from './Components/NewNote/NewNote';
import EditNote from './Components/EditNote/EditNote';
import NotesList from './Components/NotesList/NotesList';
import RegPage from './Components/RegPage/RegPage';
import Users from './Components/Users/Users';

const myStore = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

class App extends React.Component {
    render() {
        return (
            <Provider store={myStore}>
                <div>
                    <Route exact path='/' render={() => <LoginPage store={myStore} />} />
                    <Route exact path='/main_page' render={() => <MainPage store={myStore} />} />
                    <Route exact path='/new_note_main' render={() => <NewNoteMain store={myStore} />} />
                    <Route exact path='/notes_list' render={() => <NotesList store={myStore} />} />
                    <Route exact path='/new_note' render={() => <NewNote store={myStore} />} />
                    <Route exact path='/edit_note' render={() => <EditNote store={myStore} />} />
                    <Route exact path='/register_page' render={() => <RegPage store={myStore} />} />
                    <Route exact path='/users' render={() => <Users store={myStore} />} />
                </div>
            </Provider>
        )
    }
}

export default App;