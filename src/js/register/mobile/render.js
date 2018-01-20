const tpl = (opts = {}) => {
	return `
		<div class="register-mobile-wrapper">
			<form id="register-mobile-form" onsubmit="return false">
				<label>
					<span>手机号</span>
					<input type="text" placeholder="${opts.mobilePlaceholder || ''}" vaild="present,mobile"/>
				</label>

				<label>
					<span>验证</span>
					<div id="register-verify-wrapper"></div>
				</label>
			</form>
		</div>
	`;
}

export default (conf) => {
	conf.container.innerHTML = tpl(conf);
}