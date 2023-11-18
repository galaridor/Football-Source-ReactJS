import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import styles from './Register.module.css'
import { useForm } from '../../hooks/useForm';

const Register = () => {
	const { formValues, handleInputChange } = useForm({
		firstName: '',
		lastName: '',
		dob: null,
		imageUrl: '',
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		console.log(formValues);
	};

	return (
		<div className={styles['register-section']}>
			<h1 className={styles['register-title']}>Register Form</h1>
			<form className={styles['register-form']} onSubmit={handleSubmit}>
				<div className="p-fluid">
					<div className="p-field">
						<label htmlFor="firstName">First Name</label>
						<InputText
							id="firstName"
							name="firstName"
							value={formValues.firstName}
							onChange={handleInputChange}
						/>
					</div>

					<div className="p-field">
						<label htmlFor="lastName">Last Name</label>
						<InputText
							id="lastName"
							name="lastName"
							value={formValues.lastName}
							onChange={handleInputChange}
						/>
					</div>

					<div className="p-field">
						<label htmlFor="dob">Date of Birth</label>
						<Calendar
							id="dob"
							name="dob"
							value={formValues.dob}
							onChange={handleInputChange}
							dateFormat="dd/mm/yy"
						/>
					</div>

					<div className="p-field">
						<label htmlFor="imageUrl">Image Url</label>
						<InputText
							id="imageUrl"
							name="imageUrl"
							value={formValues.imageUrl}
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<Button className={`${styles['submit-btn']} pi pi-sign-in`} type="submit" label=" Register" />
			</form>
		</div>
	);
};

export default Register;