import React, {useState} from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from 'react-redux'
import { removeItemFromClueList } from '../actions/cluelist'
import { useHistory } from "react-router-dom";


export const ClueListItems = (props) => {
let history = useHistory();


const guessCulprit = (e) => {
    history.push('/guess')
    props.closeMenu()
}

const renderHome = (e) => {
    history.push('/home')
    props.closeMenu()
}

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 }
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 }
  }
};

let entryId = useSelector(state => state.cluelistId)
const dispatch = useDispatch()
const handleRemoveFromNotepad = (item) => {
        fetch(`https://hatshepsut.herokuapp.com//clue_lists/${entryId}/deleteItem/${item.id}`, {
            method: "DELETE",
            headers: {
                "content-type":"application/json",
                "accept": "application/json"
            }
        })
        .then(r => r.json())
        .then(resp => {
            dispatch(removeItemFromClueList(item))
        })
    }
    
const livariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
        y: { stiffness: 1000, velocity: -100 }
        }
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
        y: { stiffness: 1000 }
        }
    }
    }; 

    const hints = ["Tess didn't have a heart attack", "Tess had some illegitimate children", "Your colleague Gael is extremely jealous of Tess", "Isra was stealing artifacts from my tomb to make money", "Lord Kit was threatened to be disowned by his father"]

    const [showHint, setShowHint] = useState(false)
    const renderRandomHint = () => {
        setShowHint(!showHint)   
    }

    const hintTarget = {
        x: [0, -50, -100, -150, -100, -50, 0, 0],
        y: [0, 20, 100, 0, -50, -15, -5, 0, 0],
        // scale: [1, 1.5, 1],
        transition: {
            loop: Infinity,
            ease: "easeOut",
            duration: 10
          }
    }

    const clueItems = useSelector(state => state.clueItems)
    const userRooms = useSelector(state => state.userRooms)

    let hint = hints[Math.floor(Math.random() * hints.length)];
    return (
        <>
        <motion.ul variants={variants} className="cluelist-ul">
            {clueItems.map(item => {
            return <motion.li 
                    variants={livariants}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    key={item.id}>{item.name}
                    <button onClick={(event) => handleRemoveFromNotepad(item)} >{'\u00D7'}</button>
                </motion.li>
            })}
        </motion.ul>
        <button className="guess-culprit-btn" onClick={guessCulprit}>Guess the culprit!</button>
        <br></br>
        <button className="go-home-btn" onClick={renderHome}>Home</button>
        { userRooms.length >= 1 ?
        <button className="guess-culprit-btn" onClick={renderRandomHint}>{showHint ? "Close hint" : "Get a hint from Hat"}</button>
        :null
        }

        { showHint ? 
        <motion.div className="hint-from-hat" animate={hintTarget}>
            {hint}
        </motion.div>
        : null}

        </>

    )
}
