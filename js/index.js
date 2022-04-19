//Game constants & Variables
let inputDir={x:0 , y:0};
const foodSound=new Audio('../music/food.mp3');
const gameOverSound=new Audio('../music/gameover.mp3');
const moveSound=new Audio('../music/move.mp3');
const musicSound=new Audio('../music/music.mp3');
let speed=9;
let score=0;
// let board =document.getElementById("#board");
let lastPaintTime=0;
let snakeArr=[{x:13 , y:15}]
food={x:6,y:7};
//Game functions

function main(ctime)
{
    window.requestAnimationFrame(main);
    musicSound.play();
    //console.log(ctime);
    //to control fps 
    if((ctime-lastPaintTime)/1000 < 1/speed)
    {
        return;
    }
    //console.log(ctime); fps reduced
   lastPaintTime=ctime;
  gameEngine();
}
function isCollide(snake)
{
    // return false;
    //if u bump into yourself

    for(let i=1;i<snake.length;i++)
    {
            //if u bump into yourself

        if(snake[0].x===snake[i].x && snake[0].y===snake[i].y)
        {
            return true;
        }
            //if u bump into wall

        
    }
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0)
        {
            return true;
        }
    return false;
}
function gameEngine()
{
    //part1: Updating snake array
    
    if(isCollide(snakeArr))
    {

        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("game over press any key to play again!");
        snakeArr=[{x:13,y:15}];
         musicSound.play();
        score=0;
        scoreBox.innerHTML="Score:"+score;



    }
    //if u have eaten food increment score and regenerate food
    if(snakeArr[0].y=== food.y && snakeArr[0].x===food.x)
    {
        foodSound.play();
        //add at starting
        score+=1;
        if(score>hiscoreval)
        {
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            highScoreBox.innerHTML="High Score :"+hiscoreval;

        }
        scoreBox.innerHTML="Score:"+score;
        let a=2;
        let b=16;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x ,y:snakeArr[0].y+inputDir.y});
        food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())};
    }

    //Move snake

    for(let i=snakeArr.length-2;i>=0;i--)
    {
        // const element=array[i];
        snakeArr[i+1]={...snakeArr[i]};
    }

    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;

    //part2: Display the snake and food
    //Display Snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        //add class to snake element
        if(index === 0)
        {
            snakeElement.classList.add('head');

        }
        else{
            snakeElement.classList.add('snake');
 
        }
        board.appendChild(snakeElement);

    })

    //Display Food
   foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
       foodElement.style.gridColumnStart=food.x;
        //add class to snake element
       foodElement.classList.add('food');
        board.appendChild(foodElement); 


}
//main logic starts here
let hiscore=localStorage.getItem("hiscore");
if(hiscore===null)
{
    hiscoreval=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
}
else{
    hiscoreval=JSON.parse(hiscore);

    highScoreBox.innerHTML="High Score :"+hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
inputDir={x:0,y:1};//start game
moveSound.play();
switch(e.key)
{
    case "ArrowUp":
        console.log("ArrowUp")
        inputDir.x=0 ;
        inputDir.y=-1;

        break; 

    case "ArrowDown":
        console.log("ArrowDown")
        inputDir.x=0;
        inputDir.y=1;
        break;  

    case "ArrowLeft":
        console.log("ArrowLeft")
        inputDir.x=-1;
        inputDir.y=0;
        break;
    case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x=1;
            inputDir.y=0;
            break;  

    default:
        break;  
}
})