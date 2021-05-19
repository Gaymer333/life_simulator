import React from 'react'
import { changeStat, getStat } from '../function/stat'
import { StatHandlerType, stats } from '../types/stats'
import { tools } from '../types/tools'

type DisplayProps = tools
type ActionProps = {
    statHandler: StatHandlerType
}

const ActionDisplay = ({statHandler}: ActionProps) => {
    
}

const work = ({statHandler}: ActionProps) => {
    changeStat(statHandler, stats.energy, -10)
    changeStat(statHandler, stats.money, 10)
}

const sleep = ({statHandler}: ActionProps) => {
    changeStat(statHandler, stats.energy, 10)
}

const Board = ({statHandler}: DisplayProps) => <div className="Board">
    <h1>What do you want to do?</h1>
    <button onClick={() => sleep({statHandler})}>Sleep</button>
    <button onClick={() => work({statHandler})}>Work</button>
</div>

export default Board