import { useState } from "react";

export const useForm = (initialValues) => {
	const [formValues, setFormValues] = useState(initialValues);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormValues({
			...formValues,
			[name]: value,
		});
	};

	const resetForm = () => {
		setFormValues(initialValues);
	};

	const setForm = (values) => {
		setFormValues(values);
	}

	return {
		formValues,
		handleInputChange,
		resetForm,
		setForm
	};
};