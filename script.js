let count = 0.0;
let xFw = true;
let yFw = true;
const ballthingo = document.getElementById('ballthingo');
const toggleBall = document.getElementById('balltog');
let ballOn = false;
const fallthingo = document.getElementById('fallingthingo');
const toggleFall = document.getElementById('falltog');
let fallData = [];
let falling = -1;
let initWidth = window.innerWidth;
const createFallers = () => {
	fallData = [];
	for(let i = 0; i < 20; i++) {
		fallData.push({faX: Math.floor(Math.random() * initWidth), faSpd: 0});
		var fallObj = document.createElement("div");
		fallObj.className = "faller";
		fallObj.style.left = fallData[i].faX + "px";
		fallthingo.appendChild(fallObj);
	}
}
let fallers = document.getElementsByClassName('faller');
let fallOn = false;
const dePx = (str) => {
	return str.slice(0, str.length - 2);
}
const shift = (xMov, yMov) => {
	var initL = ballthingo.style.left;
	initL = dePx(initL);
	var initT = ballthingo.style.top;
	initT = dePx(initT);
	ballthingo.style.left = (Number(initL) + xMov) + "px";
	ballthingo.style.top = (Number(initT) + yMov) + "px";
}
(function(){
	const SIID = setInterval(function(){
		var tweak = Number(Math.round(Math.sin(count)*4));
		if(falling < 19 && fallOn) { falling ++; }
		if(!fallOn) { falling = -1; }
		for(let j = falling; j > -1; j--) {
			((Number(dePx(fallers[j].style.top)) + fallData[j].faSpd + 13) > window.innerHeight) ? fallData[j].faSpd = (-fallData[j].faSpd * 0.9) : fallData[j].faSpd ++;
			fallers[j].style.top = (Number(dePx(fallers[j].style.top)) + fallData[j].faSpd) + "px";
			fallData[j].faX = fallData[j].faX * window.innerWidth / initWidth;
			fallers[j].style.left = fallData[j].faX + "px";
		}
		initWidth = window.innerWidth;
		if(ballOn) {
			xFw ? shift(5, 0) : shift(-5, 0);
			yFw ? shift(0, 5) : shift(0, -5);
		}
		(dePx(ballthingo.style.left) > (window.innerWidth - 45)) ? xFw = false
         	: (dePx(ballthingo.style.left) < 0) ? xFw = true : null;
		(dePx(ballthingo.style.top) > (window.innerHeight - 45)) ? yFw = false
         	: (dePx(ballthingo.style.top) < 0) ? yFw = true : null;
		count += 0.05;
		document.getElementsByTagName('body')[0].style.backgroundColor = "#" + (151515 + (tweak * 10101));
	}, 20)
})();
toggleBall.addEventListener('click', () => {
	ballOn = !ballOn;
	ballthingo.classList.toggle("off");
})
toggleFall.addEventListener('click', () => {
	fallOn = !fallOn;
	fallthingo.classList.toggle("off");
	fallOn ? createFallers() : fallthingo.innerHTML = '';
	fallers = document.getElementsByClassName('faller');
})
