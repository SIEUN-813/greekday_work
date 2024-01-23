import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './scss/ProductView.scss';
import { cartMethod } from '../reducer/cartProduct';
import { confirmModal } from '../reducer/confirmModal';

export default function ProductViewComponent(){
    
    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);
    const navigate = useNavigate();

    const [state, setState] = React.useState({
        count: 1,
        cart: []
    })

    const confirmModalMethod=(msg)=>{
        const obj = {            
            isConfirmModal: true,
            confirmMsg: msg,
        }
        dispatch(confirmModal(obj));
        const htmlElement = document.getElementsByTagName('html')[0];
        htmlElement.classList.add('on');
    }
    
    const onClickMinusCount=(e)=>{
        e.preventDefault();
        if(state.count < 2){
           state.count = 1
        } 
        else{            
            setState({
                ...state,
                count: state.count -1
            })
        }
    }
    
    const onClickPlusCount=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            count: state.count +1
        })
    }
    
    // 데이터베이스 장바구니 목록 저장 함수
    const cartDBSave=(item)=>{
        let formData = new FormData();
        formData.append('userId', selector.signIn.logInInfo.id);
        formData.append('번호', item.번호);
        formData.append('이미지', item.이미지);
        formData.append('제품명', item.제품명);
        formData.append('할인율', item.할인율);
        formData.append('판매가', item.판매가);
        formData.append('정가', item.정가);
        formData.append('제품코드', item.제품코드);
        formData.append('수량', item.수량);
        axios({
            url: 'http://pse990813.dothome.co.kr/greekday/greekday_cart_table_insert.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            if(res.status === 200){
                console.log(res.data);
                if(res.data === 1){
                    confirmModalMethod('장바구니 수량이 변경되었습니다');
                    cartDBSelect();     // 데이터베이스에서 가져오기
                }
                else if(res.data === 2){
                    confirmModalMethod('장바구니 목록이 추가되었습니다');
                    cartDBSelect();     // 데이터베이스에서 가져오기
                }
                else if(res.data === 0){
                    confirmModalMethod('장바구니 수량 변경에 실패했습니다');
                }
                else if(res.data === -1){
                    confirmModalMethod('장바구니 목록 추가에 실패했습니다');
                }
                else{
                    confirmModalMethod('데이터 확인 후 다시 시도해주세요');
                }
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    // 데이터베이스 장바구니 목록 조회 함수
    const cartDBSelect=()=>{
        let formData = new FormData();
        formData.append('userId', selector.signIn.logInInfo.id);
        axios({
            url: 'http://pse990813.dothome.co.kr/greekday/greekday_cart_table_select.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            if(res.status === 200){
                if(res.data !== null){                    
                    localStorage.setItem('GREEKDAY_CART_PRODUCT', JSON.stringify(res.data));
                    dispatch(cartMethod(res.data));
                }
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    const onClickCartBtn=(e)=>{
        e.preventDefault();
        let cart = selector.viewProduct.current;
        cart = {
            ...cart,
            제품코드: selector.viewProduct.current.번호,
            수량: state.count
        };

        if(selector.signIn.logInInfo === null){
            let arr = [];
            if(localStorage.getItem('GREEKDAY_CART_PRODUCT') !== null){            
                arr = JSON.parse(localStorage.getItem('GREEKDAY_CART_PRODUCT'));
            }

            let imsi = arr.map((item)=>item.제품코드 === cart.제품코드)
            if(imsi.includes(true)){
                arr = arr.map((item)=>item.제품코드 === cart.제품코드 ? {...item, 수량:item.수량 + cart.수량} : item);
            }
            else{
                arr = [...arr, cart];
            }

            localStorage.setItem('GREEKDAY_CART_PRODUCT', JSON.stringify(arr));
            setState({
                ...state,
                cart: arr
            })
            dispatch(cartMethod(arr));        
        }
        else{
            cartDBSave(cart);
        }
    }
    return (
        <div id='productView'>
            <div className="container">
                <div className="left-box">
                    <img src={selector.viewProduct.current.이미지} alt="" />
                </div>
                <div className="right-box">
                    <div className="product-info">
                        <ul>
                            <li>
                                <button><img src="./images/productView/button-gift.png" alt="" /></button>
                                <button><img src="./images/productView/button-like.png" alt="" /></button>
                            </li>
                            <li><h2>{selector.viewProduct.current.제품명}</h2></li>
                            <li>
                                <h3>리뷰&nbsp;{selector.viewProduct.current.리뷰}개</h3>
                                <i>|</i>
                                <img src="./images/productView/icon_review.svg" alt="" />
                                <h3>&nbsp;4.3</h3>
                            </li>
                            <li><h4>{selector.viewProduct.current.제품설명}</h4></li>
                            <li>
                                <span>판매가</span>
                                {
                                    selector.viewProduct.current.할인율 !== 0 &&    
                                    <em>{Math.round(selector.viewProduct.current.할인율 * 100)}%</em>
                                }
                                <strong>{Math.round(selector.viewProduct.current.정가 * (1 - selector.viewProduct.current.할인율)).toLocaleString('ko-KR')}원</strong>
                                <b className={selector.viewProduct.current.할인율 === 0 ? 'on' : ''}>{(selector.viewProduct.current.정가).toLocaleString('ko-KR')}원</b>
                            </li>
                            <li>
                                <div className="count-box">                                    
                                    <p>수량</p>
                                    <div className="count">
                                        <button onClick={onClickMinusCount}><img src="./images/productView/minusB.png" alt="" /></button>
                                        <span>{state.count}</span>
                                        <button onClick={onClickPlusCount}><img src="./images/productView/plusB.png" alt="" /></button>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="total-box">
                                    <p>총 상품금액</p>
                                    <span>{(state.count * Number(selector.viewProduct.current.판매가)).toLocaleString('ko-KR')}원</span>
                                </div>
                            </li>
                            <li>
                                <button onClick={onClickCartBtn}>장바구니</button>
                                <button>선물하기</button>
                            </li>
                            <li>
                                <button>구매하기</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};