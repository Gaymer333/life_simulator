import { DoStatAction } from "../classes/action";
import { MoveButton } from "../components/Board";

const NapAction = () => {
    DoStatAction({
        actionChanges: [
            { statKey: 'energy', actionMethod: 'add', actionValue: 25 }
        ],
        actionTime: { method: "add", hours: 4 }
    })
}

const SleepAction = () => {
    DoStatAction({
        actionChanges: [
            { statKey: "energy", actionMethod: "max" }
        ],
        actionTime: { method: "set", hours: 8, mins: 0 }
    })
}

const Home = () => <>
    <h1>Home</h1>
    <i>What do you want to do?</i>
    <br />
    <button onClick={() => SleepAction()} >Sleep</button>
    <button onClick={() => NapAction()} >Nap</button>
    <br />
    <br />
    <MoveButton sceneName="map" label="Leave" />
</>

export default Home