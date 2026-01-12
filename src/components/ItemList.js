import React, { useState } from 'react';

function ItemList() {
  // useState() 함수 - 리액트에서 데이터를 저장하고 변경할 수 있게 해주는 함수
  // items: 현재 과일 목록을 저장하는 변수
  // setItems: items를 변경할 때 사용하는 함수
  const [items, setItems] = useState(['사과', '바나나', '포도']);

  // addItems() 함수 - 새로운 과일을 추가하는 기능을 하는 함수
  const addItems = () => {
    // prompt() 함수 - 사용자에게 입력창을 띄워서 글자를 입력받는 함수
    const newItem = prompt("추가할 과일을 입력하세요.");
    
    if (newItem) {
      // setItems() 함수 - items 배열을 새로운 배열로 바꿔주는 함수
      // [...items, newItem] - 기존 배열에 새로운 아이템을 추가한 새 배열 만들기
      setItems([...items, newItem]);
    }
  };

  return (
    <div>
      <h3>과일 리스트</h3>
      {/* onClick - 버튼을 클릭했을 때 addItems 함수를 실행하라는 뜻 */}
      <button onClick={addItems}>과일 추가</button>
      <ul>
        {/* map() 함수 - 배열의 각 요소를 하나씩 꺼내서 새로운 형태로 바꿔주는 함수 */}
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

// export default - 이 ItemList 함수를 다른 파일에서 사용할 수 있게 내보내는 명령어
export default ItemList;