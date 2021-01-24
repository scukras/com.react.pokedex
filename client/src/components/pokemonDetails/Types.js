import React from 'react'

export default function Types(props) {

    const BASE_SVG_URL = process.env.REACT_APP_NODE_HOST + ':' + process.env.REACT_APP_NODE_PORT + '/images/svg/';

    return (
        <React.Fragment>
            <span className="statHeader">Type: </span>
            {props.types.map((typeObj, i) => {
                return (
                    <span className="capitalize" title={typeObj.type.name} key={i}><img className="typeImg" src={BASE_SVG_URL + typeObj.type.name.toLowerCase() + '.svg'} alt={typeObj.type.name}/></span>
                )
            })}
        </React.Fragment>
    )
}
