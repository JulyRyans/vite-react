// 座机号
export const reg_tel_speciaPlane =
  /(^((\+86)|(86))?(1[3-9])\d{9}$)|(^(0\d{2,3})-?(\d{7,8})$)/;
// 手机号
export const reg_tel_phone =
  /^((1[3,5,8,7,9][0-9])|(14[5,7])|(17[0,6,7,8])|(19[1,7]))\d{8}$/;
// 银行卡号
export const reg_tel_bankcard = /^([1-9]{1})(\d{15}|\d{18})$/;
// 手机号1开头并且十一位
export const reg_phone = /^1\d{10}$/;
// 手机验证码六位
export const reg_msgCode = /^\d{6}$/;
// 身份证
// 身份证校验
export const checkRegNo = (rule: any, value: any, callback: any) => {
  const city: any = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江 ",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北 ",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏 ",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外 ",
  };
  // const tip: any = "";
  let pass: any = true;

  const patt1 = new RegExp(
    "(^[1-9]\\d{5}(18|19|([23]\\d))\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$)|(^[1-9]\\d{5}\\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\\d{2}$)"
  );
  if (value == "") {
    callback(new Error("请输入身份证号"));
    pass = false;
  } else if (!patt1.test(value)) {
    callback(new Error("身份证号格式错误"));
    pass = false;
  } else if (!city[value.substr(0, 2)]) {
    callback(new Error("地址编码错误"));
    pass = false;
  } else {
    //18位身份证需要验证最后一位校验位
    if (value.length == 18) {
      value = value.split("");
      //∑(ai×Wi)(mod 11)
      //加权因子
      const factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      //校验位
      const parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
      let sum = 0;
      let ai = 0;
      let wi = 0;
      for (let i = 0; i < 17; i++) {
        ai = value[i];
        wi = factor[i];
        sum += ai * wi;
      }
      // const last = parity[sum % 11];
      if (parity[sum % 11] != value[17]) {
        callback(new Error("身份证号码错误"));
        pass = false;
      }
    }
  }
  if (pass) {
    callback();
  }
};
