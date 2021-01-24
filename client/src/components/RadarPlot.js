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

            r.push(r[0]);
            theta.push(theta[0]);

            dataObj = { 
                type: 'scatterpolar',
                r,
                theta,
                fill: 'toself',
                name: props.name
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
            height: 400
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
