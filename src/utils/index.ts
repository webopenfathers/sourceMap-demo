import axios from 'axios'
import sourceMap from 'source-map'
const getSourceMap = async (url: string) => {
  const res = await axios.get(url)
  return res
}
const findCodeBySourceMap = async (stackFrame: any) => {
  // 获取map文件
  const sourceMapFile = await getSourceMap(stackFrame.fileName + '.map')
  const fileContent = sourceMapFile.data
  // 解析map文件
  const consumer = await new sourceMap.SourceMapConsumer(fileContent)
  // 通过报错的位置查找对应的源文件的名称已经报错行数
  const originalPosition = consumer.originalPositionFor({
    line: stackFrame.lineNumber,
    column: stackFrame.columnNumber
  })

  const code = consumer.sourceContentFor(originalPosition.source)

  console.log(code, '还原之后的源代码')
}

export { findCodeBySourceMap }
