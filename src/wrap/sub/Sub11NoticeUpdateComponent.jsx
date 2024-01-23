import React from 'react';
import './scss/sub11.scss';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { confirmModal } from '../../reducer/confirmModal';

export default function Sub11NoticeUpdateComponent(){

    const location = useLocation();
    const navigate = useNavigate();
    const selector = useSelector((state)=>state);
    const dispatch = useDispatch();

    console.log(location.state)

    const [state, setState] = React.useState({
        isSelect: false,
        num: '',
        id: '',
        subject: '', 
        contents: '', 
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

    React.useEffect(()=>{
        if(selector.signIn.logInInfo.id !== ''){
            setState({
                ...state,
                num: location.state.번호,
                id: location.state.아이디,
                subject: location.state.제목,
                contents: location.state.내용
            })
        }
    },[])

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

    const onSubmitUpdateForm=(e)=>{
        e.preventDefault();
        if(state.subject === ''){
            confirmModalMethod('제목을 입력해주세요');
        }
        else if(state.contents === ''){
            confirmModalMethod('내용을 입력해주세요');
        }
        else{
            let formData = new FormData();
            formData.append('idx', state.num);
            formData.append('wId', state.id);
            formData.append('wSubject', state.subject);
            formData.append('wContent', state.contents);

            axios({
                url: 'http://pse990813.dothome.co.kr/greekday/greekday_notice_table_update.php',
                method: 'POST',
                data: formData
            })
            .then((res)=>{
                if(res.status === 200){
                    if(res.data === 1){                        
                        confirmModalMethod('공지사항 수정되었습니다.');
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
    }

    return (
        <div id='sub11'>            
            <div className="container">
                <div className="title">
                    <h2>공지사항 수정</h2>
                </div>
                <div className="list">
                    <form autoComplete='off' onSubmit={onSubmitUpdateForm}>
                        <div className="insert-form">
                            <ul>
                                <li>
                                    <div className="gap">
                                        <span className='left-label'>아이디</span>
                                        <div className="admin-id">{state.id}</div>
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
                            <button>수정</button>
                        </div>
                    </form>
                </div>
            </div>  
        </div>
    );
};

