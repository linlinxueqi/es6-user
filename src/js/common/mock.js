import FetchMock from 'fetch-mock';
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

FetchMock.mock('./getMobileVerifyToken',(url,method) => {
	return {
		code :200,
		message : 'success',
		mobileVerifyToken : '123456eeee'
	};
})