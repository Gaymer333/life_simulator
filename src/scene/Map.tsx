import { moveScene } from "../components/Board"

const Map = () => <>
    <h1>Map</h1>
    <button onClick={() => moveScene("home")}>Home</button>
    <button onClick={() => moveScene("canteen")}>Canteen</button>
</>

export default Map