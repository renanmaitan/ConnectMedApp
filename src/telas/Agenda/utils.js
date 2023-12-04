function getAllDaysInMonth(month, year) {
    const firstDay = new Date(year, month-1, 1);
    const lastDay = new Date(year, month, 0);
    const days = [];
    for (let day = firstDay.getDate(); day <= lastDay.getDate(); day++) {
      days.push(day);
    }

    return days;
  }

export function getFreeDays(month, year, item) {
    const today = new Date();
    const days = getAllDaysInMonth(month, year);
    const workDays = item.workDays; // "0,1,2,3,4,5,6"
    const workDaysArray = workDays.split(",").map((day) => parseInt(day));
    const pastDays = days.filter((day) => {
        const currentDate = new Date(year, month - 1, day);
        if (!workDaysArray.includes(currentDate.getDay())) {
            return true;
        }
        if (currentDate.getMonth() == today.getMonth()) {
            return (currentDate.getDate() < today.getDate());
        }
        return (currentDate < today);
    });
    const freeDays = days.filter((day) => !pastDays.includes(day));
    return freeDays;
}

export function getFreeMonths(year) {
    const today = new Date();
    const months = [];
    for (let i = 1; i <= 12; i++) {
        const currentDate = new Date(year, i - 1, 1);
        if (currentDate > today || currentDate.getMonth() == today.getMonth()) {
            months.push(i);
        }
    }
    return months;
}

export function getFreeYears() {
    const today = new Date();
    return [today.getFullYear(), today.getFullYear() + 1];
}