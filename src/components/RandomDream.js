import React, {useState, useEffect}from 'react';
import { motion } from "framer-motion";
import {useSelector} from 'react-redux'


const RandomDream =(props)=> {
    
    const allRooms = useSelector(state => state.allRooms)
    const room=allRooms[1]

    const completeDream = () => {
        props.closeDream()
    }

    const [chats, setChats] = useState()

    useEffect(() => {
        let charId = room.character.id
        fetch(`https://hatshepsut.herokuapp.com/characters/${charId}`)
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

    const containerVariants = {
        start: { 
        },
        end: { 
            transition: 
            { 
                 staggerChildren: 3
            } 
        }
      }
      

      const textVariants = {
        start: {
            x: 500,
            opacity: 0,
          },
        end: {
            x: 0,
            opacity: 1,
        },
      }

        return ( 
            <>
            <div className="random-dream" style={{ backgroundImage: `url(${room.image_url})`, backgroundSize: "100%"}}>
                <div className="random-dream-character" >
                    <motion.img 
                    src={room.character.image_url} 
                    alt={room.character.name} 
                    className={room.name} 
                    animate={woman}/>
                </div>
                <div className="dream-state-chat" >
                        {chats ? 
                        <>
                        <motion.div variants={ containerVariants }
                            initial={ "start" }
                            animate={ "end" }>
                            {chats.map((chat, i) => 
                                    <motion.div className="ghost-response" key={i} variants={ textVariants }
                                    >
                                    {chat.response}</motion.div>
                            )}
                        </motion.div>
                        </>
                     : null }
                </div>
            </div>
            <div>
                <button onClick={completeDream} className="go-back-btn">Go back to exploring...</button>
            </div>
            </>
         );
}

 
export default RandomDream;