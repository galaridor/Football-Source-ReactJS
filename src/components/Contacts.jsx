const contactStyle = {
	textAlign: "center",
	padding: "20px",
	color: 'white'
};

const Contacts = () => {
	return (
		<div className="contacts-section">
			<div style={contactStyle}>
				<ul style={{ listStyleType: "none", padding: 0 }}>
					<li style={{ fontSize: "18px", margin: "10px 0" }}>
						Email: contact@example.com
					</li>
					<li style={{ fontSize: "18px", margin: "10px 0" }}>
						Phone: +1 (123) 456-7890
					</li>
					<li style={{ fontSize: "18px", margin: "10px 0" }}>
						Address: 123 Main St, City, Country
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Contacts;