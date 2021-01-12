import React, {useEffect} from 'react';
import HttpService from '../services/HttpService';
import routes from '../resources/json/routes.json';
import BlankSVG from '../resources/svg/blankLanding.svg';
import BlankMobileSVG from '../resources/svg/blankLandingMobile.svg';
import LandingSVG from '../resources/svg/staticLanding.svg';
import LandingMobileSVG from '../resources/svg/staticLandingMobile.svg';

function Home(props) {

    const [isMobile, setIsMobile] = React.useState(true);
    const [loadVideo, setLoadVideo] = React.useState(false);
    const [videoSourceUrl, setVideoSourceUrl] = React.useState();
    const [renderedSvg, setRenderedSvg] = React.useState(BlankMobileSVG);

    const determineIfMobile = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    useEffect(() => {
        setIsMobile(determineIfMobile());
        if (!determineIfMobile()) {
            setRenderedSvg(BlankSVG);
        }
    }, []);

    useEffect(() => {
        let url = routes.server.api.root + routes.server.api.connected;

        HttpService.get(url)
            .then(res => {
                if (res.data.connected) {
                    url = process.env.REACT_APP_NODE_HOST + ':' + process.env.REACT_APP_NODE_PORT + routes.server.api.root + routes.server.api.resources.root + routes.server.api.resources.landingGet;
                    if (isMobile && determineIfMobile()) {
                        url += '?isMobile=true';
                    }
                    setVideoSourceUrl(url);
                    setLoadVideo(true);
                }
            })
            .catch(err => {
                determineIfMobile() ? setRenderedSvg(LandingMobileSVG) : setRenderedSvg(LandingSVG);
            });
    }, [isMobile]);

    return (
        <React.Fragment>
            <div id="showDesktop">
                {!loadVideo &&
                    <div id="staticLandingSvg">
                    <img src={renderedSvg} alt="staticLanding"/>
                    </div>
                }
                {loadVideo &&
                    <video autoPlay muted playsInline id="pdAnim">
                        <source src={videoSourceUrl} type="video/mp4"/>
                    </video>
                }
            </div>
            <div id="showMobile">
                {!loadVideo &&
                    <div id="staticLandingMobileSvg">
                    <img src={renderedSvg} alt="staticLandingMobile"/>
                    </div>
                }
                {loadVideo &&
                    <video autoPlay muted playsInline id="pdAnimMobile">
                        <source src={videoSourceUrl} type="video/mp4"/>
                    </video>
                }
            </div>
        </React.Fragment>
    );
}

export default Home;