import React from 'react';
import './scss/ViewProduct.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { viewProduct } from '../reducer/viewProduct';
import { cartMethod } from '../reducer/cartProduct';
import { recentlyViewProduct } from '../reducer/recentlyViewProduct';

export default function ViewProductComponent(){

    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);
    const navigate = useNavigate();

    const [state, setState] = React.useState({
        count: 1,
        cart: []
    })

    const onClickViewProductPage=(e, item)=>{
        e.preventDefault();
        dispatch(viewProduct(item));
        navigate('/productView');
    }

    const onClickDelete=(e, item)=>{
        e.preventDefault();        
    }

    const onClickCart=(e)=>{
        e.preventDefault();
    }

    return (
        <>        
        {
            selector.recentlyViewProduct.recentlyViewProduct.length === 0 &&
            (
            <div className="none-cart-list">
                <div className="none-cart-list-wrap">
                    <p className='none-cart-caption'>최근본 상품 내역이 없습니다.</p>
                </div>
            </div>   
            )
        }      
        {
            selector.recentlyViewProduct.recentlyViewProduct.length >= 1 && 
            (
                <ul>
                    {                                                    
                        selector.recentlyViewProduct.recentlyViewProduct.map((item, idx)=>{
                            return(
                                <li key={item.제품코드}>
                                    <div className="left">         
                                        <div className="view-list">
                                            <div className="view-list-wrap">
                                                <ul>
                                                    <li>
                                                        <div className="top">  
                                                            <img src={item.이미지} alt="" onClick={(e)=>onClickViewProductPage(e, item)}/>
                                                            <div className="product-box">
                                                                <p onClick={(e)=>onClickViewProductPage(e, item)}>{item.제품명}</p>
                                                                <b>{Math.round(item.할인율 * 100)}%</b>
                                                                <strong>{Math.round(item.정가 * (1 - item.할인율)).toLocaleString('ko-KR')}원</strong>
                                                                <span>{(item.정가).toLocaleString('ko-KR')}원</span>
                                                            </div>    
                                                        </div>      
                                                        <div className="button-box">
                                                            <button onClick={(e)=>onClickDelete(e, item)}>삭제</button>
                                                            <button onClick={onClickCart}>담기</button>
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
            )
        }    
        </>
    );
};

