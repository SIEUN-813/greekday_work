import React from 'react';
import axios from 'axios';
import './scss/sub8.scss';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { confirmModal } from '../../reducer/confirmModal';

export default function Sub8AdminSignUpComponent(){

    const dispatch = useDispatch();
    const location = useLocation();
    const navigete = useNavigate();

    const[state, setState] = React.useState({
        mobileCheck: '휴대폰인증',
        phoneCheckGuideText: '휴대폰 인증 후 아래 정보를 입력해 주세요:)',
        name: '',
        id: '',
        idGuideText: '',
        pw: '',
        pwCheck: '',
        pwGuideText: '',
        phone1: '02',
        phone2: '',
        phone3: '',
        email: '',
        eamilGuideText: '',
        mobile1: '010',
        mobile2: '',
        mobile3: '',  
        zonecode: '',
        address: '',
        addressDetailed: '',
        gender: '',
        birth: '양력',
        birthYear:'',
        birthMonth:'',
        birthDay:'',
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

    const onClickMobileCheck=(e)=>{
        e.preventDefault();
        navigete('/sub8AdminSignUpMobileCheck');
    }

    const onChangeMobileCheck=(e)=>{
        setState({
            ...state,
            mobileCheck: e.target.value
        })
    }
    const onChangeId=(e)=>{
        const {value} = e.target;
        let id = '';
        let idGuideText = '';
        const regexp1 = /[a-z0-9]/g;
        const regexp2 = /^(.){4,16}$/g;
        const regexp3 = /[`~!@#$%^&*()\-_+=[\]{}\\|:;"',.<>/?]/g;
        const regexp4 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;
        const regexp5 = /\s/g;
        const regexp6 = /[A-Z]/g;
        const regexp7 = /^[0-9]/g;
        
        id = value.replace(id, '');            
                                                      
        if(regexp1.test(value) === false || regexp2.test(value) === false){         
            idGuideText = '아이디는 영문소문자 또는 숫자 4~16자로 입력해 주세요';
        }
        else if(regexp3.test(value) === true || regexp4.test(value) === true || regexp5.test(value) === true || regexp6.test(value) === true || regexp7.test(value) === true){
            idGuideText = '대문자/공백/특수문자가 포함되었거나, 숫자로 시작 또는 숫자로만 이루어진 아이디는 사용할 수 없습니다';

        }   
        else{
            idGuideText = `${state.id}는 사용 가능한 아이디입니다`; 
        }
        setState({
            ...state,
            id: id,
            idGuideText: idGuideText
        })     
    }
    const onKeyUpId=(e)=>{
        const {value} = e.target;
        let id = '';
        let idGuideText = '';
        const regexp1 = /[a-z0-9]/g;
        const regexp2 = /^(.){4,16}$/g;
        const regexp3 = /[`~!@#$%^&*()\-_+=[\]{}\\|:;"',.<>/?]/g;
        const regexp4 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;
        const regexp5 = /\s/g;
        const regexp6 = /[A-Z]/g;
        const regexp7 = /^[0-9]/g;
        
        id = value.replace(id, '');            
                                                      
        if(regexp1.test(value) === false || regexp2.test(value) === false){         
            idGuideText = '아이디는 영문소문자 또는 숫자 4~16자로 입력해 주세요.';
        }
        else if(regexp3.test(value) === true || regexp4.test(value) === true || regexp5.test(value) === true || regexp6.test(value) === true || regexp7.test(value) === true){
            idGuideText = '대문자/공백/특수문자가 포함되었거나, 숫자로 시작 또는 숫자로만 이루어진 아이디는 사용할 수 없습니다.';

        }   
        else{    
            const formData = new FormData();
            formData.append('userId', state.id);
            axios({
                url: 'http://pse990813.dothome.co.kr/greekday/greekday_admin_id_duplicate_check.php',
                method: 'POST',
                data: formData
            })
            .then((res)=>{
                if(res.status===200){ 
                    if(res.data===0){     
                        idGuideText = `${state.id}는 사용 가능한 아이디입니다`;  
                    }
                    else if(res.data===1){            
                        idGuideText = '이미 사용중인 아이디입니다';
                    }   
                    setState({
                        ...state,
                        id: value,
                        idGuideText: idGuideText
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
            id: id,
            idGuideText: idGuideText
        })
    }
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
    const onChangePhone1=(e)=>{
        setState({
            ...state,
            phone1: e.target.value
        })
    }
    const onChangePhone2=(e)=>{
        setState({
            ...state,
            phone2: e.target.value
        })
    }
    const onChangePhone3=(e)=>{
        setState({
            ...state,
            phone3: e.target.value
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
        if(state.id === ''){
            confirmModalMethod('아이디를 입력하세요')
        }
        else if(state.pw === ''){
            confirmModalMethod('비밀번호를 입력하세요')
        }
        else if(state.pwCheck === ''){
            confirmModalMethod('비밀번호를 한 번 더 입력하세요')
        }
        else if(state.phone1 === ''){
            confirmModalMethod('유효한 전화번호를 입력해주세요')
        }
        else if(state.phone2 === ''){
            confirmModalMethod('유효한 전화번호를 입력해주세요')
        }
        else if(state.phone3 === ''){
            confirmModalMethod('유효한 전화번호를 입력해주세요')
        }
        else if(state.email === ''){
            confirmModalMethod('이메일을 입력하세요')
        }
        else{
            const formData = new FormData();
            formData.append('userId', state.id);
            formData.append('userPw', state.pw);
            formData.append('userName', location.state.name);
            formData.append('userEmail', state.email);
            formData.append('userPhone', `${state.phone1}-${state.phone2}-${state.phone3}`);
            formData.append('userMobile', `${location.state.mobile1}-${location.state.mobile2}-${location.state.mobile3}`);
            formData.append('userGender', state.gender);
            formData.append('userBirth', `${location.state.birthYear}-${location.state.birthMonth}-${location.state.birthDay}`);

            axios({
                url: 'http://pse990813.dothome.co.kr/greekday/greekday_admin_signup_insert.php',
                method: 'POST',
                data: formData
            })
            .then((res)=>{
                if(res.status===200){       
                   if(res.data===1){       
                        console.log(res.data);  
                        confirmModalMethod('그릭데이 관리자 회원가입을 진심으로 축하드립니다');
                        navigete('/sub9AdminSignIn');
                   }
                   else{
                    confirmModalMethod('관리자 회원가입을 다시 시도해주세요');
                   }
                }
            })
            .catch((err)=>{
                console.log(`AXIOS 전송 실패 ${err}`);
            });
        }
    }

    return (
        <div id='sub8'>        
            <div className="container">
                <div className="title">
                    <h2 className='title-txt'>관리자 회원가입</h2>
                </div>
                <div className="step1">
                    <div className="title">
                        <img src="./images/sub/sub8/round-01.png" alt="" />
                        <h3>회원가입 인증</h3>
                    </div>
                    <form autoComplete='off' >
                        <ul>
                            <li>
                                <label htmlFor="phoneCheck">                                                
                                    <input 
                                        type="radio" 
                                        name='phoneCheck' 
                                        id='phoneCheck' 
                                        value={'휴대폰인증'} 
                                        onChange={onChangeMobileCheck}
                                        checked={state.mobileCheck.includes('휴대폰인증')}
                                    />
                                    <span>휴대폰인증</span>
                                </label>
                                <label>  
                                    <button onClick={onClickMobileCheck}>인증하기</button>
                                </label>
                                <label>  
                                    <p>{location.state === null ? state.phoneCheckGuideText : '본인인증이 완료되었습니다.'}</p>
                                </label>
                            </li>
                        </ul>
                    </form>
                </div>
                <div className="step2">
                    <div className="title">
                        <img src="./images/sub/sub8/round-02.png" alt="" />
                        <h3>기본정보 입력</h3>
                    </div>
                    <form autoComplete='off' onSubmit={onSubmitSignUpForm}>
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
                                    {
                                        location.state !== null &&
                                        (                                            
                                        <input 
                                            type="text" 
                                            name='userName' 
                                            id='userName' 
                                            value={location.state === null ? state.name : location.state.name}
                                        /> 
                                        )
                                    }
                                    </div>  
                                </div>
                            </li>
                            <li className='list'>
                                <div className="list-box">
                                    <div className="top-box">                                            
                                        <label htmlFor="userId">
                                            <span>아이디</span>
                                            <i>*</i>
                                        </label>
                                    </div>
                                    <div className="input-box">                                            
                                        <input 
                                            type="text" 
                                            name='userId' 
                                            id='userId' 
                                            maxLength={16}
                                            value={state.id}
                                            onChange={onChangeId}
                                            onKeyUp={onKeyUpId}
                                        />
                                    </div>
                                    <p className={`guide-text ${state.idGuideText.includes('사용 가능한 아이디입니다') ? '' : ' err'}`}>{state.idGuideText}</p>
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
                                            type="password" 
                                            name='userPw' 
                                            id='userPw' 
                                            maxLength={16} 
                                            value={state.pw}
                                            onChange={onChangePw}
                                        />
                                    </div>
                                    <p className='guide-text'></p>
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
                                        type="password" 
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
                            <li className='list hp1'>
                                <div className="list-box">
                                    <div className="top-box">                                            
                                        <label htmlFor="userHp">
                                            <span>일반전화</span>
                                            <i>*</i>
                                        </label>
                                    </div>
                                    <div className="num-box">  
                                        <select name="phone" id="phone1" onChange={onChangePhone1}>
                                            <option value="02">02</option>
                                            <option value="031">031</option>
                                            <option value="032">032</option>
                                            <option value="033">033</option>
                                            <option value="041">041</option>
                                            <option value="042">042</option>
                                            <option value="043">043</option>
                                            <option value="044">044</option>
                                            <option value="051">051</option>
                                            <option value="052">052</option>
                                            <option value="053">053</option>
                                            <option value="054">054</option>
                                            <option value="055">055</option>
                                            <option value="061">061</option>
                                            <option value="062">062</option>
                                            <option value="063">063</option>
                                            <option value="064">064</option>
                                            <option value="0502">0502</option>
                                            <option value="0503">0503</option>
                                            <option value="0504">0504</option>
                                            <option value="0505">0505</option>
                                            <option value="0506">0506</option>
                                            <option value="0507">0507</option>
                                            <option value="070">070</option>
                                            <option value="010">010</option>
                                            <option value="011">011</option>
                                            <option value="016">016</option>
                                            <option value="017">017</option>
                                            <option value="018">018</option>
                                            <option value="019">019</option>
                                            <option value="0508">0508</option>
                                        </select>-
                                        <input 
                                            type="text" 
                                            name='phone' 
                                            id='phone2' 
                                            maxLength={4} 
                                            value={state.phone2}
                                            onChange={onChangePhone2}
                                        />-
                                        <input 
                                            type="text" 
                                            name='userHp' 
                                            id='phone3' 
                                            maxLength={4} 
                                            value={state.phone3}
                                            onChange={onChangePhone3}
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
                                            value={location.state === null ? state.mobile2 : location.state.mobile2}
                                            onChange={onChangeMobile2}
                                        />-
                                        <input 
                                            type="text" 
                                            name='mobile' 
                                            id='mobile3' 
                                            maxLength={4} 
                                            value={location.state === null ? state.mobile3 : location.state.mobile3}
                                            onChange={onChangeMobile3}
                                        />
                                    </div>
                                </div>
                            </li>
                            <li className='list'>
                                <div className="list-box">
                                    <div className="top-box">                                            
                                        <label htmlFor="userEmail">
                                            <span>이메일</span>
                                            <i>*</i>
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
                                    <p className={`guide-text ${state.eamilGuideText === '사용 가능한 이메일입니다' ? '' : ' err'}`}>{state.eamilGuideText}</p>
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
                                                checked={state.gender.includes('남자')}
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
                                                checked={state.gender.includes('여자')}
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
                                                    value={location.state === null ? state.birthYear : location.state.birthYear} 
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
                                                    value={location.state === null ? state.birthMonth : location.state.birthMonth} 
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
                                                    value={location.state === null ? state.birthDay : location.state.birthDay} 
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
                            <button type='submit'>회원가입</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};