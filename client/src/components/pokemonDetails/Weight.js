import React from 'react'

export default function Weight(props) {

    const POUNDS_PER_HECTOGRAM = 0.2204623;

    let pounds = props.weight * POUNDS_PER_HECTOGRAM;
    pounds = Math.round(pounds * 10) / 10;

    const kilograms = props.weight / 10;

    return (
        <span>
            <span className="statHeader">Weight:</span> {pounds} lbs <span className="pokemonDetailLeftSpacer">({kilograms} kg)</span>
        </span>
    )
}
