import React from 'react';
import axios from 'axios';
import './scss/sub11.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { confirmModal } from '../../reducer/confirmModal';

export default function Sub11NoticeViewComponent(){

    const location = useLocation();
    const navigate = useNavigate();
    const selector = useSelector((state)=>state);
    const dispatch = useDispatch();

    const confirmModalMethod=(msg)=>{
        const obj = {            
            isConfirmModal: true,
            confirmMsg: msg,
        }
        dispatch(confirmModal(obj));
        const htmlElement = document.getElementsByTagName('html')[0];
        htmlElement.classList.add('on');
    }

    const onClickNoticeList=(e)=>{
        e.preventDefault();
        navigate('/sub11Notice');
    }
    const onClickNoticeUpdate=(e)=>{
        e.preventDefault();
        navigate('/sub11NoticeUpdate', {state: location.state});
    }

    const onClickNoticeDelete=(e)=>{
        e.preventDefault();
        let formData = new FormData();
        formData.append('idx', location.state.번호);

        axios({
            url: 'http://pse990813.dothome.co.kr/greekday/greekday_notice_table_delete.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            if(res.status === 200){
                if(res.data === 1){
                    confirmModalMethod('공지사항 삭제되었습니다.');
                    navigate('/sub11Notice');
                }
                else{
                    confirmModalMethod('공지사항 폼내용을 확인하고 다시 시도해주세요.');
                }
            }
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    return (
        <div id='sub11'>            
            <div className="container">
                <div className="view-box">
                    <ul>
                        <li>
                            <ul>
                                <li>
                                    <h2>{location.state.제목}</h2>
                                </li>
                                <li>
                                    <p>{`${new Date(location.state.작성일).getFullYear()}.${new Date(location.state.작성일).getMonth()+1}.${new Date(location.state.작성일).getDate()}`}</p>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <div className="gap">
                                <div className='contents'>
                                {
                                    location.state.내용.split('<br />').map((item)=>{
                                        return(
                                            <p>{item}</p>
                                        )
                                    })
                                }
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="button-box">
                    {
                        selector.signIn.logInInfo !== null &&
                        (                    
                            selector.signIn.logInInfo.memberGrade === 'admin' &&
                            (             
                                <>                        
                                <button type='button' onClick={onClickNoticeDelete}>삭제</button>
                                <button type='button' onClick={onClickNoticeUpdate}>수정</button>
                                </>    
                            )      
                        )
                    }                            
                    <button type='button' onClick={onClickNoticeList}>목록</button>
                </div>
            </div>
        </div>
    );
};

