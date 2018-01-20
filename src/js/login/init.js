import '../common/polyfill';
import render from './render.js';
import bindEvent from './event.js';
// import _ from 'lodash';

const login = (opts = {}) => {
	console.log(opts);
	const defaultOpts = {
		loginBtnText:'登 录',
		accountPlaceholder:"手机号/邮箱/账号",
		passwordPlaceholder:"请填写密码",
		accountLabel:"",
		passwordLabel:""
	};

	const options = Object.assign(defaultOpts,opts);
	// const options = _.assign(defaultOpts,opts);
	// 两种浅拷贝的区别
	// const d = Symbol('d');
	// console.log(Object.assign({a:1,b:2},{c:3,[d]:4}));
	// console.log(_.assign({a:1,b:2},{c:3,[d]:4}));//不会拷贝[d],过滤导致性能不高
	render(options);
	bindEvent(options);

}
export {login}
// 为什么要把Login放在{}中呢？函数一定要放在{}中，输出的是值的引用
// export default login