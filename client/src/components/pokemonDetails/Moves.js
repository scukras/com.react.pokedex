import React, {useEffect} from 'react'
import HttpService from '../../services/HttpService';
import {GetPokemonMoveDetails} from '../../resources/queries/PokemonQueries';

export default function Moves(props) {

    const [moves, setMoves] = React.useState();

    const BASE_SVG_URL = process.env.REACT_APP_NODE_HOST + ':' + process.env.REACT_APP_NODE_PORT + '/images/svg/';

    useEffect(() => {
        const movesNames = [];

        props.moves.forEach(move => {
            movesNames.push(move.move.name);
        });

        HttpService.graphql(GetPokemonMoveDetails, { names: movesNames })
            .then(res => {
                setMoves(res.data.data.moves);
            });


    }, [props]);

    return (
        <React.Fragment>
            <div className="row justify-content-center">
                <div className="col-12" id="movesTableTitle">
                    Moves
                </div>
            </div>
            <p/>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Type</th>
                        <th scope="col">Symbol</th>
                        <th scope="col">Power</th>
                        <th scope="col">PP</th>
                        <th scope="col">Accuracy</th>
                        <th scope="col">Priority</th>
                    </tr>
                </thead>
                <tbody>
                    {moves && moves.map((move, i) => {
                        return (
                            <tr key={i}>
                                <td>{move.id}</td>
                                <td>{move.name}</td>
                                <td>{move.type.name}</td>
                                <td><span className="capitalize" title={move.type.name}><img className="typeImg" src={BASE_SVG_URL + move.type.name.toLowerCase() + '.svg'} alt="" /></span></td>
                                <td>{move.power}</td>
                                <td>{move.pp}</td>
                                <td>{move.accuracy}</td>
                                <td>{move.priority}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </React.Fragment>
    )
}
