function generateBinaryString(numbers) {
  // 创建一个长度为32的数组，元素全为0
  const binaryArray = Array.from({ length: 32 }, () => "0");

  // 遍历传入的数字数组，将对应位置的元素设置为1
  for (const num of numbers) binaryArray[num - 1] = "1";

  // 将数组反转，并转换为字符串
  return binaryArray.reverse().join("");
}

// 将二进制字符串转换为十六进制字符串
function binaryToHex(binary) {
  // 将二进制字符串转换为十进制数字
  const hex = Number.parseInt(binary, 2).toString(16).toUpperCase();
  // 将十六进制字符串填充到8位，不足部分用0填充
  return hex.padStart(8, "0");
}

// 生成天线指令
function generateAntennaCommand(antennaIds) {
  // 将天线ID数组转换为二进制字符串
  const binary = generateBinaryString(antennaIds);
  // 将二进制字符串转换为十六进制字符串
  const command = binaryToHex(binary);
  // 返回指令
  return command;
}

function hexToBinaryPosition(hexString) {
  // 将十六进制字符串转换为二进制字符串
  const binaryStringList = parseInt(hexString, 16).toString(2).split('').reverse();

  // 找到二进制中第一个 '1' 出现的位置
  const position = binaryStringList.indexOf('1') + 1;

  // 返回 '1' 的位置
  return position;
}


const result = hexToBinaryPosition('16')
console.log('🚀 - result:', result)
