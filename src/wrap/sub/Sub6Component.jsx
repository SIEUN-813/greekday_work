import React from 'react';
import './scss/sub6.scss'

export default function Sub6Component(){
    return (
        <div id='sub6'>
            <div className="container">
                <div className="title">
                    <h2>Partner</h2>
                </div>
                <div className="contact">
                    <div className="contact-title">
                        <h3>B2B 제휴 및 계약을 원하는 사업자라면? </h3>
                        <p className='contact-email'>
                            <i></i>
                            <a href="!#">contact@sweetbio.co.kr</a>
                        </p>
                    </div>
                    <div className="who-list">
                        <ul>
                            <li>
                                <div className='who-list-content'>
                                    <img src="./images/sub/sub6/img_partner_b2b1.jpg" alt="" />
                                    <span>소중한 직원들에게 든든한 <br/> 요거트를 제공하고 싶은 회사</span>
                                </div>
                            </li>
                            <li>
                                <div className='who-list-content'>
                                    <img src="./images/sub/sub6/img_partner_b2b2.jpg" alt="" />
                                    <span>소중한 손님들에게 꾸덕한 <br/> 디저트를 선보이고 싶은 카페</span>
                                </div>
                            </li>
                            <li>
                                <div className='who-list-content'>
                                    <img src="./images/sub/sub6/img_partner_b2b3.jpg" alt="" />
                                    <span>소중한 고객들에게 <br/> 건강한 제품을 판매하고 싶은 <br/> 종합 플랫폼</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="store">
                    <div className="top">
                        <div className="left-mark">
                            <img src="./images/sub/sub6/img_official_mark.png" alt="" />
                        </div>
                        <div className="right-txt">
                            <h3>아래 판매처는 (주)스위트바이오 그릭데이에서 인증한 공식 판매처입니다.</h3>
                            <p>
                                <strong>제품의 보관(냉장) 상태 및 제조 일자와 소비 기한이 검증되지 않은</strong>
                                &nbsp;비정상 유통 판매로 인한 피해가 발생될 수 있으니 당사에서 공표한 공식 판매처 콘텐츠가 부재한 비공식 판매처는 정상 유통 상품이 아님을 주의하세요.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
