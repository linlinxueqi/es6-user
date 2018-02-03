import '../../common/polyfill.js';
import render from './render.js';
import bindEvent from './event.js';

 const  regInfo = (opts = {}) => {
 	const defaultOpts = {
 		btnText:"下一步"
 	}
 	const options = Object.assign(defaultOpts,opts);
 	render(options).then(()=>{
 		bindEvent(options);
 	});
 }
 export { regInfo }