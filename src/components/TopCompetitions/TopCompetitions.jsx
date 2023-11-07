import styles from './TopCompetitions.module.css';

const TopCompetitions = () => {
	const topCompetitions = [
		{},
		{},
		{},
		{},
		{},
		{}
	]

	return (
		<div className={styles['top-competitions-section']}>
			<h3>Top Competitions</h3>
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
	)
}

export default TopCompetitions;