import React from 'react'
import Stat from '../classes/stat'
import gameData from '../classes/gameData'

type StatBarType = {
    stat: Stat
    showMaxValue?: boolean
}

const StatBar = ({stat, showMaxValue = true}: StatBarType) => <>
    <h3>{stat.name}:</h3>
    <p>{showMaxValue ?
        stat.value + " / " + stat.maxValue
        :
        stat.value
    }</p>
</>

export default class SideBar extends React.Component {

    rerender = () => {
        this.forceUpdate()
    }

    render(){
        gameData.rerender = this.rerender

        return <div className="SideBar">
            <h1>Life Simulator</h1>
            <h2>Day:</h2>
            <p>{gameData.time.renderDay()}</p>
            <h2>Time:</h2>
            <p>{gameData.time.renderTime()}</p>
            <h2>Status:</h2>
            <StatBar stat={gameData.getStat('money')} showMaxValue={false}/>
            <StatBar stat={gameData.getStat('energy')} />
        </div>
    }
}