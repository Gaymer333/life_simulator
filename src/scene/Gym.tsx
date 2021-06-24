import React from "react"
import { DoStatAction } from "../classes/action"
import { MoveButton } from "../components/Board"

const WorkoutAction = () => {
    DoStatAction({
        actionChanges: [
            { statKey: "strength", actionMethod: "add", actionValue: 2 },
            { statKey: "energy", actionMethod: "remove", actionValue: 25 }
        ],
        actionRequirements: [
            { statKey: "energy", minValue: 25 }
        ],
        actionTime: { method: "add", hours: 1 }
    })
}

const Gym = () => <>
    <h1>Gym</h1>
    <i>What do you want to do?</i>
    <br />
    <button onClick={() => WorkoutAction()} >Workout</button>
    <br />
    <br />
    <MoveButton sceneName="map" label="Leave" />
</>

export default Gym