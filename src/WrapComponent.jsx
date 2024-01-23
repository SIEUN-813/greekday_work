import React from 'react';
import axios from 'axios';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import TopModalComponent from './wrap/TopmodalComponent';
import MainModalComponent from './wrap/MainmodalComponent';
import HeaderComponent from './wrap/HeaderComponent';
import MainComponent from './wrap/MainComponent';
import GoTopComponent from './wrap/GoTopComponent';
import Sub1Component from './wrap/sub/Sub1Component';
import Sub2Component from './wrap/sub/Sub2Component';
import Sub3Component from './wrap/sub/Sub3Component';
import Sub4Component from './wrap/sub/Sub4Component';
import Sub5Component from './wrap/sub/Sub5Component';
import Sub6Component from './wrap/sub/Sub6Component';
import Sub7Component from './wrap/sub/Sub7Component';
import Sub8SignUpComponent from './wrap/sub/Sub8SignUpComponent';
import Sub8SignUpMobileCheckComponent from './wrap/sub/Sub8SignUpMobileCheckComponent';
import Sub8SignUpCompleteComponent from './wrap/sub/Sub8SignUpCompleteComponent';
import Sub9SignInComponent from './wrap/sub/Sub9SignInComponent';
import Sub9SignInIdSearchComponent from './wrap/sub/Sub9SignInIdSearchComponent';
import Sub9IdSearchResultComponent from './wrap/sub/Sub9IdSearchResultComponent';
import Sub9SignInPwSearchComponent from './wrap/sub/Sub9SignInPwSearchComponent';
import Sub9SignInPwResetComponent from './wrap/sub/Sub9SignInPwResetComponent';
import Sub9AdminSignInIdSearchComponent from './wrap/sub/Sub9AdminSignInIdSearchComponent';
import Sub9AdminIdSearchResultComponent from './wrap/sub/Sub9AdminIdSearchResultComponent';
import Sub9AdminSignInPwSearchComponent from './wrap/sub/Sub9AdminSignInPwSearchComponent';
import Sub9AdminSignInPwResetComponent from './wrap/sub/Sub9AdminSignInPwResetComponent'
import Sub8AdminSignUpComponent from './wrap/sub/Sub8AdminSignUpComponent';
import Sub9AdminSignInComponent from './wrap/sub/Sub9AdminSignInComponent';
import Sub8AdminSignUpMobileCheckComponent from './wrap/sub/Sub8AdminSignUpMobileCheckComponent';
import Sub10MyPageComponent from './wrap/sub/Sub10MyPageComponent';
import Sub10AdminPageComponent from './wrap/sub/Sub10AdminPageComponent';
import Sub10ChildMemberManageComponent from './wrap/sub/Sub10ChildMemberManageComponent';
import Sub10ChildMemberManageUpdateComponent from './wrap/sub/Sub10ChildMemberManageUpdateComponent'
import Sub10ChildViewProductComponent from './wrap/sub/Sub10ChildViewProductComponent';
import PostcodeComponent from './wrap/PostcodeComponent';
import ProductViewComponent from './wrap/ProductViewComponent';
import CartComponent from './wrap/CartComponent';
import Sub11NoticeComponent from './wrap/sub/Sub11NoticeComponent';
import Sub11NoticeViewComponent from './wrap/sub/Sub11NoticeViewComponent'
import Sub11NoticeInsertComponent from './wrap/sub/Sub11NoticeInsertComponent';
import Sub11NoticeUpdateComponent from './wrap/sub/Sub11NoticeUpdateComponent';
import Sub12FAQComponent from './wrap/sub/Sub12FAQComponent';
import Sub12FAQInsertComponent from './wrap/sub/Sub12FAQInsertComponent';
import ViewProductComponent from './wrap/ViewProductComponent';
import ConfirmModalComponent from './wrap/ConfirmModalComponent';
import { mainModal } from './reducer/mainModal';
import { signIn } from './reducer/signIn';
import { addressAPIModal } from './reducer/addressAPIModal';
import { viewProduct } from './reducer/viewProduct';
import { cartMethod } from './reducer/cartProduct';
import { recentlyViewProduct } from './reducer/recentlyViewProduct';

