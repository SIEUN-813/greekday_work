import React from 'react';
import './scss/Header.scss'
import { Link, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function HeaderComponent(){

    const selector = useSelector((state)=>state);

    return (
        <>
        <header id="header">
            <div className="row">
                <div className="container">
                    <div className="left">
                        <div className="logo-box">           
                            <Link to="/index">
                                <img src="./images/intro/header/lg-pc-top.svg" alt="" />
                            </Link>
                        </div>
                        <ul>
                            <li><Link to="/sub1">Product</Link></li>
                            <li><Link to="/sub2">Brand Story</Link></li>
                            <li><Link to="/sub3">Event</Link></li>
                            <li><Link to="/sub4">Review</Link></li>
                            <li><Link to="/sub5">Life</Link></li>
                            <li><Link to="/sub6">Partner</Link></li>
                            <li><Link to="/sub7">정기배송</Link></li>
                        </ul>
                    </div>
                    {
                        selector.signIn.logInInfo === null &&
                        (                            
                        <div className="right">
                            <a href="/sub8SignUp"><span>회원가입</span></a>
                            <a href="/sub9SignIn"><span>로그인</span></a>
                            <a href="!#"><img src="./images/intro/header/icon-search-pc.svg" alt="" /></a>
                            <a href="/cart">
                                <img src="./images/intro/header/icon-basket.png" alt="" />
                                {
                                    selector.cartProduct.cart.length > 0 &&
                                    (                                                
                                        <em>{selector.cartProduct.cart.length}</em>
                                    )
                                }
                            </a>
                        </div>
                        )
                    }
                    {
                        selector.signIn.logInInfo !== null &&
                        (                       
                        <div className="right">
                            <a href="!#"><img src="./images/intro/header/icon-search-pc.svg" alt="" /></a>
                            {
                                selector.signIn.logInInfo.memberGrade !== 'admin' ?
                                <a href="/sub10MyPage"><img src="./images/intro/header/icon-mypage-holiday.png" alt="" /></a> : <a href="/sub9AdminMyPage"><img src="./images/intro/header/icon-mypage.png" alt="" /></a>
                            }
                            <a href="/cart">
                                <img src="./images/intro/header/icon-basket-holiday.png" alt="" />
                                {
                                    selector.cartProduct.cart.length > 0 &&
                                    (                                                
                                        <em>{selector.cartProduct.cart.length}</em>
                                    )
                                }
                            </a>
                        </div>
                        )
                    }
                </div>
            </div>
        </header>          
        <Outlet />  
        </>
    )
}