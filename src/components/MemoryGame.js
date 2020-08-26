import React, {useEffect, useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import cardImages from "../cards.js";
import Card from "./Card";
import deepcopy from "deepcopy";
import { CloseButton } from "./CloseButton.js";


function shuffleArray(array) {
	return array.sort(() => .5 - Math.random());
}

function generateCards(count) {
	// if (count % 2 !== 0){
	// 	throw ("Count must be even: 2, 4, 6, etc. but it is " + count);}

	const cards = shuffleArray(cardImages)
		.slice(0, count / 2)
		.map(imageURL => ({
			id: uuidv4(),
			imageURL: imageURL,
			isFlipped: false,
			canFlip: true
		}))
		.flatMap(e => [e, {...deepcopy(e), id: uuidv4()}]);

	return shuffleArray(cards);
}

export default function Game(props, {fieldWidth=6, fieldHeight=3}) {
	const totalCards = fieldWidth * fieldHeight;

	const [cards, setCards] = useState(generateCards(totalCards));
	const [canFlip, setCanFlip] = useState(false);
	const [firstCard, setFirstCard] = useState(null);
	const [secondCard, setSecondCard] = useState(null);
	const [gameWon, setGameWon] = useState(false)
	const [matchedCards, setMatches] = useState(0)

	function setCardIsFlipped(cardID, isFlipped) {
		setCards(prev => prev.map(c => {
			if (c.id !== cardID)
				return c;
			return {...c, isFlipped};
		}));
	}
	function setCardCanFlip(cardID, canFlip) {
		setCards(prev => prev.map(c => {
			if (c.id !== cardID)
				return c;
			return {...c, canFlip};
		}));
	}

	// showcase
	useEffect(() => {
		if (cards){
			setTimeout(() => {
				let index = 0;
				for (const card of cards) {
					setTimeout(() => setCardIsFlipped(card.id, true), index++ * 100);
				}
				setTimeout(() => setCanFlip(true), cards.length * 100);
			}, 3000);
			setGameWon(false)

		}
	}, []);


	function resetFirstAndSecondCards() {
		setFirstCard(null);
		setSecondCard(null);
	}

	function onSuccessGuess() {
		setCardCanFlip(firstCard.id, false);
		setCardCanFlip(secondCard.id, false);
		setCardIsFlipped(firstCard.id, false);
		setCardIsFlipped(secondCard.id, false);
		resetFirstAndSecondCards();
		setMatches(matchedCards + 2)
	}
	function onFailureGuess() {
		const firstCardID = firstCard.id;
		const secondCardID = secondCard.id;

		setTimeout(() => {
			setCardIsFlipped(firstCardID, true);
		}, 1000);
		setTimeout(() => {
			setCardIsFlipped(secondCardID, true);
		}, 1200);

		resetFirstAndSecondCards();
	}

	useEffect(() => {
		if (!firstCard || !secondCard)
			return;
		(firstCard.imageURL === secondCard.imageURL) ? onSuccessGuess() : onFailureGuess();
	}, [firstCard, secondCard]);


	function onCardClick(card) {
		if (!canFlip)
			return;
		if (!card.canFlip)
			return;

		if ((firstCard && (card.id === firstCard.id)) || (secondCard && (card.id === secondCard.id)))
			return;

		setCardIsFlipped(card.id, false);

		(firstCard) ? setSecondCard(card) : setFirstCard(card);
	}

	function checkGameWon(cardClasses) {
		let hiddenCards = cardClasses.filter(cardClass => cardClass === "card flipped")
		if (hiddenCards.length === 0 && matchedCards !== 0){
			console.log(gameWon)
			setGameWon(true)
		} else {
			setGameWon(false)
		}
	}

	useEffect(() => {
		let cardContainers = Array.from(document.getElementsByClassName("card-container"))
		let cardContainList = cardContainers.map(cardContain => cardContain.childNodes[0].className)
		checkGameWon(cardContainList)
	}, [cards])

	return (
		<>
	<div className="game container-md">		
	{ gameWon ? 
		<div className="memory-won-container">
			<CloseButton closeBox={props.closeMemory} className="memory-close-btn"/>
			<p className="memory-won-text">Congratulations! You may now enter...</p>
		</div>
		:
		<> 
		<p className="memory-intro">Welcome to the Tomb Antechamber! Solving this next game will grant you entry...</p>
		<div className="cards-container">
			{cards.map(card => <Card onClick={() => onCardClick(card)} key={card.id} {...card}/>)}
		</div>
		</>
	}
	</div>
	</>
	);
}