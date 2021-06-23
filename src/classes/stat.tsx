import React from "react"
import gameData from "./gameData";

type StatType = {
    key: string
    name: string
    startValue?: number
    minValue?: number
    maxValue?: number
}

export default class Stat {
    readonly key: string;
    readonly name: string;
    readonly minValue: number;
    readonly maxValue: number;

    value: number;

    constructor(consData: StatType) {
        this.key = consData.key;
        this.name = consData.name;
        this.value = consData.startValue ?? 0;
        this.minValue = consData.minValue ?? Number.MIN_SAFE_INTEGER;
        this.maxValue = consData.maxValue ?? Number.MAX_SAFE_INTEGER;
    }

    AddValue = (value: number): void => {
        const newValue = this.value + value
        this.value = newValue > this.maxValue ? this.maxValue : newValue
    }

    RemoveValue = (value: number): void => {
        const newValue = this.value - value
        this.value = newValue < this.minValue ? this.minValue : newValue
    }

    SetToMax() {
        this.value = this.maxValue
    }
}