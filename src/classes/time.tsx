import React from "react";
import { SceenNames } from "../components/Board";
import { DoStatChangeType } from "./action";

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
    statChangeAction: Array<DoStatChangeType>
}

type DayNames = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday"

const dayNames: Array<DayNames> = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const events: Array<TimeEvent> = [{
    location: "all",
    dayOfWeek: "Tuesday",
    time: {
        hours: 0,
        mins: 0
    },
    statChangeAction: [
        {
            statKey: "strength",
            actionMethod: "remove",
            actionValue: 1
        }
    ]
},{
    location: "all",
    dayOfWeek: "all",
    time: {
        hours: 0,
        mins: 0
    },
    statChangeAction: [
        {
            statKey: "strength",
            actionMethod: "remove",
            actionValue: 1
        }
    ]
},{
    location: "all",
    dayOfWeek: "all",
    time: {
        hours: 12,
        mins: 15
    },
    statChangeAction: [
        {
            statKey: "strength",
            actionMethod: "remove",
            actionValue: 1
        }
    ]
},{
    location: "all",
    dayOfWeek: "all",
    time: {
        hours: 13,
        mins: 0
    },
    statChangeAction: [
        {
            statKey: "strength",
            actionMethod: "remove",
            actionValue: 1
        }
    ]
}]

const maxMinsInADay = 1440

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

    checkBetweenTwoMins = (beforeTimeInMins: number, afterTimeInMins: number, eventTimeInMins: number) => beforeTimeInMins < eventTimeInMins && eventTimeInMins <= afterTimeInMins

    checkTimeEvent = (beforeTime: TimeWrapper) => {
        const afterTime = this.getTimeWrapper()
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
                [...dayNames.slice(beforeTime.dayOfWeek - 1, dayNames.length), ...dayNames.slice(0, afterTime.dayOfWeek)]
        console.log("days:", days)
        
        const relevantEvents = events.filter(event => event.dayOfWeek === "all" || days.indexOf(event.dayOfWeek) > 0)

        const beforeTimeInMins = beforeTime.hours*60 + beforeTime.mins
        const afterTimeInMins = afterTime.mins * 60 + afterTime.mins
        let returnEvents: Array<TimeEvent> = []
        switch (days.length) {
            case 1:
                returnEvents = relevantEvents.filter(event => {
                    const eventTimeInMins = event.time.hours*60 + event.time.mins;
                    return this.checkBetweenTwoMins(beforeTimeInMins, afterTimeInMins, eventTimeInMins)
                })
                break
            case 2:
                returnEvents = relevantEvents.filter(event => {
                    const eventTimeInMins = event.time.hours*60 + event.time.mins;
                    const beforeCheck = this.checkBetweenTwoMins(beforeTimeInMins, maxMinsInADay, eventTimeInMins)
                    const afterCheck = this.checkBetweenTwoMins(-1, afterTimeInMins, eventTimeInMins)
                    if (event.dayOfWeek === "all") return beforeCheck || afterCheck
                    if (event.dayOfWeek === days[0]) return beforeCheck
                    else return afterCheck
                })
                break
        }
        console.log("returnEvents:", returnEvents)
    }

    renderDay = () => <>{dayNames[this.dayOfWeek - 1]}</>
    renderTime = () => <>{this.hours}:{this.mins < 10 ? "0" + this.mins : this.mins}</>
}