import React from 'react'
import gameData from '../classes/gameData'
import Board from './Board'
import SideBar from './SideBar'




export default class Display extends React.Component {

    rerender = () => {
        this.forceUpdate()
    }

    render(){
        gameData.rerender = this.rerender

        return <div className="App">
            <SideBar />
            <Board />
        </div>
    }
}