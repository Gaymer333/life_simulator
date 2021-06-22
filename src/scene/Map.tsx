import { moveScene, MoveButton } from "../components/Board"

const Map = () => <>
    <h1>Map</h1>
    <MoveButton sceneName="home" label="Home" />
    <MoveButton sceneName="canteen" label="Canteen" />
    <MoveButton sceneName="gym" label="gym" />
</>

export default Map