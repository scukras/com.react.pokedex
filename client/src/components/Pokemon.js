import React, {useEffect} from 'react';
import StateService from '../services/StateService';
import PokemonDetails from './PokemonDetails';
import HttpService from '../services/HttpService';
import {GetPokemonAll} from '../resources/queries/PokemonQueries';
import PokeballSVG from '../resources/svg/pokeball.svg';

export default function Pokemon() {

    const [pokemonList, setPokemonList] = React.useState();
    const [loadingPage, setLoadingPage] = React.useState(true);
    const [selectedPokemon, setSelectedPokemon] = React.useState();
    const [showSelectedPokemonDetails, setShowSelectedPokemonDetails] = React.useState(false)

    useEffect(() => {
        setLoadingPage(true);
        HttpService.graphql({ query: GetPokemonAll })
            .then(res => {
                setPokemonList(res.data.data.pokemon);
                setLoadingPage(false);
            })
            .catch(err => {
                console.log('POKEMON TEST CATCH');
                console.log(err.response);
            });

        StateService.showSelectedPokemonDetail().subscribe(res => { setShowSelectedPokemonDetails(res); });

    }, []);

    const onClickPokemon = pokemon => {
        setSelectedPokemon(pokemon);
        setShowSelectedPokemonDetails(true);
    };

    return (
        <React.Fragment>
            {!showSelectedPokemonDetails &&
                <React.Fragment>
                    <div className="spacerLg"/>
                    <div className="row justify-content-center">
                        <h3>Pokémon Blue, Red and Yellow</h3>
                    </div>
                    <div className="spacerLg" />
                    {loadingPage &&
                        <React.Fragment>
                            <p/>
                            <div className="row justify-content-center">
                                <img src={PokeballSVG} className="loadingPokeball" alt="loading-pokeball"/>
                            </div>
                        </React.Fragment>
                    }
                    <div>
                        <div className="row justify-content-center">
                            <div className="col-10">
                                {pokemonList &&
                                    pokemonList.map((pokemon, i) => {
                                        return (
                                            <div className="pokemonListNoteCard" key={i} onClick={() => {onClickPokemon(pokemon.name)}}>
                                                <div className="row">
                                                    <div className="pokemonListSprite">
                                                        <img src={pokemon.sprites.front_default} alt={pokemon.name + '-sprite'}/>
                                                    </div>
                                                </div>
                                                <div className="row justify-content-center">
                                                    <div className="pokemonListText">
                                                        {pokemon.name}
                                                    </div>
                                                </div>
                                                </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            }
            {showSelectedPokemonDetails &&
                <PokemonDetails pokemonName={selectedPokemon}/>
            }
        </React.Fragment>
    )
}
