/**
 * @Description: 轮询执行方法
 * @param {func} function 需要轮询的方法
 * @param {time} number 轮询间隔,默认1s
 * @param {endTime} number 可轮询时间, 为空时一直轮询
 * @param {immedaite} boolean 第一次是否立即执行
 * @author: qi.wenqiang
 */
let pollTimer = null as any;
export function pollingFunction(
  func: any,
  time = 1000,
  endTime: number,
  cb = () => {
    true;
  },
  immediate = false
) {
  immediate && func(); //是否立即执行一次，由实际决定
  const startTime = new Date().getTime();
  pollTimer = setInterval(() => {
    const nowTime = new Date().getTime();
    if (endTime && nowTime - startTime >= endTime) {
      pollTimer && clearInterval(pollTimer);
      cb();
    }
    func();
  }, time);
  return pollTimer;
}
export function clearIntervalAll() {
  for (let i = 1; i <= pollTimer; i++) {
    clearInterval(i);
  }
}
/**
 * @Description: 判断当前环境
 */
export function getEnv() {
  const domain = window.location.host;
  if (RegExp(/test/).test(domain)) {
    return "test";
  } else if (RegExp(/uat/).test(domain)) {
    return "uat";
  } else {
    return "prod";
  }
}

export const Base64 = {
  //加密
  encode(str: any) {
    return btoa(
      encodeURIComponent(str).replace(
        /%([0-9A-F]{2})/g,
        function toSolidBytes(match: any, p1: any) {
          return String.fromCharCode(("0x" + p1) as any);
        }
      )
    );
  },
  //解密
  decode(str: any) {
    return decodeURIComponent(
      atob(str)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  },
};
// export default Base64
// 截取数字为千位逗号分隔
export function numFormat(num: unknown) {
  if (num) {
    return Number(num)
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
  } else {
    return "0.00";
  }
}
export function checkPrice(val: any) {
  let checkPlan = "" + val;
  checkPlan = checkPlan
    .replace(/[^\d.]/g, "") // 清除“数字”和“.”以外的字符
    .replace(/\.{2,}/g, ".") // 只保留第一个. 清除多余的
    .replace(/^\./g, "") // 保证第一个为数字而不是.
    .replace(".", "$#$")
    .replace(/\./g, "")
    .replace("$#$", ".");
  if (checkPlan.indexOf(".") < 0 && checkPlan !== "") {
    // 以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
    checkPlan = parseFloat(checkPlan) + "";
  } else if (checkPlan.indexOf(".") >= 0) {
    checkPlan = checkPlan.replace(/^()*(\d+)\.(\d\d).*$/, "$1$2.$3"); // 只能输入两个小数
  }
  return checkPlan;
}
// 千分符封装
export function getResult(a: any) {
  if (!a) {
    return null;
  }
  if (numFormat((Math.floor(a * 1000) / 1000).toFixed(2))) {
    return numFormat((Math.floor(a * 1000) / 1000).toFixed(2));
  } else {
    return null;
  }
}
// 计算金额 如果四舍五入大于0就显示处理的 否则就显示没处理的
export function getThousand(a: any) {
  const data = parseFloat(((((a / 10000) * 100) as any) / 100).toFixed(2));
  return Number(data) > 0 ? data : a / 10000;
  // return parseFloat(((((a * 100) / 100) as any) / 10000).toFixed(2))
}
function formatNumber(n: any) {
  n = n.toString();
  return n[1] ? n : "0" + n;
}
// 解析时间戳
export function formatTime(number: any, format: any) {
  const time = new Date(number);
  const newArr = [];
  const formatArr = ["Y", "M", "D", "h", "m", "s"];
  newArr.push(time.getFullYear());
  newArr.push(formatNumber(time.getMonth() + 1));
  newArr.push(formatNumber(time.getDate()));

  newArr.push(formatNumber(time.getHours()));
  newArr.push(formatNumber(time.getMinutes()));
  newArr.push(formatNumber(time.getSeconds()));

  for (const i in newArr) {
    format = format.replace(formatArr[i], newArr[i]);
  }
  return format;
}

// 解析中国标准时间

export function timeFun(time: any) {
  const d = new Date(time);
  const datetime =
    d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  return datetime;
}
// 复制
export function doCopy(val: any, cb: () => {}) {
  const input = document.createElement("input");
  input.value = val;
  document.body.appendChild(input);
  input.select();
  document.execCommand("Copy");
  document.body.removeChild(input);
  cb();
}
// 提交参数去除前后空格
export function dataTrim(data: Record<string, any>) {
  const reg = /^\s+|\s+$/g;
  Object.keys(data).forEach((el) => {
    if (typeof data[el] === "string") {
      data[el] = data[el].replace(reg, "");
    } else if (Array.isArray(data[el])) {
      data[el].forEach((v: any) => {
        if (typeof v === "string") {
          v = v.replace(reg, "");
        } else if (Object.prototype.toString.call(v) === "[object Object]") {
          v = dataTrim(v);
        }
      });
    }
  });
  return data;
}

function formateNum(num: any, reserveNum: any, interval: any, tag: any) {
  interval = interval || 3;
  tag = tag || ",";
  reserveNum = reserveNum || 0;
  if (String(num).indexOf(tag) > -1 || String(num).indexOf("，") > -1) {
    // 如果数字中有了分隔符，那么不做处理
    return num;
  }
  if (!num) {
    num = 0;
    return num.toFixed(reserveNum);
  }
  let result = Number(num).toFixed(reserveNum);
  result = String(result);
  const reg = new RegExp(
    `(?=(?!\b)(\\d{${interval}})+(\\.\\d{${reserveNum}})?$)`,
    "g"
  );
  let str = result.replace(reg, tag);
  console.log(str);

  if (str.indexOf(tag) === 0) {
    console.log(str.substring(1));

    str = str.substring(1);
  }
  return str;
}
// 第一位参数值/第二位参数保留精确到几位/第三位小数是几分位显示逗号
export function thousand(num: any) {
  return formateNum(num, 2, 3, null);
}
