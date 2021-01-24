import React from 'react';
import RadarPlot from '../RadarPlot';

export default function StatsRadar(props) {

    const stats = props.stats;

    stats.sort((a, b) => {
        if (a.stat.name < b.stat.name)
            return -1;
        if (a.stat.name > b.stat.name)
            return 1;
        return 0;
    });

    const data = [{
        className: props.name,
        stats: []
    }];

    stats.forEach(stat => {
        data[0].stats.push({ name: stat.stat.name, value: stat.base_stat });
    });

    return (
        <RadarPlot data={data}/>
    )
}
