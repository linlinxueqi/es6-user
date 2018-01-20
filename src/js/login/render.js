import {$} from '../common/util.js';
const template = (opts = {}) => {
	const autocompleteTpl = `
		<div id="no-autocomplete">
			<input type="text" />
			<input type="password" />
		</div>
	`;
	const autocompleteAdapter = opts.autocomplete ? "" :autocompleteTpl;
	const autocompleteValue = opts.autocomplete ? 'on' : 'off';
	const showRemember = opts.showRemember;
	const tpl = `
		
		<div id="login-wrapper">
			<form id="login-form" onsubmit="return false">
				${autocompleteAdapter}
				<label id="login-error"></label>
				<label class="login-account-wrapper">
					<span class="account-label">${opts.accountLabel}</span>
					<input id="login-account" name="account" autocomplete=${autocompleteValue} valid="present" type="text" placeholder="${opts.accountPlaceholder}">
					<span id="clear-account" class="del"></span>
				</label>
				<label class="login-account-wrapper">
					<span class="password-label">${opts.passwordLabel}</span>
					<input id="login-password" name="password" autocomplete=${autocompleteValue} valid="present" type="password" placeholder="${opts.passwordPlaceholder}">
				</label>
				<label class="login-remember-wrapper" style="display:${showRemember}">
					<span>记住密码：</span>
					<input id="login-remember" type="checkbox" name="remember" />
				</label>
				<input id="login-btn" class="login-btn" type="button" value="${opts.loginBtnText}" />
				<div class="login-extra-wrapper">
					<a href="forget.html">忘记密码</a>
					<a href="register-mobile.html">免费注册</a>
				</div>
			</form>
		<div>
	`;
	return tpl;
}
export default ((conf = {}) => {
	conf.container.innerHTML = template(conf);
	const $noAutocomplete = $('no-autocomplete');
	if($noAutocomplete){
		$noAutocomplete.style.opacity = '0';
		$noAutocomplete.style.height = '0';
	}
});
// class定义样,id定义选择器，为了支持ie8
// id足够的长，并且有个前缀，避免和业务中的代码重名，id后面加个随机数