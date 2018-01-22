import Slider from '../../common/slider.js';
import { $ ,addClass,removeClass} from '../../common/util.js';
import {fetchPost} from '../../common/fetch.js';
import { formCheck }from '../../common/form-check.js';
export default (conf) => {
	const $mobileInput = $('register-mobile-input');
	const $verifyInput = $('register-verify-input');
	const $verifyBtn = $('register-verify-btn');
	const $mobileBtn = $('register-mobile-btn');
	const $mobileForm = $('register-mobile-form');
	const $verifyForm = $('register-verify-form');
	const $verifyMobile = $('register-verify-mobile');
	const $dialog = $('register-verify-dialog');
	const $dialogClose = $('register-verify-dialog-close');
	let mobileVerifyToken;
	const slider = new Slider({
		container:$('register-verify-wrapper'),
		success:async($wrapper,$text,offsetArr) => {
			const offsetMsg = offsetArr.join(':');
			let data = await fetchPost('./getMobileVerifyToken',{
				offsetMsg: offsetMsg
			});
			if(data.code === 200){
				mobileVerifyToken = data.mobileVerifyToken;
				addClass($wrapper,'success');
				$text.innerHTML = "验证成功";
			}else{
				addClass($wrapper,'failed');
				$text.innerHTML = "验证失败";
			}
			$verifyBtn.removeAttribute('disabled');
			removeClass($verifyBtn,'disabled');
		}
	});
	$verifyBtn.onclick = async () => {
		let checkResult = formCheck($mobileForm);
		console.log(checkResult);
		if(checkResult.length){
			const type = checkResult[0].type;
			if(type === 'present'){
				alert("请填写您的手机号");
			}else if(type === 'mobile'){
				alert("请填写正确格式的手机号");
			}
		}else{
			let data = await fetchPost('/register/getVerifyCode',{
				mobile:$mobileInput.value,
				mobileVerifyToken:mobileVerifyToken,

			})
			if(data.code === 200){
				$dialog.style.display = 'block';
				$verifyMobile.innerHTML = data.mobile;
				mobileVerifyToken = '';
				slider.reset();
			}else{
				alert('手机号验证失败');
			}
		}
	}

	$dialogClose.onclick = () => {
		$dialog.style.display = 'none';
		mobileVerifyToken = '';
		slider.reset();
	}

	$verifyInput.oninput = () => {
		const MESLENGTH = 6;
		let value = $verifyInput.value;
		$verifyInput.value = value.replace(/\D/g,'');
		if($verifyInput.value.length > (MESLENGTH - 1)){
			$mobileBtn.removeAttribute("disabled");
			removeClass($mobileBtn,'disabled');
			addClass($mobileBtn,'btn-primary');
			if(value.length > MESLENGTH){
				$verifyInput.value = value.substring(0,MESLENGTH);
			}
		}else{
			$mobileBtn.setAttribute('disabled','disabled');
			removeClass($mobileBtn,'btn-primary');
			addClass($mobileBtn,'disabled');
		}
	}

	$mobileBtn.onclick = async () => {
		let data = await fetchPost('/register/mobile',{
			mobile:$verifyMobile.innerText,
			verifyCode:$verifyInput.value,
			mobileVerifyToken:mobileVerifyToken
		})

		if(data.code === 200){
			conf.success && conf.success(data.token);
		}else{
			alert("验证码错误");
		}
	}
}