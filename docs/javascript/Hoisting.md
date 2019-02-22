---
title: Hoisting
---

# Hoisting

## Hoisting. 호이스팅.

```
Hoisting : 1. 끌어올리기
           2. 들어올려 나르기

[네이버 어학사전]
```

```javascript
console.log(str) // Uncaught ReferenceError: str is not defined
```

당연하다.<br/>
str은 선언조차 되지 않았으니 사용이 불가능하고 존재조차 하지 않는다.<br/>
하지만 아래 예제에선 다르다.

```javascript
console.log(str1) // undefined, 오류가 발생하지 않는다. 프로그램은 정상.
console.log(func1) // undefined
console.log(func2)
var str1 = 'gom'
var func1 = function() {
  console.log('ABC')
}
function func2() {
  console.log('ZXY')
}
```

위의 코드에도 처음 `str1`이 선언되지 않은 변수 이지만 `undefined`만 내뱉고<br/>
프로그램은 죽지 않았다. 이유는 `호이스팅`이 일어났기 때문이다.<br/>
위 코드는 아래와 같이 변환된다고 보면 된다.

```javascript
var str1
var func1
function func2() {
  console.log('ZXY')
}
console.log(str1)
console.log(func1)
console.log(func2)
str1 = 'gom'
func1 = function() {
  console.log('ABC')
}
```

`함수 선언식`에서는 변수없이 함수를 선언한 것으로 함수 전체코드가 `호이스팅`된다.<br/>
하지만 `함수 표현식`은 변수 선언과 할당을 구분할 수 있어 선언 부문만 `호이스팅`된다.<br/>

## 함수 선언식 vs 함수 표현식

간단하게 어떤 차이점이 있는지 알아보자.

## 함수 선언식(Function Declarations)

> 일반적인 프로그래밍 언어에서의 함수 선언과 비슷한 형식.

```javascript
function 함수명(){
    구현 로직
}

function func(){
    return 'Function Declarations';
}
func(); // 'Function Declarations'
```

## 함수 표현식(Function Expressions)

> 유연한 자바스크립트 언어의 특징을 활용한 선언 방식

```javascript
var 함수명 = function(){
    구현 로직
}

var func = function(){
    return 'Function Expressions';
}
func(); // 'Function Expressions'
```

## 함수 선언식과 함수 표현식의 차이점

> 함수 선언식은 호이스팅에 영향을 받지만, 함수 표현식은 호이스팅에 영향을 받지 않는다.
> 함수 선언식은 코드를 구현한 위치와 관계없이 자바스크립트의 특징인 `호이스팅`에 따라 브라우저가 자바스크립트를 해석할 때 맨 위로 끌어 올려진다.
> 변수와 함수는 사용하기 전 미리 선언해 사용하는것이 의도한대로 코드가 동작한다고 확신을 가지고 개발 할 수 있고, 직접적인 오류 발생으로 파악하기가 더 쉬울것이다.
