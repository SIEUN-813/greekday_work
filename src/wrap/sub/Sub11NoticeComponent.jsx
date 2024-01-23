import React from 'react';
import axios from 'axios';
import './scss/sub11.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Sub11NoticeComponent(){

    const navigate = useNavigate();
    const selector = useSelector((state)=>state);

    const [state, setState] = React.useState({
        notice: [],
    })

    const onClickList=(e, item)=>{
        e.preventDefault();
        navigate('/sub11NoticeView', {state: item});
    }

    const onClickNoticeWrite=(e)=>{
        e.preventDefault();
        navigate('/sub11NoticeInsert')
    }

    React.useEffect(()=>{
        axios({
            url: 'http://pse990813.dothome.co.kr/greekday/greekday_notice_table_select.php',
            method: 'GET'
        })
        .then((res)=>{
            if(res.status === 200){
                setState({
                    ...state,
                    notice: res.data,
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
        <div id='sub11'>
            <div className="container">
                <div className="title">
                    <h2>공지사항</h2>
                </div>
                <div className="content">                    
                    <ul className='list-data'> 
                    {
                        state.notice.length > 0 &&
                        (
                            state.notice.map((item, idx)=>{     
                                return(         
                                    <li key={idx.글번호} onClick={(e)=>onClickList(e, item)}>      
                                        <ul className='column-box'>
                                            <li className='col1'><span>{item.제목}</span></li>
                                            <li className='col2'><span>{`${new Date(item.작성일).getFullYear()}.${new Date(item.작성일).getMonth()+1}.${new Date(item.작성일).getDate()}`}</span></li>
                                        </ul>                         
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
                            <button onClick={onClickNoticeWrite}>글쓰기</button>
                        </div>
                        )      
                    )
                }
            </div>
        </div>
    );
};

