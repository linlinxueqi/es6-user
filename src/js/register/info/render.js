import Region from '../../common/region.js';
import { $ } from '../../common/util.js';
import {fetchJson} from '../../common/fetch.js';
const tpl = (data = {}) => {
	return `<div class="register-info-wrapper" id="register-info-wrapper">
		<form class="register-info-form" id="register-info-form" onsubmit="return false">
			<label>
				<span>昵称：</span>
				<input type="text" name="nickname"  placeholder="昵称" vaild="present,noOther" value="${data.nickname || ''}"/>
			</label>
			<label>
				<span>电子邮箱：</span>
				<input type="text" name="email"  placeholder="电子邮箱" vaild="present,email,noOther" value="${data.email || ''}"/>
			</label>
			<label>
				<span>真实姓名：</span>
				<input type="text" name="realname"  placeholder="真实姓名" value="${data.realname || ''}" />
			</label>
			<label>
				<span>性别：</span>
				<select name="sex" id="register-info-sex" value="${data.sex || ''}">
					<option value="1">男</option>
					<option value="2">女</option>
				</select>
			</label>
			<label>
				<span>生日：</span>
				<input type="text" name="birthday" value="${data.birthday || ''}"  />
			</label>
			<label>
				<span>居住地：</span>
				<div id="register-info-address"></div>
			</label>
			<label>
				<span></span>
				<input type="submit" id="register-info-btn" value="下一步" />
			</label>
		</form>
	</div>`

} 
	
export default async (opts) => {
	if(opts.update){
		opts.container.innerHTML = tpl();
		const region = new Region({
			container:$('register-info-address'),
			name:'region'
		})
	}else{
		const result = await fetchJson('/profile'.{});
		if(result.code === 200){
			opts.container.innerHTML = tpl(result.data);
		}
	}
	
}