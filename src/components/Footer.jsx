import Copyright from "./Copyright";

const Footer = (props) => {
    return (
        <footer className="footer-section">
            <div className="container">
                <div className="row" style={{justifyContent: "center"}}>
                    <div className="col-lg-3">
                        <div className="widget mb-3">
                            <h3>Competitions</h3>
                            <ul className="list-unstyled links">
                                <li>
                                    <a href="#">Premier League</a>
                                </li>
                                <li>
                                    <a href="#">Bundesliga</a>
                                </li>
                                <li>
                                    <a href="#">La Lega</a>
                                </li>
                                <li>
                                    <a href="#">League 1</a>
                                </li>
                                <li>
                                    <a href="#">Seria A</a>
                                </li>
                                <li>
                                    <a href="#">Champions League</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="widget mb-3">
                            <h3>Social</h3>
                            <ul className="list-unstyled links">
                                <li>
                                    <a href="#">Twitter</a>
                                </li>
                                <li>
                                    <a href="#">Facebook</a>
                                </li>
                                <li>
                                    <a href="#">Instagram</a>
                                </li>
                                <li>
                                    <a href="#">Youtube</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <Copyright />
            </div>
        </footer>
    )
}

export default Footer;