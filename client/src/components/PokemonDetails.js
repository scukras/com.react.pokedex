import React, {useEffect} from 'react'
import Height from './pokemonDetails/Height';
import Weight from './pokemonDetails/Weight';
import Types from './pokemonDetails/Types';
import Stats from './pokemonDetails/Stats';
import StatsRadar from './pokemonDetails/StatsRadar';
import HttpService from '../services/HttpService';
import StateService from '../services/StateService';
import {GetOnePokemonDetails} from '../resources/queries/PokemonQueries';

export default function PokemonDetails(props) {

    const [pokemonDetails, setPokemonDetails] = React.useState();

    useEffect(() => {
        HttpService.graphql(GetOnePokemonDetails, { name: props.pokemonName })
            .then(res => {
                console.log(res.data.data.pokemon[0]);
                setPokemonDetails(res.data.data.pokemon[0]);
            });
    }, [props.pokemonName]);

    const onClickReturn = e => {
        StateService.emitShowSelectedPokemonDetail(false);
    };

    const formatPokemonIdForPng = () => {
        if (pokemonDetails.id < 10) {
            return '00' + String(pokemonDetails.id);
        } else if (pokemonDetails.id < 100) {
            return '0' + String(pokemonDetails.id);
        } else {
            return String(pokemonDetails.id);
        }
    }

    return (
        <div>
            <p/>
            <span className="desktopRender">
                <div className="row justify-content-end">
                    <div className="col-2" id="returnToPokemonList" onClick={onClickReturn}>
                        Return to Pokémon List
                    </div>
                </div>
            </span>
            <span className="mobileRender">
                <div className="row justify-content-center">
                    <div className="col-10 offset-1" id="returnToPokemonList" onClick={onClickReturn}>
                        Return to Pokémon List
                    </div>
                </div>
            </span>
            <p/>
            {pokemonDetails &&
                <React.Fragment>
                    <div className="row justify-content-center">
                        <div className="pokemonTitle">
                            <h2>{pokemonDetails.name}</h2>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="pokemonTitle">
                            <span id="pokemonTitleId">#{pokemonDetails.id}</span>
                        </div>
                    </div>
                    <div className="spacerLg"/>
                    <span className="desktopRender">
                        <div className="row">
                            <div className="col-5 offset-1">
                            <img className="col-8" src={'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + formatPokemonIdForPng() + '.png'} alt={props.pokemonName + '.png'}/>
                            </div>
                            <div className="col-6 statsBlock">
                                <div className="row">
                                    <div className="col-6">
                                        <Height height={pokemonDetails.height}/>
                                    </div>
                                    <div className="col-6">
                                        <Weight weight={pokemonDetails.weight} />
                                    </div>
                                </div>
                                <p/>
                                <div className="row">
                                    <div className="col-12">
                                        <Types types={pokemonDetails.types}/>
                                    </div>
                                </div>
                                <p/>
                                <div className="row">
                                    <div className="col-12 statHeader">
                                        Stats:
                                    </div>
                                </div>
                                <p/>
                                <div className="row">
                                    <div className="col-5 offset-1">
                                        <Stats stats={pokemonDetails.stats}/>
                                    </div>
                                    <div className="col-6">
                                        <StatsRadar name={pokemonDetails.name} stats={pokemonDetails.stats} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </span>
                    <span className="mobileRender">
                        <div className="row justify-content-center">
                            <div className="offset-2">
                                <img className="col-10" src={'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + formatPokemonIdForPng() + '.png'} alt={props.pokemonName + '.png'}/>
                            </div>
                        </div>
                    </span>
                </React.Fragment>
            }
        </div>
    )
}
