export const countdown = () => {
    const days = document.querySelector('.countdown__days-counter');
    const hours = document.querySelector('.countdown__hours-counter');
    const minutes = document.querySelector('.countdown__minutes-counter');
    const seconds = document.querySelector('.countdown__seconds-counter');
    const greetings = document.querySelector('.countdown__greetings');
    const greetingsYear = document.querySelector('.countdown__greetings-year');

    let timerId = setTimeout(function updateCountdown() {
        const nowUTC = new Date();
        let currentYearUTC = nowUTC.getUTCFullYear();
        const nowUTCTimestamp = Math.floor(nowUTC.getTime() / 1000);
        const nextNewYearUTC = new Date(Date.UTC(currentYearUTC + 1, 0, 1, 0, 0, 0));
        const newYearTimestamp = Math.floor(nextNewYearUTC.getTime() / 1000);
        const timestampUntilNewYear = newYearTimestamp - nowUTCTimestamp;
        const daysLeft = Math.floor(timestampUntilNewYear / 86400);
        const hoursLeft = Math.floor((timestampUntilNewYear % 86400) / 3600);
        const minutesLeft = Math.floor((timestampUntilNewYear % 3600) / 60);
        const secsLeft = Math.floor(timestampUntilNewYear % 60);

        days.innerText = daysLeft;
        hours.innerText = hoursLeft;
        minutes.innerText = minutesLeft;
        seconds.innerText = secsLeft;

        // Show New Year greetings instead of counter during first three days of new year
        const monthInUTC0 = nowUTC.getUTCMonth();
        const dayInUTC0 = nowUTC.getUTCDate();
        const firstDaysOfNewYear = monthInUTC0 === 0 && dayInUTC0 <= 3;

        if (firstDaysOfNewYear) {
            greetingsYear.innerText = currentYearUTC;
            greetings.classList.add('countdown__greetings_active');
        } else {
            greetings.classList.remove('countdown__greetings_active');
        }
        timerId = setTimeout(updateCountdown, 1000);
    }, 1000);
}
