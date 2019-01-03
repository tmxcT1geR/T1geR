popsize = 300;
nsize = [5,10,10,3]
popsafe = []
input = [0.5];
population = new Array(popsize);
num = 5;	
err = 0;
change = 0.1;
supergen = 0;
yes = false;



function Sigmoid(x) {
    return (1 / (1 + Math.exp(-x)));
}

Array.prototype.copy = function() {
    let a = [];
    for (let i = 0; i < this.length; i++) {
        a = [...a,this[i]]
    }
    return a;
}
function MatCOPY(arr) {
    let o = [];
    for (let i = 0; i < arr.length; i++)
        o.push(arr[i].copy());
    return o;
}

function Creature(weights, bias, calc, cost) {
    this.weights = MatCOPY(weights);
	//this.recurrent = 0;
    this.cost = cost;
    this.bias = MatCOPY(bias);
    this.calc = MatCOPY(calc);
    this.copy = function() {
        return new Creature(this.weights,this.bias,this.calc,this.cost)
    }
    this.forward = function(input) {
        this.calc.forEach(function(e) {
            e.fill(0)
        });
        this.calc[0] = input.copy();
        for (let i = 1; i < this.calc.length; i++) {
            //layers from first hidden
            for (let j = 0; j < this.calc[i].length; j++) {
                //single nodes in layer
                for (let k = 0; k < this.calc[i - 1].length; k++) {
                    //nodes in layer before
                    this.calc[i][j] += this.calc[i - 1][k] * (this.weights[i - 1][j + this.calc[i].length * k]);
                }
                this.calc[i][j] += this.bias[i][j];
                this.calc[i][j] = Sigmoid(this.calc[i][j]);
            }
        }
        return this.calc[this.calc.length - 1];
    }
    ;
}
function creator(size) {
    bias = [];
    weights = [];
    for (i = 0; i < size.length - 1; i++) {
        weights[i] = new Array(size[i] * size[i + 1]);

    }
    for (i = 0; i < size.length; i++) {
        this.bias[i] = new Array(size[i]);

    }
    times = this.weights.length;
    for (i = 0; i < times; i++) {
        ttimes = this.weights[i].length;
        for (j = 0; j < ttimes; j++) {
            this.weights[i][j] = Math.random()*2-1;

        }

    }
    times = this.bias.length;
    for (i = 0; i < times; i++) {

        ttimes = this.bias[i].length;
        for (j = 0; j < ttimes; j++) {
            if (i !== 0) {
                this.bias[i][j] = Math.random()*2-1;
            } else {
                this.bias[i][j] = 0;
            }
        }

    }

    calc = new Array(size.length);
    for (i = 0; i < calc.length; i++) {
        calc[i] = new Array(size[i]).fill(0)
    }
    cost = 0;
    return new Creature(weights,bias,calc,cost);
}

function pop(nsize) {
    for (let pp = 0; pp < popsize; pp++) {
        population[pp] = creator(nsize);
    }
}

function nextgen() {
    population.splice(popsize / 2);

    for (let _i = 0; _i < popsize / 2; _i++) {
        popsafe[_i] = population[_i].copy();
    }
	for(let q =popsize/2-30;q<popsize/2;q++){
		popsafe[q] = creator(nsize);
	}
    for (let _i = 0; _i < popsize / 2-10; _i++) {
        population[_i].weights.forEach(function(_e) {
            _e.forEach(function(f, _j, _a) {
                _a[_j] += (Math.random() * 2 - 1) * change * (Math.floor(Math.random() + 0.5));
            });

        });
        population[_i].bias.forEach(function(_e, k) {
            if (k != 0)
                _e.forEach(function(f, _j, _a) {
                    _a[_j] += (Math.random() * 2 - 1) * change * (Math.floor(Math.random() + 0.5));
                });
        });
        if (Math.random() < 0.01) {
            let place = Math.floor(Math.random() * population[i].weights.length);
            for (let j = 0; j < population[i].weights[place].length; j++) {
                let ran = Math.floor(Math.random() * popsize / 4);
                population[i].weights[place] = popsafe[ran].weights[place];

            }
        }
    }

    population = population.concat(popsafe);
    popsafe = []
}


pop(nsize);



