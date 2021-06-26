import { DoStatAction } from "../classes/action"
import { MoveButton } from "../components/Board"


const WorkAction = () => {
    DoStatAction({
        actionRequirements: [{ statKey: 'energy', minValue: 1 }],
        actionChanges: [
            { statKey: 'money', actionMethod: 'add', actionValue: 50 },
            { statKey: 'energy', actionMethod: 'remove', actionValue: 20 }
        ],
        actionTime: { method: "add", hours: 2 }
    })
}

const Canteen = () => <>
    <h1>Canteen</h1>
    <button onClick={() => WorkAction()} >Work</button>
    <br />
    <br />
    <MoveButton sceneName="map" label="Leave" />
</>

export default Canteen