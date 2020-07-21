import React, { Component } from 'react';
import { connect } from 'react-redux'


class CharacterChat extends Component {

    render() { 
        let character = this.props.currentCharacter
        console.log(character.chats[0])
        return ( 
            <>
            <img src={character.image_url} alt={character.name} className="character-chat-img" onClick={this.props.toggleRoom}/>
            <div className="character-chat-content">
                { character.name }
                { character.description }

                <ul>
                    {character.chats[0] ? 
                <>{ character.chats[0].chat_options.map(option => {
                    return <li>{option.text}</li>
                }) }</>
                :null}
                </ul>
                <br></br><button onClick={this.props.toggleRoom}>Go back...</button>
            </div>
            </>
         );
    }
}

let mapStateToProps = (state) => {
    return {
        // currentRoom: state.currentRoom,
        currentCharacter: state.currentCharacter
    }
}


export default connect(mapStateToProps)(CharacterChat);