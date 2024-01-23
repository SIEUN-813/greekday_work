import React from 'react';
import './scss/PostCode.scss'
import PostCode from 'react-daum-postcode';
import { useDispatch } from 'react-redux';
import { addressAPIModal } from '../reducer/addressAPIModal'
import { isAddressAPIModal } from '../reducer/isAddressAPIModal'

export default function PostcodeComponent(props){

    const dispatch = useDispatch();

    const [state, setState] = React.useState({
        address1: '',
        address2: '',
        isAPIShow: true,
        isMoreview: false,
    });

    const postCodeStyle = {
        zIndex: 2,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroung: '#fff'
    }

    // 사용자가 선택한 값 이용하기 => https://postcode.map.daum.net/guide#sample 참고
    const onCompletePostCode=(data)=>{
        let address = '';
        let extraAddress = '';
        let extraAddr ='';

        // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
        if(data.userSelectedType === 'R'){
            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
                extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraAddr !== ''){
                extraAddr = ' (' + extraAddr + ')';
            }
            // 조합된 참고항목을 해당 필드에 넣는다.
            extraAddress = extraAddr;        
        } 
        else {
            extraAddress = '';
        }

        if(data.userSelectedType === 'R'){
            address = `${data.address} ${extraAddress}`;
        }
        else{
            address = `${data.jibunAddress} ${extraAddress}`;
        }
        const addr = {
            zonecode: data.zonecode,
            address: address
        }        
        dispatch(addressAPIModal(addr));
        dispatch(isAddressAPIModal(false));
    }

    // 주소검색API 닫기
    const onClickClose=(e)=>{
        e.preventDefault();
        dispatch(isAddressAPIModal(false));
    }

    return (
        <div id='postCode'>
            <div className="container">
                <div className="window-title">
                    <h1>
                        <em>우편번호 검색</em>
                    </h1>
                    <button title='닫기' onClick={onClickClose}><i className="material-icons">close</i></button>
                </div>
                <div className="content">
                    {
                        state.isAPIShow &&
                        (                           
                        <PostCode 
                            style={postCodeStyle} 
                            onComplete={onCompletePostCode}
                        /> 
                        )
                    }
                </div>
            </div>
        </div>
    );
};
