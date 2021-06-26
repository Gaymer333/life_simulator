import React from 'react'
import gameData from '../classes/gameData'
import Canteen from '../scene/Canteen'
import Gym from '../scene/Gym'
import Home from '../scene/Home'
import Map from '../scene/Map'

export let CurrentSceen = Home
export let CurrentSceenName: SceenNames = "home" 

export type SceenNames = "map" | "canteen" | "home" | "gym"

export const MoveButton = ({ sceneName, label }: { sceneName: SceenNames, label: string }) => <button onClick={() => moveScene(sceneName)}>{label}</button>

export const moveScene = (sceenName: SceenNames) => {
    console.log("Heyya")
    CurrentSceenName = sceenName
    switch (sceenName) {
        case "map":
            CurrentSceen = Map
            break;
        case "canteen":
            CurrentSceen = Canteen
            break;
        case "home":
            CurrentSceen = Home
            break;
        case "gym":
            CurrentSceen = Gym
            break;
    }
    console.log(CurrentSceen)
    if (gameData.bordeRerender) gameData.bordeRerender()
}

export default class Board extends React.Component {

    rerender = () => {
        this.forceUpdate()
    }

    render() {
        gameData.bordeRerender = this.rerender

        return <div className="Board">
            <CurrentSceen />
        </div>
    }
}