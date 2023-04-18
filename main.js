const fs = require('fs')
const { SourceMapConsumer } = require('source-map')

const [file, cols] = process.argv.slice(2)

const rawSourceMap = JSON.parse(fs.readFileSync(file))

SourceMapConsumer.with(rawSourceMap, null, consumer => {
    console.log(
        cols.split(',').map(loc => {
            const [line, column] = loc.split(':')
            return consumer.originalPositionFor({line: +line, column})
        })
    )
})
