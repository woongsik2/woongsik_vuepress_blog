---
title: (javascript) Scope
---

Scope
===

### Scope 스코프 
* 흔히들 <u>변수의 스코프</u> 라고 말한다.<br/>

```
Scope : 1. (무엇을 하거나 이룰 수 있는) 기회
        2. (주제, 조직, 활동 등이 다루는) 범위
        
[네이버 어학사전]
```

지금 현재 말하는 `Scope`의 의미는 `범위`에 가깝다고 말할 수 있다.<br/>
다시말해, `변수의 Scope`는 `변수를 사용할 수 있는 범위`로 해석이 가능하다.<br/>
ES5 까지는 `Scope`의 범위가 `함수 단위의 Scope`이다.<br/>
아래 코드를 보며 이해해 보자.

```javascript
// 전역 변수 Scope
var num1 = 5;
var num2 = 10;

if(num1 < num2){
    var num3 = 30;
}else{
    // 전역 변수는 공유되기때문에 여기서는 var를 생략가능
    var num3 = 50;
}

var func = function(){ // 함수 단위의 Scope가 시작
    var num1 = 15;
    var num4 = 20;
    console.log(num1); // 15, 현재 스코프에 num1이 있기때문에 현재 스코프의 값을 출력한다.
}
console.log(num3); // 30, 함수단위 스코프이기 때문에 같은 전역 공간에 있는 num3값을 출력한다. 
func();
console.log(num4); // Uncaught ReferenceError : num4 is not defined, 함수 단위의 스코프이기 때문에 함수에서 쓰인 변수는 함수에서만 사용 가능하다.
```

여기서 자바와의 큰 차이점 중 하나를 볼 수 있다.<br/>
다른 언어들은 `블록 단위`의 스코프를 가지고 있어, if문에서도 별도의 스코프를 가지고있지만<br/>
자바스크립트에는 `함수 단위`의 스코프가 존재 한다.

### Scope Chaining(스코프 체이닝)
```
chaining : 1. 체이닝
           2. 연쇄(적 처리)
        
[네이버 어학사전]
```

* 범위 안에서 연쇄적으로 처리하는(?)<br/>
아래 코드를 보며 이해 해 보자.

```javascript
var num1 = 10;
var func1 = function(){ // 외부 함수 Scope(func1)의 시작
    var num2 = 15;
    var func2 = function(){ // 내부 함수 Scope(func2)의 시작
        // 1. 현재 스코프(func2)에는 num1 변수가 존재 하지 않는다.
        // 2. 스코프 체인을 타고 스코프 func1로 올라간다.
        // 3. 스코프 func1에도 num1 변수가 존재 하지 않는다.
        // 4. 스코프 체인을 타고 전역 스코프로 올라간다.
        // 5. 전역 스코프의 num1변수를 참조해 num1을 출력한다.
        console.log(num1); // 10

        // 1. 현재 스코프(func2)에는 num2 변수가 존재 하지 않는다.
        // 2. 스코프 체인을 타고 스코프 func1로 올라간다.
        // 3. 스코프 func1에 num2 변수를 참조해 num2를 출력한다.
        console.log(num2); // 15
    }
    func2(); // 내부 함수 func2 호출
}
func1(); // 함수 func1을 호출
```

### strict mode ([Strict mode | MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Strict_mode))

* ES5에서 새로 생긴 모드이다.
* 코드의 문법을 좀 더 깐깐하게 검사해서 오류를 표출 하는 모드.

```javascript
'use strict';
// 전역 스코프 상단에 위 구문을 넣어주거나
// 사용하려는 함수 바디 상단에만 넣어주면 된다.
// 미지원 브라우저는 그냥 문자열로 인식하고 오류를 발생시키지 않는다.

var num1 = 10;
var func1 = function(){
    // 전역 스코프에 존재하는 변수이기때문에 덮어씌우면서 정상 작동한다.
    num1 = 30;
    // 스코프 체인 상에 존재하지 않는 변수를 var없이 선언하면 오류 발생.
    num2 = 50; // Uncaught ReferenceError: num2 is not defined
}
// 스코프 체인 상에 존재하지 않는 변수를 var없이 선언하면 오류 발생.
num3 = 100; // Uncaught ReferenceError: num3 is not defined
func1();
```

### lexical scoping(렉시컬 스코핑)

