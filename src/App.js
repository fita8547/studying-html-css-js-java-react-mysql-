import React, { useState, useEffect } from 'react';
//리액트라는 폴더를 가져와서 React라는 이름을 부여하고 그속에서 이미저장된 함수인
//useState,useEffect라는 함수를 가져온다는 뜻
import './App.css'
import GreetingCard from './components/GreetingCard'
import ItemList from "./components/ItemList";


function App() {
  const [name, setName] = useState("");
  //리액트 전용 데이터 저장공간 = 데이터저장 공간을 관리하기위한 전용함수
  //name이라는 변수에 CREATE,READ 두개의 기능이 함유되어있다.
  //setName() 함수는 논리적인 기능들중 바로 UPDATE기능을 가지고 있다고 보면됨
  console.log(name)
  
  const [greeting, setGreeting] = useState("");
  const [loaded, setLoaded] = useState(false);
  //데이터를 불러오는 도중에 이제 리액트 애플리케이션에 특정 효과를 줘서
  //자동으로 데이터의 변화를 감지해서 표현하는 함수인 useEffect()를 이용할때
  //같이 조건적으로 이용하는 변수 공간을 설정한 코드입니다.

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }, []);
  //useEffect(기능을 설계한 함수,[변수])
  //useEffect의 2번째 칸의 변수가 바뀔때를 위한 첫번째 함수 자동실행

  //사용자가 input에 글자를 입력할때마다 name상태를 실시간으로 바꿔주는 함수입니다.
  const handleInputChange = (e) => {
    setName(e.target.value);
    
  };

  //인사하기 버튼 클릭시, greeting이라는 상태에서 인사말을 저장하는 코드 입니다.
  const handleGreetClick = () => {
    setGreeting(`${name}님, 리액트 세계에 오신 걸 환영합니다!`);
  };

  //리액트 컴포넌트라는 상태관리 공간을 만들고 이공간에다가 이제 useState()라는 함수를
  //이용해서 리액트 컴포넌트라는 상태관리 공간을 관리하는 공간을 우리가 코드로 작성
  //개발세계 즉 모든 프로그래밍 세계에서는 무언가 데이터를 저장할 수 있는 공간이 있다는 의미는 CRUD가 가능하다
  //그중 CREATE,READ의 기능을 가진 함수가 useState()라는 함수
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>나만의 리액트 컴포넌트</h1>
      {/*아직 로딩중*/}
      {!loaded ? (
        <p>로딩 중...</p>
      ) : (
        <div>
          <input
            type="text"
            placeholder="이름을 입력하세요"
            value={name}
            onChange={handleInputChange}
          />
          
          <button onClick={handleGreetClick}>인사하기
          </button>
          <GreetingCard message={greeting}/>
          {/*html태그화 시킨 리액트 컴포넌트기능이 적용된 자바스크립트 파일*/}
          {/*Greeting*/}
          <ItemList/>
        </div>
      )}
    </div>
  );
}

export default App;