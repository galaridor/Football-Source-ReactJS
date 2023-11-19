import { useEffect, useState } from 'react';
import Timer from '../Timer/Timer';
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from 'react-router-dom';
import UpcomingEventEditModal from './UpcomingEventEditModal';
import styles from './UpcomingEventsAdminPage.module.css';
import * as eventService from '../../services/eventService';
import { formatDateForTimer } from '../../utils/dateTimeUtils'
import UpcomingEventCreateModal from './UpcomingEventCreateModal';
import { UpcomingEventContext } from "../../contexts/UpcomingEventContext";

const UpcomingEventsAdminPage = () => {
	const [upcomingEvents, setUpcomingEvents] = useState([]);
	const [eventToEdit, setEventToEdit] = useState({});
	const [isEditModalOpen, setEditModalOpen] = useState(false);
	const [isCreateModalOpen, setCreateModalOpen] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		eventService
			.getAllUpcomingEvent()
			.then((result) => {
				if (result.error)
					throw new Error(result.error);

				setUpcomingEvents(result);
			})
			.catch((error) => {
				console.log(error);
				navigate(`/error`);
			});
	}, []);

	const cardHeader = (event) => (
		<img src={`${event?.imageUrl}`} alt="Missing Image" className={`${styles['card-image']}`} />
	);

	const editEventHandlerClick = (event) => {
		setEventToEdit(event);

		openEditModal();
	};

	const openEditModal = () => {
		setEditModalOpen(true);
	};

	const closeEditModal = () => {
		setEditModalOpen(false);
	};

	const createNewEventHandlerClick = () => {
		openCreateModal();
	};

	const openCreateModal = () => {
		setCreateModalOpen(true);
	};

	const closeCreateModal = () => {
		setCreateModalOpen(false);
	};

	const saveEditedEventHandler = async (event) => {
		closeEditModal();

		const updatedEvent = await eventService.update(event._id, event.name, event.imageUrl, event.description, event.startDate);

		setUpcomingEvents((prevEvents) =>
			prevEvents.map((ev) =>
				ev._id === event._id
					? {
						...ev,
						name: updatedEvent.name,
						description: updatedEvent.description,
						startDate: updatedEvent.startDate,
						imageUrl: updatedEvent.imageUrl
					}
					: ev
			)
		);
	};

	const saveNewEventHandler = async (event) => {
		closeCreateModal();

		const createdEvent = await eventService.create(event.name, event.imageUrl, event.description, event.startDate);

		setUpcomingEvents((state) => [...state, createdEvent]);
	};

	const deleteEventHandler = async (event) => {
		await eventService.remove(event._id);

		setUpcomingEvents((state) =>
			state.filter((currentEvent) => {
				return currentEvent._id !== event._id;
			})
		);
	};

	const cardFooter = (event) => (
		<div id="date-countdown">
			<Timer deadline={formatDateForTimer(event?.startDate)} />
			<div>
				<Button
					icon="pi pi-pencil"
					className="p-button-rounded p-button-text"
					onClick={() => editEventHandlerClick(event)}
				/>
				<Button
					icon="pi pi-trash"
					className="p-button-rounded p-button-text p-button-danger"
					onClick={() => deleteEventHandler(event)}
				/>
			</div>
		</div>
	);

	const upcomingEventsContextValue = {
		closeCreateModal,
		closeEditModal,
		saveEditedEventHandler,
		saveNewEventHandler
	};

	return (
		<UpcomingEventContext.Provider value={upcomingEventsContextValue}>
			<div className={`${styles['upcoming-events-section']}`}>
				<h1 className={`${styles['upcoming-events-title']}`}>All Upcoming Events</h1>
				<div className={`${styles['upcoming-events-container']}`}>
					{upcomingEvents.map((event) => (
						<div className={`${styles['card-container']}`} key={event._id}>
							<Card className={`${styles['card']}`} footer={cardFooter(event)} header={cardHeader(event)} title={event.name}>
								<div className={`${styles['card-content']}`}>
									<p className="text-black">
										{event?.description}
									</p>
								</div>
							</Card>
						</div>
					))}
					<div>
						<UpcomingEventEditModal
							isOpen={isEditModalOpen}
							currentEvent={eventToEdit}
						/>
					</div>
					<div>
						<UpcomingEventCreateModal
							isOpen={isCreateModalOpen}
						/>
					</div>
				</div>
				<div>
					<Button
						label=' Add New Upcoming Event'
						icon="pi pi-plus"
						className="p-button-rounded"
						onClick={createNewEventHandlerClick}
					/>
				</div>
			</div>
		</UpcomingEventContext.Provider>
	)
}

export default UpcomingEventsAdminPage;