import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Timer from '../Timer/Timer';
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import UpcomingEventEditModal from './UpcomingEventEditModal';
import UpcomingEventCreateModal from './UpcomingEventCreateModal';
import DeleteModal from '../Modals/DeleteModal';

import { formatDateForTimer } from '../../utils/dateTimeUtils'
import * as eventService from '../../services/eventService';
import { UpcomingEventContext } from "../../contexts/UpcomingEventContext";
import AuthenticationContext from '../../contexts/AuthenticationContext';

import styles from './UpcomingEventsAdminPage.module.css';

const UpcomingEventsAdminPage = () => {
	const [upcomingEvents, setUpcomingEvents] = useState([]);
	const [selectedEvent, setSelectedEvent] = useState({});
	const [isEditModalOpen, setEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isCreateModalOpen, setCreateModalOpen] = useState(false);

	const navigate = useNavigate();

	const { showSuccess, showError } = useContext(AuthenticationContext);

	const validateEvent = (event) => {
		if (event.name.trim() == '') {
			showError(`'Name' is required`)

			return false
		}

		if (event.description.trim() == '') {
			showError(`'Description' is required`)

			return false
		}

		if (!event.startDate) {
			showError(`'Start Date' is required`)

			return false
		}

		if (new Date(event.startDate) < new Date()) {
			showError('Cannot create event in the past')

			return false
		}

		return true;
	}

	useEffect(() => {
		eventService
			.getAllUpcomingEvent()
			.then((result) => {
				if (result) {
					setUpcomingEvents(result);
				}
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
		setSelectedEvent(event);

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
	
	const openDeleteModal = () => {
		setIsDeleteModalOpen(true);
	};

	const closeDeleteModal = () => {
		setIsDeleteModalOpen(false);
	};
	
	const saveEditedEventHandler = async (event) => {
		if (validateEvent(event) == true) {

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

			showSuccess('Successfully edited event');
		}
	};

	const saveNewEventHandler = async (event) => {
		if (validateEvent(event) == true) {
			closeCreateModal();

			const createdEvent = await eventService.create(event.name, event.imageUrl, event.description, event.startDate);

			setUpcomingEvents((state) => [...state, createdEvent]);

			showSuccess('Successfully added new event');
		}
	};

	const deleteEventHandlerClick = async (event) => {
		setSelectedEvent(event);
		openDeleteModal();
	};

	const deleteEventHandler = async (_id) => {
		await eventService.remove(_id);

		setUpcomingEvents((state) =>
			state.filter((currentEvent) => {
				return currentEvent._id !== _id;
			})
		);

		closeDeleteModal();

		showSuccess('Successfully deleted event');
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
					onClick={() => deleteEventHandlerClick(event)}
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
							currentEvent={selectedEvent}
						/>
					</div>
					<div>
						<UpcomingEventCreateModal
							isOpen={isCreateModalOpen}
						/>
					</div>
					<div>
						<DeleteModal
							isOpen={isDeleteModalOpen}
							closeDeleteModal={closeDeleteModal}
							onConfirm={deleteEventHandler}
							_id={selectedEvent?._id}
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