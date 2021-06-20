import React from 'react'
import { DoStatAction } from '../classes/action'


const WorkAction = () => {
    DoStatAction({
        actionRequirements: [{statKey: 'energy', minValue: 1}],
        actionChanges: [
            {statKey: 'money', actionMethod: 'add', actionValue: 50},
            {statKey: 'energy', actionMethod: 'remove', actionValue: 1}
        ],
        actionTime: {hours: 2}
    })
}
const SleepAction = () => {
    DoStatAction({actionChanges: [
        {statKey: 'energy', actionMethod: 'add', actionValue: 33}
    ]})
}

const Board = () => <div className="Board">
    <h1>What do you want to do?</h1>
    <button onClick={() => WorkAction()} >Work</button>
    <button onClick={() => SleepAction()} >Sleep</button>
</div>

export default Board