import React from 'react';
import './scss/sub11.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { confirmModal } from '../../reducer/confirmModal';

export default function Sub12FAQInsertComponent(){

    const navigate = useNavigate();
    const selector = useSelector((state)=>state);
    const dispatch = useDispatch();

    const [state, setState] = React.useState({
        type: '', // 유형
        id: selector.signIn.logInInfo.id, // 아이디
        subject: '', // 제목
        contents: '', // 내용
    })
    
    const confirmModalMethod=(msg)=>{
        const obj = {            
            isConfirmModal: true,
            confirmMsg: msg,
        }
        dispatch(confirmModal(obj));
        const htmlElement = document.getElementsByTagName('html')[0];
        htmlElement.classList.add('on');
    }

    const onChangeSelect=(e)=>{
        setState({
            ...state,
            type: e.target.value
        })
    }

    const onChangeSubject=(e)=>{
        setState({
            ...state,
            subject: e.target.value
        })
    }
    const onChangeContents=(e)=>{
        setState({
            ...state,
            contents: e.target.value
        })
    }

    const onSubmitInsertForm=(e)=>{
        e.preventDefault();
        if(state.subject === ''){
            confirmModalMethod('제목을 입력해주세요');
        }
        else if(state.contents === ''){
            confirmModalMethod('내용을 입력해주세요');
        }
        else{
            let formData = new FormData();
            formData.append('wType', state.type);
            formData.append('wId', state.id);
            formData.append('wSubject', state.subject);
            formData.append('wContent', state.contents);

            axios({
                url: 'http://pse990813.dothome.co.kr/greekday/greekday_faq_table_insert.php',
                method: 'POST',
                data: formData
            })
            .then((res)=>{
                if(res.status === 200){
                    if(res.data === 1){
                        confirmModalMethod('자주묻는질문이 등록되었습니다.');
                        navigate('/sub12FAQ');
                    }
                    else{
                        confirmModalMethod('자주묻는질문 폼내용을 확인하고 다시 시도해주세요.');
                    }
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    }

    return (
        <div id='sub11'>            
            <div className="container">
                <div className="title">
                    <h2>자주묻는질문 글쓰기</h2>
                </div>
                <div className="list">
                    <form autoComplete='off' onSubmit={onSubmitInsertForm}>
                        <div className="insert-form">
                            <ul>
                                <li>
                                    <div className="gap">
                                        <label className='left-label' htmlFor='wType'>유형</label>
                                        <select name="wType" id="wType" onChange={onChangeSelect}>
                                            <option value=""></option>
                                            <option value="상품">상품</option>
                                            <option value="주문">주문</option>
                                            <option value="배송">배송</option>
                                        </select>
                                    </div>
                                </li>
                                <li>
                                    <div className="gap">
                                        <span className='left-label'>아이디</span>
                                        <div className="admin-id">{selector.signIn.logInInfo.id}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="gap">
                                        <label className='left-label' htmlFor='subject'>제목</label>
                                        <input 
                                            type="text" 
                                            name='subject'
                                            id='subject'
                                            value={state.subject}
                                            onChange={onChangeSubject}
                                        />
                                    </div>
                                </li>
                                <li>
                                    <div className="gap">
                                        <label className='left-label' htmlFor='contents'>내용</label>
                                        <textarea 
                                            name="contents" 
                                            id="contents"
                                            value={state.contents}
                                            onChange={onChangeContents}
                                        ></textarea>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="button-box">
                            <button>등록</button>
                        </div>
                    </form>
                </div>
            </div>  
        </div>
    );
};

