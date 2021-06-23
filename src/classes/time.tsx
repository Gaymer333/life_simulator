import React from "react";

const dayNames = ["Monday", "Tuesday", "Wensday", "Thursday", "Friday", "Saturday", "Sunday"]

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
        console.log("this.mins > mins ? 60 - this.mins + mins : mins - this.mins:", this.mins > mins ? 60 - this.mins + mins : mins - this.mins)
        this.addMins(this.mins > mins ? 60 - this.mins + mins : mins - this.mins)
    }
    setHours(hours: number) {
        this.addHours(this.hours > hours ? 24 - this.hours + hours : hours - this.hours)
    }
    setDays(days: number) {
        this.addDays(this.dayOfWeek > days ? 7 - this.dayOfWeek + days : days - this.dayOfWeek)
    }

    renderDay = () => <>{dayNames[this.dayOfWeek - 1]}</>
    renderTime = () => <>{this.hours}:{this.mins < 10 ? "0" + this.mins : this.mins}</>
}