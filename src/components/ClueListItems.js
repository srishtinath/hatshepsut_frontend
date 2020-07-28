import React from "react";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from 'react-redux'
import { removeItemFromClueList } from '../actions/cluelist'
import { useHistory } from "react-router-dom";


export const ClueListItems = () => {
let history = useHistory();


const guessCulprit = (e) => {
    history.push('/guess')
}

const renderHome = (e) => {
    history.push('/home')
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
        fetch(`http://localhost:3000/clue_lists/${entryId}/deleteItem/${item.id}`, {
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

    const clueItems = useSelector(state => state.clueItems)
    
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
        </>
    )
}
