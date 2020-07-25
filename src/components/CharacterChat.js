import React, { Component } from 'react';
import { connect } from 'react-redux'
import Fade from 'react-reveal/Fade';
import Bounce from 'react-reveal/Bounce';



class CharacterChat extends Component {

    state = {
        chatIndex: 0,
        chatHistory: [],
        sortedChats: [],
        chatOption: {}
    }

    componentDidMount(){
        let character = this.props.currentCharacter
        let sortedChatsArray
        if (character.chats){
            sortedChatsArray = character.chats.sort(function(chatA,chatB){return chatA.id - chatB.id})
            this.setState({
                sortedChats: sortedChatsArray,
                chatOption: sortedChatsArray[this.state.chatIndex],
                chatHistory: [["response", sortedChatsArray[this.state.chatIndex].response]]
            }, console.log(this.state))
        }
    }

    componentDidUpdate(prevProps){
        if (this.props.currentCharacter !== prevProps.currentCharacter){
            let character = this.props.currentCharacter
            let sortedChatsArray
            console.log(character)
            if (character.chats){
                sortedChatsArray = character.chats.sort(function(chatA,chatB){return chatA.id - chatB.id})
                this.setState({
                    sortedChats: sortedChatsArray,
                    chatOption: sortedChatsArray[this.state.chatIndex],
                    chatHistory: [["response", sortedChatsArray[this.state.chatIndex].response]]
                }, console.log(this.state))
            }
        }
    }

    handleChatResponse = (option) => {
        let changedHistory = this.state.chatHistory
        let nextResponse = this.state.sortedChats.find(response => response.id === option.nextResponse_id)
        changedHistory.push(["option", option.text])
        if (nextResponse){
            changedHistory.push(["response", nextResponse.response])
            this.setState({
                chatIndex: nextResponse.id,
                chatOption: nextResponse
            })
        } else {
            this.setState({
                chatIndex: "",
                chatOption: {}
            })
        }
        this.setState({
            chatHistory: changedHistory
        })
    }

    render() { 
        let character = this.props.currentCharacter
        // console.log(this.state.chatHistory)
        return ( 
            <>
            <img src={character.image_url} alt={character.name} className="character-chat-img" onClick={this.props.toggleRoom}/>
            <div className="character-chat-content" key="chat-content-1">
                { character.name }
                <br></br>
                { character.description }
                <p></p>
                {this.state.sortedChats ? 
                    <div key="chat-content-2">
                        {this.state.chatHistory.map(textArray => 
                            textArray[0] === "option" ? 
                            <div key={textArray.index}>
                                <Bounce right> 
                                    <p className={textArray[0]}>{textArray[1]}</p>
                                </Bounce>
                            </div>
                            : 
                            <div key={textArray.index + Math.random()}>
                                <Bounce left>
                                <p className={textArray[0]}>{textArray[1]}</p>
                                </Bounce>
                            </div>
                        )}
                        { this.state.chatOption.chat_options ? 
                        <div className="character-options-ul">
                         {this.state.chatOption.chat_options.map(option => {
                             return (
                                 <div key={option.id} 
                                onClick={()=> this.handleChatResponse(option)} 
                                className="character-options-li">
                                    <Fade big >
                                    {option.text}
                                    </Fade>
                                </div>
                             )
                            })}
                        </div>
                        : null}
                    </div>
                    : null
                    }
                { !this.state.chatIndex ? 
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