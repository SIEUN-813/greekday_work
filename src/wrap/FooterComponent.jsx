import React from 'react';
import './scss/Footer.scss';
import { useNavigate } from 'react-router-dom';

export default function FooterComponent(){

    const navigate = useNavigate();

    const onClickEvent=(e)=>{
        e.preventDefault();
        navigate('/sub3');
    }
    const onClickReview=(e)=>{
        e.preventDefault();
        navigate('/sub4');
    }
    const onClickFAQ=(e)=>{
        e.preventDefault();
        navigate('/sub12FAQ');
    }
    const onClickNotice=(e)=>{
        e.preventDefault();
        navigate('/sub11Notice');
    }

    return (
        <header id="footer">
            <div className="inner">
                <div className="top row">
                    <div className="left">
                        <div className="logo-box">           
                            <a href="!#">
                                <img src="./images/intro/footer/lg-pc-ft.svg" alt="" />
                            </a>
                        </div>
                        <div className="cont-wrap">
                            <img src="./images/intro/footer/icon-cs.png" alt="" />
                            <div className="cont">   
                                <p>고객상담센터 1811-9015</p>                                 
                                <p>월-금 10:00 ~ 16:00</p>
                                <p>점심시간 12:00 ~ 13:00</p>
                                <p>주말 및 공휴일 휴무</p>
                            </div>
                        </div>
                        <div className="cont-wrap">
                            <img src="./images/intro/footer/icon-mail.png" alt="" />
                            <div className="cont">
                                <p>제휴문의 contact@sweetbio.co.kr</p>
                            </div>
                        </div>
                        <div className="cont-wrap sns">
                            <div className="cont">       
                                <div className="sns-content">                                
                                    <img src="./images/intro/footer/v-icon-insta.svg" alt="" /><p>INSTAGRAM</p>  
                                </div>                 
                                <div className="sns-content">                                
                                    <img src="./images/intro/footer/v-youtube.svg" alt="" /><p>YOUTUBE</p>  
                                </div>                 
                                <div className="sns-content">                                
                                    <img src="./images/intro/footer/v-icon-blog.svg" alt="" /><p>BLOG</p>  
                                </div>       
                            </div>
                        </div>
                        <div className="con-wrap gol">
                            <div className="cont">
                                <div className="gol-content">
                                    <p onClick={onClickEvent}>Event</p>
                                </div>
                                <div className="gol-content">
                                    <p onClick={onClickReview}>Review</p>
                                </div>
                                <div className="gol-content">
                                    <p>Membership</p>
                                </div>
                                <div className="gol-content">
                                    <p onClick={onClickFAQ}>FAQ</p>
                                </div>
                                <div className="gol-content">
                                    <p onClick={onClickNotice}>Notice</p>
                                </div>
                            </div>
                        </div>
                        <div className="privacy-wrap">
                            <div className="cont">
                                <div className="privacy-content">
                                    <p>이용약관</p>
                                </div>
                                <div className="privacy-content">
                                    <p>개인정보처리방침</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom row">
                    <p>주식회사스위트바이오 | 사업자등록번호 736-85-01425 | 통신판매업신고번호 제2022-서울마포-3599호 | 대표이사 오종민 | 개인정보보호책임자 주식회사스위트바이오</p>
                    <p>본사 주소 | 서울특별시 마포구 양화로 165 (동교동) 상진빌딩 3층 | COPYRIGHT© 그릭데이. ALL RIGHTS RESERVED.</p>
                </div>                
            </div>
        </header>  
    )
}