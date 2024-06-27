export function generateCommand(command: string) {
  const FH = "5A";
  const body = command;
  const checkCode = generateCRC16Code(body).padStart(4, "0");

  return Buffer.from(FH + body + checkCode, "hex");
}
// 生成二进制字符串
export function generateBinaryString(numbers: number[]): string {
  // 创建一个长度为32的数组，元素全为0
  const binaryArray = Array.from({ length: 32 }, () => "0");

  // 遍历传入的数字数组，将对应位置的元素设置为1
  for (const num of numbers) binaryArray[num - 1] = "1";

  // 将数组反转，并转换为字符串
  return binaryArray.reverse().join("");
}

// 将二进制字符串转换为十六进制字符串
export function binaryToHex(binary: string) {
  // 将二进制字符串转换为十进制数字
  const hex = Number.parseInt(binary, 2).toString(16).toUpperCase();
  // 将十六进制字符串填充到8位，不足部分用0填充
  return hex.padStart(8, "0");
}

// 生成天线指令
export function generateAntennaCommand(antennaIds: number[]) {
  // 将天线ID数组转换为二进制字符串
  const binary = generateBinaryString(antennaIds);
  // 将二进制字符串转换为十六进制字符串
  const command = binaryToHex(binary);
  // 返回指令
  return command;
}

const CRC_CCITT_table = [
  0x0000, 0x1021, 0x2042, 0x3063, 0x4084, 0x50a5, 0x60c6, 0x70e7, 0x8108, 0x9129, 0xa14a, 0xb16b, 0xc18c, 0xd1ad, 0xe1ce, 0xf1ef, 0x1231, 0x0210, 0x3273, 0x2252, 0x52b5, 0x4294,
  0x72f7, 0x62d6, 0x9339, 0x8318, 0xb37b, 0xa35a, 0xd3bd, 0xc39c, 0xf3ff, 0xe3de, 0x2462, 0x3443, 0x0420, 0x1401, 0x64e6, 0x74c7, 0x44a4, 0x5485, 0xa56a, 0xb54b, 0x8528, 0x9509,
  0xe5ee, 0xf5cf, 0xc5ac, 0xd58d, 0x3653, 0x2672, 0x1611, 0x0630, 0x76d7, 0x66f6, 0x5695, 0x46b4, 0xb75b, 0xa77a, 0x9719, 0x8738, 0xf7df, 0xe7fe, 0xd79d, 0xc7bc, 0x48c4, 0x58e5,
  0x6886, 0x78a7, 0x0840, 0x1861, 0x2802, 0x3823, 0xc9cc, 0xd9ed, 0xe98e, 0xf9af, 0x8948, 0x9969, 0xa90a, 0xb92b, 0x5af5, 0x4ad4, 0x7ab7, 0x6a96, 0x1a71, 0x0a50, 0x3a33, 0x2a12,
  0xdbfd, 0xcbdc, 0xfbbf, 0xeb9e, 0x9b79, 0x8b58, 0xbb3b, 0xab1a, 0x6ca6, 0x7c87, 0x4ce4, 0x5cc5, 0x2c22, 0x3c03, 0x0c60, 0x1c41, 0xedae, 0xfd8f, 0xcdec, 0xddcd, 0xad2a, 0xbd0b,
  0x8d68, 0x9d49, 0x7e97, 0x6eb6, 0x5ed5, 0x4ef4, 0x3e13, 0x2e32, 0x1e51, 0x0e70, 0xff9f, 0xefbe, 0xdfdd, 0xcffc, 0xbf1b, 0xaf3a, 0x9f59, 0x8f78, 0x9188, 0x81a9, 0xb1ca, 0xa1eb,
  0xd10c, 0xc12d, 0xf14e, 0xe16f, 0x1080, 0x00a1, 0x30c2, 0x20e3, 0x5004, 0x4025, 0x7046, 0x6067, 0x83b9, 0x9398, 0xa3fb, 0xb3da, 0xc33d, 0xd31c, 0xe37f, 0xf35e, 0x02b1, 0x1290,
  0x22f3, 0x32d2, 0x4235, 0x5214, 0x6277, 0x7256, 0xb5ea, 0xa5cb, 0x95a8, 0x8589, 0xf56e, 0xe54f, 0xd52c, 0xc50d, 0x34e2, 0x24c3, 0x14a0, 0x0481, 0x7466, 0x6447, 0x5424, 0x4405,
  0xa7db, 0xb7fa, 0x8799, 0x97b8, 0xe75f, 0xf77e, 0xc71d, 0xd73c, 0x26d3, 0x36f2, 0x0691, 0x16b0, 0x6657, 0x7676, 0x4615, 0x5634, 0xd94c, 0xc96d, 0xf90e, 0xe92f, 0x99c8, 0x89e9,
  0xb98a, 0xa9ab, 0x5844, 0x4865, 0x7806, 0x6827, 0x18c0, 0x08e1, 0x3882, 0x28a3, 0xcb7d, 0xdb5c, 0xeb3f, 0xfb1e, 0x8bf9, 0x9bd8, 0xabbb, 0xbb9a, 0x4a75, 0x5a54, 0x6a37, 0x7a16,
  0x0af1, 0x1ad0, 0x2ab3, 0x3a92, 0xfd2e, 0xed0f, 0xdd6c, 0xcd4d, 0xbdaa, 0xad8b, 0x9de8, 0x8dc9, 0x7c26, 0x6c07, 0x5c64, 0x4c45, 0x3ca2, 0x2c83, 0x1ce0, 0x0cc1, 0xef1f, 0xff3e,
  0xcf5d, 0xdf7c, 0xaf9b, 0xbfba, 0x8fd9, 0x9ff8, 0x6e17, 0x7e36, 0x4e55, 0x5e74, 0x2e93, 0x3eb2, 0x0ed1, 0x1ef0,
];

