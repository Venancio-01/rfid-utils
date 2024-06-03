import { generateAntennaCommand, generateCRC16Code, getTIDByReportData, parseRFIDReportData } from "./utils";

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
export function getTIDList(data: string): string[] {
  const reportData = parseRFIDReportData(data);
  const TIDList = [...new Set(reportData.map(item => getTIDByReportData(item)))];

  return TIDList;
}
