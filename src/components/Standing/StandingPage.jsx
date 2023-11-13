import { useParams } from "react-router-dom";
import styles from './StandingPage.module.css';
import Standing from "./Standing";

const StandingPage = () => {
	const { alias, type } = useParams();

	return (
        <div className={styles['standing-page-section']}>
            <Standing alias={alias} type={type}/>
        </div>
    )
};

export default StandingPage;