// 有状态改变，使用类来做
// const Slider = function(opts){
// 	this.aaa = opts.aaa;

// }
// Slider.prototype.method = function(first_arguments){
// 	alert(this.aaa);
// 	setTimeout(() => {
// 		this.aaa = 2;
// 	},1000);
// }

// var slider = new Slider({aaa:1});
// slider.method();

import { $ } from '../common/util.js';
const render = Symbol('render');
const event = Symbol('event');
const style = `<style>
   .vs-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .vs-moved-bg {
        background: green;
        width: 0;
        position: absolute;
        z-index: 999;
        height: 100%;
    }

    .vs-unmoved-bg {
        background: gray;
        width: 100%;
        position:absolute
        z-index: 998;
        height: 100%;
    }

    .vs-text {
        position: absolute;
        width: 100%;
        top: 0;
        z-index: 1000;
        backgound: rgba(0,0,0,0);
        text-align: center;
    }

    .vs-move-btn {
        height: 100%;
        width: 30px;
        background: #333333;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1001;
    }
</style>`;

class Slider{
	constructor(opts){
		this.opts = opts;
		if(!opts.container){
			throw '请填写container配置';
		}else{
			this[render](opts);
			this[event](opts);
		}
		// this.test = this.test.bind(this);
	}

	[render](opts){
		const unsuccessTip = opts.unsuccessTip || "请按住滑块，拖动到最右边"
		/*
		* vs = verify-slider
		*/
		const tpl = style + `
				<div id="vs-wrapper" class="vs-wrapper">
					<div id="vs-moved-bg" class="vs-moved-bg">	</div>
				    <span id="vs-move-btn" class="vs-move-btn"></span>
					<div id="vs-unmoved-bg" class="vs-unmoved-bg"></div>
					<span id="vs-text" class="vs-text" ondrag="return false">	${unsuccessTip}</span>
				</div>
		`;
		opts.container.innerHTML = tpl;
	}
	[event](opts){
			const $btn = $("vs-move-btn");
			const $moved = $('vs-moved-bg');
			const $wrapper = $('vs-wrapper');
       		const $text = $('vs-text');
			const reset = () => {
				this.start = false;
				this.end = false;
				this.startX = 0;
				this.startY = 0;
				this.offsetArr = [];
				$btn.style.left = '0px';
				$moved.style.width = '0px';
			}
			window.onmousemove = (e) => {
				if(this.start && !this.end){
					let offsetX = e.pageX - this.startX;
					let offsetY = e.pageY - this.startY;
					this.offsetArr.push(offsetX + ',' + offsetY);
					$btn.style.left = offsetX + 'px';
					$moved.style.width = offsetX + 'px';
					let r1 = $moved.offsetLeft + parseInt(window.getComputedStyle($moved).width);
					let r2 = parseInt(window.getComputedStyle($wrapper).width) - parseInt(window.getComputedStyle($btn).width);
					if(r1 >= r2){
						this.end = true;
						this.start = false;
						$btn.style.left = r2 + 'px';
						$moved.style.width = r2 + 'px';
						opts.success && opts.success($wrapper,$text,this.offsetArr);
					}
				}
			}
			$btn.onmousedown = (e) => {
				this.start = true;
				this.startX = e.pageX;
				this.startY = e.pageY;
				this.offsetArr = [];
			}
			window.onmouseup = () => {
				if(!this.end){
					reset();
				}
			}
	}
	reset(){
		this[render](this.opts);
		this[event](this.opts);
	}
	test(){
		console.log(this);//undefined;结合下面let test = slider.test; test();

		// console.log(Object.keys(this));
		// console.log(Object.keys(this.__proto__));
		// console.log(Object.getOwnPropertyNames(this.__proto__));
		// console.log(Object.getOwnPropertySymbols(this.__proto__));
	}
	// 类方法，静态方法
	static test2(){

	}
}
export default Slider;
// const slider = new Slider({
// 	container:1
// })
// let test = slider.test;
// test();
// console.log(slider);
// slider.test = function(){
// 	alert(1111);
// }
// slider.test();
// Slider.test2();
// 