var quicksortsteps = 7;
function quicksort(arr) {
    //{op:"NICOLAS",sv:1
    var groups = [];
    var sumgroups = Math.pow(2, quicksortsteps);
    for (l = 0; l < sumgroups; l++) {
        groups[l] = [];
    }
    var offset = 0;
    var savegroup;
    groups[0] = arr.slice(0);
    for (j = 0; j < quicksortsteps; j++) {
        var times = Math.pow(2, j);
        var distance = Math.pow(2, quicksortsteps - (j + 1));
        offset = 0;
        for (k = 0; k < times; k++) {
            offset = distance * 2 * k;
            if (groups[offset].length !== 0) {
                savegroup = groups[offset].slice(0);
                var sel = savegroup[Math.floor(savegroup.length / 2)].sv;
                groups[offset] = [];
                for (var i = 0; i < savegroup.length; i++) {
                    if (savegroup[i].sv > sel) {
                        groups[offset].push(savegroup[i]);
                    } else {
                        groups[offset + distance].push(savegroup[i]);
                    }
                }
            }
        }

    }
    var array = [];
    for (t = 0; t < groups.length; t++) {
        var sleng = groups[t].length;
        for (v = 0; v < sleng; v++) {
            var saves = 0;
            for (u = 1; u < groups[t].length; u++) {
                if (groups[t][saves].sv < groups[t][u].sv) {
                    saves = u;
                }
            }
            array.push(groups[t][saves].op);
            groups[t] = groups[t].slice(0, saves).concat(groups[t].slice(saves + 1));
        }
    }
    return array;
}


function generatepop(){
	for(let i=0 ; i< popsize; i++){
			population[i] = creator(nsize);
	}
}
sample = 2;

function sevolve(param) {
	nostarve = false;
	four = 0;
	avg = 0;
	avg2= 0;
	counter = 0;
	for (let q = 0;q<param; q++){
		supergen++;
		one = 0;
		two = 0;
		three = 0;
		four = 0;
		highscore = 0;

		population.forEach(function(e) {
			e.cost = 0
		});
		sample = Math.floor(supergen/150 +1);
		for(let t = 0;t<sample;t++){
			for(let ind = 0; ind < population.length; ind++){
					population[ind].cost += snakeRound(ind).cost;
					
			}
		}

		population = population.sort(function(a, b){return a.cost - b.cost});
		
		if(q%10==0){
			for(let gs = 0;gs < 80; gs++){
				blind_analysis(0);
				avg += ssnake.len-5;
				//blind_analysis(popsize/2-1);
				//avg2 += ssnake.len-5;
				counter++;
			}
			avg = avg/counter;
			//avg2 = avg2/counter;
			//console.log("gen " + q + " one: " + one/8 + "% " + two/8+ "% " +three/8+ "% " +four/8+ "%" );
			//console.log("gen " + q + " high: " + (highscore-5) + " percentage: " + four/8);
			console.log("gen: " + supergen + " avg of best: " + avg);
			counter = 0;
			avg = 0;
		}
		nextgen();
		
	}
}

function snakeRound(indx){
	ssnake = new Snake(true, 5, {x:3,y:7},false, false,{x:1,y:0}, 17);
	ssnake.running = true;
	for (let i = 0; ssnake.running && i<3000; i++){
		ssnake.tleft = false;
		ssnake.tright = false;
		canright = 1;
		canfront = 1;
		canleft = 1;
		CanSnake();
		IsFood();
		outs = population[indx].forward([front, side, canright, canleft,canfront]);
		if(outs[0]>outs[1]&&outs[0]>outs[2]){
			ssnake.tright = true;
		}else if(outs[1]>outs[0]&&outs[1]>outs[2]){
			ssnake.tleft = true;
		}
		
		ssnake.step();

	}
	ssnake.cost += (100/ssnake.len);

	if(highscore < ssnake.len){
		highscore = ssnake.len;
	}


	if(ssnake.len-5 >= -4){
		one++;
	}
	if(ssnake.len-5 >= 2){
		two++
	}
	if(ssnake.len-5 >= 3){
		three++;
	}
	if(ssnake.len-5 >= 10){
		four++;
	}
	return ssnake;
}

async function analysis(){
	ssnake = new Snake(true, 5, {x:3,y:7},false, false,{x:1,y:0}, 17);
	ssnake.running = true;
	//population[0].recurrent = 0;
	for (let i = 0; ssnake.running&& i<3000; i++){
		ssnake.tleft = false;
		ssnake.tright = false;
		canright = 1;
		canfront = 1;
		canleft = 1;
		CanSnake();
		console.log(canleft);
		console.log(ssnake.len-5);
		IsFood();
		outs = population[0].forward([front, side, canright, canleft,canfront]);
		if(outs[0]>outs[1]&&outs[0]>outs[2]){
			ssnake.tright = true;
		}else if(outs[1]>outs[0]&&outs[1]>outs[2]){
			ssnake.tleft = true;
		}
		//outs[3] = population[0].recurrent;
		
		await timeout(50);
		ssnake.step();
		if(ssnake.running){
			draw();
		}


		
	}
}

