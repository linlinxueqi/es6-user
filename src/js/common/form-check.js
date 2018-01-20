// design
// export a function
// API设计
// 2.1 check(input,'mobile',cb);
// <input type="text" valid="mobile,phone" />
const rules = {
	mobile:(v) =>{
		return;
	},
	email: (v) => {
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
  let checkResult = [];
  Array.from(elements).filter((item) =>　{
  	console.log(item);
  	return item.getAttribute("valid");
  }).map((item)=>{
  	const valids = item.getAttribute("valid").split(",");
  	const value = item.value;
  	let errorArray = [];
  	valids.forEach((valid) => {
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