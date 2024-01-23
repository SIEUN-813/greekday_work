import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isAddressAPIModal } from '../../reducer/isAddressAPIModal';
import { confirmModal } from '../../reducer/confirmModal';
import { addressAPIModal } from '../../reducer/addressAPIModal';
import axios from 'axios';

export default function Sub10ChildAddress(){
    
    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);

    const [state, setState] = React.useState({
        addressManage: true,
        addressUpdate: false,
        phone1: '02',
        phone2: '',
        phone3: '',
        mobile1: '010',
        mobile2: '',
        mobile3: '',
        zonecode: '',
        address: '',
        addressDetailed: '',
        deliveryName: '',
        name: '',
        delivery: []
    })

    // React.useEffect(()=>{
    //     let delivery = [];
    //     if(selector.addressAPIModal.address.length > 0){
    //         delivery = selector.addressAPIModal.address;
    //     }
    //     setState({
    //         ...state,
    //         delivery: delivery
    //     })
    // },[selector.addressAPIModal.address])

    const confirmModalMethod=(msg)=>{
        const obj = {            
            isConfirmModal: true,
            confirmMsg: msg,
        }
        dispatch(confirmModal(obj));
        const htmlElement = document.getElementsByTagName('html')[0];
        htmlElement.classList.add('on');
    }

    const onClickAddressUpdate=(e)=>{
        e.preventDefault();
        setState({
            ...state,
            addressManage: false,
            addressUpdate: true
        })
    }    
    const onChangeDeliveryName=(e)=>{
        setState({
            ...state,
            deliveryName: e.target.value
        })
    }
    const onChangeName=(e)=>{
        setState({
            ...state,
            name: e.target.value
        })
    }
    const onChangeZoncode=(e)=>{
        setState({
            ...state,
            zonecode: e.target.value
        })
    }
    const onChangeAddress=(e)=>{
        setState({
            ...state,
            address: e.target.value
        })
    }
    const onChangeAddressDetailed=(e)=>{
        setState({
            ...state,
            addressDetailed: e.target.value
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
    const onSubmitAddressForm=(e)=>{
        e.preventDefault(); 
        if(selector.addressAPIModal.address.address === ''){
            confirmModalMethod('배송지를 검색해 주세요')
        }
        else{   
            const formData = new FormData();
            formData.append('userDeliveryName', state.deliveryName);
            formData.append('userName', state.name);
            formData.append('userId', selector.signIn.logInInfo.id);
            formData.append('userPhone', `${state.phone1}-${state.phone2}-${state.phone3}`);
            formData.append('userMobile', `${state.mobile1}-${state.mobile2}-${state.mobile3}`);
            formData.append('userAddress', `${state.zonecode} ${state.address} ${state.addressDetailed}`);
            
            axios({
                url: 'http://pse990813.dothome.co.kr/greekday/greekday_delivery_table_insert.php',
                method: 'POST',
                data: formData
            })
            .then((res)=>{
                if(res.data===1){
                    confirmModalMethod('배송지가 저장되었습니다.')
                    setState({
                        ...state,
                        addressManage: true,
                        addressUpdate: false
                    })                    
                    const addressInfo = {    
                        name : selector.signIn.logInInfo.name,
                        zonecode: selector.addressAPIModal.address.zonecode,
                        address: state.address + state.zonecode + state.addressDetailed
                    }
                    localStorage.setItem('GREEKDAY_ADDRESS_INFORMATION', JSON.stringify(addressInfo));
                    console.log(addressInfo);
                }
                else{
                    confirmModalMethod('배송지를 다시 검색해주세요')
                }
            })
            .catch((err)=>{
                console.log('AXIOS 전송 실패');
                console.log(err);
            })
        } 
    }
    const onClickAddressSearch=(e)=>{
        e.preventDefault();
        dispatch(isAddressAPIModal(true));
    }

    const onClickAddressDelete=(e)=>{
        e.preventDefault();
        //confirmModalMethod('등록된 배송지가 삭제되었습니다.')
    }

    React.useEffect(()=>{ 
        if(selector.addressAPIModal.address !== ''){
            const obj = JSON.parse(localStorage.getItem('GREEKDAY_ADDRESS_INFORMATION'));
            dispatch(addressAPIModal(obj));
            deliveryDBList();
        }
        return;
    },[])

    React.useEffect(()=>{
        if(localStorage.getItem('GREEKDAY_ADDRESS_INFORMATION') !== null){
            const obj = JSON.parse(localStorage.getItem('GREEKDAY_ADDRESS_INFORMATION'));
            dispatch(addressAPIModal(obj));
        }
    },[])

    // 배송지 DB 가져오는 함수
    const deliveryDBList=()=>{        
        const formData = new FormData();
        formData.append('userId', selector.signIn.logInInfo.id);
        axios({
            url: 'http://pse990813.dothome.co.kr/greekday/greekday_delivery_table_select.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            if(res.status === 200){
                if(res.data === null){
                    dispatch(addressAPIModal([]));
                }
                else{
                    dispatch(addressAPIModal(res.data));
                }
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return (
        <div className="addressInfo">  
        {
            state.addressManage &&
            (              
            <div className="container">
                <div className="title">
                    <h2 className='title-txt'>배송지관리</h2>
                    <a href="!#" onClick={onClickAddressUpdate}>배송지추가</a>
                </div>
                {
                    //selector.addressAPIModal.address === null &&
                    state.delivery.length === 0 &&
                    (
                        <div className="address-none">
                            <p>등록된 주소가 없습니다.</p>
                        </div>
                    ) 
                }
                {
                    state.delivery.length > 0 &&                
                    (
                        <ul className='delivery-list-box'>
                            {
                                selector.addressAPIModal.address.map((item, idx)=>{
                                    return (                                    
                                        <li className='delivery-list' key={idx}>
                                            <div className="address-in">
                                                <div className="address-info">
                                                    <p>{item.userName}</p>
                                                    <p>{item.userAddress}</p>
                                                    <p>{item.userMobile}</p>
                                                </div>
                                                <div className="btn-box">
                                                    <button onClick={onClickAddressDelete}>삭제</button>
                                                    <button>수정</button>
                                                </div>
                                            </div>
                                        </li> 
                                    )    
                                })   
                            }
                        </ul>
                    ) 
                }
            </div>  
            )
        }
        {
            state.addressUpdate && 
            (              
            <div className="container">
                <div className="title">
                    <h2 className='title-txt'>배송지추가</h2>
                </div>                
                <div className="address-form">
                    <form autoComplete='off' onSubmit={onSubmitAddressForm}>
                        <ul className='signup-form'>
                            <li className='list'>
                                <div className="list-box">
                                    <div className="top-box">                                            
                                        <label htmlFor="userAdressName">
                                            <span>배송지명</span>
                                        </label>
                                    </div>
                                    <div className="input-box">                                            
                                        <input 
                                            type="text" 
                                            name='userAdressName' 
                                            id='userAdressName'
                                            onChange={onChangeDeliveryName} 
                                        />
                                    </div>
                                </div>
                            </li>
                            <li className='list'>
                                <div className="list-box">
                                    <div className="top-box">                                            
                                        <label htmlFor="userName">
                                            <span>받는 분</span>
                                        </label>
                                    </div>
                                    <div className="input-box">    
                                        <input 
                                            type="text" 
                                            name='userName' 
                                            id='userName' 
                                            onChange={onChangeName}
                                        />
                                    </div>
                                </div>
                            </li>
                            <li className='list address'>
                                <div className="list-box">
                                    <div className="top-box">                                            
                                        <label htmlFor="userAddress">
                                            <span>주소</span>
                                        </label>
                                    </div>   
                                    <div className="input-box">   
                                        <input 
                                            name='userAddress' 
                                            id='userAddress' 
                                            borderRadius={12}
                                            type="text"
                                            placeholder="우편번호"
                                            value={selector.addressAPIModal.address.zonecode}
                                            onChange={onChangeZoncode}
                                        />
                                        <button onClick={onClickAddressSearch}>주소검색</button>
                                    </div>  
                                </div>
                            </li>
                            <li className='list address'>
                                <div className="list-box">
                                    <div className="input-box">  
                                        <input 
                                            name='userAddress' 
                                            id='userAddress' 
                                            borderRadius={12}
                                            marginBottom={12} 
                                            type="text" 
                                            placeholder="기본주소" 
                                            value={selector.addressAPIModal.address.address} 
                                            onChange={onChangeAddress}
                                        />
                                    </div> 
                                </div>
                            </li>
                            <li className='list address'>
                                <div className="list-box">
                                    <div className="input-box">
                                        <input
                                            name='userAddress' 
                                            id='userAddress' 
                                            borderRadius={12}
                                            type="text"
                                            placeholder="상세주소"
                                            minLength={2}
                                            maxLength={36}
                                            onChange={onChangeAddressDetailed}
                                        />
                                    </div> 
                                </div>
                            </li>
                            <li className='list hp1'>
                                <div className="list-box">
                                    <div className="top-box">                                            
                                        <label htmlFor="userHp">
                                            <span>유선전화</span>
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
                                            onChange={onChangePhone2}
                                        />-
                                        <input 
                                            type="text" 
                                            name='userHp' 
                                            id='phone3' 
                                            maxLength={4} 
                                            onChange={onChangePhone3}
                                        />
                                    </div>
                                </div>
                            </li>
                            <li className='list hp2'>
                                <div className="list-box">
                                    <div className="top-box">                                            
                                        <label htmlFor="userHp">
                                            <span>연락처</span>
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
                                            onChange={onChangeMobile2}
                                        />-
                                        <input 
                                            type="text" 
                                            name='mobile' 
                                            id='mobile3' 
                                            maxLength={4} 
                                            onChange={onChangeMobile3}
                                        />
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <div className="button-box">
                            <button type='submit'>배송지 추가하기</button>
                        </div>
                    </form>
                </div>
            </div>  
            )
        }
        </div>
    );
};