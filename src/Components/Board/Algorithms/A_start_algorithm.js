import { findRenderedDOMComponentWithClass } from "react-dom/test-utils";

var x  = 50;
function A_Start(start , end , grid){
    var openSet = [start];
    var winnerIndex = 0;
    var closeSet = [];
    var optmized_node = start;
    var condition = false;

    while(openSet.length > 0){
        // console.log(openSet)
        optmized_node = openSet[0];
        winnerIndex = 0;
        for (var i =0; i <openSet.length;i++){
            if(optmized_node.f > openSet[i].f){
                winnerIndex = i;
            }
        }

        optmized_node = openSet[winnerIndex];
        openSet.splice(winnerIndex , 1);
        closeSet.push(optmized_node)

        if(optmized_node === end ){
            // console.log("found Route !")
            condition = true;
            break;
        }
        var neighbour_Set = [];
        if(optmized_node.col - 1 >=0 && grid[optmized_node.col - 1][optmized_node.row].isWall === false && !closeSet.includes(grid[optmized_node.col - 1][optmized_node.row])){
            const Node = grid[optmized_node.col - 1][optmized_node.row];
            Node.h = Calculate_h(Node , end);
            Node.g = optmized_node.g + 1;
            Node.f = Node.g + Node.h
            Node.ParentNode = optmized_node;

            neighbour_Set.push(grid[optmized_node.col - 1][optmized_node.row])
        }

        if(optmized_node.col + 1 <= grid.length-1 && grid[optmized_node.col + 1][optmized_node.row].isWall === false && !closeSet.includes(grid[optmized_node.col + 1][optmized_node.row])){
            const Node = grid[optmized_node.col + 1][optmized_node.row];
            Node.h = Calculate_h(Node , end);
            Node.g = optmized_node.g + 1;
            Node.f = Node.g + Node.h

            Node.ParentNode = optmized_node;

            neighbour_Set.push(grid[optmized_node.col + 1][optmized_node.row])
        }

        if(optmized_node.row - 1 >= 0 && grid[optmized_node.col][optmized_node.row - 1].isWall === false && !closeSet.includes(grid[optmized_node.col][optmized_node.row - 1])){
            const Node =grid[optmized_node.col][optmized_node.row - 1]
            Node.h = Calculate_h(Node , end);
            Node.g = optmized_node.g + 1;
            Node.f = Node.g + Node.h
            Node.ParentNode = optmized_node;


            neighbour_Set.push(grid[optmized_node.col][optmized_node.row - 1])
        }

        if(optmized_node.row + 1 <= (grid[0]).length - 1 && grid[optmized_node.col][optmized_node.row + 1].isWall === false && !closeSet.includes(grid[optmized_node.col][optmized_node.row + 1])){
            const Node = grid[optmized_node.col][optmized_node.row + 1]
            Node.h = Calculate_h(Node , end);
            Node.g = optmized_node.g + 1;
            Node.f = Node.g + Node.h
            Node.ParentNode = optmized_node;


            neighbour_Set.push(grid[optmized_node.col][optmized_node.row + 1])
        }
        for(var i = 0;i<neighbour_Set.length;i++){
            if(openSet.includes(neighbour_Set[i])){
                // const Node = neighbour_Set[i]
                // Node.ParentNode = optmized_node;
                // openSet[openSet.indexOf(neighbour_Set[i])] = Node;
                // console.log(neighbour_Set[i])
            }else{
                openSet.push(neighbour_Set[i])
            }
        }
    }

    if(condition == true){
        console.log("found solution");
        console.log(closeSet.length)
    }else{
        console.log("there is no solution");
    }
    return closeSet
 
}

function Calculate_h(Node_1 , Node_2 ){
    return (Math.abs(Node_1.col - Node_2.col) + Math.abs(Node_1.row - Node_2.row));
}

function newGrid(CloseSet , Grid){
    newGrid = Grid.slice();
    for(var i = 0; i< CloseSet.length;i++){
        Node = CloseSet[i]
        Node.isWall = true;
        var col = Node.col;
        var row = Node.row
        newGrid[col][row] = Node;

    } 
    return newGrid
}

export default A_Start;