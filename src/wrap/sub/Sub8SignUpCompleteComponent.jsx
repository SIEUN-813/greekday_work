import React from 'react';
import './scss/sub8.scss';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Sub8SignUpCompleteComponent(){

    const location = useLocation();
    const navigate = useNavigate();

    const [state, setState] = React.useState({
        id: '',
        name: '',
        email: ''    
    })

    const onClickOkBtn=(e)=>{
        e.preventDefault();
        navigate('/index');
    }
    return (
        <div id='sub8' className='sub8-signup-complete'>        
            <div className="container">
                <div className="gap">
                    <div className="title">
                        <h2 className='title-txt'>회원가입</h2>
                        <h3 className='title-sub-txt'>회원가입이 완료 되었습니다.</h3>
                    </div>
                    <div className="member-box">
                        <strong>저희 쇼핑몰을 이용해주셔서 감사합니다.</strong>
                        <div className="member-info">
                            <p><img src="./images/sub/sub8/mg_img_Frame 5.png" alt="" /></p>
                            <div className="description">
                                <ul>                                    
                                    <li>
                                        <div>
                                            <span className='left-label'>아이디</span>
                                            <div className="user user-id">{location.state === null ? state.id : location.state.id}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <span className='left-label'>이름</span>
                                            <div className="user user-name">{location.state === null ? state.name : location.state.name}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <span className='left-label'>이메일</span>
                                            <div className="user user-email">{location.state === null ? state.email : location.state.email}</div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>   
                    <div className="member-grade">
                        <p><strong><span>{location.state === null ? state.name : location.state.name}</span>님</strong>은 [샌디 데이지] 회원이십니다.</p>
                        <p><strong>0원 이상</strong>구매시 <strong>1%</strong>을 추가적립 받으실 수 있습니다.</p>
                    </div>             
                    <div className="button-box">
                        <button onClick={onClickOkBtn}>완료</button>
                    </div>
                </div>
                <div className="banner-box">
                    <img src="./images/sub/sub8/3690f5ea-da57-4662-c4a5-bb3c50c102dc.png" alt="" />
                </div>
            </div>
        </div>
    );
};
