import Copyright from "./Copyright";
import Socials from "./Socials";
import TopCompetitions from "./TopCompetitions";

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="container">
                <div className="row" style={{ justifyContent: "center" }}>
                    <div className="col-lg-3">
                        <div className="widget mb-3">
                            <TopCompetitions />
                        </div>
                    </div>
                    <div className="col-lg-3">
                        <div className="widget mb-3">
                            <Socials />
                        </div>
                    </div>
                </div>

                <Copyright />
            </div>
        </footer>
    )
}

export default Footer;