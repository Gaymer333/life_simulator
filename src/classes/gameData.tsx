import React from "react";
import Stat from "./stat";
import Time from "./time";

export type StatKeys = "money" | "energy" | "strength"

class GameData {
    public time = new Time()
    public bordeRerender: null | (() => void) = null
    public sidebarRerender: null | (() => void) = null

    private Stats: { [key in StatKeys]: Stat } = {
        money: new Stat({ key: "money", name: "Money", minValue: 0 }),
        energy: new Stat({ key: "energy", name: "Energy", minValue: 0, maxValue: 100, startValue: 100 }),
        strength: new Stat({ key: "strength", name: "Strength", minValue: 0, maxValue: 100, startValue: 10 }),
    }

    public getStat = (statKey: StatKeys): Stat => {
        return this.Stats[statKey]
    }
}

export default new GameData()