* `scope`는 함수를 `호출`할 때가 아니라, `선언`할 때 생긴다.
  * 아래 코드에서 console 이 어떻게 찍힐지 생각해 보자.
```javascript
var result = "AAA";
function func(){
    console.log(result);
}
function func2(){
    result = "BBB";
    func();
}
func2(); // BBB
```

```javascript
var result = "AAA";
function func3(){
    console.log(result);
}
function func4(){
    var result = "BBB";
    func3();
}
func4(); // AAA
```

* `func3`의 `result`는 `func4`의 지역변수 `result`가 아니라, 전역변수 `result`를 바라보고 있다. 이것을 `lexical scoping`이라고 한다.
* 함수를 처음 선언하는 순간, 함수 내부의 변수는 자기 `scope`로부터 가장 가까운 곳에 있는 변수를 참조 한다.
* 위에서 `func3` 함수 안의 `result` 변수는 선언시 가장 가까운 전역변수 `result`를 참조 한다.
* 어떠한 짓을 해도 `func3` 함수가 한 번 선언된 이상 전역변수를 바라보는 `result` 변수가 다른걸 바라보게 할 수 없다.
* 유일하게 사용할 수 있는 방법은, 전역변수로 선언된 값을 다른 값으로 변경하는것이다.
* 전역변수 만드는 것은 **`지양`** 해야 한다. 이유는, 변수가 섞일 수 있기 때문이다.<br/> 다른사람과 협업해 개발하고, 라이브러리 등을 사용하다보면, 같은 변수이름을 사용해 겹치게되는 일을 겪을 수 있다.<br/>
해결 할 수 있는 방법 중 하나는, 전역변수 대신 함수 안에 넣어 지역변수로 넣어 사용하거나, 객체 안의 속성으로 만들어 사용하는 것이다.
```javascript
var obj = {
    result : "AAA",
    func: function(){
        console.log(this.result);
    }
}
```
* 위와같이 하면, `obj.result`,`obj.func()` 와 같이 접근 해야 하기때문에 `obj`를 통째로 바꾸지 않는 이상 겹치게 되는 염려를 덜 수 있다.<br/>
하지만, 위 방법의 단점은 누군가 고의적으로 `result`와 `func`를 바꿀 수 있다.<br/>
`obj`를 통째로 바꾸지 않더라도, 코드 밑에 `obj.result = "BBB"`를 추가 한다면<br/>
`obj.func()`를 할 경우 `AAA`대신 `BBB`가 출력 될 것이다.<br/>
그걸 방지 하기 위해서는 아래와 같이 하면 된다.

```javascript
var f = function(){
    var result = "AAA";
    function func1(){
        console.log(result);
    }
    return {func:func1};
}
var newFunc = f();
newFunc.func(); // AAA
```
* `f()` 하게 되면, `return`에 의해 `{func: function(){console.log(result)}}`가 `newFunc`에 저장이 된다. 후에는 `newFunc`를 통해 `func`에 접근 할 수 있다.<br/>
하지만, `result`에는 접근 할 수 없다. 함수로 감싼 후 `return`을 통해 공개변수(`func`)만 공개하고, 비공개변수(`result`)는 비공개 하는 방법으로 진행 할 수 있다.<br/>
위 코드를 조금 변경하면, 아래와 같다.

```javascript
var newFunc = (function(){
    var result = "AAA";
    return{
        func: function(){
            console.log(result);
        }
    };
})();
newFunc.func(); // AAA
```
* 위와같이 변경하면, `f`같은 변수를 한번 더 거치는대신, `newFunc`에 바로 집어넣어서 사용 할 수 있다.<br/>
위의 방법은 `IIFE(즉시 호출 함수 표현식)` 또는 `모듈 패턴`이라고 한다.<br/>
위 구문은 라이브러리를 만들 때 기본으로 사용되는 표현식이며, `비공개 변수`가 없는 자바스크립트에 `비공개 변수` 기능을 만들어 주는 역할을 한다.


### 생각해 보기.
> 아래 코드를 바로 실행 해 보지말고, 생각으로 실행결과를 예상 해 보고, 직접 실행해 예상한 결과와 일치 하는지 비교 해 보세요.
```javascript
var result = "hello";
function func(s){
    console.log(s + " " + result);
}
function func1(){
    var result = "Bye";
    console.log(result);
    func("Hi,");
}
func1();
```