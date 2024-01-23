import React from 'react';
import axios from 'axios';
import './scss/sub11.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Sub12FAQComponent(){

    const navigate = useNavigate();
    const selector = useSelector((state)=>state);

    const [state, setState] = React.useState({
        isAll: true,
        isProduct: false,
        isOrder: false,
        isDeliver: false,
        faq: []
    })
    const [isContentA, setIsContentA] = React.useState(false);

    const onClickTab1=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            isAll: true,
            isProduct: false,
            isOrder: false,
            isDeliver: false,
        })
    }
    const onClickTab2=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            isAll: false,
            isProduct: true,
            isOrder: false,
            isDeliver: false,
        })
    }
    const onClickTab3=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            isAll: false,
            isProduct: false,
            isOrder: true,
            isDeliver: false,
        })
    }
    const onClickTab4=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            isAll: false,
            isProduct: false,
            isOrder: false,
            isDeliver: true,
        })
    }

    const onClickContentQ=(e, a)=>{
        e.preventDefault();
        setIsContentA(!isContentA);
        console.log(a);
    }
    
    const onClickFAQWrite=(e)=>{
        e.preventDefault();
        navigate('/sub12FAQInsert')
    }

    React.useEffect(()=>{
        axios({
            url: 'http://pse990813.dothome.co.kr/greekday/greekday_faq_table_select.php',
            method: 'GET'
        })
        .then((res)=>{
            if(res.status === 200){
                setState({
                    ...state,
                    faq: res.data,
                })
            }
        })
        .catch((err)=>{
            console.log('AXIOS 실패')
            console.log(err);
        })
        return;
    },[])

    return (
        <div id='sub11' className='faq'>
            <div className="container">
                <div className="title">
                    <h2>자주 묻는 질문</h2>
                </div>
                <div className="content-tab">
                    <ul className="category-list">
                        <li onClick={onClickTab1} className={state.isAll ? 'active' : ''}><a href="!#">전체</a></li>
                        <li onClick={onClickTab2} className={state.isProduct ? 'active' : ''}><a href="!#">상품</a></li>
                        <li onClick={onClickTab3} className={state.isOrder ? 'active' : ''}><a href="!#">주문</a></li>
                        <li onClick={onClickTab4} className={state.isDeliver ? 'active' : ''}><a href="!#">배송</a></li>
                    </ul>
                </div>
                <div className="content-q">
                    <ul>
                        {
                            state.faq.length > 0 &&
                            (
                                state.faq.map((item, idx)=>{                                    
                                    return(               
                                        state.isAll &&
                                        (
                                            <li key={item.번호} onClick={(e)=>onClickContentQ(e, item.번호)}>
                                                <strong>{item.제목}</strong>
                                                {
                                                    isContentA && 
                                                    (
                                                    <div className="content-a hide" key={item.번호}>
                                                        {
                                                            item.내용.split('<br />').map((item2)=>{
                                                                return(
                                                                    <span>{item2}</span>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    )
                                                }
                                            </li>                                            
                                        )
                                    )
                                })
                            )
                        }
                        {
                            state.faq.length > 0 &&
                            (
                                state.faq.map((item, idx)=>{                                    
                                    return(               
                                        state.isProduct && item.타입 === '상품' && 
                                        (
                                            <li key={item.번호} onClick={(e)=>onClickContentQ(e, item.번호)}>  
                                                <strong>{item.제목}</strong>
                                                {
                                                    isContentA && 
                                                    (
                                                    <div className="content-a hide">
                                                        {
                                                            item.내용.split('<br />').map((item)=>{
                                                                return(
                                                                    <span>{item}</span>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    )
                                                }
                                            </li>                                            
                                        )
                                    )
                                })
                            )
                        }
                        {
                            state.faq.length > 0 &&
                            (
                                state.faq.map((item, idx)=>{                                    
                                    return(               
                                        state.isOrder && item.타입 === '주문' && 
                                        (
                                            <li key={item.번호} onClick={(e)=>onClickContentQ(e, item.번호)}>  
                                                <strong>{item.제목}</strong>
                                                {
                                                    isContentA && 
                                                    (
                                                    <div className="content-a hide">
                                                        {
                                                            item.내용.split('<br />').map((item)=>{
                                                                return(
                                                                    <span>{item}</span>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    )
                                                }
                                            </li>                                            
                                        )
                                    )
                                })
                            )
                        }
                        {
                            state.faq.length > 0 &&
                            (
                                state.faq.map((item, idx)=>{                                    
                                    return(               
                                        state.isDeliver && item.타입 === '배송' && 
                                        (
                                            <li key={item.번호} onClick={(e)=>onClickContentQ(e, item.번호)}>  
                                                <strong>{item.제목}</strong>
                                                {
                                                    isContentA && 
                                                    (
                                                    <div className="content-a hide">
                                                        {
                                                            item.내용.split('<br />').map((item)=>{
                                                                return(
                                                                    <span>{item}</span>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    )
                                                }
                                            </li>                                            
                                        )
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
                            <button onClick={onClickFAQWrite}>글쓰기</button>
                        </div>
                        )      
                    )
                }
            </div>
        </div>
    );
};

