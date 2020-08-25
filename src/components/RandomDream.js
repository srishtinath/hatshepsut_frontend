import React, {useState, useEffect}from 'react';
import { motion } from "framer-motion";
import {useSelector} from 'react-redux'


const RandomDream =(props)=> {
    
    const allRooms = useSelector(state => state.allRooms)
    const room=allRooms[2]

    const completeDream = () => {
        props.closeDream()
    }

    const [chats, setChats] = useState()

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

    const containerVariants = {
        start: { 
        },
        end: { 
            transition: 
            { 
                 staggerChildren: 1.75
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

      const buttonAnimate = {
          invisible: {
              opacity: 0,
          },
          visible: {
          opacity: 1,
          transition: {
            delay: 5,
            duration: 5,
          }}
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
                                    <motion.p className="ghost-response" key={i} variants={ textVariants }
                                    >
                                    {chat.response}</motion.p>
                            )}
                        </motion.div>
                        </>
                     : null }
                </div>
            </div>
            <motion.div variants={buttonAnimate} initial={"invisible"} animate={"visible"}>
                <button onClick={completeDream} className="go-back-btn" >Go back to exploring...</button>
            </motion.div>
            </>
         );
}

 
export default RandomDream;