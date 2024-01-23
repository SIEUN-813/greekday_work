import React from 'react';
import axios from 'axios';
import './scss/Cart.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { viewProduct } from '../reducer/viewProduct';
import { cartMethod } from '../reducer/cartProduct';

export default function CartComponent(){

    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);
    const navigate = useNavigate();


    const [state, setState] = React.useState({
        count: 1,
        product: [],
        hap: 0,
        sale: 0,
        deliverTip: 0
    })
    const [chk, setChk] = React.useState([]);

    console.log(state.product);

    React.useEffect(()=>{
        if(localStorage.getItem('GREEKDAY_CART_PRODUCT') !== null){
            const obj = JSON.parse(localStorage.getItem('GREEKDAY_CART_PRODUCT'));
            dispatch(cartMethod(obj));
        }
    },[])

    React.useEffect(()=>{
        let product = [];
        let hap = 0;
        let sale = 0;
        let deliverTip = 0;
        if(selector.cartProduct.cart.length > 0){
            product = selector.cartProduct.cart;
            selector.cartProduct.cart.map((item)=>{
                chk.map((code)=>{
                    if(code === item.제품코드){                        
                        hap += (item.수량 * item.정가)
                        sale += Math.round((item.수량 * item.정가) * (item.할인율))
                    }
                })            
            });
            if(chk.length > 0){
                deliverTip = (hap - sale) <= 30000 ? 3500 : 0;
            }   
        }
        setState({
            ...state,
            product: product,
            hap: hap,
            sale: sale,
            deliverTip: deliverTip
        })
    },[selector.cartProduct.cart, chk])

    React.useEffect(()=>{    
        let imsi = [];
        if(selector.cartProduct.cart.length > 0){
            imsi = selector.cartProduct.cart.map((item)=>item.제품코드)
        }
        setChk(imsi);
        return;
    },[selector.cartProduct.cart])

    const cartDBUpdateListSelect=(사용자아이디)=>{
        let formData = new FormData();
        formData.append('userId', 사용자아이디);
        axios({
            url: 'http://pse990813.dothome.co.kr/greekday/greekday_cart_table_select.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            if(res.status === 200){
                if(res.data !== null){
                    dispatch(cartMethod(res.data));
                    localStorage.setItem('GREEKDAY_CART_PRODUCT', JSON.stringify(res.data));
                }
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const cartDBUpdate=(사용자아이디, 제품코드, 결과)=>{
        let 수량 = 0;
        결과.map((item)=>item.제품코드 === 제품코드 ? 수량 = item.수량 : 수량)
        let formData = new FormData();
        formData.append('userId', 사용자아이디);
        formData.append('제품코드', 제품코드);
        formData.append('수량', 수량);
        axios({
            url: 'http://pse990813.dothome.co.kr/greekday/greekday_cart_table_update.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            if(res.status === 200){
                if(res.data === 1){
                    cartDBUpdateListSelect(사용자아이디);
                }
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const onClickMinusCount=(e, code)=>{
        e.preventDefault();
        let cart = selector.cartProduct.cart;
        const res = cart.map((item)=>{  
            return code === item.제품코드 ? {...item, 수량 : (Number(item.수량) <= 1 ? 1 : Number(item.수량) - 1)} : {...item}
        });
        dispatch(cartMethod(res));
        localStorage.setItem('GREEKDAY_CART_PRODUCT', JSON.stringify(res));

        if(selector.signIn.logInInfo !== null){
            cartDBUpdate(selector.signIn.logInInfo.id, code, res);
        }   
    }    
    const onClickPlusCount=(e, code)=>{
        e.preventDefault();
        let cart = selector.cartProduct.cart;
        const res = cart.map((item)=>{  
            return code === item.제품코드 ? {...item, 수량 : Number(item.수량) + 1} : {...item}
        });
        dispatch(cartMethod(res));
        localStorage.setItem('GREEKDAY_CART_PRODUCT', JSON.stringify(res));

        if(selector.signIn.logInInfo !== null){
            cartDBUpdate(selector.signIn.logInInfo.id, code, res);
        }   
    }

    const onChangeAllCheck=(e)=>{
        let imsi = [];
        if(e.target.checked){
            imsi = selector.cartProduct.cart.map((item)=>item.제품코드);
            setChk(imsi);
        }
        else{
            setChk([]);
        }
    }
    const onChangeCheck=(e)=>{
        if(e.target.checked){
            setChk([
                ...chk,
                e.target.value
            ])
        }
        else{
            let imsi = chk.filter((item)=>item !== e.target.value);
            setChk(imsi);
        }
    }

    const cartDBDelete=(사용자아이디, 제품코드)=>{
        let formData = new FormData();
        formData.append('userId', 사용자아이디);
        formData.append('제품코드', 제품코드);
        axios({
            url: 'http://pse990813.dothome.co.kr/greekday/greekday_cart_table_delete.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            if(res.status === 200){
                if(res.data === 1){
                    cartDBUpdateListSelect(사용자아이디);
                }
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const onClickSelectListDelBtn=(e)=>{
        e.preventDefault();
        let cart = selector.cartProduct.cart;
        let res = cart.filter((item)=>!chk.includes(item.제품코드));        
        dispatch(cartMethod(res));
        localStorage.removeItem('GREEKDAY_CART_PRODUCT', JSON.stringify(res));

        res = chk.filter((item)=>!chk.includes(item.제품코드));
        setChk(res);

        // DB 장바구니 목록 다중 삭제
        chk.map((item)=>
            cartDBDelete(selector.signIn.logInInfo.id, item)
        )
    }

    const onClickViewProductPage=(e, item)=>{
        e.preventDefault();
        dispatch(viewProduct(item));
        localStorage.setItem('GREEKDAY_VIEW_PRODUCT', JSON.stringify(item))
        navigate('/productView');
    }

    return (
        <div id='cart'>
            <div className="container">
                <div className="title">
                    <h2>장바구니</h2>
                </div>   
                {
                    state.product.length === 0 &&
                    (
                    <div className="none-cart-list">
                        <div className="none-cart-list-wrap">
                            <p className='none-cart-caption'>장바구니가 비어 있습니다.</p>
                        </div>
                    </div>   
                    )
                }      
                {
                    state.product.length > 0 && 
                    (
                        <div className="cart-list">
                            <div className="left-box">
                                <div className="cart-btn cart-header">
                                    <div className="button-box">
                                        <label htmlFor="">
                                            <input 
                                                type="checkbox"
                                                name='allCheck'
                                                id='allCheck'
                                                value='allCheck'
                                                onChange={onChangeAllCheck} 
                                                checked={chk.length === selector.cartProduct.cart.length}
                                            />
                                            <span>전체 선택 ({chk.length}/{selector.cartProduct.cart.length})</span>
                                        </label>
                                        <button onClick={onClickSelectListDelBtn}>선택 삭제</button>
                                    </div>
                                </div>               
                                <ul>
                                    {                                                    
                                        state.product.map((item, idx)=>{
                                            return(
                                                <li key={item.제품코드}>
                                                    <div className="left">         
                                                        <div className="cart-list">
                                                            <div className="cart-list-wrap">
                                                                <ul>
                                                                    <li>
                                                                        <div className="top">                                            
                                                                            <div className="button-box">
                                                                                <input                                                                       
                                                                                    type="checkbox"
                                                                                    name='cartChk'
                                                                                    id={item.제품코드}
                                                                                    value={item.제품코드}
                                                                                    checked={chk.includes(item.제품코드)} 
                                                                                    onChange={onChangeCheck}
                                                                                />
                                                                            </div>
                                                                            <img src={item.이미지} alt="" onClick={(e)=>onClickViewProductPage(e, item)}/>
                                                                            <div className="product-box">
                                                                                <p onClick={(e)=>onClickViewProductPage(e, item)}>{item.제품명}</p>
                                                                                <strong>{Number(item.정가).toLocaleString('ko-KR')}원</strong>
                                                                            </div>      
                                                                        </div>        
                                                                        <div className="bottom">                                                           
                                                                            <div className="count-box">
                                                                                <div className="count">
                                                                                    <button onClick={(e)=>onClickMinusCount(e, item.제품코드)}><img src="./images/productView/minusB.png" alt="" /></button>
                                                                                    <span>{item.수량}</span>
                                                                                    <button onClick={(e)=>onClickPlusCount(e, item.제품코드)}><img src="./images/productView/plusB.png" alt="" /></button>
                                                                                </div>
                                                                            </div>
                                                                        </div>       
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>   
                            </div>
                            <div className="right-box">
                                <div className="payment-box">
                                    <ul>
                                        <li>
                                            <strong>총 상품 금액</strong>
                                            <span>{(state.hap).toLocaleString('ko-KR')}원</span>
                                        </li>
                                        <li>
                                            <strong>상품 할인</strong>
                                            <span>{(state.sale).toLocaleString('ko-KR')}원</span>
                                        </li>
                                        <li>
                                            <strong>배송비</strong>
                                            <span>{(state.deliverTip).toLocaleString('ko-KR')}원</span>
                                        </li>
                                        <li><hr /></li>
                                    </ul>
                                </div>
                                <div className="button-box">
                                    <button>{(state.hap - state.sale).toLocaleString('ko-KR')}원 주문하기</button>
                                </div>
                            </div>
                        </div>                 
                    )
                }    
            </div>
        </div>
    );
};

