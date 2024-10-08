import { generateAntennaCommand, generateCRC16Code, generateCommand } from "./utils";

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

// 生成检查连接状态命令
export function generateCheckConnectionStatusCommand(count: number) {
  const protocolControlWord = "00011112";
  const dataLength = "0004";
  const body = count.toString(16).padStart(8, "0");
  const str = protocolControlWord + dataLength + body;

  return generateCommand(str);
}

// 生成查询读写器功率命令
export function generateQueryReaderPowerCommand() {
  const protocolControlWord = "00010202";
  const dataLength = "0000";
  const str = protocolControlWord + dataLength;

  return generateCommand(str);
}


// 生成配置读写器功率命令
export function generateConfigureReaderPowerCommand(power: number) {
  const protocolControlWord = "00011112";
  const dataLength = "0004";
  const body = power.toString(16).padStart(8, "0");
  const str = protocolControlWord + dataLength + body;

  return generateCommand(str);
}
