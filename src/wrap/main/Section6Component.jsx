import React from 'react';
import './scss/Section6.scss';
import axios from 'axios';

export default function Section6Component(){
    
    const [state, setState] = React.useState({
        list: []
    });

    React.useEffect(()=>{
        axios({
            url:'./data/intro/section6.json',
            method:'GET',
        })
        .then((result)=>{
            setState({
                ...state,
                list:result.data.list
            })
        })
        .catch((error)=>{
            console.log("AXIOS 오류" + error);
        });
    },[]);

    return (
        <section id='section6'>
            <div className="container">
                <div className="review-header">
                    <img src="./images/intro/section6/405496555_748868543759522_8369233050223698605_n.jpg" alt="" />
                    <button>Follow</button>
                </div>
                <div className="review-box">
                    {
                        state.list.map((item, idx)=>{
                            return (
                                <img src={`./images/intro/section6/${item.이미지}`} alt="" />
                            )
                        })                
                    }
                </div>
            </div>
        </section>
    );
};
