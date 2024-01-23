import React from 'react';
import axios from 'axios';
import './scss/sub10.scss';
import { useNavigate } from 'react-router-dom';

export default function Sub10ChildMemberManageComponent(){

    const navigate = useNavigate();

    const [state, setState] = React.useState({
        memberInfo: []
    })

    React.useEffect(()=>{
        axios({
            url: 'http://pse990813.dothome.co.kr/greekday/greekday_admin_memberInfo.php',
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                setState({
                    ...state,
                    memberInfo: res.data,                 
                })
            }            
        })
        .catch((err)=>{
            console.log('AXIOS 실패!');
            console.log( err );
        });
        return;
    },[]);

    const onClickMemberUpdate=(e,item)=>{
        e.preventDefault();
        navigate('/sub10MemberManageUpdate',{state:item})
    }

    return (           
        <div className="memberManage">  
            <div className="container">
                <div className="title">
                    <h2 className='title-txt'>그릭데이 회원정보 수정</h2>
                </div>
                <div className="member-info-box">
                    <table>
                            <thead>
                                <tr>
                                    <th>아이디</th>
                                    <th>비밀번호</th>
                                    <th>이름</th>
                                    <th>휴대폰</th>
                                    <th>이메일</th>
                                    <th>주소</th>
                                    <th>생년월일</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                state.memberInfo.map((item,idx)=>{
                                    return(
                                        <tr key={item.아이디}>
                                            <td>{item.아이디}</td>
                                            <td>{item.비밀번호}</td>
                                            <td>{item.이름}</td>
                                            <td>{item.휴대폰}</td>
                                            <td>{item.이메일}</td>
                                            <td>{item.주소}</td>
                                            <td>{item.생년월일}</td>
                                            <div className="button-box">
                                                <button onClick={(e)=>onClickMemberUpdate(e,item)}>수정</button>
                                            </div>
                                        </tr>
                                    )
                                })         
                                }
                            </tbody>
                    </table>
                </div>
            </div>
        </div>   
    );
};

