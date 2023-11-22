import { createContext } from 'react'

import useLocalStorage from '../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import * as authenticationService from '../services/authenticationService';

const AuthenticationContext = createContext();

export const AuthenticationProvider = ({
    children,
}) => {
    const [authentication, setAuthentication] = useLocalStorage('auth', {});

	const navigate = useNavigate();

	const loginHandler = async (values) => {
		console.log(values);

		authenticationService.login(values?.email, values?.password)
			.then((result) => {
				if (result.error || result?.code == 403)
					throw new Error(result.error);

				setAuthentication(result);
				localStorage.setItem('accessToken', result.accessToken);

				navigate(`/my-teams`);
			})
			.catch((error) => {
				console.log(error);
				navigate(`/error`);
			});
	}

	const registerHandler = async (values) => {
		console.log(values);

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
		localStorage.removeItem('accessToken');
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
            {children}
        </AuthenticationContext.Provider>
    );
};

AuthenticationContext.displayName = 'AuthenticationContext';

export default AuthenticationContext;