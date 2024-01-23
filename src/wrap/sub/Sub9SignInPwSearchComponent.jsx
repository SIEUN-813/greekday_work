import React from 'react';
import axios from 'axios';
import './scss/sub9.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { confirmModal } from '../../reducer/confirmModal';

export default function Sub9SignInPwSearchComponent(){
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [state, setState] = React.useState({
        id: '',
        name: '',
        email: '',
        mobile: '',
        authenType: '이메일',
        signupDate: '',
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
    
    const onChangeAuthen=(e)=>{
        setState({
            ...state,
            authenType: e.target.value
        })
    }
    const onChangeId=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            id: e.target.value
        })
    }
    const onChangeName=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            name: e.target.value
        })
    }
    const onChangeEmail=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            email: e.target.value
        })
    }
    const onSubmitPwSearch=(e)=>{
        e.preventDefault();

        let formData = new FormData();
        formData.append('userName', state.name);
        formData.append('userId', state.id);
        formData.append('userEmail', state.email);

        axios({
            url: 'http://pse990813.dothome.co.kr/greekday/greekday_pw_search_name_id_email_select.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            if(res.data === 0){
                confirmModalMethod('가입 시 입력하신 회원 정보가 맞는지 다시 한번 확인해주세요');
            }
            else{
                confirmModalMethod('회원정보를 찾았습니다.')
                navigate('/sub9PwReset',
                {                  
                    state: {
                        id: state.id,
                    }            
                })
                console.log(state.id)
            }
        })
        .catch((err)=>{
            console.log('AXIOS 전송 실패');
            console.log(err);
        });
    }
    return (
        <div id='sub9'>
            <div className="container">
                <div className="title">
                    <h2 className='title-txt'>비밀번호 찾기</h2>
                </div>
                <div className="sub9-pw-search">
                    <form autoComplete='off' onSubmit={onSubmitPwSearch}>
                        <ul>
                            <li>
                                <div className="list-box">
                                    <div className="top-box">                                            
                                        <label>
                                            <span>인증방법</span>
                                        </label>
                                    </div>   
                                </div>
                            </li>
                            <li> 
                                <label htmlFor="authenEmail">                                                
                                    <input 
                                        type="radio" 
                                        name='authenEmail' 
                                        id='authen1' 
                                        value={'이메일'}
                                        onChange={onChangeAuthen}
                                        checked={state.authenType.includes('이메일')} 
                                    />
                                    <span>이메일</span>
                                </label> 
                                <label htmlFor="authenMobile">                                                
                                    <input 
                                        type="radio" 
                                        name='authenMobile' 
                                        id='authen2' 
                                        value={'휴대폰번호'} 
                                        onChange={onChangeAuthen}
                                        checked={state.authenType.includes('휴대폰번호')} 
                                    />
                                    <span>휴대폰번호</span>
                                </label>    
                                <label htmlFor="authenMobileCheck">                                                 
                                    <input 
                                        type="radio" 
                                        name='authenMobileCheck' 
                                        id='authen3' 
                                        value={'휴대폰인증'} 
                                        onChange={onChangeAuthen}
                                        checked={state.authenType.includes('휴대폰인증')} 
                                    />
                                    <span>휴대폰인증</span>
                                </label>     
                            </li>
                            {
                                state.authenType === "이메일" &&
                                (        
                                <>    
                                <li className='list'>
                                    <div className="list-box">
                                        <div className="top-box">                                            
                                            <label htmlFor="userId">
                                                <span>아이디</span>
                                            </label>
                                        </div>   
                                        <div className="input-box">                 
                                            <input 
                                                type="text" 
                                                name='userId' 
                                                id='userId' 
                                                onChange={onChangeId}
                                                value={state.id}
                                            /> 
                                        </div>  
                                    </div>
                                </li>                           
                                <li className='list'>
                                    <div className="list-box">
                                        <div className="top-box">                                            
                                            <label htmlFor="userName">
                                                <span>이름</span>
                                            </label>
                                        </div>   
                                        <div className="input-box">                 
                                            <input 
                                                type="text" 
                                                name='userName' 
                                                id='userName' 
                                                onChange={onChangeName}
                                                value={state.name}
                                            /> 
                                        </div>  
                                    </div>
                                </li>
                                <li className='list'>
                                    <div className="list-box">
                                        <div className="top-box">                                            
                                            <label htmlFor="userName">
                                                <span>이메일</span>
                                            </label>
                                        </div>   
                                        <div className="input-box">                 
                                            <input 
                                                type="text" 
                                                name='userName' 
                                                id='userName' 
                                                onChange={onChangeEmail}
                                                value={state.email}
                                            /> 
                                        </div>  
                                    </div>
                                </li>   
                                </> 
                                )
                            }      
                            {
                                state.authenType === "휴대폰번호" &&
                                (        
                                <>                            
                                <li className='list'>
                                    <div className="list-box">
                                        <div className="top-box">                                            
                                            <label htmlFor="userName">
                                                <span>이름</span>
                                            </label>
                                        </div>   
                                        <div className="input-box">                 
                                            <input 
                                                type="text" 
                                                name='userName' 
                                                id='userName' 
                                                value={state.name}
                                            /> 
                                        </div>  
                                    </div>
                                </li>
                                <li className='list'>
                                    <div className="list-box">
                                        <div className="top-box">                                            
                                            <label htmlFor="userName">
                                                <span>휴대폰번호</span>
                                            </label>
                                        </div>   
                                        <div className="input-box">                 
                                            <input 
                                                type="text" 
                                                name='userName' 
                                                id='userName' 
                                                value={state.mobile}
                                            /> 
                                        </div>  
                                    </div>
                                </li>   
                                </> 
                                )
                            }                                
                            <li>
                                <div className="gap">                                      
                                    <input 
                                        type="submit"
                                        name='okBtn'
                                        id='okBtn' 
                                        value={'비밀번호찾기'}
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

