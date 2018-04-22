# module

## export
exports 的基础写法
- `export var firstName = "Jack"`   
 `export var lastName = "Ma" `

- `var firstName = "Jack"`   
  `var lastName = "Ma"`   
  `export {firstName, lastName}`

- `export function foo(x, y) { return x*y }`

- `export default function() {console.log('foo')}`



## import
import 的基础写法

- `import { firstName, lastName } from './profile'`
- `import { * as name } from './profile'`
- `import { default as placeName } from './profile'` 等价于
- `import placeName from ./profile`
