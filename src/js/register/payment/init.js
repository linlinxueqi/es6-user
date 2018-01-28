import '../../common/polyfill.js';
import render from './render.js';
import event from './event.js';
import { checkOptions } from '../../common/util.js';
const regPayment = (opts = {}) => {
	// if(!opts.container){
	// 	throw new Error('container can not be empty');//需要对传入的参数进行校验
	// 	return;
	// }
	if(!checkOptions(opts)){
		return;
	}
	var defaultOpts = {
		paymentPlaceholder:'请输入您的XX账号',
		paymentPasswordPlaceholder:"请输入您的XX密码"
	};
	var options = Object.assign(defaultOpts,opts);
	render(options);
	event(options);
}
export  {regPayment}