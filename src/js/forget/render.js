const tpl = `
	<div class="forget-wrapper">
		<div class="choose-find-mod">
			<div class="find-mod" id="choose-mobile">使用手机号找回密码</div>
			<div class="find-mod" id="choose-email">使用邮箱找回密码</div>
			<div class="clearfix"></div>
			<div class="forget-dialog" id="forget-dialog">

			</div>

		</div>
	</div>
`;
export default (opts = {}) => {
	console.log(opts);
 	opts.container.innerHTML = tpl;
}