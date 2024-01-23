import React from 'react';
import './scss/sub1.scss';

export default function Sub5ComponentChild({initState}) {

    return (
        <div>
            {
                initState.isTab1 &&                    
                <ul>     
                    {
                        initState.all.length > 0 &&
                        (
                            initState.all.map((item, idx)=>{      
                                return(                                                              
                                    <li>
                                        <div className="img-box">
                                            <a href="!#">
                                                <img src={`./images/sub/sub5/${item.이미지}`} alt="" />
                                            </a>
                                        </div>
                                        <div className="txt-box">
                                            <a href="!#">
                                                <div className="date">{item.행사기간}</div>
                                                <div className="subject">
                                                    <span>{item.행사이름}</span>
                                                </div>
                                                <div className="summary">{item.행사내용}</div>
                                                <div className="like">
                                                    <img src="./images/sub/sub5/icon_heart.png" alt="" />
                                                    <span>{item.좋아요수}</span>
                                                </div>
                                            </a>
                                        </div>
                                    </li>     
                                )
                            })
                        )
                    }  
                </ul>
            }
            {
                initState.isTab2 &&       
                <ul>     
                    {
                        initState.recipe.length > 0 &&
                        (
                            initState.recipe.map((item, idx)=>{      
                                return(                                                              
                                    <li>
                                        <div className="img-box">
                                            <a href="!#">
                                                <img src={`./images/sub/sub5/${item.이미지}`} alt="" />
                                            </a>
                                        </div>
                                        <div className="txt-box">
                                            <a href="!#">
                                                <div className="date">{item.행사기간}</div>
                                                <div className="subject">
                                                    <span>{item.행사이름}</span>
                                                </div>
                                                <div className="summary">{item.행사내용}</div>
                                                <div className="like">
                                                    <img src="./images/sub/sub3/icon_heart.png" alt="" />
                                                    <span>{item.좋아요수}</span>
                                                </div>
                                            </a>
                                        </div>
                                    </li>     
                                )
                            })
                        )
                    }  
                </ul>
            }
            {
                initState.isTab3 &&       
                <ul>     
                    {
                        initState.healthy.length > 0 &&
                        (
                            initState.healthy.map((item, idx)=>{      
                                return(                                                              
                                    <li>
                                        <div className="img-box">
                                            <a href="!#">
                                                <img src={`./images/sub/sub5/${item.이미지}`} alt="" />
                                            </a>
                                        </div>
                                        <div className="txt-box">
                                            <a href="!#">
                                                <div className="date">{item.행사기간}</div>
                                                <div className="subject">
                                                    <span>{item.행사이름}</span>
                                                </div>
                                                <div className="summary">{item.행사내용}</div>
                                                <div className="like">
                                                    <img src="./images/sub/sub3/icon_heart.png" alt="" />
                                                    <span>{item.좋아요수}</span>
                                                </div>
                                            </a>
                                        </div>
                                    </li>     
                                )
                            })
                        )
                    }  
                </ul>
            }
        </div>
    );
};