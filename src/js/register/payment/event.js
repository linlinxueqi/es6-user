import {fetchPost} from '../../common/fetch.js';
import { $ } from '../../common/util.js';

export default (conf) => {
	const $form = $('register-payment-form');
	const $formBtn = $('register-payment-btn');
	$formBtn.onclick = async () => {
		let formValues = {};
		Array.from($form.elements).forEach((item) => {
			if(item.name){
				formValues[item.name] = item.value;
			}
		})
		let data = await fetchPost('/register/payment',formValues);
		if(data.code === 200){
			conf.success && conf.success();
		}else{
		}
	}
}
