import './Card.css'
import SingleCard from "./SingleCard";
function Cards(props) {

    return (
            <div className="card-grid">
                {props.cards.map(card => (
                    <SingleCard key={card.id} card={card} handleChoice={props.handleChoice}
                                disabled={props.disabled}
                                flipped ={card ===props.choice1 || card ===props.choice2 || card.matched}/>
               ))}
            </div>
   );
}

export default Cards