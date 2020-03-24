function init(){
    //console.log("in init")
    canvas = document.getElementById("can")
    w=h=canvas.width = canvas.height = 1000;
    pen = canvas.getContext("2d");
    cellsize = 66;
    gameOver = false;
    score = 0;
    
    food_img = new Image();
    food_img.src = "appleimg.png";
    
    trophy = new Image();
    trophy.src = "newTrop.png";
    
    food = getRandomFood();
    
    snake = {
        init_len:5,
        color:"blue",
        cells:[],
        direction:"right",
        createSnake:function(){
            for(var i=this.init_len;i>0;i--){
                this.cells.push({x:i,y:0});
            }
        },
        
        drawSnake:function(){
            for(var i=0;i<this.cells.length;i++){
               pen.fillStyle = this.color;
               pen.fillRect(this.cells[i].x*cellsize, this.cells[i].y*cellsize ,cellsize-3, cellsize-3)   
            }
        },
        
        updateSnake:function(){
            console.log("update Snake")
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
            
            if(food.x == headX && food.y==headY){
                food = getRandomFood();
                score++;
            }else{
                 this.cells.pop();
            }
            
           
            var nextX,nextY;
            if(this.direction=="right"){
                nextX = headX+1;
                nextY = headY;
            }else if(this.direction=="left"){
                nextX = headX-1;
                nextY = headY;
            }else if(this.direction=="down"){
                nextX = headX;
                nextY = headY+1;
            }else{
                 nextX = headX;
                nextY = headY-1;
            }
           // console.log({x:nextX,y:nextY});
            this.cells.unshift({x:nextX, y:nextY});
            
//              if(headX < 0 || headX >= 15){
//                snake.gameOver = true
//              }else if(headY < 0 || headY >= 15){
//                  snake.gameOver = true
//              }
            
            var last_x = Math.round(w/cellsize);
            var last_y = Math.round(h/cellsize);
            
            if(this.cells[0].x < 0 || this.cells[0].y < 0 ||
               this.cells[0].x > last_x || this.cells[0].y > last_y){
                gameOver = true;
            }
            
        }
    };
    
    function keypressed(dir){
       // console.log("keypressed")
        console.log(snake.direction);
       if(dir.key == "ArrowRight"){
           snake.direction = "right"
       }else if(dir.key == "ArrowLeft"){
           snake.direction = "left"
       }else if(dir.key=="ArrowDown"){
           snake.direction = "down"
       }else{
           snake.direction = "up"
       }
    
    }
    
    document.addEventListener('keydown',keypressed);
    
    
    snake.createSnake();
}

function draw(){
    
   pen.clearRect(0,0,w,h);
   snake.drawSnake();
   pen.fillStyle = food.color;
   pen.drawImage(food_img, food.x*cellsize,food.y*cellsize,cellsize,cellsize);
   pen.drawImage(trophy,18,18,cellsize,cellsize); //18 20
   pen.font = "25px Roboto";
   pen.fillStyle = "black";
   pen.fillText(score,70,70); //50 50
}

function update(){
    snake.updateSnake(); 
}

function getRandomFood(){
    var foodX = Math.round(Math.random()*(w-cellsize)/cellsize);
    var foodY = Math.round(Math.random()*(h-cellsize)/cellsize);
    
    var food = {
        x:foodX,
        y:foodY,
        color:"red"
    }
    return food;
}

function gameLoop(){
    if(gameOver===true){
        clearInterval(inter);
      //  console.log("gameOver")
        //  console.log(score)
        alert("GAME OVER! YOUR SCORE IS : "+score);
        return;
    }
    draw();
    update();
}

init()
let inter = setInterval(gameLoop,100)
















