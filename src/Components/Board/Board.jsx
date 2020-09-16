import React, { Component } from "react";
import Node from './Node/Node'
import './BoardStyle.css'
import A_Start from '../Board/Algorithms/A_start_algorithm'

let NormalGrid = null;
const NUMBER_OF_ROWS  = 20;
const NUMBER_OF_COLMS = 50;
let FirstTime = true
const Start_node_row = 0
const Start_node_colm = 0

const finish_node_row = 19
const finish_node_colm = 49     

var First_Grid = [];
var First_Grid_condition = true;

var GlobalCondition = true;
var SpeedOfAnimation = null;

var RandomObistcalesValue = false
var RandomObistcalesObject = document.getElementById("random-generator");
var slider = document.getElementById("myRange");
slider.addEventListener('input' , (e)=>{
    e.preventDefault();
    document.getElementById("slider-value").innerHTML = slider.value;
})
RandomObistcalesObject.addEventListener('click' , (e)=>{
    e.preventDefault();
    RandomObistcalesValue = true;
})



class Board extends Component{
    constructor(props){
        super(props);
        this.state = {
            grid : [],
            MousePressedOn : false,
        }

    }



    componentDidMount(){
        const grid = CreateInitialGrid();
        if(First_Grid_condition === true){
          for(var i = 0;i<grid.length;i++){
            let temp_array = [];
            for(var j = 0;j<grid[0].length;j++){
                temp_array.push(grid[i][j]);
            }
            First_Grid.push(temp_array);
          }
        }
        // console.log(First_Grid);
        this.setState({grid});
    }

