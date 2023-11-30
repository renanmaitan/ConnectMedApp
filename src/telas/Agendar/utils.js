

export async function getFreeHours(dia, mes, ano, startHour, endHour, getSchedules) {
    date = new Date()
    const isToday = dia == date.getDate() && mes == date.getMonth() + 1 && ano == date.getFullYear()
    const schedules = await getSchedules()
    const localFreeHours = []
    const busyHours = []
    const pastHours = []
    const notPastHours = []
    const notAvailableHours = []
    for (let i = startHour; i < endHour; i++) {
        const hour00 = `${i}:00`
        const hour30 = `${i}:30`
        if (isToday && i <= date.getHours()) {
            pastHours.push(hour00, hour30)
            if (i === date.getHours() && date.getMinutes() >= 30) {
                pastHours.push(`${i + 1}:00`)
                notPastHours.push(`${i + 1}:30`)
                i++
            }
        } else {
            notPastHours.push(hour00, hour30)
        }
    }
    schedules.forEach((schedule) => {
        let day = schedule.date.split("-")[0]
        let month = schedule.date.split("-")[1]
        let year = schedule.date.split("-")[2]
        let hour = schedule.time.split(":")[0]
        let minute = schedule.time.split(":")[1]
        if (day == dia && month == mes && year == ano) {
            busyHours.push(`${hour}:${minute}`)
        }
    })
    notPastHours.forEach((hour, i) => {
        if (!busyHours.includes(hour)) {
            localFreeHours.push({ id: i, label: hour })
        } else {
            notAvailableHours.push(hour)
        }
    })
    return localFreeHours
}

function getAllDaysInMonth(month, year) {
    const firstDay = new Date(year, month-1, 1);
    const lastDay = new Date(year, month, 0);
    const days = [];
    for (let day = firstDay.getDate(); day <= lastDay.getDate(); day++) {
      days.push(day);
    }

    return days;
  }

export function getFreeDays(month, year) {
    const today = new Date();
    const days = getAllDaysInMonth(month, year);
    const pastDays = days.filter((day) => {
        const currentDate = new Date(year, month - 1, day);
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