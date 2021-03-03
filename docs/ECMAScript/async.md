# JavaScript 异步编程

在这之前我们首先需要知道这些：

- 通常来说，程序都是顺序执行，同一时刻只会发生一件事。如果一个函数依赖于另一个函数的结果，它只能等待那个函数结束才能继续执行，从用户的角度来说，整个程序才算运行完毕。
- 当浏览器里面的一个web应用进行密集运算还没有把控制权返回给浏览器的时候，整个浏览器就会卡住，这叫做**阻塞**，这时候浏览器无法继续处理用户的输入并执行其他任务，直到web应用交回处理器的控制。
- JavaScript 传统上是单线程的。即使有多个内核，也只能在单一线程上运行多个任务。
- 通过 [Web workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) 可以把一些任务交给一个名为 worker 的单独的线程，这样就可以同时运行多个 JavaScript 代码块。但是也有局限，主要的一个问题是 web workers 不能访问 DOM，其次，虽然在 worker 里面运行的代码不会产生阻塞，但是基本上还是同步的。当一个函数依赖于几个在它之前运行的过程的结果，这就会成为问题。

为了解决这些问题，浏览器允许我们异步运行某些操作。

在JavaScript代码中，从旧到新有下面3种异步编程风格：

## 1. 回调函数

这是最传统的 JavaScript 异步编程解决方案，大致操作就是：把异步操作封装到一个函数 fn，再将一个回调函数 callback 作为参数传递给 fn，当这个 fn 内部的异步操作完成之后再调用传入 callback。

以下是一个异步请求服务器图片后将图片显示在页面上的例子：

```javascript
function getResource(url, resType, successFn, failFn) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = resType;
    xhr.onload = function() {
        successFn(xhr.response);
    };
    xhr.onerror = function() {
        failFn();
    };
    xhr.send();
}

function displayImage(blob) {
    const imgUrl = URL.createObjectURL(blob);
    const image = document.createElement('img');
    image.src = imgUrl;
    document.body.appendChild(image);
}

function errorHandler() {
    console.log('error');
}

getResource('coffee.jpg', 'blob', displayImage, errorHandler);
```

缺陷：回调地狱（callback hell）

试想一下，以加载图片的方法为例，我需要按一定顺序加载一张张图片的话，写出的代码会是什么样子？大概是这样的：

```javascript
getResource('coffee.jpg', 'blob', function(img1) {
    displayImage(img1);
    getResource('milk.jpg', 'blob', function(img2) {
        displayImage(img2);
        getResource('water.jpg', 'blob', function(img3) {
            displayImage(img3);
            // 还可以继续调用 getResource 加载下张图片
        }, errorHandler);
    }, errorHandler);
}, errorHandler);
```

随着嵌套回调层级的不断加深，代码可读性会越来越差，且不容易维护，这中情况即是回调地狱。

## Promise

Promise 是 JavaScript 异步编程的一种解决方案，比传统的解决方案更合理和更强大。它由社区最早提出和实现，ES6 将其写进了语言标准，统一了用法，原生提供了`Promise`对象。

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises)`上是这样定义的: Promise` 是一个对象，它代表了一个异步操作的最终完成或者失败。

简单说 Promise 就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。

它有以下特点：

1. 对象的状态不受外界影响。`Promise`对象代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和`rejected`（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。
2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。`Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。`fulfilled`和`rejected`合在一起称为`resolved`（已定型）。

语法：

### Promise构造函数

`Promise`构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject`。它们是两个函数，`resolve`函数的作用是，将 Promise 对象的状态从从 `pending` 变为 `fulfilled`，在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；`reject`函数的作用是，将 Promise 对象的状态从 `pending` 变为 `rejected`，在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

```javascript
const promise = new Promise(function(resolve, reject) {
    // ... some code
    if (/* 异步操作成功 */) {
        resolve(value);
    } else {
        reject(error);
    }
})
```

### Promise.prototype.then(onFulfilled[, onRejected])

