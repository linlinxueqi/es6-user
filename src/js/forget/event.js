import {fetchPost,fetchJson} from '../common/fetch.js';
import {$,addClass,removeClass} from '../common/util.js';
import findTpl from './findTpl.js';

export default async (opts={}) => {
	const findInfo = await fetchJson('/security-info',{});
	const $chooseMobile = $('choose-mobile');
	const $chooseEmail = $('choose-email');
	const $dialog = $('forget-dialog');

	const forget = async (type) => {
		const sendVerifyCode = await fetchPost('/security-info',{type:type});
		const $verifyInput = $('forget-verify-input');
		const $forgetBtn = $('forget-confirm-btn');
		console.log($forgetBtn);
		const $number = $('forget-verify-number');
		const $close = $('forget-verify-dialog-close');
		const typeTool = (type === "email") ? '邮件' : '短信';

		if(sendVerifyCode.code === 200){
			$dialog.style.display = 'block';
			$verifyInput.oninput = () => {
				const MESLENGTH = 6;
				let value = $verifyInput.value;
				$verifyInput.value = value.replace(/\D/g,'');
				if($verifyInput.value.length > (MESLENGTH - 1)){
					$forgetBtn.removeAttribute("disabled");
					removeClass($forgetBtn,'disabled');
					console.log(2222);
					addClass($forgetBtn,'btn-primary');
					if(value.length > MESLENGTH){
						$verifyInput.value = value.substring(0,MESLENGTH);
					}
				}else{
					$forgetBtn.setAttribute('disabled','disabled');
					removeClass($forgetBtn,'btn-primary');
					addClass($forgetBtn,'disabled');
				}
			}
			$forgetBtn.onclick = async () => {
				console.log("111111111");
				let data = await fetchPost('/forget',{
					number:$number.innerText,
					verifyCode:$verifyInput.value
				});
				if(data.code === 200){
					opts.success && opts.success(type,typeTool);

				}else{
					alert("验证码输入错误");
				}
			}
		}else{
			alert("验证"+typeTool+"发送失败");
		}
		$close.onclick = () => {
			$dialog.style.display = 'none';
			$verifyInput.value = '';
			$number.innerHTML = '';
		}

	}
	

		$chooseMobile.onclick = () => {
			$dialog.innerHTML = findTpl('手机',findInfo.data.mobile);
			forget('mobile');
		}

		$chooseEmail.onclick = () => {
			$dialog.innerHTML = findTpl('邮箱',findInfo.data.email);
			forget('email');

		}
	
}