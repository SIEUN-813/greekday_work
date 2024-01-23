import React from 'react';
import axios from 'axios';
import './scss/sub10.scss';
import Sub10ChildMemberUpdate from './Sub10ChildMemberUpdate';
import Sub10ChildAddress from './Sub10ChildAddress';
import Sub10ChildViewProductComponent from './Sub10ChildViewProductComponent';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { signIn } from '../../reducer/signIn';
import { addressAPIModal } from '../../reducer/addressAPIModal';
import { confirmModal } from '../../reducer/confirmModal';

export default function Sub10MyPageComponent(){

    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);
    const navigate = useNavigate();
    const location = useLocation();

    const confirmModalMethod=(msg)=>{
        const obj = {            
            isConfirmModal: true,
            confirmMsg: msg,
        }
        dispatch(confirmModal(obj));
        const htmlElement = document.getElementsByTagName('html')[0];
        htmlElement.classList.add('on');
    }

    React.useEffect(()=>{
        if(localStorage.getItem('GREEKDAY_SIGNIN_INFORMATION') !== null){
            const result = JSON.parse(localStorage.getItem('GREEKDAY_SIGNIN_INFORMATION'));
            dispatch(signIn(result));
            const address = JSON.parse(localStorage.getItem('GREEKDAY_SIGNIN_INFORMATION'));
            dispatch(addressAPIModal(address));
        }
    },[])  

    const [state, setState] = React.useState({
        orderList: true,
        viewProduct: false,
        addressInfo: false,
        memberUpdate: false,
    })
    const onClickViewProduct=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            orderList: false,
            viewProduct: true,
            addressInfo: false,
            memberUpdate: false
        })
    }
    const onClickMemberUpdate=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            orderList: false,
            viewProduct: false,
            addressInfo: false,
            memberUpdate: true
        })
    }
    const onClickAddressInfo=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            orderList: false,
            viewProduct: false,
            addressInfo: true,
            memberUpdate: false
        })
    }

    const onClickMemberUnregister=(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('userId', selector.signIn.logInInfo.id);
        formData.append('userName', selector.signIn.logInInfo.name);

        axios({
            url: 'http://pse990813.dothome.co.kr/greekday/greekday_member_unregister.php',
            method: 'POST',
            data: formData
        })
        .then(( res )=>{
            if( res.status === 200 ){
                confirmModalMethod('회원탈퇴가 완료되었습니다.');
                localStorage.removeItem('GREEKDAY_SIGNIN_INFORMATION');
                dispatch(signIn(null));
                navigate('/index');                
            }
            else {
                confirmModalMethod('회원정보를 확인하고 다시 시도해 주세요.');
            }
        })
        .catch(( err )=>{
            console.log( err );
        })
    }

    const onClickSingOut=(e)=>{
        dispatch(signIn(null));
        localStorage.removeItem('GREEKDAY_SIGNIN_INFORMATION');
        localStorage.removeItem('GREEKDAY_ADDRESS_INFORMATION');
        localStorage.removeItem('GREEKDAY_VIEW_PRODUCT');
        localStorage.removeItem('GREEKDAY_CART_PRODUCT');
        localStorage.removeItem('SET_DB_CART', 'ok');
        navigate('/index');
    }
    return (
        <div id='sub10'>
            <div className="container">
                <div className="info-content">
                    <div className="member-info">                   
                        {
                            selector.signIn.logInInfo !== null &&
                            (         
                                <div className="info-top">
                                    <p>{selector.signIn.logInInfo.name} 님</p>
                                    <span>{selector.signIn.logInInfo.memberGrade}</span>
                                </div>
                            )
                        }        
                        <div className="info-bottom">
                            <ul>
                                <li>
                                    쿠폰
                                    <a href="!#">4개</a>    
                                </li>
                                <li>
                                    포인트
                                    <a href="!#">0원</a>    
                                    <img src="./images/sub/sub10/icon-point.png" alt="" />
                                </li>
                            </ul>
                        </div>  
                    </div>
                    <div className="info-summary">
                        <div className="summary-box">
                            <div className="inner-list">
                                <a href="!#">
                                    <div className="box">
                                        <img src="./images/sub/sub10/mypage-like.png" alt="" />
                                        <span>0</span>
                                    </div>
                                    <p>찜한상품</p>
                                </a>
                            </div>
                            <div className="inner-list">
                                <a href="/cart">
                                    <div className="box">
                                        <img src="./images/sub/sub10/mypage-basket.png" alt="" />
                                        {
                                            selector.cartProduct.cart.length >= 0 &&
                                            (                                                
                                                <span>{selector.cartProduct.cart.length}</span>
                                            )
                                        }
                                    </div>
                                    <p>장바구니</p>
                                </a>
                            </div>
                            <div className="inner-list">
                                <a href="!#">
                                    <div className="box">
                                        <img src="./images/sub/sub10/mypage-order.png" alt="" />
                                        <span>0</span>
                                    </div>
                                    <p>주문내역</p>
                                </a>
                            </div>
                            <div className="inner-list">
                                <a href="!#">
                                    <div className="box">
                                        <img src="./images/sub/sub10/mypage-review.png" alt="" />
                                        <span>0</span>
                                    </div>
                                    <p>작성리뷰</p>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="info-myshop">
                        <ul>
                            <li onClick={onClickViewProduct}>
                                <a href="/sub10ViewProduct">
                                    최근 본 상품
                                    <img src="./images/sub/sub10/arrow-right.png" alt="" />
                                </a>
                            </li>
                            <li onClick={onClickAddressInfo}>
                                <a href="!#">
                                    배송지 관리
                                    <img src="./images/sub/sub10/arrow-right.png" alt="" />
                                </a>
                            </li>
                            <li onClick={onClickMemberUpdate}>
                                <a href="!#">
                                    회원 정보 수정
                                    <img src="./images/sub/sub10/arrow-right.png" alt="" />
                                </a>
                            </li>
                            <li onClick={onClickMemberUnregister}>
                                <a href="!#">
                                    회원탈퇴
                                    <img src="./images/sub/sub10/arrow-right.png" alt="" />
                                </a>
                            </li>
                            <li onClick={onClickSingOut}>
                                <a href="/index" >
                                    로그아웃
                                    <img src="./images/sub/sub10/arrow-right.png" alt="" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                {
                    state.orderList &&
                    (            
                    <div className="orderList-title">
                        <h2 className='title-txt'>주문내역</h2>
                    </div>
                    )
                }
                {
                    state.addressInfo &&
                    (
                        <Sub10ChildAddress />
                    )
                }
                {
                    state.memberUpdate &&
                    (                       
                        <Sub10ChildMemberUpdate />
                    )                  
                }
                {
                    state.viewProduct &&
                    (
                        <Sub10ChildViewProductComponent />
                    )
                }
            </div>
        </div>
    );
};
