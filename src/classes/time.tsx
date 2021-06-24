import React from "react";
import { SceenNames } from "../components/Board";

type TimeWrapper = {
    dayOfWeek: number,
    hours: number,
    mins: number
}

type TimeEvent = {
    location: SceenNames | "all",
    dayOfWeek: DayNames | "all",
    time: {
        hours: number,
        mins: number
    }
}

type DayNames = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"

const dayNames: Array<DayNames> = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const events: Array<TimeEvent> = [{
    location: "all",
    dayOfWeek: "all",
    time: {
        hours: 0,
        mins: 0
    }
}]


export default class Time {
    dayOfWeek = 1;
    hours = 12;
    mins = 15;

    addDays = (days: number) => {
        let newDaysValue = this.dayOfWeek + days;
        if (newDaysValue >= 8) {
            newDaysValue = newDaysValue % 7
        }
        this.dayOfWeek = newDaysValue
    }
    addHours = (hours: number) => {
        let newHoursValue = this.hours + hours;
        if (newHoursValue >= 24) {
            this.addDays(Math.floor(newHoursValue / 24))
            newHoursValue = newHoursValue % 24
        }
        this.hours = newHoursValue
    }
    addMins = (mins: number) => {
        let newMinsValue = this.mins + mins;
        if (newMinsValue >= 60) {
            this.addHours(Math.floor(newMinsValue / 60))
            newMinsValue = newMinsValue % 60
        }
        this.mins = newMinsValue
    }

    setMins(mins: number) {
        this.addMins(this.mins > mins ? 60 - this.mins + mins : mins - this.mins)
    }
    setHours(hours: number) {
        this.addHours(this.hours > hours ? 24 - this.hours + hours : hours - this.hours)
    }
    setDays(days: number) {
        this.addDays(this.dayOfWeek > days ? 7 - this.dayOfWeek + days : days - this.dayOfWeek)
    }

    turnTimeWrapperIntoTotalMins = (timeWrapper: TimeWrapper = this.getTimeWrapper()) => {
        return (timeWrapper.dayOfWeek * 60 * 24) + (timeWrapper.hours * 60) + timeWrapper.mins
    }

    getTimeWrapper = (): TimeWrapper => {
        return {
            dayOfWeek: this.dayOfWeek,
            hours: this.hours,
            mins: this.mins
        }
    }

    checkTimeEvent = (beforeTime: TimeWrapper) => {
        const beforeTimeInMins = this.turnTimeWrapperIntoTotalMins(beforeTime)
        const afterTime = this.getTimeWrapper()
        const afterTimeInMins = this.turnTimeWrapperIntoTotalMins(afterTime)
        console.log("beforeTime.dayOfWeek:", beforeTime.dayOfWeek)
        console.log("afterTime.dayOfWeek:", afterTime.dayOfWeek)
        const days: Array<DayNames | "all"> = beforeTime.dayOfWeek === afterTime.dayOfWeek
            ?
            dayNames.slice(afterTime.dayOfWeek - 1, afterTime.dayOfWeek)
            :
            beforeTime.dayOfWeek <= afterTime.dayOfWeek
                ?
                dayNames.slice(beforeTime.dayOfWeek - 1, afterTime.dayOfWeek)
                :
                [...dayNames.slice(0, afterTime.dayOfWeek), ...dayNames.slice(beforeTime.dayOfWeek - 1, dayNames.length)]
        console.log("days:", days)
    }

    renderDay = () => <>{dayNames[this.dayOfWeek - 1]}</>
    renderTime = () => <>{this.hours}:{this.mins < 10 ? "0" + this.mins : this.mins}</>
}