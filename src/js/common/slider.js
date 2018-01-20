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
const style = `<style></style>`;

class Slider{
	constructor(opts){
		this.opts = opts;
		if(!opts.container){
			throw '请填写container配置';
		}else{
			this[render](opts);
			this[event](opts);
		}
		this.test = this.test.bind(this);
	}

	[render](opts){

	}
	[event](opts){

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
const slider = new Slider({
	container:1
})
let test = slider.test;
test();
console.log(slider);
// slider.test = function(){
// 	alert(1111);
// }
slider.test();
Slider.test2();
// 