// design
// export a function
// API设计
// 2.1 check(input,'mobile',cb);
// <input type="text" valid="mobile,phone" />
const rules = {
	mobile:(v) =>{
    if(!v.match(/^1(3|4|5|7|8)\d{9}$/)){
      return {
        type:'mobile',
        message:'手机号格式不正确'
      }
    }
		return;
	},
  ltFFFF:(v) => {
    if(v.match(/\u{ffff}-\u{fffff}/u)){
      return {
        type:'ltFFFF',
        message:'您输入了非法字符'
      }
    }
  },
  noOther:(v) => {
    if(v.match(/[\p{C}]/u)){
      return {
        type:"noOther",
        message:'您输入了非法字符'
      }
    }
  },
	email: (v) => {
    if(!v.match(/^([\w\d_\.\-])+\@(([\w\d\-])+\.)([\w\d]{2,4})+$/)){
      return {
        type:"email",
        message:"请输入正确的邮箱"
      }
    }
		return;
	},
	present:(v) => {
		if(!v.trim()){
			return {
				type:"present",
				message:"必填"
			}
		}
	}
}
const formCheck = (form) => {
  if(!form && !form.elements.length){
  	return;
  }
  const elements = form.elements;
  console.log(elements);
  let checkResult = [];
  
  Array.from(elements).filter((item) =>　{
  	return item.getAttribute("vaild");
  }).map((item)=>{
    console.log(item);
  	const valids = item.getAttribute("vaild").split(",");
    console.log(valids);
  	const value = item.value;
    console.log(value);
  	let errorArray = [];
  	valids.forEach((valid) => {
      console.log(rules[valid]);
  		if(rules[valid]){
  			let result = rules[valid](value);
  			result && errorArray.push(result);
  		}
  	});
  	if(errorArray.length){
  		checkResult.push({
  			dom:item,
  			errorArr:errorArray,
  			name:item.name,
  			message:errorArray[0].message,
  			type:errorArray[0].type
  		});
  	}
  });
  return checkResult;
}
export {  formCheck  }