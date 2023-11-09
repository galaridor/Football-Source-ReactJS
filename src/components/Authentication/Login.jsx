import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import styles from './Login.module.css'

const Login = () => {
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		console.log(formData);
	};

	return (
		<div className={styles['login-section']}>
			<h1 className={styles['login-title']}>Login Form</h1>
			<form className={styles['login-form']} onSubmit={handleSubmit}>
				<div className="p-fluid">
					<div className="p-field">
						<label htmlFor="username">Username</label>
						<InputText
							id="username"
							name="username"
							value={formData.username}
							onChange={handleInputChange}
						/>
					</div>

					<div className="p-field">
						<label htmlFor="password">Password</label>
						<InputText
							id="password"
							name="password"
							type="password"
							value={formData.password}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<Button className={styles['submit-btn']} type="submit" label="Login" />
			</form>
		</div>
	);
};

export default Login;