import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
import moment from 'moment'
import { nextComboRefresh, taskRefresh } from './storage'

export const throttle = (fn: any, delay = 500) => {
  let timer: any = null
  const that: any = this
  return (args: any) => {
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(that, args)
      timer = null
    }, delay)
  }
}

export async function timeout(delay: any) {
  return new Promise((resolve) => setTimeout(resolve, delay))
}

export function isEmptyObject(obj: any) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function urlClear() {
  const currentUrl = new URL(window.location.href)
  console.log(currentUrl)
  if(currentUrl && !currentUrl?.search) return false
  currentUrl.searchParams.delete('oauth_token')
  currentUrl.searchParams.delete('oauth_verifier')
  // currentUrl.search = ''
  window.location.href = currentUrl.href
}

export async function messageTip(type: any, message: any) {
  ElMessage({
    showClose: true,
    message,
    type,
  })
}

export function copyContent(text: string, tipCont?: string) {
  try {
    navigator.clipboard.writeText(text).then(
      () => {
        messageTip('success', tipCont || 'Copied')
      },
      (error) => {
        console.error('复制失败', error);
        messageTip('error', 'Oops, unable to copy')
      }
    )
      return true
  } catch (err) {
    console.log('Oops, unable to copy')
  }
  return false
}

export function shareToX(link: any, key: string) {
  const text =
    `Join the @swan_chain Mission to earn BIG in the $SWAN airdrop. The more Point and XP you earn, the bigger your reward.` +
    '\n' +
    `Use my referral code to claim 20% Point Boost! ${key} or ${link}` +
    '\n' +
    `#SwanChain #Airdrop #Mainnet`
  
  window.open(
    "https://twitter.com/intent/tweet?text=" +
    encodeURIComponent(text),
    "_blank",
    "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=700, height=600,top=100,left=350"
  );
}

export function replaceFormat (value: any) {
  try {
    if (String(value) === '0') return '0'
    else if (!value) return '-'
    const intPartArr = String(value).split('.')
    const intPartFormat = intPartArr[0]
      .toString()
      .replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
    return intPartArr[1] && parseFloat(intPartArr[1]) !== 0 ? `${intPartFormat}.${intPartArr[1].slice(0, 2)}` : intPartFormat
  } catch {
    return '-'
  }
}

export function abbreviateNumber(number: number) {
  const units = ['', 'K', 'M', 'B', 'T'];
  let unitIndex = 0;
  while (number >= 1000) {
      number /= 1000;
      unitIndex++;
  }
  return number.toFixed(1) + units[unitIndex]
}

export function groupBy(array: any, key: any) {
  return array.reduce((result: any, currentItem: any) => {
    const groupKey = key(currentItem);
 
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    
    result[groupKey].push(currentItem);
 
    return result;
  }, {});
}

export function momentFun(dateItem: any) {
  if(!dateItem) return '-'
  const dateNew = dateItem * 1000
  let dataUnit = ''
  const dataTime = new Date(dateNew) + ''
  const dataUnitIndex = dataTime.indexOf('GMT')
  const dataUnitArray = dataTime.substring(dataUnitIndex, dataUnitIndex + 8)
  switch (dataUnitArray) {
    case 'GMT+1000':
      dataUnit = 'UTC+10'
      break
    case 'GMT-1000':
      dataUnit = 'UTC-10'
      break
    case 'GMT+0000':
      dataUnit = 'UTC+0'
      break
    default:
      dataUnit = dataUnitArray ? dataUnitArray.replace(/0/g, '').replace('GMT', 'UTC') : '-'
      break
  }
  const dateResult = moment(new Date(dateNew)).format('YYYY/MM/DD HH:mm:ss') + ` ${dataUnit}`
  return dateResult ?? '-'
}

let intervalId:any = null
export function updateCountdown(timestamp: number, type: string) {
  const now = new Date().getTime(); 
  let distance = timestamp*1000 - now; 

  if (distance < 0) {
      clearInterval(intervalId);
      distance = 0;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const timeRefresh = `${days ? days + 'd ' : ''}${hours<10?'0'+hours:hours}:${minutes<10?'0'+minutes:minutes}:${seconds<10?'0'+seconds:seconds}` ?? '-'
  if (type === 'task') return timeRefresh
  else nextComboRefresh.value = timeRefresh
}

export async function daysBetween(timestamp1: any) {
  try{
    const date1 = new Date(timestamp1);
    const date2 = new Date(); 
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    return diffDays + 1;
  }catch{ return 0 }
}

export function timeUpdate(futureTimestamp: number, type: string) {
  intervalId = setInterval(async () =>  {
    if (type === 'task') {
      const time = await updateCountdown(futureTimestamp, type);
      return time
    } else updateCountdown(futureTimestamp, type);
  }, 1000);
}

let lastTime = 0
export async function throttleLast () {
  const now = new Date().valueOf()
  if (lastTime > 0 && now - lastTime <= 2000) return false
  lastTime = now
  return true
}

export function hiddAddress(val:string) {
  if (val) return `${val.substring(0, 4)}...${val.substring(val.length - 4)}`
  else return '-'
}

export function pointNumber(num: any) {
  try{
    if (!num) return 0
    return Math.floor(num/1000)
  }catch{return '-'} 
}

export function unifyNumber(num: number) {
  if (!num) return 0
  const handleNum = parseFloat(num * 100)
  const isToFixed = handleNum.toString().includes('.') && handleNum.toString().split('.')[1].length > 2
  if (isToFixed) {
    const handleArray = handleNum.toString().split('.')
    const decimal = handleArray[1].substr(0, 2)
    if (decimal === "00") return handleNum.toFixed(0)
    else return `${handleArray[0]}.${decimal}`
  } else return handleNum
}

export function findByValue(arr: any, field:string, value:string) {
  try {
    const result = arr.some((item:any) => item[field].toUpperCase() === value.toUpperCase());
    return result
  } catch { return false }
}

export function timeUpdate2(futureTimestamp: number) {
  const { time, isStop } = updateCountdown2(futureTimestamp);
  const lastTime = ref(time);
  if (!isStop) {
    const timer = setInterval(() => {
      const { time, isStop } = updateCountdown2(futureTimestamp);
      lastTime.value = time;
      if (isStop) {
        clearInterval(timer);
      }
    }, 1000);
  }
  return lastTime;
}

function updateCountdown2(timestamp: number) {
  const now = new Date().getTime(); 
  let distance = timestamp*1000 - now; 

  if (distance < 0) {
      distance = 0;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  const timeRefresh = `${days ? days + 'd ' : ''}${hours<10?'0'+hours:hours}:${minutes<10?'0'+minutes:minutes}:${seconds<10?'0'+seconds:seconds}` ?? '-'
  return { time: timeRefresh, isStop: distance < 0 };
}

export function NumFormat (num: any) {
  try {
    if (Number(num) === 0) return 0
    else if (/^[+-]?\d+$/.test(num)) return replaceFormat(num) // Determine whether it is an integer
    else if (num) {
      const intPartArr = String(num).split('.')  
      const p = intPartArr[1].length > 6 ? intPartArr[1].slice(0, 6) : intPartArr[1]
      return `${replaceFormat(intPartArr[0])}.${p}`
    }
    else return '-'
  } catch {
    return '-'
  }
}