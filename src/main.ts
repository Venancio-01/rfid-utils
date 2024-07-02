import { generateAntennaCommand, generateCRC16Code, generateCommand, getTIDByReportData, parseRFIDReportData } from "./utils";
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
  const reportData = parseRFIDReportData(data);

  if (!antennaIds) {
    const TIDList = uniq(reportData.map(item => getTIDByReportData(item).TID));

    return TIDList;
  } else {
    const allData = reportData.map(item => getTIDByReportData(item));
    const filteredData = allData.filter(item => antennaIds.includes(item.antennaId));
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
