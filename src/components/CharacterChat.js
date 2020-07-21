import React, { Component } from 'react';
import { connect } from 'react-redux'


class CharacterChat extends Component {

    state = {
        chatIndex: 0,
        chatHistory: [94]
    }

    handleChatResponse = (e) => {
        let changedHistory = this.state.chatHistory
        changedHistory.push(parseInt(e.target.id))
        console.log(changedHistory)
        this.setState({
            chatHistory: changedHistory
        })
    }



    render() { 
        let character = this.props.currentCharacter
        return ( 
            <>
            <img src={character.image_url} alt={character.name} className="character-chat-img" onClick={this.props.toggleRoom}/>
            <div className="character-chat-content">
                { character.name }
                { character.description }
                <p></p>
                {character.chats[0] ? 
                <div>
                {character.chats.map(chat => {
                    return ( this.state.chatHistory.includes(chat.id)) ? 
                        <div key={chat.id}>
                        <p key={chat.id}>{chat.response}</p>
                        {this.state.chatHistory.indexOf(chat.id) === this.state.chatHistory.length - 1 ? 
                        <ul className="character-options-ul">
                            { chat.chat_options.map(option => {
                                return (
                                <li className="character-options-li" 
                                onClick={this.handleChatResponse} 
                                key={option.id}
                                id={option.nextResponse_id}>
                                    {option.text}
                                    </li>)
                            }) }
                        </ul>
                        :null}
                        </div>
                    : null
                    }
                )}
                </div>
                :null}
                {!this.state.chatHistory[this.state.chatHistory.length - 1] ? 
                <button onClick={this.props.toggleRoom}>Go back...</button>
                : null}
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