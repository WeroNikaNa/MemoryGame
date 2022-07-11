import './SingleCard.css'
function SingleCard(props) {
    const handleClick = () =>{
        if (!props.disabled){
            props.handleChoice(props.card);
        }

    }

    return (
            <div className="card" key={props.card.id}>
                <div className={props.flipped ?"flipped":""}>
                    <img className="front"
                         src={props.card.src}
                         alt="card front"/>
                    <img className="back"
                         onClick={handleClick}
                         src="/img/cover.jpg"
                         alt="card back"/>
                </div>
            </div>


    );
}

export default SingleCard