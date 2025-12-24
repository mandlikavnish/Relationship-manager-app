document.addEventListener("DOMContentLoaded", function () {
    const monthYear = document.getElementById("month-year");
    const calendarDays = document.getElementById("calendar-days");
    const prevMonthBtn = document.getElementById("prev-month");
    const nextMonthBtn = document.getElementById("next-month");
    const backBtn = document.getElementById("back-btn"); // Back button reference

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();

    function renderCalendar() {
        calendarDays.innerHTML = "";
        let firstDay = new Date(currentYear, currentMonth, 1).getDay();
        let lastDate = new Date(currentYear, currentMonth + 1, 0).getDate();

        monthYear.textContent = new Date(currentYear, currentMonth).toLocaleString('en-US', { month: 'long', year: 'numeric' });

        for (let i = 0; i < firstDay; i++) {
            let emptyDiv = document.createElement("div");
            emptyDiv.classList.add("empty-day");
            calendarDays.appendChild(emptyDiv);
        }

        for (let i = 1; i <= lastDate; i++) {
            let dayDiv = document.createElement("div");
            dayDiv.textContent = i;
            dayDiv.classList.add("calendar-day");
            calendarDays.appendChild(dayDiv);
        }
    }

    prevMonthBtn.addEventListener("click", function () {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
    });

    nextMonthBtn.addEventListener("click", function () {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
    });

    backBtn.addEventListener("click", function () {
        window.location.href = "homepage.html"; // Redirects back to homepage
    });

    renderCalendar();
});
