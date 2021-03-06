import {fetchJson} from '../common/fetch.js';
import Region from '../common/region.js';
import { getUrlParams,$ } from '../common/util.js';

let regionData;
const tpl = (opts = {}) => {
	const data = opts.data;
	let currentData;
	if(opts.addrId){
		currentData = data.find((item) =>{
			return parseInt(opts.addrId) === item.addrId;
		});
		// currentData = data.filter((item) =>{
		// 	return parseInt(opts.addrId) === item.addrId;
		// })[0];
		regionData = currentData.regionCode ? currentData.regionCode.split(',').map((item) => parseInt(item)) : '';
	}else{
		currentData = {}
	}
	let tpl = `
		<div id="delivery-address-wrapper" class="delivery-address-wrapper">
			<form id="delivery-address-form" onsubmit="return false">
				<input type="hidden" id="delivery-address-id" name="addrId" value="${currentData.addrId || ''}"/>
				<label>
					<span>省市区：</span>
					<div id="delivery-address-region">
					</div>
				</label>
				<label>
					<span>详细地址：</span>
					<input id="delivery-address-detail" name="detailAddress" value="${currentData.detailAddress || ''}" placeholder="详细地址" vaild="present">
				</label>
				<label>
					<span>邮政编码：</span>
					<input id="delivery-address-postalcode" name="postalcode" value="${currentData.postalcode || ''}" placeholder="邮政编码">
				</label>
				<label>
					<span>收货人姓名：</span>
					<input id="delivery-address-name" name="name" placeholder="收货人姓名" value="${currentData.name || ''}" vaild="present">
				</label>
				<label>
					<span>手机号码：</span>
					<input id="delivery-address-mobile" name="mobile" placeholder="手机号码" value="${currentData.mobile || ''}">
				</label>
				<label>
					<span>固定电话：</span>
					<input id="delivery-address-phone" name="telephone" placeholder="固定电话" value="${currentData.phone  || ''}">
				</label>
				<label>
					<span>&nbsp;</span>
					<input id="save-delivery-address"  type="button" value="保存" />
				</label>
			</form>
			<div class="delivery-address-list" id="delivery-address-list">
				<table>
					<tr>
						<th>收货人</th>
						<th>所在地区</th>
						<th>详细地址</th>
						<th>邮编</th>
						<th>手机/固定</th>
						<th>操作</th>
					</tr>`;
			data.forEach((item) => {
				tpl += `
					<tr>
						<td>${item.name}</td>
						<td>${item.regionString}</td>
						<td>${item.detailAddress}</td>
						<td>${item.postalcode}</td>
						<td>${item.mobile || item.telephone}</td>
						<td>
							<a href="javascript:void(0)" class="del-delivery-address" data-id="${item.addrId}">删除</a>
							<a href="delivery-address.html?addrId=${item.addrId}">修改</a>
						</td>
					</tr>`
			})
		tpl += `</table></div></div>`;
		return tpl;
}
export default async (opts) => {
	const result = await fetchJson('/delivery-address',{});
	if(result.code === 200){
		opts.container.innerHTML = tpl({
			data:result.data,
			addrId:opts.addrId || getUrlParams('addrId')
		});
		let region = new Region({
			container:$('delivery-address-region'),
			name:'region',
			preset:true,
			initData:regionData
		})
	}
	else{
		alert("数据拉取失败");
	}
}