import '../../common/polyfill.js';
import render from './render.js';
import bindEvent from './event.js';

 const  regInfo = (opts = {}) => {
 	const defaultOpts = {

 	}
 	const options = Object.assign(defaultOpts,opts);
 	render(options);
 	bindEvent(options);
 }
 export { regInfo }