import React from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signIn } from '../../reducer/signIn';
import { confirmModal } from '../../reducer/confirmModal';

export default function Sub10ChildAdminUpdate(){
    
    const selector = useSelector((state)=>state);
    const dispatch = useDispatch();

    const[state, setState] = React.useState({
        name: selector.signIn.logInInfo.name,
        id: selector.signIn.logInInfo.id,
        pw: '',
        pwCheck: '',
        pwGuideText: '',
        email: selector.signIn.logInInfo.email,
        mobile1: '010',
        mobile2: '',
        mobile3: '',
        gender: '',
        birth: '양력',
        birthYear: '',
        birthMonth: '',
        birthDay: '',
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
        if(localStorage.getItem('GREEKDAY_SIGNIN_INFORMATION') !== ''){
            const result = JSON.parse(localStorage.getItem('GREEKDAY_SIGNIN_INFORMATION'));
            dispatch(signIn(result));
        }
    },[])  

    const onChangePw=(e)=>{
        const {value} = e.target;
        setState({
            ...state,
            pw: value,
        })
    }
    const onChangePwCheck=(e)=>{
        const {value} = e.target;
        let pwGuideText = '';
        if(value !== state.pw){
            pwGuideText = '비밀번호가 일치하지 않습니다.';
        }
        else{
            pwGuideText = '';
        }
        setState({
            ...state,
            pwCheck: value,
            pwGuideText: pwGuideText
        })
    }
    const onChangeEmail=(e)=>{
        const {value} = e.target;
        let email = '';
        let emailGuideText = '';
        const regexp = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_+={}|'?]+((\.)?[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_+={}|'?]+)*@[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_+={}|'?.]+\.[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_+={}|'?.]+$/g;
        email = value.replace(email, '');  
        if(regexp.test(value) === false){
            emailGuideText = '유효한 이메일을 입력해 주세요';
        }
        else{
            emailGuideText = '사용 가능한 이메일입니다'
        }
        setState({
            ...state,
            email: email,
            eamilGuideText: emailGuideText
        })
    }
    const onKeyUpEmail=(e)=>{
        const {value} = e.target;
        let email = '';
        let emailGuideText = '';
        const regexp = /^[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_+={}|'?]+((\.)?[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_+={}|'?]+)*@[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_+={}|'?.]+\.[A-Za-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_+={}|'?.]+$/g;
        email = value.replace(email, '');  
        if(regexp.test(value) === false){
            emailGuideText = '유효한 이메일을 입력해 주세요';
            setState({
                ...state,
                email: value,
                eamilGuideText: emailGuideText
            })
        }
        else{         
            const formData = new FormData();
            formData.append('userEmail', state.email);
            axios({
                url: 'http://pse990813.dothome.co.kr/greekday/greekday_admin_email_duplicate_check.php',
                method: 'POST',
                data: formData
            })
            .then((res)=>{
                if(res.status===200){ 
                    if(res.data===0){     
                        emailGuideText = '사용 가능한 이메일입니다';  
                    }
                    else if(res.data===1){             
                        emailGuideText = '이미 사용중인 이메일입니다. 다른 이메일로 다시 시도해 주세요';
                    }
                    setState({
                        ...state,
                        email: value,
                        eamilGuideText: emailGuideText
                    })
                }
            })
            .catch((err)=>{
                console.log('AXIOS 오류');
                console.log(err);
            })        
        }
        setState({
            ...state,
            email: email,
            eamilGuideText: emailGuideText
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
    React.useEffect(()=>{
        if(selector.signIn.logInInfo.mobile || '' || selector.signIn.logInInfo.birth || ''){  
            const mobile = selector.signIn.logInInfo.mobile;
            const result = mobile.split("-");
            const birth = selector.signIn.logInInfo.birth;
            const res = birth.split("-");          
            setState({
                ...state,
                mobile1: result[0],
                mobile2: result[1],
                mobile3: result[2],
                birthYear: res[0],
                birthMonth: res[1],
                birthDay: res[2]
            })
        }
    },[selector.signIn.logInInfo.mobile, selector.signIn.logInInfo.birth])    
    const onChangeGender=(e)=>{
        setState({
            ...state,
            gender: e.target.value
        })
    }
    const onChangeBirth=(e)=>{
        setState({
            ...state,
            birth: e.target.value
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

    const onSubmitSignUpForm=(e)=>{
        e.preventDefault();
        if(state.pw === '' && state.pwCheck === ''){
            confirmModalMethod('비밀번호 항목은 필수 입력값입니다.')
        }
        else if(state.pw !== state.pwCheck ){
            confirmModalMethod('비밀번호가 일치하지 않습니다.')
        }
        else{            
            const formData = new FormData();
            formData.append('userId', state.id);
            formData.append('userPw', state.pw);
            formData.append('userEmail', state.email);
            formData.append('userMobile', `${state.mobile1}-${state.mobile2}-${state.mobile3}`);
            formData.append('userBirth', `${state.birthYear}-${state.birthMonth}-${state.birthDay}`);
            axios({
                url: 'http://pse990813.dothome.co.kr/greekday/greekday_adminInfo_update.php',
                method: 'POST',
                data: formData
            })
            .then((res)=>{
                if(res.data===1){
                    confirmModalMethod('개인정보 수정이 완료되었습니다.')                    
                    const updateLogInInfo = {
                        memberGrade: 'admin',
                        name: state.name,
                        birth: res.data.생년월일,
                        pw: res.data.비밀번호,
                        mobile: res.data.휴대폰번호
                    }
                    dispatch(signIn(updateLogInInfo))
                }
                else{
                    confirmModalMethod('개인정보를 확인하고 다시 시도해 주세요.')
                }
            })
            .catch((err)=>{
                console.log('AXIOS 전송 실패');
                console.log(err);
            })
        }
    }

    return (             
        <div className="memberUpdate">  
            <div className="container">
                <div className="title">
                    <h2 className='title-txt'>관리자정보수정</h2>
                </div>
                <div className="step2">
                    <form autoComplete='off' onSubmit={onSubmitSignUpForm}>
                        <ul className='signup-form'>
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
                                            maxLength={16}
                                            value={state.id}
                                            placeholder readOnly='readonly'
                                        />
                                    </div>
                                </div>
                            </li>
                            <li className='list'>
                                <div className="list-box">
                                    <div className="top-box">                                            
                                        <label htmlFor="userEmail">
                                            <span>이메일</span>
                                        </label>
                                    </div>
                                    <div className="input-box">    
                                        <input 
                                            type="text" 
                                            name='userEmail' 
                                            id='userEmail' 
                                            value={state.email} 
                                            onChange={onChangeEmail}
                                            onKeyUp={onKeyUpEmail}
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
                                            value={state.name}
                                            placeholder readOnly='readonly'
                                        /> 
                                    </div>  
                                </div>
                            </li>
                            <li className='list'>
                                <div className="list-box">
                                    <div className="top-box">                                            
                                        <label htmlFor="userPw">
                                            <span>비밀번호</span>
                                            <i>*</i>
                                        </label>
                                    </div>
                                    <div className="input-box">  
                                        <input 
                                            type="text" 
                                            name='userPw' 
                                            id='userPw' 
                                            maxLength={16} 
                                            value={state.pw}
                                            onChange={onChangePw}
                                        />
                                    </div>
                                    <ul className='guide-text'>
                                        <li>- 대소문자/숫자/특수문자 중 2가지 이상 조합, 10자~16자</li>
                                        <li>- 입력 가능 특수문자 </li>
                                        <li>&nbsp;&nbsp;&nbsp; ~ ` ! @ # $ % ^ ( ) * _ - = { } [ ] | ; : < > , . ? /</></li>
                                        <li>- 공백 입력 불가능</li>
                                        <li>- 연속된 문자, 숫자 사용 불가능</li>
                                        <li>- 동일한 문자, 숫자를 반복해서 사용 불가능</li>
                                        <li>- 아이디 포함 불가능</li>
                                    </ul>
                                </div>
                            </li>
                            <li className='list'>
                                <div className="list-box">
                                    <div className="top-box">                                            
                                        <label htmlFor="userPwCk">
                                            <span>비밀번호확인</span>
                                            <i>*</i>
                                        </label>
                                    </div>
                                    <div className="input-box">   
                                        <input 
                                        type="text" 
                                        name='userPwCk' 
                                        id='userPwCk' 
                                        maxLength={16} 
                                        value={state.pwCheck}
                                        onChange={onChangePwCheck}
                                    />
                                    </div>
                                    <p className={`guide-text ${state.pwGuideText !== '' ? ' err' : ''}`}>{state.pwGuideText}</p>
                                </div>
                            </li>
                            <li className='list hp2'>
                                <div className="list-box">
                                    <div className="top-box">                                            
                                        <label htmlFor="userHp">
                                            <span>휴대전화</span>
                                        </label>
                                    </div>
                                    <div className="num-box">  
                                        <select name="mobile" id="mobile1" onChange={onChangeMobile1} value={state.mobile1}>
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
                            <li className='list radio gender'>
                                <div className="list-box">
                                    <div className="top-box">                                            
                                        <label>
                                            <span>성별</span>
                                        </label>
                                    </div>
                                    <div className="input-box">  
                                        <label htmlFor="userMale">                                                
                                            <input 
                                                type="radio" 
                                                name='userGender' 
                                                id='userMale' 
                                                value={'남자'} 
                                                onChange={onChangeGender}
                                                checked={selector.signIn.logInInfo.gender}
                                            />
                                            <span>남자</span>
                                        </label>
                                        <label htmlFor="userFemale"> 
                                            <input 
                                                type="radio" 
                                                name='userGender' 
                                                id='userFemale' 
                                                value={'여자'} 
                                                onChange={onChangeGender}
                                                checked={selector.signIn.logInInfo.gender}
                                            />
                                            <span>여자</span>
                                        </label>
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
                                        <label htmlFor="userSolar">                                                
                                            <input 
                                                type="radio" 
                                                name='userSolar' 
                                                id='userSolar' 
                                                value={'양력'} 
                                                onChange={onChangeBirth}
                                                checked={state.birth.includes('양력')}
                                            />
                                            <span>양력</span>
                                        </label>
                                        <label htmlFor="userLunar"> 
                                            <input 
                                                type="radio" 
                                                name='userLunar' 
                                                id='userLunar' 
                                                value={'음력'} 
                                                onChange={onChangeBirth}
                                                checked={state.birth.includes('음력')}
                                            />
                                            <span>음력</span>
                                        </label>  
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
                            <button type='submit'>적용하기</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>   
    );
};

