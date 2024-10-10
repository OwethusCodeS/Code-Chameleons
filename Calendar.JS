
        const addEventButton = document.getElementById('addEventButton');
        const eventModal = document.getElementById('eventModal');
        const saveEventButton = document.getElementById('saveEventButton');
        const calendar = document.querySelector('.calendar');
        const selectedDateDisplay = document.getElementById('selectedDateDisplay');
        let selectedDay = null;
        let selectedDate = null;
        let currentWeekStartDate = new Date('2024-08-01'); // Initial week start date (this can be any desired start date)
        
        // Array to store events
        let events = [];

        // Function to generate days of the current week
        function generateWeekDays(startDate) {
            calendar.innerHTML = ''; // Clear the calendar before rendering
            const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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
                dayEvents.forEach(event => {
                    dayElement.innerHTML += `
                        <br>
                        <span class="event">${event.name}</span><br>
                        <span class="time-slot">${event.startTime} - ${event.endTime}</span>
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
                eventModal.style.display = 'flex'; // Show modal
            } else {
                alert('Please select a day first.'); // Prompt to select a day
            }
        });

        // Save event and close modal
        saveEventButton.addEventListener('click', () => {
            const eventName = document.getElementById('eventName').value;
            const eventTimeStart = document.getElementById('eventTimeStart').value;
            const eventTimeEnd = document.getElementById('eventTimeEnd').value;

            // Add event to the selected day if all fields are provided
            if (eventName && eventTimeStart && eventTimeEnd) {
                if (selectedDay) {
                    events.push({
                        date: selectedDate,
                        name: eventName,
                        startTime: eventTimeStart,
                        endTime: eventTimeEnd
                    });
                    generateWeekDays(currentWeekStartDate); // Refresh calendar to display new event
                    eventModal.style.display = 'none'; // Hide modal after adding event
                }
            }
        });

        // Close the modal if clicked outside
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
  
