import { getTIDByReportData, parseRFIDReportData } from "./utils";
import { uniq, uniqBy } from "lodash-es";

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
    const TIDList = uniqBy(filteredData, "TID").map((item: { TID: string, antennaId: number }) => item.TID);

    return TIDList;
  }
}


// 根据上报数据解析读写器功率
export function parseReaderPower(data: string): { antennaPort: number; power: number }[] {
  // 假设 data 是一个字符串，格式如 "5A000102020008011E021E031E041E34D2"
  const powerData: { antennaPort: number; power: number }[] = [];
  
  // 移除前缀 "5A00010202" 和后缀 CRC 校验码（最后4个字符）
  const cleanData = data.slice(10, -4);
  
  // 获取数据长度（以字节为单位）
  const dataLength = parseInt(cleanData.slice(0, 4), 16);
  
  // 提取实际的功率数据
  const actualData = cleanData.slice(4, 4 + dataLength * 2);
  
  for (let i = 0; i < actualData.length; i += 4) {
    const antennaPort = parseInt(actualData.slice(i, i + 2), 16);
    const power = parseInt(actualData.slice(i + 2, i + 4), 16);
    powerData.push({ antennaPort, power });
  }
  
  return powerData;
}

