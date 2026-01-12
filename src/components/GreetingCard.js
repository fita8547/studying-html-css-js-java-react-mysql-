function GreetingCard(props) {
    return <div className='card'>
        {
            props.message ? (<p>{props.message}</p>):(
            <p>인사말이 여기 표시됩니다.</p>)
        //message라는 변수안에 데이터가 존재할 시 true값을 반환하고 삼향조건자 조건 떄문에 true이면
        //앞 조건식이 실행되고 false이면 뒤 조건식이 실행됩니다.
        }
    </div>
};
//props는 현재 그리팅 바구니에서  데이터를 가져오려할때 연결하는 통로
export default GreetingCard;