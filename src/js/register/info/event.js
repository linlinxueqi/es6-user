import { fetchPost } from '../../common/fetch.js';
import { $ } from '../../common/util.js';
import { formCheck } from '../../common/form-check.js';


export default (opts) => {
	const $form = $('register-info-form');
	const $formBtn = $('register-info-btn');
	const tipMap = {
		'nickname':'昵称',
		'email':'电子邮箱'

	}
	let formValues = {};
	Array.from($form.elements).forEach((item) => {
		if(item.name){
			formValues[item.name]= item.value;
		}
	})

	$formBtn.onclick = async () => {
		let checkResults = formCheck($form);
		if(checkResults.length){
			const type = checkResults[0].type;
			const name = checkResults[0].name;
			const message = checkResults[0].message;
			if(type === "present"){
				alert(tipMap[name] + message);
			}else{
				alert(message);
			}
		}else{
			let data = await fetchPost('/register/info',formValues);

			if(data.code === 200){
				opts.success && opts.success();
			}else{
				opts.error && opts.error(data);
			}
		}
	}
	

}