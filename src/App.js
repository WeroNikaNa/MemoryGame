import './App.css'
import React, { useState, useEffect } from 'react';
import Cards from "./components/Cards";

const cardImg =[
    {"src":"/img/1.jpg", "matched":false},
    {"src":"/img/2.jpg", "matched":false},
    {"src":"/img/3.jpg", "matched":false},
    {"src":"/img/4.jpg", "matched":false},
    {"src":"/img/5.jpg", "matched":false},
    {"src":"/img/6.jpg", "matched":false},
    {"src":"/img/7.jpg", "matched":false},
    {"src":"/img/8.jpg", "matched":false},
    {"src":"/img/9.jpg", "matched":false},
    {"src":"/img/10.jpg", "matched":false},
    {"src":"/img/11.jpg", "matched":false},
    {"src":"/img/12.jpg", "matched":false},
]
function App() {
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [level, setLevel] = useState(1)
    const [choice1, setChoice1] = useState(null)
    const [choice2, setChoice2] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [winner, setWinner] = useState(false)

    //shuffle cards
    const shuffleCards = () => {
        let addedCard=[];
        for (let i=1;i<=level*2 ;i++){
            addedCard.push(cardImg[i]);
            addedCard.push(cardImg[i]);
        }
        const shuffledCards = [...addedCard]
            .sort(() => Math.random()-0.5)
            .map((card)=>({...card, id: Math.random()}) )

        setChoice1(null)
        setChoice2(null)
        setCards(shuffledCards)
        setTurns(0)
        setLevel(1)
    }

    //shuffle cards for the next level
    const nextLevel = () =>{
        let addedCards=[];

        setLevel(prevLevel => prevLevel + 1)
        let newLevel = level +1
        for (let i=1;i<=newLevel*2 ;i++){
            addedCards.push(cardImg[i]);
            addedCards.push(cardImg[i]);
        }
        const nextLevel = [...addedCards]
            .sort(() => Math.random()-0.5)
            .map((card)=>({...card, id: Math.random()}) )

        setChoice1(null)
        setChoice2(null)
        setCards(nextLevel)
        setTurns(0)
        setWinner(false)
    }

    //handle a choice
    const handleChoice = (card) => {
        choice1 ? setChoice2(card) : setChoice1(card)
    }

    //reset & add turn
    const oneMove = () => {
        setChoice1(null)
        setChoice2(null)
        setTurns(prevTurns=>prevTurns +1)
        setDisabled(false)

    }

    //check if round is over
    const checkIfOver = () => {
        let cardNrMatched = 0;
        let cardNr = 0;
        cards.map(card =>{
            if(card.matched === true){
                cardNrMatched ++;
            }
            cardNr++;
        })

        cardNrMatched=cardNrMatched + 2;
        if(cardNr === cardNrMatched){
            setWinner(true)
            setTimeout(()=>nextLevel(), 5500)

        }
    }

    //start the game automatically
    useEffect(()=>{
        shuffleCards()
    },[])

    //compare 2 cards
    useEffect(()=>{

        if(choice1 && choice2){
            setDisabled(true)
            if(choice1.src === choice2.src){
                //correct
                setCards(prevCards => {
                    return prevCards.map(card =>{
                        if(card.src === choice1.src){
                            return{...card, matched: true}
                        }
                        else{
                            return card
                        }
                    })
                })
                oneMove()
            }
            else {
                setTimeout(()=>oneMove(), 1000)
            }
            checkIfOver()
        }

    },[choice1, choice2])


  return (
    <div className="App">
      <h1>Find Pairs</h1>
        <div>
            {level!==7 && winner &&<div className="winner"><p>CONGRATS! YOU GO TO THE NEXT LEVEL!</p></div>}
            {level===7 &&<div className="winner"><p>CONGRATS! YOU WON!</p></div>}

            <p>Your level: {level},     Turns: {turns}</p>
            <button onClick={shuffleCards}>New Game</button>
        </div>
        {cards && <Cards cards={cards} handleChoice={handleChoice}
                         choice1={choice1} choice2={choice2}
                        disabled={disabled}/>}
    </div>
  );
}

export default App;