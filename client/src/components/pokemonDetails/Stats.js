import React from 'react'

export default function Stats(props) {

    const stats = props.stats;

    stats.sort((a, b) => {
        if (a.stat.name < b.stat.name)
            return -1;
        if (a.stat.name > b.stat.name)
            return 1;
        return 0;
    });

    return (
        <React.Fragment>
            {stats.map((stat, i) => {
                return (
                    <div className="row" key={i}>
                        <div className="col-8 statsHeader">
                            {stat.stat.name}:
                        </div>
                        <div className="col-2">
                            {stat.base_stat}
                        </div>
                    </div>
                )
            })}
        </React.Fragment>
    )
}
