import React from 'react'

export default function Height(props) {

    const INCHES_PER_DECIMETER = 3.9370;

    const inches = Math.ceil(props.height * INCHES_PER_DECIMETER);
    const centimeters =  props.height * 10;

    let heightImperial = { feet: 0, inches: 0 };
    let heightMetric = { meters: 0, centimeters: 0 };

    heightImperial.feet = Math.floor(inches / 12);
    heightImperial.inches = inches - (12 * heightImperial.feet);

    heightMetric.meters = Math.floor(centimeters / 100);
    heightMetric.centimeters = centimeters - (heightMetric.meters * 100);

    return (
        <span>
            <span className="statHeader">Height:</span> {heightImperial.feet}' {heightImperial.inches}" <span className="pokemonDetailLeftSpacer">({heightMetric.meters}.{heightMetric.centimeters} m)</span>
        </span>
    )
}
