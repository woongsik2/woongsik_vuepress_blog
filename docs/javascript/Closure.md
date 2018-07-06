---
title: (javascript) Closure.
---

Closure
===

### Closure. 클로저. 

> 비공개 변수를 갖고 있는 함수.

* 예제 코드
```javascript
var addClosure = function(){
    var result = "woongsik";
    return function(){
        console.log(result);
    }
};
var closure = addClosure();
closure();
```

* 위 `closure()` 함수를 호출 할 경우 아래와 같이 전역,함수 컨텍스트가 생성된다.
```javascript
"전역 컨텍스트": {
    변수객체: {
        arguments: null,
        variable: [{addClosure: Function}, 'closure']
    },
    scopechain: ['전역 변수객체'],
    this: window
}
"addClosure 컨텍스트": {
    변수객체: {
        arguments: null,
        variable: [{result: 'woongsik'}]
    },
    scopechain: ['addClosure 변수객체', '전역 변수객체'],
    this: window
}
```

>중요한 것은 `closure = addClosure();` 할 때, `function`을 `return`하는데,<br/>
`function` 선언시의 `scope chain`은 `lexical scoping`에 의해,<br/>
`['addClosure 변수객체', '전역 변수객체']`를 포함한다.<br/>
따라서 `closure`를 호출 할 때의 `컨텍스트`는 아래와 같다.

```javascript
"closure 컨텍스트": {
    변수객체: {
        arguments: null,
        variable: null,
    },
    scopechain: ['closure 변수객체', 'addClosure 변수객체', '전역 변수객체'],
    this: window
}
```
> 따라서, `closure` 함수에서 `scope chain`을 통해 `addClosure`의 `result` 변수에 접근 할 수 있다. 아래 예제를 통해 알아보자.

```javascript
var counter = function(){
    var count = 0;
    function changeCount(num){
        count += num;
    }
    return {
        increase: function(){
            changeCount(5);
        },
        decrease: function(){
            changeCount(-5);
        },
        show: function(){
            console.log(count);
        }
    }
};
var counterClosure = counter();
counterClosure.increase();
counterClosure.show(); // 5
counterClosure.decrease();
counterClosure.show(); // 0
```

> `counter` 함수 호출시 `return`을 통해 `counterClosure 컨텍스트`에 비공개 변수인 `count`에 접근할 수 있는 `scope chain`을 반환 한다. 이렇게 되면, `counterClosure`에서 계속 `count`에 접근 할 수 있다.<br/>
이 방식으로 `비공개 변수`를 만들어 활용할 수 있다. 비공개 변수이기때문에 외부에서 조작 할 걱정을 덜 수 있다. 프로그램 사용자는 공개한 메소드만 사용하기때문에, 예상 할 수 없는 상황이 일어나는것을 방지 할 수 있다. 명심해야 할 점은 사용자는 예상을 뒤엎는 상황을 만들 수 있기 때문에 모든 경우의 수를 생각하고 있어야 한다.<br/>
자바스크립트에서 위와 같은 상황에 대비할 수 있는 기본적인 방법은 `클로저`이다.<br/><br/>
단점으로는 잘못 사용했을시, 성능 문제와 메모리 문제가 발생 할 수 있다.<br/>
`closure`의 비공개 변수는 자바스크립트에서 언제 메모리 관리를 해야할 지 모르기 때문에 메모리 낭비로 이어질 수 있다.<br/>
메모리 문제가 발생한다면, `클로저`를 의심 해 볼수있다. 또한 `scope chain`때문에 속도의 영향이 생긴다.

```javascript
for(var i=0; i<10; i++){
    $('#target' + i ).on('click', function(){
        console.log(i);
    });
}
```

> 위 예제코드가 있을때, 얼핏 보면 `#target0` 부터 `#target9`까지 제대로 이벤트리스너가 연결 된 것처럼 보인다. 하지만, `#target0`부터 `#target9`까지 각각 이벤트리스너가 연결되기는 했지만, 실행 결과는 모두 `10`이다.<br/>
왜 그런지 이해가 가지 않는다면, `컨텍스트`에 대한 부분을 다시 살펴보기 바란다.<br/>
`lexical scoping`에 의해 함수는 선언할 때 `scope`가 생성된다.<br/>
이벤트리스너 안의 `i`는 외부의 `i`를 계속 참조 하고 있는것이다. `i`는 `for`문 종료 후 최종적으로는 `10`이 되기 때문에 결과는 모두 `10`이 된다.

```javascript
for(var i=0; i<10; i++){
    (function(j){
        $('#target' + i ).on('click', function(){
            console.log(i);
        });
    })(i);
}
```

> 위 처럼 `IIFE`를 사용해 `클로저`를 만들면, `j`값은 `i`에 해당하는 숫자로 고정되기 때문에 해결된다.