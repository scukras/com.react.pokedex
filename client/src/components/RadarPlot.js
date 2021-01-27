import React, {useEffect} from 'react';
import Plotly from 'plotly.js-dist';

export default function RadarPlot(props) {

    useEffect(() => {

        console.log(props);

        const data = [];
        let maxRange = 0;

        props.data.forEach(obj => {
            let dataObj = {};
            const r = [];
            const theta = [];

            obj.stats.forEach(stat => {
                r.push(stat.value);
                theta.push(_getShortName(stat.name));

                if (stat.value > maxRange) {
                    maxRange = stat.value;
                }
            })

            const pokemonName = props.name.charAt(0).toUpperCase() + props.name.slice(1);

            r.push(r[0]);
            theta.push(theta[0]);

            dataObj = { 
                type: 'scatterpolar',
                r,
                theta,
                fill: 'toself',
                name: pokemonName,
                hovertemplate: 'Val: %{r}<br>Stat: %{theta}'
            }

            data.push(dataObj);
        });



        const layout = {
            polar: {
                bgcolor: '#1e1e1e',
                radialaxis: {
                    visible: true,
                    range: [0, maxRange]
                }
            },
            paper_bgcolor: '#1e1e1e',
            showlegend: false,
            height: 250,
            width: 250,
            margin: {
                l: 5,
                r: 5,
                b: 0,
                t: 0,
                pad: 0
            }
        }

        console.log(data);

        Plotly.newPlot("myDiv", data, layout)
    }, []);

    const _getShortName = name => {

        switch (name.toLowerCase()) {

            case 'hp':
                return 'HP';

            case 'defense':
                return 'Def';

            case 'attack':
                return 'Atk';

            case 'speed':
                return 'Spe';

            case 'special-attack':
                return 'SpA';

            case 'special-defense':
                return 'SpD';
        }
    };

    return (
        <div id="myDiv"/>
    )
}
