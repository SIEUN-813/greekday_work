import React from 'react';
import axios from 'axios';
import './scss/sub3.scss';
import { useSelector } from 'react-redux';

export default function Sub3Component(){

    const selector = useSelector((state)=>state);

    const [state, setState] = React.useState({
        event: []
    })

    React.useEffect(()=>{       
        axios({
            url:'./data/sub/sub3.json',
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                setState({
                    ...state,
                    event: res.data.event
                });
            }
        })
        .catch((err)=>{
            console.log( err );
        });
    },[]);

    const onClickInsert=(e)=>{
        e.preventDefault();
    }
    return (
        <div id='sub3'>
            <div className="container">
                <div className="title">
                    <h2>Event</h2>
                </div>
                <div className="event-box">
                    <ul>
                        {   
                            state.event.length > 0 &&      
                            (            
                                state.event.map((item, idx)=>{ 
                                    return(                                                                     
                                        <li>
                                            <div className="img-box">
                                                <a href="!#">
                                                    <img src={`./images/sub/sub3/${item.이미지}`} alt="" />
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
                </div>
                {
                    selector.signIn.logInInfo !== null &&
                    (                    
                        selector.signIn.logInInfo.memberGrade === 'admin' &&
                        (                          
                        <div className="button-box">
                            <button onClick={onClickInsert}>이벤트 등록</button>
                        </div>
                        )      
                    )
                }
            </div>
        </div>
    );
};
