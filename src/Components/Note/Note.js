import React from 'react';
import './Note.css';

class Note extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            note: this.props.notes,
            username: this.props.username
        }
    }
   
    static getDerivedStateFromProps(props) {
        return {note: props.notes}
    }
  
    render() {
        return (
            <div>
                <form action="note_page" class="button-note">
					<button class="item">
						<h1>{this.state.note[0]}</h1>
						<h2>{this.state.note[1]}</h2>						
					</button>
				</form>
            </div>

        )
    }
}

export default Note;