// 生成CRC16校验码
export function generateCRC16Code(command: string) {
  // 将命令转换为buffer
  const buffer = Buffer.from(command, "hex");

  // 初始化CRC16校验码
  let wCRC = 0;
  // 遍历buffer中的每一个字节
  for (let i = 0; i < buffer.length; i++) {
    // 获取当前字节
    const chChar = buffer[i];
    // 计算CRC16校验码
    wCRC = ((wCRC << 8) ^ CRC_CCITT_table[((wCRC >> 8) ^ chChar) & 0xff]) & 0xffff;
  }
  // 将CRC16校验码转换为16进制字符串
  return wCRC.toString(16).padStart(4, "0");
}

// 解析RFID报告数据
export function parseRFIDReportData(data: string) {
  // 前缀
  const PREFIX = "5a00011200";
  // 将字符串按照前缀分割
  const arr = data.split(PREFIX);

  // 使用reduce函数将分割后的字符串进行处理
  const parseArr = arr.reduce((acc, cur) => {
    // 如果字符串以00开头
    if (cur.startsWith("00")) {
      // 计算出字符串的长度
      const length = Number.parseInt(`0x${cur.substring(0, 4)}`, 16) * 2;
      // 将处理后的字符串放入acc数组中
      acc.push(`${PREFIX}${cur.substring(0, 4 + length)}`);
    }

    return acc;
  }, [] as string[]);

  // 返回处理后的字符串数组
  return parseArr;
}

// 根据报告数据获取TID
export function getTIDByReportData(data: string) {
  // 定义一个字符串变量，用于存储传入的数据
  let str = data;
  // 定义一个前缀字符串
  const PREFIX = "5a00011200";
  // 定义一个TID长度和命令长度的常量
  const TIDLengthCommandLength = 4;
  // 定义一个中间命令长度的常量
  const MidCommandLength = 16;

  // 将传入的数据中的前缀字符删除
  str = str.replace(PREFIX, "");

  // 定义一个EPC长度的变量，并将传入的数据中的EPC长度转换为16进制
  const EPCLength = Number.parseInt(`0x${str.substring(4, 8)}`, 16) * 2;
  // 定义一个TID长度的变量，并将传入的数据中的TID长度转换为16进制
  const TIDLength = Number.parseInt(`0x${str.substring(8 + EPCLength + MidCommandLength, 8 + EPCLength + MidCommandLength + TIDLengthCommandLength)}`, 16) * 2;

  // 定义一个TID变量，并将传入的数据中的TID取出
  const TID = str.substring(8 + EPCLength + MidCommandLength + TIDLengthCommandLength, 8 + EPCLength + MidCommandLength + TIDLengthCommandLength + TIDLength);

  const antennaIdStr = str.slice(8 + EPCLength + 4, 8 + EPCLength + 4 + 2);

  const antennaId = hexToBinaryPosition(antennaIdStr);

  // 返回TID
  return {
    TID,
    antennaId,
  };
}

function hexToBinaryPosition(hexString: string) {
  // 将十六进制字符串转换为二进制字符串
  const binaryStringList = parseInt(hexString, 16).toString(2).split("").reverse();

  // 找到二进制中第一个 '1' 出现的位置
  const position = binaryStringList.indexOf("1") + 1;

  // 返回 '1' 的位置
  return position;
}
