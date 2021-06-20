import React from "react";
import Stat from "./stat";
import Time from "./time";

export type StatKeys = "money" | "energy"

class GameData {
    public time = new Time()
    public rerender: null | (() => void) = null

    private Stats: {[key in StatKeys]: Stat} = {
        money: new Stat({key: "money", name: "Money", minValue: 0}),
        energy: new Stat({key: "energy", name: "Energy", minValue: 0, maxValue: 100, startValue: 100})
    }

    public getStat = (statKey: StatKeys): Stat => {
        return this.Stats[statKey]
    }
}

export default new GameData()