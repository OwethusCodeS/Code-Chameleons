const addEventButton = document.getElementById('addEventButton');
const eventModal = document.getElementById('eventModal');
const saveEventButton = document.getElementById('saveEventButton');
const calendar = document.querySelector('.calendar');
const selectedDateDisplay = document.getElementById('selectedDateDisplay');
let selectedDay = null;
let selectedDate = null;
let currentWeekStartDate = new Date('2024-10-01'); // Initial week start date

// Array to store events locally
let events = [];
let editingEventIndex = null; // Track which event is being edited

// Function to generate days of the current week
function generateWeekDays(startDate) {
    calendar.innerHTML = ''; // Clear the calendar before rendering
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    for (let i = 0; i < 7; i++) {
        let day = new Date(startDate);
        day.setDate(startDate.getDate() + i); // Set the day for each day of the week
        const dayOfWeek = daysOfWeek[day.getDay()];
        const dateNumber = day.getDate();

        // Create a day element for the calendar
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');
        dayElement.innerHTML = `<span class="date">${dateNumber} ${dayOfWeek}</span>`;
        dayElement.dataset.date = day.toISOString().split('T')[0]; // Store the full date in dataset

        // Display saved events for this day
        const dayEvents = events.filter(event => event.date === dayElement.dataset.date);
        dayEvents.forEach((event, index) => {
            dayElement.innerHTML += `
                <br>
                <span class="event">${event.name}</span><br>
                <span class="time-slot">${event.startTime} - ${event.endTime}</span>
                <button class="edit-event" data-event-index="${index}">Edit</button>
                <button class="delete-event" data-event-index="${index}">Delete</button>
            `;
        });

        // Add event listener to handle clicking on the day
        dayElement.addEventListener('click', function () {
            selectedDay = this;
            selectedDate = this.dataset.date;
            selectedDateDisplay.innerHTML = `Selected Date: ${selectedDate}`;
        });

        calendar.appendChild(dayElement); // Append each day element to the calendar grid
    }

    updateWeekDisplay(startDate); // Update the week header

    // Add event listeners for edit and delete buttons
    document.querySelectorAll('.edit-event').forEach(button => {
        button.addEventListener('click', function () {
            const eventIndex = this.dataset.eventIndex;
            const eventToEdit = events[eventIndex];
            editingEventIndex = eventIndex; // Set the event being edited

            // Pre-fill the modal with the event details
            document.getElementById('eventTitle').value = eventToEdit.name;
            document.getElementById('startTime').value = eventToEdit.startTime;
            document.getElementById('endTime').value = eventToEdit.endTime;

            eventModal.style.display = 'flex'; // Show modal
        });
    });

    document.querySelectorAll('.delete-event').forEach(button => {
        button.addEventListener('click', function () {
            const eventIndex = this.dataset.eventIndex;
            if (confirm('Are you sure you want to delete this event?')) {
                events.splice(eventIndex, 1); // Remove event from array
                generateWeekDays(currentWeekStartDate); // Refresh calendar
            }
        });
    });
}

// Function to update the week displayed in the header
function updateWeekDisplay(startDate) {
    const month = startDate.toLocaleString('default', { month: 'long' });
    const year = startDate.getFullYear();
    const dayStart = startDate.getDate();
    const dayEnd = new Date(startDate.getTime() + (6 * 24 * 60 * 60 * 1000)).getDate(); // End of the week (7th day)
    document.getElementById('currentWeek').innerHTML = `${month} ${dayStart} - ${dayEnd}, ${year}`;
}

// Open modal when "Add Event" is clicked
addEventButton.addEventListener('click', () => {
    if (selectedDay) {
        editingEventIndex = null; // Reset the editing state
        eventModal.style.display = 'flex'; // Show modal
        document.getElementById('eventTitle').value = ''; // Clear inputs
        document.getElementById('startTime').value = '';
        document.getElementById('endTime').value = '';
    } else {
        alert('Please select a day first.');
    }
});

// Save or edit event and close modal
saveEventButton.addEventListener('click', () => {
    const eventName = document.getElementById('eventTitle').value;
    const eventTimeStart = document.getElementById('startTime').value;
    const eventTimeEnd = document.getElementById('endTime').value;

    if (eventName && eventTimeStart && eventTimeEnd) {
        if (editingEventIndex !== null) {
            // Edit existing event
            events[editingEventIndex] = {
                ...events[editingEventIndex],
                name: eventName,
                startTime: eventTimeStart,
                endTime: eventTimeEnd,
            };
        } else {
            // Add new event to the array
            events.push({
                id: Date.now(), // Unique ID for each event
                name: eventName,
                date: selectedDate,
                startTime: eventTimeStart,
                endTime: eventTimeEnd
            });
        }

        generateWeekDays(currentWeekStartDate); // Refresh calendar
        eventModal.style.display = 'none'; // Close modal
    }
});

// Close modal if clicked outside
window.onclick = function (event) {
    if (event.target == eventModal) {
        eventModal.style.display = 'none';
    }
};

// Move to the previous week
document.getElementById('prevWeekButton').addEventListener('click', () => {
    currentWeekStartDate.setDate(currentWeekStartDate.getDate() - 7);
    generateWeekDays(currentWeekStartDate);
});

// Move to the next week
document.getElementById('nextWeekButton').addEventListener('click', () => {
    currentWeekStartDate.setDate(currentWeekStartDate.getDate() + 7);
    generateWeekDays(currentWeekStartDate);
});

// Initialize the calendar with the current week
generateWeekDays(currentWeekStartDate);