function blind_analysis(numb){
	ssnake = new Snake(true, 5, {x:3,y:7},false, false,{x:1,y:0}, 17);
	ssnake.running = true;
	for (let i = 0; ssnake.running && i<3000; i++){
		ssnake.tleft = false;
		ssnake.tright = false;
		canright = 1;
		canfront = 1;
		canleft = 1;
		CanSnake();
		IsFood();
		outs = population[numb].forward([front, side, canright, canleft,canfront]);
		if(outs[0]>outs[1]&&outs[0]>outs[2]){
			ssnake.tright = true;
		}else if(outs[1]>outs[0]&&outs[1]>outs[2]){
			ssnake.tleft = true;
		}
		
		ssnake.step();



		
	}
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function Snake(running,len,IsSnake,tright,tleft,dir, size){
	this.starving = 50;
	this.ax = Math.floor(Math.random()*17);
	this.ay = Math.floor(Math.random()*17);
	this.running = running; //boolean
	this.food = {x:this.ax, y:this.ay}; //object{x,y}
	this.len = len; 
	this.IsSnake = IsSnake; //object{x,y}
	this.tright = tright;//boolean
	this.tleft = tleft; //boolean
	this.dir = dir //object{x,y}
	this.tright = false;
	this.tleft = false;
	this.snake = [{...IsSnake}];
	this.size = size;
	this.cost = 0;
	this.cost2 = 0;
	this.round = 0;
	this.lifetime = 0;
	this.done = false;
	
		this.canspawn = function(x,y){
		for(let ch in this.snake){
			if(this.snake[ch].x == x && this.snake[ch].y == y){
				return false;
			}
		}

		return true;
	}
	
	this.turnright = function(asdf){
		return({x:this.dir.y,y:-this.dir.x});
	};
	this.turnleft = function(asdf){
		return({x:-this.dir.y,y:this.dir.x});
	};
	
	this.step = function(){
		if(this.starving < 0){
			this.running = false
		}
		if(this.running){
			this.lifetime++;
			this.round++;
			if(this.tright){
				this.dir = this.turnright(this.dir);
				this.tright = false;
			}else if(this.tleft) {
				this.dir = this.turnleft(this.dir);
				this.tleft = false;
			}
			this.IsSnake.x += this.dir.x;
			this.IsSnake.y += this.dir.y;
			this.snake.push({x:this.IsSnake.x,y:this.IsSnake.y})
			
			if (this.IsSnake.x == this.food.x && this.IsSnake.y == this.food.y){
				this.len ++;
				this.starving += 42;
				this.score = this.len;
				let nx=Math.floor(Math.random() * size),ny=Math.floor(Math.random() * size);
				while (this.canspawn(nx,ny) == false){
                    nx = Math.floor(Math.random() * size);
                    ny = Math.floor(Math.random() * size);
                }
				this.food.x=nx;
				this.food.y=ny;

			}else{
				this.starving--;
			}
			if (this.snake.length > this.len){
				this.snake.splice(0,1);
			}
			for(let i=this.snake.length-3; i>= 0; i-=2){
				if(this.snake[i].x == this.IsSnake.x && this.snake[i].y == this.IsSnake.y){
					if(canfront==1||canleft==1||canright==1){
						this.cost2 += 50;
					}
					this.running = false;
					return;
				}
			}
			if(this.IsSnake.x == this.size || this.IsSnake.x == -1 || this.IsSnake.y == this.size || this.IsSnake.y == -1){
				if(canfront==1||canleft==1||canright==1){
						this.cost2 += 50;
					}

				this.running = false;
				return;
			}
		}
	}
}


var c=document.getElementById("mycanvas");
var ctx=c.getContext("2d");
var cd={x:c.width,y:c.height};
var psize=10;

function draw(){
    ctx.fillStyle="#00FF00";
    ctx.clearRect(0,0,cd.x,cd.y);
    for(i=0;i<ssnake.snake.length;i++){
        ctx.beginPath();
        ctx.rect(psize*ssnake.snake[i].x+1,ssnake.size*psize-psize*(ssnake.snake[i].y+1)+1,psize-1,psize-1);
        ctx.fill();
    }

    ctx.fillStyle="#FF0000";
    ctx.beginPath();
    ctx.rect(psize*ssnake.food.x,ssnake.size*psize-psize*(ssnake.food.y+1),psize,psize);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(0,(ssnake.size)*psize);
    ctx.lineTo((ssnake.size)*psize,(ssnake.size)*psize);
    ctx.lineTo((ssnake.size)*psize,0);
    ctx.lineTo(0,0);
	ctx.stroke();
}

function drawleft(){
    var my=ssnake.size*psize+30;
    var mx=30;
    ctx.fillStyle='#FF9900';
    ctx.beginPath();
    ctx.moveTo(mx-20,my);
    ctx.lineTo(mx-5,my-20);
    ctx.lineTo(mx-5,my-8);
    ctx.lineTo(mx+20,my-8);
    ctx.lineTo(mx+20,my+8);
    ctx.lineTo(mx-5,my+8);
    ctx.lineTo(mx-5,my+20);
    ctx.lineTo(mx-20,my);
    ctx.fill();
    ctx.stroke();
}


function drawright(){
    var my=ssnake.size*psize+30;
    var mx=ssnake.size*psize-30;
    ctx.fillStyle='#FF9900';
    ctx.beginPath();
    ctx.moveTo(mx+20,my);
    ctx.lineTo(mx+5,my-20);
    ctx.lineTo(mx+5,my-8);
    ctx.lineTo(mx-20,my-8);
    ctx.lineTo(mx-20,my+8);
    ctx.lineTo(mx+5,my+8);
    ctx.lineTo(mx+5,my+20);
    ctx.lineTo(mx+20,my);
    ctx.fill();
    ctx.stroke();
}

function IsFood(){
	if(ssnake.dir.x == 1){
		front = ssnake.food.x - ssnake.IsSnake.x;
		side = ssnake.food.y - ssnake.IsSnake.y;
	}
	if(ssnake.dir.x == -1){
		front = ssnake.IsSnake.x - ssnake.food.x;
		side = ssnake.IsSnake.y - ssnake.food.y;	
	}
	
	if(ssnake.dir.y == 1){
		front = ssnake.food.y - ssnake.IsSnake.y;
		side = -ssnake.food.x + ssnake.IsSnake.x;
	}
	if(ssnake.dir.y == -1){
		front = ssnake.IsSnake.y - ssnake.food.y;
		side = -ssnake.IsSnake.x + ssnake.food.x;	
	}
}

function CanSnake(){
	//front
	for(let steps = 0; steps <ssnake.size;steps++){
		if(ssnake.IsSnake.x+steps == ssnake.size-1 && ssnake.dir.x == 1){
			canfront = steps;
		}
		if(ssnake.IsSnake.x-steps == 0 && ssnake.dir.x == -1){
			canfront = steps;
		}
		if(ssnake.IsSnake.y+steps == ssnake.size-1 && ssnake.dir.y == 1){
			canfront = steps;
		}
		if(ssnake.IsSnake.y-steps == 0 && ssnake.dir.y == -1){
			canfront = steps;
		}
	
		//left
		if(ssnake.IsSnake.x+steps == ssnake.size-1 && ssnake.turnleft().x == 1){
			canleft = steps;
		}
		if(ssnake.IsSnake.x-steps == 0 && ssnake.turnleft().x == -1){
			canleft = steps;
		}	
		if(ssnake.IsSnake.y+steps == ssnake.size-1 && ssnake.turnleft().y == 1){
			canleft = steps;
		}
		if(ssnake.IsSnake.y-steps == 0 && ssnake.turnleft().y == -1){
			canleft = steps;
		}
		
		//right
		if(ssnake.IsSnake.x+steps == ssnake.size-1 && ssnake.turnright().x == 1){
			canright = steps;
		}
		if(ssnake.IsSnake.x-steps == 0 && ssnake.turnright().x == -1){
			canright = steps;
		}
		if(ssnake.IsSnake.y+steps== ssnake.size-1 && ssnake.turnright().y == 1){
			canright = steps;
		}
		if(ssnake.IsSnake.y-steps == 0 && ssnake.turnright().y == -1){
			canright = steps;
		}
	}
	for(let steps = 0; steps <ssnake.size;steps++){
		for(let i=ssnake.snake.length-2; i>= 0; i--){
					if(ssnake.snake[i].x == ssnake.IsSnake.x+ssnake.dir.x*steps && ssnake.snake[i].y == ssnake.IsSnake.y+ssnake.dir.y*steps){
						if(steps-1 < canfront){
							canfront = steps-1;
						}
					}
		}
		for(let i=ssnake.snake.length-2; i>= 0; i--){
					if(ssnake.snake[i].x == ssnake.IsSnake.x+ssnake.dir.y*steps && ssnake.snake[i].y == ssnake.IsSnake.y-ssnake.dir.x*steps){
						if(steps-1 < canright){
							canright = steps-1;
						}
					}
		}
		for(let i=ssnake.snake.length-2; i>= 0; i--){
					if(ssnake.snake[i].x == ssnake.IsSnake.x-ssnake.dir.y*steps && ssnake.snake[i].y == ssnake.IsSnake.y+ssnake.dir.x*steps){
						if(steps-1 < canleft){
							canleft = steps-1;
						}
					}
		}
	}
}