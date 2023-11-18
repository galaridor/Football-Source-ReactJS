import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import styles from './Login.module.css'
import { useForm } from '../../hooks/useForm';

const Login = () => {
	const { formValues, handleInputChange } = useForm({
		username: '',
		password: '',
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		console.log(formValues);
	};

	return (
		<div className={styles['login-section']}>
			<h1 className={styles['login-title']}>Login Form</h1>
			<form className={styles['login-form']} onSubmit={handleSubmit}>
				<div className="p-fluid">
					<div className="p-field">
						<label htmlFor="username">Username:</label>
						<InputText
							id="username"
							name="username"
							value={formValues.username}
							onChange={handleInputChange}
						/>
					</div>

					<div className="p-field">
						<label htmlFor="password">Password:</label>
						<InputText
							id="password"
							name="password"
							type="password"
							value={formValues.password}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<Button className={`${styles['submit-btn']} pi pi-sign-in`} type="submit" label=" Login" />
			</form>
		</div>
	);
};

export default Login;