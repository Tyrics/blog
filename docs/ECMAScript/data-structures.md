# JS 数据结构知识补漏

记录一些日常使用中可能下意识会忽略的地方

## 01. `typeof` 操作符的局限性

- 对于 `null` ，返回 'object'
- 对与 JS 的内置对象实例，如 Date 实例或者 RegExp 实例，返回  'object'
- 对于函数， 返回 'function'

所以，下面两个工具函数很实用：
```js
function isObject(val) {
  return val != null && typeof val === 'object';
}

function getType(val) {
  return Object.prototype.toString.call(val).slice(8, -1);
}
```

## 02. 关于 Number 类型

Number 类型包括整数和浮点数，取值范围为 `-(2^53-1)` 到 `2^53-1`，此外还有几个带符号的值：`+Infinity(正无穷)`、 `-Infinity(负无穷)` 和 `NaN(非数字)`。

曾经遇到过这样一个场景，后端返回的 JSON 字符串中，id 是数字类型而非字符串。然后悲剧发生了，经过 JSON 的反序列化（JSON.parse）后，得到的 id 值与真实 id 不符。有意思的是，平时在浏览器的 devtool 中查看接口返回的数据，我都是是看 `Preview` 栏下浏览器给我们格式化好的数据，而非 `Response` 栏下的原始数据, 这导致了我第一时间没有发现是反序列化出了问题。于是只能去找后端，后端经过 DeBug 后发现数据并没有问题，然后我才终于想起来在 `Response` 看一眼，果然后端返回的数据是没问题的，问题出在作为 id 的这串数字（后端返回的是 Java 里面的 Long 类型）超出了 JS Number 类型的处理范围，经过 JSON 的反序列化得到了错误的值。最终让后端将其转为字符串后再返回，解决了这个问题。

```js
const number = Number.MAX_SAFE_INTEGER; // 9007199254740991
2**53; // 9007199254740992
2**53 + 1; // 9007199254740992
2**53 + 2; // 9007199254740994
2**53 + 3; // 9007199254740996
// 以上结果可知，超出了 Number.MAX_SAFE_INTEGER(即2^53 - 1)后得出的结果已经不精确了。同理，小于 Number.MIN_SAFE_INTEGER 的数字也是如此
```

## 03. 关于 BigInt 类型

BigInt 是 ES2020 引入的数据类型，可以用任意精度表示整数, 通过在整数末尾附加 n 或调用构造函数来创建。使用 `typeof` 检测 BigInt 类型返回 'bigint'。目前我还未遇到过该类型的使用场景。

```js
const num1 = BigInt(12345);
const num2 = 10000n;

console.log(num1, num2, typeof num1); // 12345n, 1000n, 'bigint'
```

## 04. 关于 Symbol 类型

Symbol 是 ES2015 引入的数据类型。使用 `Symbol()` 函数创建一个 Symbol 值（不能使用 `new` 创建，因为 `Symbol()` 并不是一个传统的构造函数）。

每个从 `Symbol()` 返回的 Symbol 值都是唯一的。

```js
const s1 = Symbol(1);
const s2 = Symbol(1);
console.log(s1 === s2); // false
```

一个 Symbol 值能作为对象属性的标识符，这是该数据类型仅有的目的。

```js
const obj = {
  [Symbol('foo')]: 'bar'
};
```

`Object.keys()` 和 `Object.getOwnPropertyNames()` 都无法枚举一个对象的 Symbol 值属性，可以使用 `Object.getOwnPropertySymbols()` 来单独枚举其 Symbol 值属性，或是使用 `Reflect.ownKeys()` 来枚举该对象上所有的属性

```js
const obj = {
  foo: 'bar',
  [Symbol('a')]: 'a'
};

Object.defineProperty(obj, 'b', {
  value: 'b',
  enumerable: false,
  writable: true,
  configurable: true
});

Object.keys(obj); // ['foo']
Object.getOwnPropertyNames(obj); // ['foo', b]
Object.getOwnPropertySymbols(obj); // [Symbol(a)]
Reflect.ownKeys(obj); // ['foo', 'b', Symbol(a)]
```
