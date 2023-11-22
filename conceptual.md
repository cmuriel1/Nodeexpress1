### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?
Callbacks, Promises, and Async/await.


- What is a Promise?
Object representing async operation completion or failure.


- What are the differences between an async function and a regular function?
Async functions return Promises and use await.


- What is the difference between Node.js and Express.js?
Node.js is a runtime; Express.js is a web framework.


- What is the error-first callback pattern?
Node.js convention, callback's first parameter is error.


- What is middleware?
Function with access to req, res, and next.


- What does the `next` function do?
Pass control to next middleware or route.


- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)
Sequential requests, order confusion, and unclear variable names.


```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```
