import styles from './Contacts.module.css';
import Map from '../Map/Map';

const Contacts = () => {
	const contacts = {
		email: 'contact@example.com',
		phone: '+1 (123) 456-7890',
		address: '123 Main St, City, Country'
	};

	return (
		<div className={`${styles['contacts-section']}`}>
			<div className={`${styles['contact-style']}`}>
				<ul className={`${styles['contact-list']}`}>
					<li className={`${styles['contact-item']}`}>
						<strong>Email:</strong> {contacts.email}
					</li>
					<li className={`${styles['contact-item']}`}>
						<strong>Phone:</strong> {contacts.phone}
					</li>
					<li className={`${styles['contact-item']}`}>
						<strong>Address:</strong> {contacts.address}
					</li>
				</ul>
			</div>
			<div className='map-location'>
				<Map address={contacts.address} phone={contacts.phone}/>
			</div>
		</div>
	);
};

export default Contacts;