import { DoStatAction } from "../classes/action"
import { moveScene } from "../components/Board"


const WorkAction = () => {
    DoStatAction({
        actionRequirements: [{ statKey: 'energy', minValue: 1 }],
        actionChanges: [
            { statKey: 'money', actionMethod: 'add', actionValue: 50 },
            { statKey: 'energy', actionMethod: 'remove', actionValue: 20 }
        ],
        actionTime: { hours: 2 }
    })
}

const Canteen = () => <>
    <button onClick={() => WorkAction()} >Work</button>
    <br />
    <br />
    <button onClick={() => moveScene("map")}>Map</button>
</>

export default Canteen