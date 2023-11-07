import styles from './ResultOnFocus.module.css';

const ResultOnFocus = () => {
	return (
		<div className={styles['result-on-focus-section']}>
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="d-flex team-vs">
							<span className="score">4-1</span>
							<div className="team-1 w-50">
								<div className="team-details w-100 text-center">
									<img src="images/logo_1.png" alt="Image" className="img-fluid" />
									<h3>
										LA LEGA <span>(win)</span>
									</h3>
								</div>
							</div>
							<div className="team-2 w-50">
								<div className="team-details w-100 text-center">
									<img src="images/logo_2.png" alt="Image" className="img-fluid" />
									<h3>
										JUVENDU <span>(loss)</span>
									</h3>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ResultOnFocus;