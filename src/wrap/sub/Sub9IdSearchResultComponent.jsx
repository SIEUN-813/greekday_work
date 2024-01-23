import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Sub9IdSearchResultComponent(){
    
    const location = useLocation();
    const navigate = useNavigate();

    const onClickSignIn=(e)=>{
        e.preventDefault();
        navigate('/sub9SignIn')
    }
    return (
        <div id='sub9'>
            <div className="container">
                <div className="title">
                    <h2 className='title-txt'>아이디 찾기가 완료되었습니다.</h2>
                </div>
                <div className="sub9-id-search-result">
                    <form autoComplete='off'>
                        <ul>                 
                            <li>                         
                                <span>
                                    <em>이름</em>
                                    <p>{location.state.name}</p>
                                </span>                       
                                <span>
                                    <em>휴대폰번호</em>
                                    <p>{location.state.mobile}</p>
                                </span>         
                            </li>             
                            <li>                         
                                <span><strong>{location.state.id}</strong>(개인회원, {location.state.signupDate} 가입)</span>         
                            </li>  
                            <li>
                                <div className="gap">                                      
                                    <input 
                                        type="button"
                                        name='signInBtn'
                                        id='signInBtn' 
                                        value={'로그인'}
                                        onClick={onClickSignIn}
                                    />                                       
                                    <input 
                                        type="button"
                                        name='pwSearchBtn'
                                        id='pwSearchBtn' 
                                        value={'비밀번호 찾기'}
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
