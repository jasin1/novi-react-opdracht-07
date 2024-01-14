import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import Card from "./components/Cards/Card.jsx";
import PokemonLogo from './assets/Pokémon_logo_2.svg';

// comment

function App() {

    const [error, setError] = useState();
    const [pokemons, setPokemons] = useState(null);
    const [count, setCount] = useState(0);
    const maxValue = 100;

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');
                console.log(response.data.results);
                setPokemons(response.data.results);

            } catch (e) {
                console.error(e);
                setError('Het ophalen van de data is mislukt!');

            } finally {
                console.log('Pokemons state after API call', pokemons);
            }
        }

        fetchData();
    }, []);

    const handlePrev = () => {
        if (count - 20 >= 0) {
            setCount(count - 20);
        }else{
            setCount(0);
        }
    };

    const handleNext = () => {
        if(count +20 <= maxValue){
        setCount(count + 20);
        }else{
            setCount(maxValue);
        }
    };

    console.log('Current Number: ', count);


    return (
        <>
            <main>
                <header>
                    <div className="logo-wrapper">
                        <img src={PokemonLogo} alt=""/>
                    </div>
                    <div className="btns-wrapper">
                        <button className="btn btn-prev" onClick={handlePrev}>Vorige</button>
                        <button className="btn btn-next" onClick={handleNext}>Volgende</button>
                    </div>
                </header>
                <article>
                    <section className="container">
                        {pokemons === null && <p>Loading...</p>}
                        <ul className="cards-grid">
                            {pokemons !== null && pokemons.map((pokemon, index) => {
                                return (
                                    <li key={index}><Card
                                        name={pokemon.name}
                                    />
                                    </li>

                                )

                            })}
                        </ul>
                    </section>
                </article>
            </main>
        </>
    )
}

export default App
