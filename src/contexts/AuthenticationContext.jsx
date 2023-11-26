import { createContext, useRef } from 'react'
import { Toast } from 'primereact/toast';

import useLocalStorage from '../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import * as authenticationService from '../services/authenticationService';

const AuthenticationContext = createContext();

const calculateAge = (endDate) => {
	const today = new Date();
	const birthDate = new Date(endDate);
  
	let age = today.getFullYear() - birthDate.getFullYear();
	const monthDiff = today.getMonth() - birthDate.getMonth();
  
	if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
	  age--;
	}
  
	return age;
  };

export const AuthenticationProvider = ({
	children,
}) => {
	const toast = useRef(null);

	const [authentication, setAuthentication] = useLocalStorage('auth', {});

	const navigate = useNavigate();

	const showError = (message) => {
		toast.current.show({ severity: 'error', summary: 'Error', detail: message, life: 5000 });
	}

	const loginHandler = async (values) => {
		console.log(values);

		authenticationService.login(values?.email, values?.password)
			.then((result) => {
				if (result.error)
					throw new Error(result.error);

				if (result?.code == 403) {
					showError('Wrong credentials!');
				}
				else {
					setAuthentication(result);

					navigate(`/my-profile`);
				}
			})
			.catch((error) => {
				console.log(error);
				navigate(`/error`);
			});
	}

	const registerHandler = async (values) => {
		debugger;

		console.log(values);

		values.age = calculateAge(values.dateOfBirth);

		authenticationService.register(values)
			.then((result) => {
				if (result.error || result?.code == 403)
					throw new Error(result.error);

				navigate(`/login`);
			})
			.catch((error) => {
				console.log(error);
				navigate(`/error`);
			});
	}

	const logoutHandler = () => {
		setAuthentication({});
		navigate(`/`);
	}

	const authenticationProviderValues = {
		loginHandler,
		registerHandler,
		logoutHandler,
		authentication,
		isAdmin: authentication.isAdmin,
		isAuthenticated: !!authentication.accessToken
	}

	return (
		<AuthenticationContext.Provider value={authenticationProviderValues}>
			<Toast ref={toast} />
			{children}
		</AuthenticationContext.Provider>
	);
};

AuthenticationContext.displayName = 'AuthenticationContext';

export default AuthenticationContext;