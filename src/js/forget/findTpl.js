export default (type,number) => {
	return `
		<div class="forget-verify-dialog-header" id="forget-verify-dialog-header">
			<div class="forget-verify-dialog-close" id="forget-verify-dialog-close"></div>
			<p class="forget-tip">
				<img src="../images/tip-fill.png" alt="" />验证码已经发送到您的${type},15分钟内有效，请勿泄露
			</p>
			<form id="forget-form" onsubmit="return false">
				<label>
					<span>${type}:</span>
					<div id="forget-verify-number">${number}</div>
				</label>
				<label>
					<span>验证码:</span>
					<input type="text" name="verify" id="forget-verify-input"/>
				</label>
				<input type="button" id="forget-confirm-btn" value="确认" class="disabled" disabled/>
			</form>
		</div>
	`
}