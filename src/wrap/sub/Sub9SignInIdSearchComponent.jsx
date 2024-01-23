import React from 'react';
import axios from 'axios';
import './scss/sub9.scss';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { confirmModal } from '../../reducer/confirmModal';

export default function Sub9SignInIdSearchComponent(){
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [state, setState] = React.useState({
        name: '',
        email: '',
        mobile: '',
        authenType: '이메일',
        id: '',
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
    const onSubmitIdSearch=(e)=>{
        e.preventDefault();

        let formData = new FormData();
        formData.append('userName', state.name);
        formData.append('userEmail', state.email);

        axios({
            url: 'http://pse990813.dothome.co.kr/greekday/greekday_id_search_name_email_select.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            if(res.data === 0){
                confirmModalMethod('가입 시 입력하신 회원 정보가 맞는지 다시 한번 확인해주세요');
            }
            else{
                confirmModalMethod('아이디를 찾았습니다.')
                navigate('/sub9IdSearchResult',
                {                  
                    state: {
                        id: res.data.아이디,
                        signupDate: res.data.가입일,
                        mobile: res.data.휴대폰번호,
                        name: state.name
                    }            
                })
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
                    <h2 className='title-txt'>아이디 찾기</h2>
                </div>
                <div className="sub9-id-search">
                    <form autoComplete='off' onSubmit={onSubmitIdSearch}>
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
                                        value={'아이디찾기'}
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

