const calendarGrid = document.getElementById('calendarGrid');
const currentMonthElement = document.getElementById('currentMonth');
const modal = document.getElementById('commentModal');
const closeBtn = document.getElementsByClassName('close')[0];
const modalDate = document.getElementById('modalDate');
const commentText = document.getElementById('commentText');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
let currentDate = new Date();
let selectedDate;
const today = new Date();

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    currentMonthElement.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;
    calendarGrid.innerHTML = '';

    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
        const dayElement = createDayElement(prevMonthLastDay - i, true, new Date(year, month - 1, prevMonthLastDay - i));
        calendarGrid.appendChild(dayElement);
    }

    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = createDayElement(day, false, new Date(year, month, day));
        calendarGrid.appendChild(dayElement);
    }

    const remainingDays = 42 - (startingDay + daysInMonth);
    for (let day = 1; day <= remainingDays; day++) {
        const dayElement = createDayElement(day, true, new Date(year, month + 1, day));
        calendarGrid.appendChild(dayElement);
    }
}

function createDayElement(day, isOtherMonth, date) {
    const dayElement = document.createElement('div');
    dayElement.classList.add('calendar-day');
    if (isOtherMonth) {
        dayElement.classList.add('other-month');
    }
    if (date.toDateString() === today.toDateString()) {
        dayElement.classList.add('current-day');
    }
    dayElement.textContent = day;
    dayElement.addEventListener('click', () => openCommentModal(date.getFullYear(), date.getMonth(), day));

    const dateKey = `${date.getFullYear()}-${date.getMonth()}-${day}`;
    const comment = localStorage.getItem(dateKey);
    if (comment) {
        dayElement.classList.add('has-comment');
        dayElement.title = comment;
    }

    return dayElement;
}

function openCommentModal(year, month, day) {
    selectedDate = new Date(year, month, day);
    modalDate.textContent = selectedDate.toDateString();
    const dateKey = `${year}-${month}-${day}`;
    commentText.value = localStorage.getItem(dateKey) || '';
    modal.style.display = 'block';
}

function saveComment() {
    const comment = commentText.value;
    const dateKey = `${selectedDate.getFullYear()}-${selectedDate.getMonth()}-${selectedDate.getDate()}`;
    if (comment) {
        localStorage.setItem(dateKey, comment);
    } else {
        localStorage.removeItem(dateKey);
    }
    modal.style.display = 'none';
    renderCalendar();
}

closeBtn.onclick = () => modal.style.display = 'none';
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

renderCalendar();