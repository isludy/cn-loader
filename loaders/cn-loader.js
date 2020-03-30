function parse(code){
    return code
    .replace(/导入[:：]\s*(.+?)\s*(?:为[:：]\s*(.+?))?(\n|$)/g, ($0, $1, $2) => {
        if($2 !== undefined){
            return 'import '+ $2 +' from "' +$1 + '";\n'
        }else{
            return 'import'+$1+';\n'
        }
    })
    .replace(/注释[:：]/g, '//')
    .replace(/变量[:：]\s*(.+?)(?:\s*=\s*(.+?))?(\n|$)/g, ($0, $1, $2) => {
        if($2 !== undefined){
            return 'var '+ $1 + '=' + $2 + ';\n'
        }
        return 'var '+$1+';\n';
    })
    .replace(/打印[:：]\s*(.+?)(\n|$)/g, 'console.log($1)\n')
    .replace(/返回值[:：]\s*(.+?)(\n|$)/g, 'return $1\n')
    .replace(/执行[:：]\s*(.+?)(\n|$)/g, '$1()\n')
    .replace(/导出[:：]\s*(.+?)(\n|$)/g, 'export default $1\n')
}
function parseFn(code){
    let lines = code.split(/\n/), fnStart = false
    for(let i=0; i<lines.length; i++){
        if(fnStart) {
            if(/^\s+/.test(lines[i])){
                continue
            }else{
                lines[i] = '}\n' + lines[i]
                fnStart = false
            }
        }
        if(!fnStart && /^函数[:：]/.test(lines[i])){
            fnStart = true
            lines[i] = lines[i].replace(/^函数[:：]\s*(.+?)\s*$/, 'function $1(){')
        }
    }
    return lines.join('\n')
}

module.exports = (code) => {
    code = parseFn(code)
    code = parse(code)
    // console.log(code)
    return code
}