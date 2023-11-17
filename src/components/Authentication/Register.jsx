import { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import styles from './Register.module.css'

const Register = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		dob: null,
		imageUrl: '',
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleImageInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		});
	}

	const handleDateChange = (e) => {
		setFormData({
			...formData,
			dob: e.value,
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		console.log(formData);
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
							value={formData.firstName}
							onChange={handleInputChange}
						/>
					</div>

					<div className="p-field">
						<label htmlFor="lastName">Last Name</label>
						<InputText
							id="lastName"
							name="lastName"
							value={formData.lastName}
							onChange={handleInputChange}
						/>
					</div>

					<div className="p-field">
						<label htmlFor="dob">Date of Birth</label>
						<Calendar
							id="dob"
							name="dob"
							value={formData.dob}
							onChange={handleDateChange}
							dateFormat="dd/mm/yy"
						/>
					</div>

					<div className="p-field">
						<label htmlFor="imageUrl">Image Url</label>
						<InputText
							id="imageUrl"
							name="imageUrl"
							value={formData.imageUrl}
							onChange={handleImageInputChange}
						/>
					</div>
				</div>

				<Button className={`${styles['submit-btn']} pi pi-sign-in`} type="submit" label=" Register" />
			</form>
		</div>
	);
};

export default Register;