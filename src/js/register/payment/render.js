const tpl = (opts) => {
	return `
		<div id="register-payment-wrapper" class="register-payment-wrapper">
			<form id="register-payment-form" onsubmit="return false;">
				<label>
					<span>XX账号：</span>
					<input id="register-payment-input" type="text" name="username" placeholder="${opts.paymentPlaceholder}"/>
				</label>
				<label>
					<span>XX密码：</span>
					<input id="register-payment-password" type="text" name="password" placeholder="${opts.paymentPasswordPlaceholder}"/>
				</label>
				<input type="button" id="register-payment-btn" class="register-payment-btn" value="下一步"/>
			</form>
		</div>
	`;
}

export default (conf) => {
	conf.container.innerHTML = tpl(conf);
}