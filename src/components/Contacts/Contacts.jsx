import styles from './Contacts.module.css';

const Contacts = () => {
	return (
		<div className={`${styles['contacts-section']}`}>
			<div className={`${styles['contact-style']}`}>
				<ul className={`${styles['contact-list']}`}>
					<li className={`${styles['contact-item']}`}>
						<strong>Email:</strong> contact@example.com
					</li>
					<li className={`${styles['contact-item']}`}>
						<strong>Phone:</strong> +1 (123) 456-7890
					</li>
					<li className={`${styles['contact-item']}`}>
						<strong>Address:</strong> 123 Main St, City, Country
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Contacts;