    hadnleMouseDown(col , row){
        const newGrid = getNewGridAfterChange(this.state.grid , col , row);
        this.setState({grid : newGrid , MousePressedOn : true});

        // console.log(this.state.MousePressedOn)
    }
    hadnleMouseonHold(col , row){
        // console.log(this.state.MousePressedOn)

        if(!this.state.MousePressedOn ) return;
        const newGrid = getNewGridAfterChange(this.state.grid , col , row);
        this.setState({grid : newGrid});


    }
    MouseUp(){
      this.setState({MousePressedOn : false});

    //   console.log(this.state.MousePressedOn)
    }
    ResetBoard(){
        let newGrid = CreateInitialGrid();

        for(var i = 0; i <NUMBER_OF_COLMS;i++){
            for(var j = 0; j <NUMBER_OF_ROWS;j++){
                if(i == Start_node_colm && j == Start_node_row){
                    document.getElementById('node-'+i+'-'+j).className = 'node node-start'
                }else if(i == finish_node_colm && j == finish_node_row){
                    document.getElementById('node-'+i+'-'+j).className = 'node node-finish'
                }else{
                    document.getElementById('node-'+i+'-'+j).className = 'node'
                }
             
            }
        }

        GlobalCondition = true;
        RandomObistcalesValue = false;
        this.setState({grid : newGrid});
    }
    startAlgorithm(){
        console.log(document.getElementById('slow').checked);
        if(document.getElementById('slow').checked) {
            SpeedOfAnimation = 50;
        }
        if(document.getElementById('Moderate').checked) {
            SpeedOfAnimation = 30;
        }
        if(document.getElementById('Fast').checked) {
            SpeedOfAnimation = 10;
        }

        console.log(SpeedOfAnimation);

        if(FirstTime == true){
            NormalGrid = this.state.grid
        }
        this.setState({grid:NormalGrid});
        var counter = 0;
        var closeset = A_Start(this.state.grid[Start_node_colm][Start_node_row],this.state.grid[finish_node_colm][finish_node_row],this.state.grid)
        var last_node = closeset[closeset.length-1]
        var ShortestPath = []
        while(last_node.ParentNode !=null){
            ShortestPath.push(last_node.ParentNode);
            last_node = last_node.ParentNode;
        }
        ShortestPath.reverse();
       
        for(let i = 1;i<closeset.length-1;i++){
            if(i === closeset.length-2){
                setTimeout(()=>{
                  animateTheShortestPath(ShortestPath);
                }, SpeedOfAnimation * i)
            }
            setTimeout(()=>{
                const Node = closeset[i];
                Node.is_visted_node = true;
                document.getElementById('node-'+Node.col+'-'+Node.row).className = 'node node-visited';
            }, SpeedOfAnimation * i)
        }

    }
    render(){
        if(GlobalCondition === true){
            const my_interval = setInterval(() => {
                var condition = false
                if(RandomObistcalesValue === true){
                    const val = slider.value;
                    condition = true;
                    var newGrid = this.state.grid.slice();
                    for(var i = 0; i<newGrid.length; i++){
                        for(var j = 0;j<newGrid[0].length;j++){
                            if( Math.random() <= val/100 ){
                                if((i == Start_node_colm && j == Start_node_row) || (i == finish_node_colm && j == finish_node_row)){

                                }else{
                                    newGrid = getNewGridAfterChange(this.state.grid , i , j);
                                }
                             
                            }
                        }
                    }
                    // console.log(newGrid)
                    this.setState({gtid : newGrid});
                }
                if(condition == true){
                    clearInterval(my_interval);
                }
                
            }, 100);
            GlobalCondition = false;
        }
        

        const {grid , MousePressedOn} = this.state;
        return(
            <React.Fragment>
            <div id="button-wrapper">
                <button className="btn btn-primary Start-button" onClick={() => this.startAlgorithm()}>Start</button>
                <button className="btn btn-outline-secondary Delete-button" onClick={() => this.ResetBoard()}>Reset</button>
            </div>
           
            <div className="Board-container">
                {grid.map((col , colIndex)=>{
                    return(
                    <div className={"col col" + colIndex}>
                        {col.map((NodeElement , NodeIndex) =>{
                            const {col , row , isFinish , isStart , isWall} = NodeElement
                            return(
                                <Node
                                key = {NodeIndex}
                                col = {col}
                                row = {row}
                                iswall = {isWall}
                                isStart = {isStart}
                                isFinshed = {isFinish}
                                MousePressedOn = {MousePressedOn}
                                mouseDown = {(col , row) => this.hadnleMouseDown(col , row)}
                                mouseUp = {() => this.MouseUp()}
                                mouseOnHold = {(col , row) => this.hadnleMouseonHold(col , row)}
                                ></Node>
                                
                            );
                        })}
                    </div>
                    );
                })}
            </div>
            </React.Fragment>
           
        )
    }
}


const CreateInitialGrid = () =>{
    const grid = [];
    for(var i = 0; i <NUMBER_OF_COLMS;i++){
        grid.push(Array(NUMBER_OF_ROWS));
    }
    for(var i = 0; i <NUMBER_OF_COLMS;i++){
        for(var j = 0; j <NUMBER_OF_ROWS;j++){
            grid[i][j] = CreateNode(i,j);
        }
        
    }
    return grid;
}
const animateTheShortestPath = (ShortestPath) =>{
    for(let i = 1;i<ShortestPath.length;i++){
        setTimeout(() => {
            const Node = ShortestPath[i];
            document.getElementById('node-'+Node.col+'-'+Node.row).className = 'node node-final-path';
        }, i * 20);
    }
}

const CreateNode = (col , row) =>{
    return{
        col,
        row,
        isWall : false,
        isVisted : false,
        isStart : row === Start_node_row && col === Start_node_colm,
        isFinish : row === finish_node_row && col === finish_node_colm,
        ParentNode : null,
        f : 0,
        h : 0,
        g : 0,
    }
}

const getNewGridAfterChange = (grid , col , row) =>{
    const newGrid = grid.slice();
    const Node = newGrid[col][row];
    const NewNode = {
        ...Node,
        isWall : !Node.isWall,
    }
    newGrid[col][row] = NewNode;
    return newGrid;

}

export default Board;