import { useParams } from "react-router-dom";
import styles from './MatchesPage.module.css';
import Matches from "./Matches";

const MatchesPage = () => {
	const { alias } = useParams();

	return (
		<div className={styles['matches-page-section']}>
			<Matches alias={alias} type='competition' />
		</div>
	);
}

export default MatchesPage;