import { $ } from '../common/util.js';
import { fetchPost } from '../common/fetch.js';
import { formCheck } from '../common/form-check.js';
export default ((opts = {}) => {
	const $loginForm = $('login-form');
	const $loginBtn = $('login-btn');
	const $remember = $('login-remember');
	const $clearAccount = $('clear-account');
	const $account = $('login-account');
	const $password = $('login-password');
	const $error = $('login-error');
		console.log($loginForm);

	// 需要表单验证
	$loginBtn.onclick = async () => {
		/**
		*点击登录
	    */
		// fetch(url,{}).then((res) => {
		// 	res.json();
		// 	handle(res.json());
		// });
		// const v = await fetch(url,{}).then((res) => {
		// 	 return res.json();
		// });
		// handle(v);
		console.log(formCheck);
		const checkResult = formCheck($loginForm);
		console.log(checkResult);
		if(checkResult.length){
			const name = checkResult[0].name;
			const type = checkResult[0].type;
			if(type === 'present'){
				if(name === "account"){
					$error.innerHTML = '请填写你的用户名';
				}else{
					$error.innerHTML = '请填写你的密码';
				}
			}
			return;
		}
		let remember = '0';
		console.log($remember);
		if($remember.getAttribute('checked')){
			remember = '1';
		}
		const data = await fetchPost('./login',{
			account:$account.value,
			password:$password.value,
			remember:remember
		});
		console.log(data);
		if(data.code == 200){
			opts.success && opts.success();
		}else{
			$error.innerHTML = data.message;
		}
	}
	$account.oninput = () => {
		if($account.value.length){
			$clearAccount.style.display = "block";
		}else{
			$clearAccount.style.display = "none";
		}
		$error.innerHTML = "";
	}

	$clearAccount.onclick = () => {
		$account.value = "";
		$clearAccount.style.display = "none";
	}
	$password.oninput = () => {
		$error.innerHTML = "";
	}
});