`then` 方法可以接受两个回调函数作为参数。第一个回调函数是 Promise 对象的状态变为 `fulfilled` 时调用，第二个回调函数是 Promise 对象的状态变为 `rejected` 时调用。这两个函数都是可选的，不一定要提供。它们都接受 Promise 对象传出的值作为参数。

```javascript
promise.then(function(value) {
    // ... success handler
}, function(error) {
    // ... error handler
})
```

`then` 方法返回一个新的 Promise 对象，即使你在 `then` 方法里没有显式返回返回一个 Promise 对象，也会隐式转换为一个 Promise 对象：

- 不返回值，那么 `then` 会返回一个 `fulfilled` 状态的 Promise 对象, 并将 `undefined` 作为 onFulfilled 函数的参数值
- 返回值不是 Promise 对象，那么 `then` 会返回一个 `fulfilled` 状态的 Promise 对象，并将返回值作为 onFulfilled 函数的参数值
- 直接抛出一个错误， 那么 `then` 会返回一个 `rejected` 状态的 Promise 对象, 并将该错误示例作为 onRejected 函数的参数值。

### Promise.prototype.catch(onRejected)

`catch` 方法接收一个回调函数，回调函数在 Promise 对象状态变为 `rejected` 时调用 。`catch(onRejected) ` 的行为与 `then(null, onRejected)` 相同。一般来说，不要在 `then()` 方法里面定义 `rejected ` 状态的回调函数（即 `then` 的第二个参数，而是使用 `catch` 方法。

```javascript
promise.then(function(value) {
    // ... success handler
})
.catch(function(error) {
    // ... error handler
})
```

### Promise的链式调用

由于 `then` 方法和 `catch` 方法都会返回一个新的 Promise 对象，所以它们可以被链式调用。正是这种链式调用，解决了回调地狱问题。

下面用 `Promise` 的方式重写之前使用回调函数方式异步加载图片的示例：

```javascript
function getResource(url, resType) {
    return new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest();
    	xhr.open('GET', url);
   		xhr.responseType = resType;
    	xhr.onload = function() {
        	resolve(xhr.response);
    	};
        xhr.onerror = function() {
            reject();
        }
    	xhr.send();
    })
}

getResource('coffee.jpg', 'blob').then(function(img1) {
    displayImage(img1);
    return getResource('milk.jpg', 'blob');
})
.then(function(img2) {
    displayImage(img2);
    return getResource('water.jpg', 'blob');
})
.then(function(img3) {
    displayImage(img2);
})
.catch(errorHandler)
```

### Promise.prototype.finally() 

该方法是 ES2018 引入的。

`finally()` 方法返回一个 Promise 对象。在 Promise 对象变为 `resolved` 状态时，无论结果是 `fulfilled` 或者是 `rejected`，都会执行指定的回调函数。

这避免了同样的语句需要在 `then()` 和 `catch()` 中各写一次的情况。

```javascript
promise.then(function(value) {
    // ... success handler
})
.catch(function(error) {
    // ... error handler
})
.finally(function() {
    //... some code
})
```

### Promise.resolve(value) 和 Promise.reject(reason)

这两个方法分别返回一个 `fulfilled` 和 `rejected` 状态的 Promise 对象

### Promise.all(iterable)

`Promise.all()` 方法接收一个的具有 `Iterator` 接口的参数，这个参数对象里的所有成员都应该是一个 `Promise`, 即使不是也都会自动调用 `Promise.resolve()` 方法将其转换为 `Promise`。 

返回值：

- 如果传入的可迭代对象为空，`Promise.all` 会同步地返回一个 `fulfilled` 状态的 Promise 对象。
- 如果所有传入的 Promise 对象都变为 `fulfilled` 状态，或者传入的可迭代对象内没有 Promise 对象，`Promise.all` 返回的 Promise 对象异步地变成 `fulfilled` 状态， 并将一个包含所有的传入迭代参数对象的值（也包括非 Promise 对象）的数组作为参数传给 onFulfilled 函数。
- 只要传入的 Promise 对象中有一个变为 `rejected` 状态，`Promise.all` 返回的 Promise 对象异步地变成 `rejected` 状态，并将失败的那个结果作为参数传给给 onRejected 函数，而无视其它 Promise 对象的状态。
