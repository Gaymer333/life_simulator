import React from 'react'
import { getStat, getStatMax } from '../function/stat'
import { StatHandlerType, stats } from '../types/stats'
import { tools } from '../types/tools'

type SideBarProps = tools
type StatBarProps = {
    statHandler: StatHandlerType,
    statName: stats,
    displayMax?: boolean,
    displayName?: string,
}

const StatBar = ({statHandler, statName, displayName, displayMax=true}: StatBarProps) => <>
    <h3>{displayName ?? statName}:</h3>
    {
        displayMax ?
            <p>{getStat(statHandler, statName)}/{getStatMax(statHandler, statName)}</p>
        :
            <p>{getStat(statHandler, statName)}</p>

    }
    
</>

const SideBar = ({statHandler}: SideBarProps) => <div className="SideBar">
    <h1>Life Simulator</h1>
    <h2>Status:</h2>
    <StatBar statHandler={statHandler} statName={stats.energy} displayName="Energy" />
    <StatBar statHandler={statHandler} statName={stats.money} displayName="Money" displayMax={false} />
</div>

export default SideBar