import React from 'react';
import './scss/sub10.scss'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../reducer/signIn';
import Sub10ChildMemberManageComponent from './Sub10ChildMemberManageComponent';
import Sub10ChildAdminUpdate from './Sub10ChildAdminUpdate';

export default function Sub10AdminPageComponent(){

    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);
    const navigete = useNavigate();

    const [state, setState] = React.useState({
        memberManage: false,
        memberUpdate: false
    })

    const onClickMemberManage=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            memberManage: true,
            memberUpdate: false
        })
    }
    const onClickMemberUpdate=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            memberManage: false,
            memberUpdate: true
        })
    }

    const onClickSingOut=(e)=>{
        dispatch(signIn(null));
        localStorage.removeItem('GREEKDAY_SIGNIN_INFORMATION');
        navigete('/index');
    }
    return (
        <div id='sub10'>
            <div className="container">
                <div className="info-content">
                    <div className="member-info">                   
                        {
                            selector.signIn.logInInfo !== null &&
                            (         
                                <div className="info-top">
                                    <p>{selector.signIn.logInInfo.name} 님</p>
                                    <span>{selector.signIn.logInInfo.memberGrade}</span>
                                </div>
                            )
                        }
                    </div>
                    <div className="info-myshop">
                        <ul>
                            <li>
                                <a href="/sub11Notice">
                                    공지사항
                                    <img src="./images/sub/sub10/arrow-right.png" alt="" />
                                </a>
                            </li>
                            <li>
                                <a href="/sub12FAQ">
                                    자주묻는질문
                                    <img src="./images/sub/sub10/arrow-right.png" alt="" />
                                </a>
                            </li>
                            <li onClick={onClickMemberManage}>
                                <a href="!#">
                                    회원 관리
                                    <img src="./images/sub/sub10/arrow-right.png" alt="" />
                                </a>
                            </li>
                            <li onClick={onClickMemberUpdate}>
                                <a href="!#">
                                    관리자 정보 수정
                                    <img src="./images/sub/sub10/arrow-right.png" alt="" />
                                </a>
                            </li>
                            <li onClick={onClickSingOut}>
                                <a href="/index" >
                                    로그아웃
                                    <img src="./images/sub/sub10/arrow-right.png" alt="" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                {
                    state.memberManage &&
                    (     
                        <Sub10ChildMemberManageComponent />
                    )
                }
                {
                    state.memberUpdate &&
                    (     
                        <Sub10ChildAdminUpdate />
                    )
                }
            </div>
        </div>
    );
};
