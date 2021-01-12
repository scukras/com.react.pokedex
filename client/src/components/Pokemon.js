import React, {useEffect} from 'react'
import HttpService from '../services/HttpService';

export default function Pokemon() {

    const [pokemonList, setPokemonList] = React.useState();

    useEffect(() => {
        HttpService.getPokeApi('https://pokeapi.co/api/v2/pokemon/?limit=151')
            .then(res => {
                console.log(res.data);
                setPokemonList(res.data.results);
            })
            .catch(err => {
                console.log('POKEMON TEST CATCH');
                console.log(err.response);
            });
    }, []);

    return (
        <div>
            Pokemon works!
            {/* https://pokeapi.co/api/v2/pokemon/?limit=151 */}
        </div>
    )
}
