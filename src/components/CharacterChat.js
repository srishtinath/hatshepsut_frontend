import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch } from 'react-redux'
import Fade from 'react-reveal/Fade';
import Bounce from 'react-reveal/Bounce';

import { addResponseToChatHistory } from '../actions/cluelist'



function CharacterChat(props) {

    const [chatIndex, setChatIndex] = useState(0)
    const [chatHistory, setChatHistory] = useState([])
    const [sortedChats, setSortedChats] = useState([])
    const [chatOptions, setChatOptions]= useState({})
   
    const character = useSelector(state => state.currentCharacter)

    useEffect(() => {
        let sortedChatsArray
        sortedChatsArray = character.chats.sort(function(chatA,chatB){return chatA.id - chatB.id})
        setSortedChats(sortedChatsArray)
        setChatOptions(sortedChatsArray[chatIndex])
        setChatHistory([["response", sortedChatsArray[chatIndex].response]])
    }, [character.chats])

    const dispatch = useDispatch()

    const handleChatResponse = (option) => {
        let changedHistory = chatHistory
        let nextResponse = sortedChats.find(response => response.id === option.nextResponse_id)
        changedHistory.push(["option", option.text])
        if (nextResponse){
            changedHistory.push(["response", nextResponse.response])
            setChatIndex(nextResponse.id)
            setChatOptions(nextResponse)
        } else {
            setChatIndex("")
            setChatOptions({})
        }
        setChatHistory(changedHistory)
        dispatch(addResponseToChatHistory(option.text))
    }

    return ( 
            <div className="chat-content" key={298237}>
                <div key={876757687687}>
                    <div className="character-chat-content" key={9848946}>
                    <div className="chat-intro" key={8372642754267354}>
                        { character.name }
                        <br></br>
                        { character.description }
                        <p></p>
                    </div>
                    <div key={234} className="chat-div">
                        {chatHistory.map(textArray => 
                            textArray[0] === "option" ? 
                            <div key={chatHistory.indexOf(textArray)}>
                                <Bounce right> 
                                    <p className={textArray[0]}>{textArray[1]}</p>
                                </Bounce>
                            </div>
                            : 
                            <div key={chatHistory.indexOf(textArray)}>
                                <Bounce left>
                                <p className={textArray[0]}>{textArray[1]}</p>
                                </Bounce>
                            </div>
                        )}
                        { chatOptions.chat_options ? 
                        <div className="character-options-ul">
                        {chatOptions.chat_options.map(option => {
                            return (
                                <div key={option.id} 
                                onClick={()=> handleChatResponse(option)} 
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
                    </div>
            </div>
            </div>
    );
}


export default CharacterChat;