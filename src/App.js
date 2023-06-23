import './App.css';
import { useState } from 'react';
import { legacy_createStore as createStore } from 'redux';
//없어진 createStore와 동일한 legacy_createStore를 createStore로 사용
import { Provider, useSelector, useDispatch } from 'react-redux';
/*Redux 이론*/

/*  
    0. Provider : redux가 영향을 미치는 컴포넌트를 둘러 쌈.
    1. reducer : state, action을 인자로 받고 인자로 받은 state가 action에 의해 가공이 되고,
                가공 된 state를 반환하는 역할을 함
    2. store : reducer에 의해 만들어진(반환한) state를 저장하는 중앙 저장소
               createStore 함수에 reducer를 인자로 받아서 만들어 짐
    3. useSelector : store에서 state를 가지고 옴
    4. useDispatch : reducer에 action을 요청
*/

//reducer 생성
const reducer = (currentState, action) => {

  if (currentState === undefined) {
    return {number:1}
  } 

  const newState = { ...currentState }; //불변성을 유지하기 위해서 스레드 연산자로 얇은 복사

  if (action.type === 'PLUS') { //action의 type은 dispath에서 만들어짐
    newState.number++;
  }

  return newState;

}

//store 생성
const store = createStore(reducer);

const App = () => {

  const [number, setNumber] = useState(1);
  return (

    <div id="container">
      <h1>ROOT : {number} </h1>
      <div id="grid">
        <Provider store={store}>
          {/*store라는 props에 createStore에 의해 만들어진 'store'라는 이름의 store를 넣어 줌*/}
          <Left1 number={number} />
          <Right1 onIncrease={() => { setNumber(number + 1) }} />
        </Provider>
      </div>
    </div>

  );
  
}

const Left1 = (props) => {

  return (
    <div>
      <h1>Left1 : {props.number} </h1>
      <Left2 number = {props.number}/>
    </div>
  )

}

const Left2 = (props) => {

  return (
    <div>
      <h1>Left2 : {props.number}</h1>
        <Left3 number = {props.number}/>
    </div>
  )

}

const Left3 = (props) => {
  //dispatch 생성
  const dispath = useDispatch();
  
  const number = useSelector((state) => state.number)
  //같은 표현 const number = useSelector((state) => { return state.number })

  return (
    <div>
      <h1>Left3 : {props.number}, redux {number}</h1>
      <button onClick={() => dispath({ type: 'PLUS' })}>do plus by Redux</button>
      {/*type:'PLUS'라는 값을 reducer에 보냄*/}
    </div>
  )

}

const Right1 = (props) => {

  return (
    <div>
      <h1>Right1</h1>
        <Right2 onIncrease={() => (props.onIncrease())} />
    </div>
  )

}

const Right2 = (props) => {

  return (
    <div>
      <h1>Right2</h1>
      <Right3 onIncrease={() => (props.onIncrease())} />
    </div>
  )

}

const Right3 = (props) => {

  return (
    <div>
      <h1>Right3</h1>
      <input type='button' value="plus" onClick={() => props.onIncrease()}/>
    </div>
  )

}

export default App;
