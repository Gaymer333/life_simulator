import { DoStatAction } from "../classes/action";
import { MoveButton } from "../components/Board";

const SleepAction = () => {
    DoStatAction({
        actionChanges: [
            { statKey: 'energy', actionMethod: 'add', actionValue: 33 }
        ]
    })
}

const Home = () => <>
    <h1>Home</h1>
    <i>What do you want to do?</i>
    <br />
    <button onClick={() => SleepAction()} >Sleep</button>
    <br />
    <br />
    <MoveButton sceneName="map" label="Leave" />
</>

export default Home