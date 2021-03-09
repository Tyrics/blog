# TS中的接口与类型别名的区别

在 typescript 中, 我们声明类型有两种方式： 接口(interface) 和类型别名(type alias)，[官方文档](https://www.typescriptlang.org/docs/handbook/advanced-types.html)对于两者及其异同的描述如下：

> One of TypeScript’s core principles is that type checking focuses on the shape that values have. This is sometimes called “duck typing” or “structural subtyping”. In TypeScript, interfaces fill the role of naming these types, and are a powerful way of defining contracts within your code as well as contracts with code outside of your project.<br>
> TypeScript 的核心原则(core principles)之一是类型检查(type checking)重点在于值的形状(values' shape)。有些时候这被称为“鸭子类型(duck typing)”或“结构化子类型(structural subtyping)”。在 TypeScript 中，接口（interfaces）就是充当命名这些类型的角色，并且是在代码内或代码外定义约定(contracts)的有效方式。

PS: 在程序设计中，“鸭子类型（duck typing）”是动态类型的一种风格。在这种风格中，一个对象有效的语义，不是由继承自特定的类或实现特定的接口，而是由“当前方法和属性的集合”决定

> Type aliases create a new name for a type. Type aliases are sometimes similar to interfaces, but can name primitives, unions, tuples, and any other types that you’d otherwise have to write by hand.<br>
> 类型别名（type aliases）为一个类型创建一个新的名字。有些时候类型别名与接口（interfaces）很相似，但是类型别名可以用于声明原始类型（primitives），联合类型（unions），元组类型(tuples)，还有其它一些你必须要手写的类型。

> Almost all features of an interface are available in type, the key distinction is that a type cannot be re-opened to add new properties vs an interface which is always extendable.<br>
> 类型别名（type aliases）拥有接口（interfaces）的绝大多数特征，关键的区别在于接口始终是可扩展的，而类型别名不能重新打开以添加新属性。

以下是个人例举的一些区别：

### 1. 声明对象和函数类型的语法不一样

**interface**

```typescript
interface A {
  x: number;
  y: string;
}
interface B {
  (x: number, y: string): void;
}
```

**type alias**

```typescript
type A = {
  x: number;
  y: number;
};
type B = (x: number, y: string) => void;
```

### 2. 类型别名（type alias）可以用来声明一些接口（interface）无法声明的其他类型

```typescript
// 声明已有类型（即取别名）
type A = number;
// 字面量类型
type B = 'foo';
// 元组类型
type C = [number, string];
// 联合类型
type D = number | boolean;
// 交叉类型
type E = A & D;
```

### 3. 接口（interface）可以通过合并不同的声明进行不断扩展

```typescript
interface A {
  x: number;
}
interface A {
  y: number;
}
// 经过上面两次声明后 A 的类型为: { x: number; y: number; }
```

### 4. 接口（interface）通过 `extends` 关键字来扩展一个类型（这个类型可以是 interface, 也可以是 type alias），类型别名（type alias）则通过交叉类型来实现扩展

**interface**

```typescript
interface Super {
  a: string;
}
interface Sub extends Super {
  b: number;
}
```

**type alias**

```typescript
type Super = {
  a: string;
};
type Sub = Super & { 
  b: number 
};
```

### 5. 在类型别名（type alias）的声明中可以使用 `keyof`、`typeof`、`in` 等关键字来进行一些强大的类型操作

```typescript
interface A {
  x: number;
  y: string;
}
// 拿到 A 类型的 key 字面量枚举类型，相当于 type B = 'x' | 'y'
type B = keyof A;

const json = { foo: 1, bar: 'hi' };
// 根据 ts 的类型推论生成一个类型。此时 C 的类型为 { foo: number; bar: string; }
type C = typeof json;

// 根据已有类型生成相关新类型，此处将 A 类型的所有成员变成了可选项，相当于 type D = { x?: number; y?: string; };
type D = {
  [T in keyof A]?: A[T];
};
```

### 总结

type alias 几乎能做到所有 interface 能做到的事情，区别在于 interface 可以通过合并声明不断扩展同一个类型，type alias 却不能重复声明一个类型。但除此之外 type alias 还拥有一些 interface 没有的其他强大能力。

那么，对于这两种方式，具体场景上该如何选择呢？[官方](https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-aliases)的描述如下：

> Because an interface more closely maps how JavaScript objects work [by being open to extension](https://en.wikipedia.org/wiki/Open-closed_principle), we recommend using an interface over a type alias when possible.<br>
> 由于接口通过开放扩展(符合开闭原则)更紧密的映射了 JavaScript 对象的工作方式，因此建议尽可能使用接口而非类型别名。<br>

> On the other hand, if you can’t express some shape with an interface and you need to use a union or tuple type, type aliases are usually the way to go.<br>
> 另一方面，如果你无法通过接口来描述某些形状，或者你需要使用一个联合类型或元组类型，通常可以使用类型别名来达成目的。
