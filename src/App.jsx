import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import Card from "./components/Cards/Card.jsx";


function App() {

    const [error, setError] = useState();
    const [pokemons, setPokemons] = useState(null);

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


    return (
        <>
            <main>
                {pokemons === null && <p>Loading...</p>}
                {pokemons !== null && pokemons.map((pokemon, index)=>{
                    return(
                        <Card
                        key={index}
                        name={pokemon.name}
                        />

                    )

                })}
            </main>
        </>
    )
}

export default App
