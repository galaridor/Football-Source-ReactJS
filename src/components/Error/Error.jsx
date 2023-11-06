import styles from './Error.module.css';

const Error = () => {
	return (
		<div className={`${styles['error-section']}`}>
			<h1>NOT FOUND 404!</h1>
		</div>
	)
}

export default Error;