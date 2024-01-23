import React from 'react';
import './scss/Section5.scss'

export default function Section4Component(){
    return (
        <section id='section5'>
            <div className="container">
                <div className="title">                    
                    <h2>그릭데이 매장</h2>
                    <a href="!#">전체보기</a>
                </div>    
                <div className="shop-guide">
                    <ul>
                        <li>                                
                            <a href="!#">
                                <img src="./images/intro/section5/88d5cc5586f7b5025264aa2485c7a59d.png" alt="" />
                                <h2>[매장] 9월 개강 프로모션</h2>
                                <p>2023.9.1~2023.9.27</p>
                            </a>
                        </li>
                        <li>                                
                            <a href="!#">
                                <img src="./images/intro/section5/d778c73c3b35a1c252406e72f78f8c90.png" alt="" />
                                <h2>[매장] 퐁당 3종 출시!</h2>
                                <p>2023.9.12~</p>
                            </a>
                        </li>
                        <li>                                
                            <a href="!#">
                                <img src="./images/intro/section5/046e2262e4985b60680e39a0a4a6dc89.png" alt="" />
                                <h2>[매장] 저당 그릭모나카 출시!</h2>
                                <p>2023.9.15 ~</p>
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="shop-list">
                    <ul>
                        <li><a href="!#">이대본점</a></li>
                        <li><a href="!#">홍대점</a></li>
                        <li><a href="!#">서울대점</a></li>
                        <li><a href="!#">성신여대점</a></li>
                        <li><a href="!#">압구정점</a></li>
                        <li><a href="!#">경희대점</a></li>
                        <li><a href="!#">고려대점</a></li>
                    </ul>
                </div>
            </div>
        </section>
    );
};
