import React from 'react';
import './scss/sub8.scss'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { confirmModal } from '../../reducer/confirmModal';
import axios from 'axios';

export default function Sub8SignUpMobileCheckComponent(){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const[state, setState] = React.useState({
        name: '',
        mobile1: '010',
        mobile2: '',
        mobile3: '',
        birthYear:'',
        birthMonth:'',
        birthDay:''
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

    const onChangeName=(e)=>{
        setState({
            ...state,
            name: e.target.value
        })
    }
    const onChangeMobile1=(e)=>{
        setState({
            ...state,
            mobile1: e.target.value
        })
    }
    const onChangeMobile2=(e)=>{
        setState({
            ...state,
            mobile2: e.target.value
        })
    }
    const onChangeMobile3=(e)=>{
        setState({
            ...state,
            mobile3: e.target.value
        })
    }
    const onChangeBirthYear=(e)=>{
        const regexp1 = /[^0-9]/g;
        let birthYear = e.target.value.replace(regexp1, '');        
        setState({
            ...state,
            birthYear: birthYear
        });
    }
    const onChangeBirthMonth=(e)=>{
        const regexp1 = /[^0-9]/g;
        let birthMonth = e.target.value.replace(regexp1, '');
        setState({
            ...state,
            birthMonth: birthMonth
        });
    }
    const onChangeBirthDay=(e)=>{
        const regexp1 = /[^0-9]/g;
        let birthMonth = e.target.value.replace(regexp1, '');
        setState({
            ...state,
            birthDay: birthMonth
        });
    }   
    const onSubmitMobileCheck=(e)=>{
        e.preventDefault();
        if(state.name === ''){
            confirmModalMethod('이름을 입력해주세요')
        }
        else if(state.mobile1 === ''){
            confirmModalMethod('유효한 휴대폰번호를 입력해주세요')
        }
        else if(state.mobile2 === ''){
            confirmModalMethod('유효한 휴대폰번호를 입력해주세요')
        }
        else if(state.mobile3 === ''){
            confirmModalMethod('유효한 휴대폰번호를 입력해주세요')
        }
        else if(state.birthYear === ''){
            confirmModalMethod('태어난 년도를 입력해주세요')
        }
        else if(state.birthMonth === ''){
            confirmModalMethod('태어난 월을 입력해주세요')
        }
        else if(state.birthDay === ''){
            confirmModalMethod('태어난 일을 입력해주세요')
        }
        else if(state.mobile1 && state.mobile2 && state.mobile3 !== ''){
            let formData = new FormData();
            formData.append('userPhone', `${state.mobile1}-${state.mobile2}-${state.mobile3}`);
            axios({
                url: 'http://pse990813.dothome.co.kr/greekday/greekday_mobile_duplicate_check.php',
                method: 'POST',
                data: formData
            })
            .then((res)=>{
                if(res.status === 200){
                    if(res.data === 1){
                        confirmModalMethod('사용 불가능한 휴대폰번호입니다.')
                    }
                    else{
                        let formData = new FormData();
                        formData.append('userName', state.name);
                        formData.append('userPhone', `${state.mobile1}-${state.mobile2}-${state.mobile3}`);
                        formData.append('userBirth', `${state.birthYear}-${state.birthMonth}-${state.birthDay}`)
                        axios({
                            url: 'http://pse990813.dothome.co.kr/greekday/greekday_mobile_check_insert.php',
                            method: 'POST',
                            data: formData
                        }) 
                        .then((res)=>{
                            if(res.status === 200){
                                console.log(res.data);
                                if(res.data === 1){
                                    console.log(res.data)
                                    navigate('/sub8SignUp', 
                                        {             
                                            state: {
                                                name: state.name,
                                                mobile1: state.mobile1,
                                                mobile2: state.mobile2,
                                                mobile3: state.mobile3,
                                                birthYear: state.birthYear,
                                                birthMonth: state.birthMonth,
                                                birthDay: state.birthDay
                                            }  
                                        }
                                    )
                                }
                            }
                        })
                        .catch((err)=>{            
                            console.log(`AXIOS 전송 실패 ${err}`);
                        })        
                    }
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        }
        /*
        else{      
            let formData = new FormData();
            formData.append('userName', state.name);
            formData.append('userPhone', `${state.mobile1}-${state.mobile2}-${state.mobile3}`);
            formData.append('userBirth', `${state.birthYear}-${state.birthMonth}-${state.birthDay}`)
            axios({
                url: 'http://pse990813.dothome.co.kr/greekday/greekday_mobile_check_insert.php',
                method: 'POST',
                data: formData
            }) 
            .then((res)=>{
                if(res.status === 200){
                    if(res.data === 1){
                        console.log(res);
                        navigate('/sub8SingUp', 
                            {             
                                state: {
                                    name: state.name,
                                    mobile1: state.mobile1,
                                    mobile2: state.mobile2,
                                    mobile3: state.mobile3,
                                    birthYear: state.birthYear,
                                    birthMonth: state.birthMonth,
                                    birthDay: state.birthDay
                                }  
                            }
                        )
                    }
                }
            })
            .catch((err)=>{            
                console.log(`AXIOS 전송 실패 ${err}`);
            })        
        } 
        */
    }
    return (
        <div id='sub8' className='sub8-mobile-check'>
            <div className="container">
                <div className="title">
                    <h2 className='title-txt'>휴대폰 인증</h2>
                </div>
                <div className="confirm-box">
                    <form autoComplete='off' onSubmit={onSubmitMobileCheck}>
                        <ul className='signup-form'>
                            <li className='list'>
                                <div className="list-box">
                                    <div className="top-box">                                            
                                        <label htmlFor="userName">
                                            <span>이름</span>
                                            <i>*</i>
                                        </label>
                                    </div>
                                    <div className="input-box">  
                                        <input 
                                            type="text" 
                                            name='userName' 
                                            id='userName' 
                                            value={state.name} 
                                            onChange={onChangeName}
                                        />
                                    </div>
                                </div>
                            </li>
                            <li className='list hp2'>
                                <div className="list-box">
                                    <div className="top-box">                                            
                                        <label htmlFor="userHp">
                                            <span>휴대전화</span>
                                            <i>*</i>
                                        </label>
                                    </div>
                                    <div className="num-box">  
                                        <select name="mobile" id="mobile1" onChange={onChangeMobile1}>
                                            <option value="010">010</option>
                                            <option value="011">011</option>
                                            <option value="016">016</option>
                                            <option value="017">017</option>
                                            <option value="018">018</option>
                                            <option value="019">019</option>
                                        </select>-
                                        <input 
                                            type="text" 
                                            name='mobile' 
                                            id='mobile2' 
                                            maxLength={4} 
                                            value={state.mobile2}
                                            onChange={onChangeMobile2}
                                        />-
                                        <input 
                                            type="text" 
                                            name='mobile' 
                                            id='mobile3' 
                                            maxLength={4} 
                                            value={state.mobile3}
                                            onChange={onChangeMobile3}
                                        />
                                    </div>
                                </div>
                            </li>                         
                            <li className='list birth'>
                                <div className="list-box">
                                    <div className="top-box">                                            
                                        <label>
                                            <span>생년월일</span>
                                        </label>
                                    </div>
                                    <div className="input-box">  
                                        <div className="birth">                                         
                                            <label htmlFor="userYear">   
                                                <input 
                                                    type="text" 
                                                    name='userYear' 
                                                    id='userBirth' 
                                                    maxLength={4} 
                                                    value={state.birthYear} 
                                                    onChange={onChangeBirthYear}
                                                />
                                                <span>년</span>
                                            </label>
                                            <label htmlFor="userMonth">  
                                                <input 
                                                    type="text" 
                                                    name='userMonth' 
                                                    id='userBirth' 
                                                    maxLength={2} 
                                                    value={state.birthMonth} 
                                                    onChange={onChangeBirthMonth}
                                                />
                                                <span>월</span>
                                            </label>  
                                            <label htmlFor="userDay">  
                                                <input 
                                                    type="text" 
                                                    name='userDay' 
                                                    id='userBirth' 
                                                    maxLength={2} 
                                                    value={state.birthDay} 
                                                    onChange={onChangeBirthDay}
                                                />
                                                <span>일</span>
                                            </label>   
                                        </div>                             
                                    </div>
                                </div>
                            </li>          
                        </ul>
                        <div className="button-box">
                            <button type='submit'>확인</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};