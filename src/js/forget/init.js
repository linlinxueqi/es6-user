import '../common/polyfill.js';
import event from './event.js';
import render from './render.js';
const forget = (opts = {}) => {
 	var defaultOpts = {

 	};
 	const options = Object.assign(defaultOpts,opts);
 	console.log(options);
 	render(options);
 	event(options);
}
export { forget }
