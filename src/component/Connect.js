import React, { useEffect } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
const Connect = () => {
    const history = useHistory()

    useEffect(() => {
        document.title = "Parfume Center | Aloqa"
        const checking = localStorage.getItem("Login");
        if (!checking || checking !== "true") {
            history.push("/")
            history.go()
        } 
    }, [])
    return (
        <div className="connect about">
            <div className="connect-text">
                <h3>Aloqa</h3>
                <div className="wrapper">
                    <div className="info-wrapper">
                        <div>
                            <h4>Administrator</h4>
                            <h4>Farg'ona viloyati</h4>
                            <h4>Mo'ljal</h4>
                        </div>
                        <div>
                            <h4>
                                <i className="fa fa-phone"></i>
                                +998 (99) 998 99 99
                            </h4>
                            <h4>
                                +998 (99) 998 99 99
                            </h4>
                            <h4>
                                <img src="/images/location.png" alt="img" />
                                Farg'ona viloyati
                            </h4>
                        </div>
                        <div>
                            <img src="/images/location.png" alt="img" />
                        </div>
                    </div>
                    <div className="map-wrapper">
                        {/* <Map/> */}
                        <p>
                        
                        </p>
                    </div>
                </div>
            </div>
            <div className="connect-image">
                <img src="./images/connectionlast.svg" alt="adsd" />
            </div>
        </div>
    )
}

export default withRouter(Connect)
