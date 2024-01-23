import React from 'react';
import axios from 'axios';
import './scss/sub9.scss';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../reducer/signIn';
import { confirmModal } from '../../reducer/confirmModal';

export default function Sub9AdminSignInComponent(){

    const dispatch = useDispatch();
    const navigete = useNavigate();

    const [state, setState] = React.useState({
        id: '',
        pw: ''
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
    
    const onChangeId=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            id: e.target.value
        })
    }
    
    const onChangePw=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            pw: e.target.value
        })
    }
    
    const onSubmitSignInForm=(e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('userId', state.id);
        formData.append('userPw', state.pw);
        axios({
            url: 'http://pse990813.dothome.co.kr/greekday/greekday_admin_signIn.php',
            method: 'POST',
            data: formData 
        })
        .then((res)=>{     
            if(res.status===200){
                if(res.data !== 0){
                    let toDay = new Date();
                    toDay.setDate(toDay.getDate() + 3);
                    const logInInfo = {              
                        memberGrade: 'admin',                
                        id: res.data.아이디,
                        name: res.data.이름,
                        phone: res.data.일반전화,
                        mobile: res.data.휴대폰번호,
                        email: res.data.이메일,
                        gender: res.data.성별,
                        birth: res.data.생년월일,
                        expire: toDay.getTime()
                    }
                    localStorage.setItem('GREEKDAY_SIGNIN_INFORMATION', JSON.stringify(logInInfo));     
                    dispatch(signIn(logInInfo));      
                    navigete('/index');                    
                }
                else{
                    confirmModalMethod('아이디와 비밀번호를 다시 확인해 주세요')
                }
            }
        })
        .catch((err)=>{
            console.log(`AXIOS 전송 실패 ${err}`);
        });
    }

    const onClickIdSearch=(e)=>{
        e.preventDefault();
        navigete('/sub9AdminIdSearch');
    }

    const onClickPwSearch=(e)=>{
        e.preventDefault();
        navigete('/sub9AdminPwSearch');
    }

    const onClickAdminSignUp=(e)=>{
        e.preventDefault();
        navigete('/sub8AdminSignUp');
    }
    return (
        <div id='sub9'>
            <div className="container">
                <div className="sub9-content">
                    <form autoComplete='off' onSubmit={onSubmitSignInForm} >
                        <ul>
                            <li>
                                <div className="box">
                                    <div className="gap">                                        
                                        <input 
                                            type="text" 
                                            name='userId'
                                            id='userId'
                                            onChange={onChangeId}
                                            value={state.id}
                                            placeholder='아이디'
                                        />    
                                    </div>
                                    <div className="gap">                                      
                                        <input 
                                            type="password"
                                            name='userPw'
                                            id='userPw' 
                                            onChange={onChangePw}
                                            value={state.pw}
                                            placeholder='비밀번호'
                                        />   
                                    </div>
                                </div>
                                <div className="gap">                                    
                                    <input 
                                        type="submit"
                                        name='submitBtn'
                                        id='submitBtn' 
                                        value={'로그인하기'}
                                    />   
                                </div>
                            </li>
                            <li>
                                <div className="gap">                                      
                                    <input 
                                        type="button"
                                        name='signupBtn'
                                        id='signupBtn' 
                                        value={'회원가입'}
                                        onClick={onClickAdminSignUp}
                                    />   
                                </div>
                            </li>
                            <li>
                                <div className="gap"> 
                                    <span>
                                        <a href="!#" onClick={onClickIdSearch}>관리자 아이디찾기</a>
                                        <i>|</i>
                                        <a href="!#" onClick={onClickPwSearch}>관리자 비밀번호찾기</a>
                                    </span>
                                </div>
                            </li>
                        </ul>                    
                    </form> 
                </div>
            </div>
        </div>
    );
};
