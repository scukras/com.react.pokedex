import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import routes from '../resources/json/routes.json';

const links = {
    home: { title: 'Home', path: routes.client.home, ref: React.createRef() },
    pokemon: { title: 'Pokémon', path: routes.client.pokemon, ref: React.createRef() },
    search: { title: 'Search', path: routes.client.search, ref: React.createRef() },
    login: { title: 'Login', path: routes.client.login, ref: React.createRef() }
};

function Navbar(props) {

    const [selectedNavbarLink, setSelectedNavbarLink] = React.useState({ current: 'home', previous: 'home' });

    useEffect(() => {
        let pathname = window.location.pathname.split('/')[1];
        if (selectedNavbarLink.current !== pathname) {
            if (pathname === '' || pathname === 'landing') {
                pathname = 'home';
            }
            setSelectedNavbarLink({ current: pathname, previous: 'home' })
        }
    }, [selectedNavbarLink]);

    useEffect(() => {
        const { current, previous } = selectedNavbarLink;
        links[previous.toLowerCase()].ref.current.className = 'navbarLink';
        links[current.toLowerCase()].ref.current.className = 'navbarLinkSelected';
    }, [selectedNavbarLink]);

    const onClickLink = e => {
        let current = e.target.id;
        let  previous = selectedNavbarLink.current;

        if (previous === 'Pokémon') {
            previous = 'pokemon';
        }
        if (e.target.id === 'Pokémon') {
            current = 'pokemon';
        }

        setSelectedNavbarLink({ current, previous });
    };

    return (
        <React.Fragment>
            <div className="row justify-content-center navbarRow" style={{ background: '#2A5793'}}>
                <div className="col-2 navLinkContainer">
                    <Link className="navbarLink" id={links.home.title} to={links.home.path} ref={links.home.ref} onClick={onClickLink}>{links.home.title}</Link>
                </div>
                <div className="col-2 navLinkContainer">
                    <Link className="navbarLink" id={links.pokemon.title} to={links.pokemon.path} ref={links.pokemon.ref} onClick={onClickLink}>{links.pokemon.title}</Link>
                </div>
                <div className="col-2 navLinkContainer">
                    <Link className="navbarLink" id={links.search.title} to={links.search.path} ref={links.search.ref} onClick={onClickLink}>{links.search.title}</Link>
                </div>
                <div className="col-2 navLinkContainer">
                    <Link className="navbarLink" id={links.login.title} to={links.login.path} ref={links.login.ref} onClick={onClickLink}>{links.login.title}</Link>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Navbar;