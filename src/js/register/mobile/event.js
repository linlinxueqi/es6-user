import Slider from '../../common/slider.js';
import { $ ,addClass,removeClass} from '../../common/util.js';
import {fetchPost} from '../../common/fetch.js';
export default (conf) => {
	const slider = new Slider({
		container:$('register-verify-wrapper'),
		success:async($wrapper,$text,offsetArr) => {
			const offsetMsg = offsetArr.join(':');
			let data = await fetchPost('./getMobileVerifyToken',{
				offsetMsg: offsetMsg
			});
			if(data.code === 200){
				console.log($text);
				let mobileVerifyToken = data.mobileVerifyToken;
				addClass($wrapper,'success');
				$text.innerHTML = "验证成功";
			}else{
				addClass($wrapper,'failed');
				$text.innerHTML = "验证失败";
			}
		}
	});


}