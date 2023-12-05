import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../Config";
import { getDeleteDays, getDeleteHours } from "../services/services";

async function getSchedules(item) {
    const schedulesRef = collection(db, "scheduling")
    const q = query(schedulesRef, where("doctorUid", "==", item.uid))
    const querySnapshot = await getDocs(q)
    const schedules = []
    querySnapshot.forEach((doc) => {
        schedules.push(doc.data())
    })
    return schedules
}

export async function getFreeHours(dia, mes, ano, item) {
    const date = new Date()
    const isToday = dia == date.getDate() && mes == date.getMonth() + 1 && ano == date.getFullYear()
    const schedules = await getSchedules(item)
    const localFreeHours = []
    const busyHours = []
    const pastHours = []
    const notPastHours = []
    const notAvailableHours = []
    const startHour = parseInt(item.startHour)
    const endHour = parseInt(item.endHour)
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
    await getDeleteHours(item, dia, mes, ano)
        .then((deleteHours) => {
            deleteHours.forEach((deleteHour) => {
                busyHours.push(deleteHour.hour)
            })
        })
        .catch((error) => {
            console.log(error)
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

export async function getFreeDays(month, year, item) {
    const today = new Date();
    const days = getAllDaysInMonth(month, year);
    const workDays = item.workDays;
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
    await getDeleteDays(item, month, year)
        .then((deleteDays) => {
            deleteDays.forEach((deleteDay) => {
                pastDays.push(deleteDay.day)
            })
        })
        .catch((error) => {
            console.log(error)
        })
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