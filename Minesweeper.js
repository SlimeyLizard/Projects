//figure out how to click cells on the grid - done
//figure out how to hide the table - done
//then figure out how to know which node was clicked on the table
//then implement BFS (breadth first search) to find neighboring bombs
//then figure out how to limit bombs to 10
let mineboard = [];
let row = 10;
let col = 8;
let visMineboard = [];
let bombCount = 0;

//Board making functions below:
function bombMaker(){
    if (bombCount >= 8){
        return 0;
    }
    let bomb = Math.floor(Math.random()*8);
    if (bomb == 1){
        bombCount++;
        return 1;
    }
    else {
        return 0;
    }
}

for(let i = 0; i < row; i++){
    mineboard[i] = [];
    for(let j = 0; j < col; j++){
       mineboard[i][j] = bombMaker();
    }
}

for(let i = 0; i < row; i++){
    visMineboard[i] = [];
    for(let j = 0; j < col; j++){
        visMineboard[i][j] = false;
    }
}
//drawBoard function is to display the 2d array in html table, but since we want it to be hidden we can loop through array and each index will be shown as nothing in html.
//But, as you can see in above code, the mineboard pieces are already created, so in simpler terms, html mineboard will show nothing, but the actual mineboard is created
//and will be shown once user clicks a cell on the table
function drawBoard(){
    for(let i = 0; i < row; i++){
        for(let j = 0; j < col; j++){
            var space = document.getElementById("space"+i+j);
            if (space) {//don't understand how this works
                space.innerHTML = "";
            }
        }
    }
}


function scan(i, j){
    //we need to scan nearby squares effieciently, no multiple if statements - Done, but review how boundaries work
    //we also need to figure out how to cascade
    //also need to update the clicked grid to show num of nearby bombs
    let bCount = 0;
    startPosX = Math.max(0, i - 1);
    startPosY = Math.max(0, j - 1);
    endPosX = Math.min(mineboard.length - 1, i + 1);
    endPosY = Math.min(mineboard[0].length - 1, j + 1);
    
    //for loop for counting neighboring bombs
    for (let rowNum=startPosX; rowNum<=endPosX; rowNum++){
        for (let colNum=startPosY; colNum<=endPosY; colNum++){
            if(mineboard[rowNum][colNum] === 1){
                bCount++;
            }
        }
    }
    if (mineboard[i][j] == 1){
        alert("You hit a bomb!");
        exit;
    }
    document.getElementById("space"+i+j).innerHTML = bCount;
    return bCount;
}

function DFS(i, j){//flood fill algo here, we can check if there is a bomb by if scan != 0
    //current issue, is that dfs is only scanning in a straight line along the y axis, it is not scanning in 8 directions
    //The above issue was caused by incorrect visMineboard[] creation, when making a 2d array the first for loop needs to equal[]
    if (i < 0 || i >=row || j < 0 || j >= col){
        return;
    }
    if (visMineboard[i][j] == true){
        return;
    }
    if (scan(i, j) >= 1){
        return;
    }
    visMineboard[i][j] = true;
    DFS(i - 1, j);     // Up
    DFS(i + 1, j);     // Down
    DFS(i, j - 1);     // Left
    DFS(i, j + 1);     // Right
    DFS(i - 1, j - 1); // Top-left
    DFS(i - 1, j + 1); // Top-right
    DFS(i + 1, j - 1); // Bottom-left
    DFS(i + 1, j + 1); // Bottom-right
}

function clickListener(){
    for (let i = 0; i < row; i++){
        for(let j = 0; j < col; j++){
            let space = document.getElementById("space"+i+j);
            if (space) {
                space.addEventListener("click", function(){DFS(i,j)});
            }
        }
    }
}
drawBoard();
clickListener();