export default function WrapComponent(){

    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);

    const [cart, setCart] = React.useState([]);
    const [ok, setOk] = React.useState(false);
    
    // 로그인정보 페이지 새로고침시에도 유지
    React.useEffect(()=>{
        if(localStorage.getItem('GREEKDAY_SIGNIN_INFORMATION') !== null){
            const result = JSON.parse(localStorage.getItem('GREEKDAY_SIGNIN_INFORMATION'));
            dispatch(signIn(result));
            const obj = JSON.parse(localStorage.getItem('GREEKDAY_ADDRESS_INFORMATION'));
            dispatch(addressAPIModal(obj));
        }
    },[])  

    React.useEffect(()=>{
        let toDay = new Date();
        if(localStorage.getItem('GREEKDAY_MAIN_MODAL') !== null){
            const result = JSON.parse(localStorage.getItem('GREEKDAY_MAIN_MODAL'));
            if(toDay <= result.expires){
                dispatch(mainModal(false));
            }
            else{
                dispatch(mainModal(true));
            }
        }
        return;
    },[])   

    React.useEffect(()=>{
        if(localStorage.getItem('GREEKDAY_CART_PRODUCT') !== null){
            const obj = JSON.parse(localStorage.getItem('GREEKDAY_CART_PRODUCT'));
            dispatch(cartMethod(obj));
        }
    },[])
    
    React.useEffect(()=>{
        if(localStorage.getItem('GREEKDAY_VIEW_PRODUCT') !== null){
            const obj = JSON.parse(localStorage.getItem('GREEKDAY_VIEW_PRODUCT'));
            dispatch(recentlyViewProduct(obj));
        }
    },[])
    
    React.useEffect(()=>{
        if(localStorage.getItem('GREEKDAY_ADDRESS_INFORMATION') !== null){
            const obj = JSON.parse(localStorage.getItem('GREEKDAY_ADDRESS_INFORMATION'));
            dispatch(addressAPIModal(obj));
            deliveryDBList();
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

    React.useEffect(()=>{
        if(selector.signIn.logInInfo !== null){
            cartDBSelect(selector.signIn.logInInfo.id);
        }        
    },[selector.signIn])

    React.useEffect(()=>{
        if(selector.signIn.logInInfo !== null){
            if(localStorage.getItem('SET_DB_CART') !== null){  
                setCart([]);
                setOk(true);
            }
            else{              
                setCart(selector.cartProduct.cart);
            }
        }
    },[selector.signIn])
    
    // 데이터베이스 장바구니 목록 저장 함수
    const cartDBSave=(item)=>{
        let formData = new FormData();
        formData.append('userId', selector.signIn.logInInfo.id);
        formData.append('번호', item.번호);
        formData.append('이미지', item.이미지);
        formData.append('제품명', item.제품명);
        formData.append('할인율', item.할인율);
        formData.append('판매가', item.판매가);
        formData.append('정가', item.정가);
        formData.append('제품코드', item.제품코드);
        formData.append('수량', item.수량);
        axios({
            url: 'http://pse990813.dothome.co.kr/greekday/greekday_cart_table_insert.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            if(res.status === 200){
                if(res.data === 1){
                    console.log(res.data);
                }
            }
        })
        .then(()=>{
            cartDBSelect(selector.signIn.logInInfo.id)
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    // 데이터베이스 장바구니 목록 조회 함수
    const cartDBSelect=()=>{
        let formData = new FormData();
        formData.append('userId', selector.signIn.logInInfo.id);
        axios({
            url: 'http://pse990813.dothome.co.kr/greekday/greekday_cart_table_select.php',
            method: 'POST',
            data: formData
        })
        .then((res)=>{
            if(res.status === 200){
                if(res.data !== null){                    
                    localStorage.setItem('GREEKDAY_CART_PRODUCT', JSON.stringify(res.data));
                    dispatch(cartMethod(res.data));
                }
                else{
                    localStorage.setItem('GREEKDAY_CART_PRODUCT', JSON.stringify([]));
                    dispatch(cartMethod([]));
                }
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    React.useEffect(()=>{
        if(selector.signIn.logInInfo !== null){
            if(localStorage.getItem('SET_DB_CART') === null){
                if(cart.length > 0){
                    localStorage.setItem('SET_DB_CART', 'ok');
                    cart.map((item, idx)=>{
                        cartDBSave(item, idx);
                    })
                }
            }
        }
    },[cart])

    return (
        <div id="wrap">
            <TopModalComponent />  
            <BrowserRouter basename={process.env.PUBLIC_URL}>
                <Routes>
                    <Route path="/" element={<HeaderComponent />}>                    
                        <Route index element={ <MainComponent /> } />                        
                        <Route path="/index" element={ <MainComponent /> } />                        
                        <Route path="/sub1" element={<Sub1Component />} />              
                        <Route path="/sub2" element={<Sub2Component />} />              
                        <Route path="/sub3" element={<Sub3Component />} />              
                        <Route path="/sub4" element={<Sub4Component />} />    
                        <Route path="/sub5" element={<Sub5Component />} />    
                        <Route path="/sub6" element={<Sub6Component />} />    
                        <Route path="/sub7" element={<Sub7Component />} />    
                        <Route path="/sub8SignUp" element={<Sub8SignUpComponent />} />    
                        <Route path="/sub8SignUpMobileCheck" element={<Sub8SignUpMobileCheckComponent />} />    
                        <Route path="/sub8SignUpComplete" element={<Sub8SignUpCompleteComponent />} />    
                        <Route path="/sub9SignIn" element={<Sub9SignInComponent />} />    
                        <Route path="/sub9IdSearch" element={<Sub9SignInIdSearchComponent />} />    
                        <Route path="/sub9IdSearchResult" element={<Sub9IdSearchResultComponent />} />    
                        <Route path="/sub9PwSearch" element={<Sub9SignInPwSearchComponent />} />    
                        <Route path="/sub9PwReset" element={<Sub9SignInPwResetComponent />} />                            
                        <Route path="/sub10MyPage" element={<Sub10MyPageComponent />} />                            
                        <Route path="/sub10MemberManage" element={<Sub10ChildMemberManageComponent />} />                            
                        <Route path="/sub10MemberManageUpdate" element={<Sub10ChildMemberManageUpdateComponent />} />                            
                        <Route path="/sub10ViewProduct" element={<Sub10ChildViewProductComponent />} />                            
                        <Route path="/productView" element={<ProductViewComponent />} />                            
                        <Route path="/cart" element={<CartComponent />} />                            
                        <Route path="/sub9AdminIdSearch" element={<Sub9AdminSignInIdSearchComponent />} />                            
                        <Route path="/sub9AdminIdSearchResult" element={<Sub9AdminIdSearchResultComponent />} />    
                        <Route path="/sub9AdminPwSearch" element={<Sub9AdminSignInPwSearchComponent />} />    
                        <Route path="/sub9AdminPwReset" element={<Sub9AdminSignInPwResetComponent />} />                                    
                        <Route path="/sub8AdminSignUp" element={<Sub8AdminSignUpComponent />} />                                       
                        <Route path="/sub8AdminSignUpMobileCheck" element={<Sub8AdminSignUpMobileCheckComponent />} />                                           
                        <Route path="/sub9AdminSignIn" element={<Sub9AdminSignInComponent />} />  
                        <Route path="/sub9AdminMyPage" element={<Sub10AdminPageComponent />} />  
                        <Route path="/sub11Notice" element={<Sub11NoticeComponent />} />  
                        <Route path="/sub11NoticeView" element={<Sub11NoticeViewComponent />} />  
                        <Route path="/sub11NoticeInsert" element={<Sub11NoticeInsertComponent />} />  
                        <Route path="/sub11NoticeUpdate" element={<Sub11NoticeUpdateComponent />} />  
                        <Route path="/sub12FAQ" element={<Sub12FAQComponent />} />  
                        <Route path="/sub12FAQInsert" element={<Sub12FAQInsertComponent />} />  
                        <Route path="/viewProduct" element={<ViewProductComponent />} />  
                    </Route>
                </Routes>
                {
                    selector.mainModal.isMainModal &&
                    <MainModalComponent />
                }
                {
                    selector.isAddressAPIModal.isAddressAPIModal &&
                    <PostcodeComponent />
                }
                {
                    selector.confirmModal.isConfirmModal &&
                    <ConfirmModalComponent />
                }
                <GoTopComponent />
            </BrowserRouter>
        </div>
    );
};