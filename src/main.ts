// import { generateAntennaCommand, generateCRC16Code, generateCommand, getTIDByReportData, parseRFIDReportData } from "./utils";
import { generateAntennaCommand, generateCRC16Code, generateCommand, getTIDByReportData } from "./utils";
import { uniq, uniqBy } from "lodash-es";

export * from "./utils";

/**
 * 生成启动命令
 *
 * @export
 * @param {number[]} antennaIds
 * @return {*}  {Buffer}
 */
export function generateStartCommand(antennaIds: number[]): Buffer {
  const COMMAND_HEADER = "5A";
  const commandBody = `000102100008${generateAntennaCommand(antennaIds)}01020006`;
  const checkCode = generateCRC16Code(commandBody);
  const command = Buffer.from(COMMAND_HEADER + commandBody + checkCode, "hex");

  return command;
}

/**
 * 生成停止命令
 *
 * @export
 * @return {*}  {Buffer}
 */
export function generateStopCommand(): Buffer {
  const command = Buffer.from("5A000102FF0000885A", "hex");
  return command;
}

/**
 * 根据上报数据获取TID列表
 *
 * @export
 * @param {string} data
 * @return {*}  {string[]}
 */
export function getTIDList(data: string, antennaIds?: number[]): string[] {
  // const reportData = parseRFIDReportData(data);
  const reportData = [data];

  if (!antennaIds) {
    const TIDList = uniq(reportData.map(item => getTIDByReportData(item).TID));

    return TIDList;
  } else {
    const allData = reportData.map(item => getTIDByReportData(item));
    console.log('🚀 - getTIDList - allData:', allData)
    const filteredData = allData.filter(item => antennaIds.includes(item.antennaId));
    console.log('🚀 - getTIDList - filteredData:', filteredData)
    const TIDList = uniqBy(filteredData,'TID').map(item => item.TID);

    return TIDList;
  }
}

export function generateCheckConnectionStatusCommand(count: number) {
  const protocolControlWord = "00011112";
  const dataLength = "0004";
  const body = count.toString(16).padStart(8, "0");
  const str = protocolControlWord + dataLength + body;

  return generateCommand(str);
}


const result1 = getTIDList('5a000112000029000c300833b2ddd90140000000003400020104020003000ce280110c2000774978240a8b08000dd9e634c1',[1])
console.log('🚀 - result1:', result1)

const result2 = getTIDList('5a000112000029000c300833b2ddd90140000000003400020104020003000ce280110c2000774978240a8b08000dd9e634c1',[2])
console.log('🚀 - result2:', result2)

const result3 = getTIDList('5a000112000029000c300833b2ddd90140000000003400020104020003000ce280110c2000774978240a8b08000dd9e634c1')
console.log('🚀 - result3:', result3)



