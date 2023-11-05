import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Header = () => {
	const [activeItem, setActiveItem] = useState('home');
	const location = useLocation();

	// useEffect to update the activeItem based on the URL path
	useEffect(() => {
		const pathName = location.pathname;

		// Define a mapping of keywords and their corresponding menu items
		const keywordMapping = {
			'/competitions': 'competitions',
			'/livescore': 'livescore',
			'/contacts': 'contacts',
		};

		// Check if the path contains a keyword and set the corresponding menu item as active
		for (const keyword in keywordMapping) {
			if (pathName.includes(keyword)) {
				setActiveItem(keywordMapping[keyword]);
				return;
			}
		}

		// If no keyword is found, set the default menu item as active
		setActiveItem('home');
	}, [location]);

	const toggleClass = (itemName) => {
		if (activeItem === itemName) {
			setActiveItem('home'); // Reset to the default when clicked again
		} else {
			setActiveItem(itemName);
		}
	};

	return (
		<header className="site-navbar py-4 header-section" role="banner">
			<div className="container">
				<div className="d-flex align-items-center">
					<div className="site-logo">
						<Link to="/"><img src="images/logo.png" alt="Logo" /></Link>
					</div>
					<div className="ml-auto">
						<nav className="site-navigation position-relative text-right" role="navigation">
							<ul className="site-menu main-menu js-clone-nav mr-auto d-none d-lg-block">
								<li onClick={() => toggleClass('home')} className={`nav-link ${activeItem === 'home' ? 'active' : ''}`}>
									<Link to="/">Home</Link>
								</li>
								<li onClick={() => toggleClass('competitions')} className={`nav-link ${activeItem === 'competitions' ? 'active' : ''}`}>
									<Link to="/competitions">Competitions</Link>
								</li>
								<li onClick={() => toggleClass('livescore')} className={`nav-link ${activeItem === 'livescore' ? 'active' : ''}`}>
									<Link to="/livescore">LiveScore</Link>
								</li>
								<li onClick={() => toggleClass('contacts')} className={`nav-link ${activeItem === 'contacts' ? 'active' : ''}`}>
									<Link to="/contacts">Contacts</Link>
								</li>
							</ul>
						</nav>
						<a href="#" className="d-inline-block d-lg-none site-menu-toggle js-menu-toggle text-black float-right text-white">
							<span className="icon-menu h3 text-white"></span>
						</a>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;