import {fetchPost} from '../common/fetch.js';
import {$,bindEvent} from '../common/util.js';
import {formCheck} from '../common/form-check.js';


export default (opts = {}) => {
	const $saveBtn = $("save-delivery-address");
	const $list = $("delivery-address-list");
	const $form = $("delivery-address-form");	


	
     
    $saveBtn.onclick = async (e) => {
    	e.preventDefault();
    	console.log(formCheck);
    	const checkResult = formCheck($form);
    	if(!checkResult.length){
    		let formValues = {};
    		Array.from($form.elements).forEach((item) => {
    			formValues[item.name] = item.value;
    		});
    		let data = await fetchPost('/save-delivery',formValues);
    		console.log(data);
    		if(data.code===200){
    			opts.success && opts.success();
    		}else{
    			alert("保存失败")
    		}
    	}else{
    		const tipMap = {
    			name:"收货人姓名",
    			region:"所在地地址",
    			datailAddress:"详细地址",
    			mobile:"手机号码"
    		}
    		const type = checkResult[0].type;
    		const name = checkResult[0].name;
    		if(type === 'present'){
    			alert("请填写您的"+tipMap[name]);
    		}else{
    			alert("请填写正确格式的"+tipMap[name]);
    		}
    	}
    }


    bindEvent($list,'click','.del-delivery-address',async (e) => {
    	if(confirm("是否确认删除该收获地址")){
    		let data = await fetchPost('/del-delivery',{
    			addrId:e.target.getAttribute('data-id')
    		});
    		console.log(data);
    		if(data.code === 200){
    			location.reload();
    		}else{
    			alert("收获地址删除失败");
    		}
    	}
    })

	
}