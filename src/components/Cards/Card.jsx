import './Card.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Card({ name }) {
    const [poki, setPoki] = useState([]);

    useEffect(() => {
        async function fetchPokemons() {
            try {
                const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`);
                setPoki(result.data);
                console.log('card data', result.data);
                // console.log('abilities', result.data.abilities)
            } catch (e) {
                console.error(e);
            }
        }


        fetchPokemons();
    }, []);

    return (
        <>
            {Object.keys(poki).length > 0 && (
                <div className="card-wrapper">
                    <div className="card-content">
                        <h2>{poki.name}</h2>
                        <div className="img-wrapper">
                            <img src={poki.sprites.front_default} alt="" />
                        </div>
                        <div className="info">
                            <p>Moves {poki.moves.length}</p>
                            <p>weight {poki.weight}</p>
                        </div>
                        <div >
                            <h3>Abilities</h3>

                            <ul className="abilities-wrapper">
                                {poki.abilities.map((ab, index)=>(<li key={index}>{ab.ability.name}</li>))}

                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Card;
