import React, {useState, useEffect}from 'react';
import { motion } from "framer-motion";
import {useSelector} from 'react-redux'
import Fade from 'react-reveal/Fade';


const RandomDream =(props)=> {
    
    const allRooms = useSelector(state => state.allRooms)
    const room=allRooms[4]

    const completeDream = () => {
        props.closeDream()
    }

    const [chats, setChats] = useState([])
    useEffect(() => {
        let charId = room.character.id
        fetch(`http://localhost:3000/characters/${charId}`)
        .then(r=> r.json())
        .then(fetchedCharacter => setChats(fetchedCharacter.chats))
    }, [])

    const woman = {
        x: [0, 200, 400, 600, 900, 600, 400, 200, 0, 0],
        y: [0, 200, 0, -200, 100, -200, 0, 200, 0, 0],
        // scale: [1, 1.5, 1],
        transition: {
            loop: Infinity,
            ease: "easeOut",
            duration: 20
          }
    }

        return ( 
            <div className="random-dream" style={{ backgroundImage: `url(${room.image_url})`, backgroundSize: "100%"}}>
                <div className="random-dream-character" >
                    <motion.img 
                    src={room.character.image_url} 
                    alt={room.character.name} 
                    className={room.name} 
                    animate={woman}/>
                </div>
                <div className="dream-state-chat">
                    <div>{chats ? 
                    <>
                    {chats.map(chat => 
                    <Fade cascade bottom>
                        <p className="ghost-response" key={chat.id}>{chat.response}</p>
                    </Fade>
                    )}
                    </>
                     : null }</div>
                </div>
            <button onClick={completeDream} className="go-back-btn">Go back to exploring...</button>
            </div>
         );
}

 
export default RandomDream;