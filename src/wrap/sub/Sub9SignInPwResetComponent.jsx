import React from 'react';
import axios from 'axios';
import './scss/sub9.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { confirmModal } from '../../reducer/confirmModal';

export default function Sub9SignInPwResetComponent(){
    
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [state, setState] = React.useState({
        id: location.state.id,
        newPw: '',
        newPwCheck: ''
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

    const onChangeNewPw=(e)=>{
        setState({
            ...state,
            newPw: e.target.value
        })
    }
    const onChangeNewPwCheck=(e)=>{
        setState({
            ...state,
            newPwCheck: e.target.value
        })
    }
    const onSubmitPwReset=(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('userId', state.id);
        formData.append('userPw', state.newPw);
        axios({
            url: 'http://pse990813.dothome.co.kr/greekday/greekday_pw_reset.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            if(res.data===1){
                confirmModalMethod('비밀번호가 변경되었습니다')  
                navigate('/sub9SignIn')
            }
            else{
                confirmModalMethod('비밀번호를 다시 확인하고 시도해주세요')
            }
        })
        .catch((err)=>{
            console.log('AXIOS 전송 실패');
            console.log(err);
        })
    }

    return (
        <div id='sub9'>
            <div className="container">
                <div className="title sub9-pw-reset-title">
                    <h2 className='title-txt'>비밀번호 변경</h2>
                </div>
                <div className="sub9-pw-reset">
                    <form autoComplete='off' onSubmit={onSubmitPwReset}>
                        <ul>
                            <li>
                                <div className="top-box">      
                                    <span>비밀번호 변경</span>
                                </div> 
                            </li>              
                            <li>                      
                                <div className='info-box'>
                                    <em>아이디</em>
                                    <p>{state.id}</p>
                                </div>         
                            </li>             
                            <li>                         
                                <div className='info-box'>
                                    <em>새 비밀번호</em>
                                    <div className="input-box">  
                                        <input 
                                            type="text" 
                                            name='userPw' 
                                            id='userPw' 
                                            maxLength={16} 
                                            value={state.newPw}
                                            onChange={onChangeNewPw}
                                        />
                                    </div>
                                </div>         
                                <div className="txt-box">                                    
                                    <p>(영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10자 ~ 16자)</p>
                                </div>
                            </li>             
                            <li>         
                                <div className='info-box'>
                                    <em>새 비밀번호 확인</em>
                                    <div className="input-box">  
                                        <input 
                                            type="text" 
                                            name='userPw' 
                                            id='userPw' 
                                            maxLength={16} 
                                            value={state.newPwCheck}
                                            onChange={onChangeNewPwCheck}
                                        />
                                    </div>
                                </div>         
                            </li> 
                            <li>                                
                                <div className="gap">                                    
                                    <input 
                                        type="submit"
                                        name='submitBtn'
                                        id='submitBtn' 
                                        value={'비밀번호 변경하기'}
                                    />   
                                </div>
                            </li>
                        </ul>                    
                    </form> 
                </div>
            </div>
        </div>
    );
};

