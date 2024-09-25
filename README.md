# RFID Utils

RFID Utils 是一个用于 RFID 操作的 TypeScript 实用工具库。

## 安装

使用 npm 安装：

```bash
npm install rfid-utils lodash-es
```

注意：本库依赖 `lodash-es`，请确保您的项目中已安装此依赖。

## 主要功能

### 生成启动命令

```typescript
function generateStartCommand(antennaIds: number[]): Buffer
```

根据给定的天线 ID 列表生成 RFID 读取器的启动命令。

### 生成停止命令

```typescript
function generateStopCommand(): Buffer
```

生成 RFID 读取器的停止命令。

### 获取 TID 列表

```typescript
function getTIDList(data: string, antennaIds?: number[]): string[]
```

根据上报的数据获取 TID 列表。可选择性地过滤特定天线 ID 的数据。

### 生成连接状态检查命令

```typescript
function generateCheckConnectionStatusCommand(count: number): Buffer
```

## 使用示例

```typescript
import { generateStartCommand, generateStopCommand, getTIDList } from 'rfid-utils';
// 生成启动命令
const startCommand = generateStartCommand([1, 2, 3]);
// 生成停止命令
const stopCommand = generateStopCommand();
// 获取 TID 列表
const data = "..."; // RFID 上报的数据
const tidList = getTIDList(data);
// 获取特定天线的 TID 列表
const filteredTidList = getTIDList(data, [1, 2]);
```

## API 文档

详细的 API 文档请参考源代码中的注释。

## 作者

liqingshan
