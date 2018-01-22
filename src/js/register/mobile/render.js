const tpl = (opts = {}) => {
	return `
		<div class="register-mobile-wrapper">
			<form id="register-mobile-form" onsubmit="return false">
				<label>
					<span>手机号</span>
					<input type="text" id="register-mobile-input" placeholder="${opts.mobilePlaceholder || ''}"  vaild="present,mobile"/>
				</label>

				<label>
					<span>验证</span>
					<div id="register-verify-wrapper" class="register-verify-wrapper"></div>
				</label>
				<input type="submit" class="disabled" disabled id="register-verify-btn" value="下一步" />
			</form>
			<div class="register-verify-dialog" id="register-verify-dialog">
				<div class="register-verify-dialog-header">
					<div class="register-verify-dialog-close" id="register-verify-dialog-close">
					</div>
				</div>
				<p class="register-tip">
					<img src="../images/tip-fill.png" alt="" />校验验证码已发送到你的手机，15分钟内输入有效，请勿泄露
				</p>
				<form id="register-verify-form" onsubmit="return false">
					<label>
						<span>手机号：</span>
						<div id="register-verify-mobile"></div>
					</label>
					<label>
						<span>验证码: </span>
						<input type="text" name="verify" id="register-verify-input" />
					</label>
					<label>
						<span>&nbsp;</span>
						<div class="register-tip"><img src="../images/ok-fill.png" alt="" />校验码已发送到你的手机，请查收</div>
					</label>
					<input type="submit" id="register-mobile-btn" class="disabled" disabled value="确认" />
				</form>
			</div>
		</div>
	`;
}

export default (conf) => {
	conf.container.innerHTML = tpl(conf);
}
