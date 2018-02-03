import FetchMock from 'fetch-mock';

import regionData from '../data/region-data.js';
FetchMock.mock('./login',(url,opts) => {
	const params = opts.params;
	if(params.account === "123456"){
		if(params.password === "111"){
			return {code:200,message:'success'};
		}else{
			return {code:400,message:'密码错误'};
		}
	}else{
		return {code : 400,message:'用户名报错'};
	}
});

FetchMock.mock('./getMobileVerifyToken',(url,opts) => {
	return {
		code :200,
		message : 'success',
		mobileVerifyToken : '123456eeee'
	};
});

FetchMock.mock('/register/getVerifyCode',(url,opts) => {
	const params = opts.params;
	return {code :200,message:'success',mobile:params.mobile};
})

FetchMock.mock('/register/info',(url,opts) => {
	return {code :200,message:'success'};
})

FetchMock.mock('/register/payment',(url,opts) => {
	return {code :200,message:'success'};
})

FetchMock.mock('/register/mobile',(url,opts) => {
	const params = opts.params;
	if(params.verifyCode === '123456'){
		return {code :200,message:'success',token:'123456789'};

	}else{
		return {code :400,message:'invaild verifyCode'};

	}	
})

FetchMock.mock('/profile', {

	code :200,
	message:'success',
	data:{
		nickname:'xiaoxue',
		mobile:'13523232323',
		email:'xoapming@qq.com',
		realname:'小雪',
		sex:1,
		birthday:'1997-01-23',
		regionCode:'9,73,723',
		regionString:'上海市静安区'

	}
})

FetchMock.mock('/delivery-address',{
	code: 200,
    message: 'success',
    data: [{
        name: '张三',
        regionSting: '北京市东城区',
        regionCode: '1,1,1',
        detailAddress: '和平北街334号',
        postalcode: '100000',
        mobile: 18512567389,
        telephone: '',
        addrId: 345
    },
    {
        name: '张三',
        regionSting: '北京市西城区',
        regionCode: '1,1,2',
        detailAddress: '和平西街234号',
        postalcode: '100000',
        mobile: 18512567389,
        telephone: '',
        addrId: 346
    },
    {
        name: '李四',
        regionSting: '上海市静安区',
        regionCode: '9,73,723',
        detailAddress: '和平北街334号',
        postalcode: '100000',
        mobile: 18517384387,
        telephone: '',
        addrId: 347
    }]
})
FetchMock.mock('./region-data',{code:200,message:'success',data:regionData});
FetchMock.mock('/save-delivery',{code:200,message:'success'});
FetchMock.mock('/del-delivery',{code:200,message:'success'});
FetchMock.mock('/security-info',{
	code:200,
	message:'success',
	data:{
		nickname:"xiaoxue",
		mobile:"13532332323",
		email:"xiaoxue@163.com",
		password:1,
		identity:1,
		secretQuestion:0
	}
});
