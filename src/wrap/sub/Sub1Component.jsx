import React from 'react';
import axios from 'axios';
import './scss/sub1.scss'
import Sub1ComponentChild from './Sub1ComponentChild';

export default function Sub1Component() {

    const [state, setState] = React.useState({
        isTab1: true,
        isTab2: false,
        isTab3: false,
        isTab4: false,
        isTab5: false,
        isTab6: false,
        isTab7: false,
        product: [],
        product2: [],
        product3: [],
        product4: [],
        product5: [],
        product6: [],
        product7: [],
    })
    const onClickTab=(e, parameter)=>{
        e.preventDefault();
        let isTab1 = state.isTab1;
        let isTab2 = state.isTab2;
        let isTab3 = state.isTab3;
        let isTab4 = state.isTab4;        
        let isTab5 = state.isTab5;        
        let isTab6 = state.isTab6;        
        let isTab7 = state.isTab7;        
        if(parameter === 'tab1'){
            isTab1 = true;
            isTab2 = false;
            isTab3 = false;
            isTab4 = false;
            isTab5 = false;
            isTab6 = false;
            isTab7 = false;
        }
        else if(parameter === 'tab2'){
            isTab1 = false;
            isTab2 = true;
            isTab3 = false;
            isTab4 = false;
            isTab5 = false;
            isTab6 = false;
            isTab7 = false;
        }
        else if(parameter === 'tab3'){
            isTab1 = false;
            isTab2 = false;
            isTab3 = true;
            isTab4 = false;
            isTab5 = false;
            isTab6 = false;
            isTab7 = false;
        }
        else if(parameter === 'tab4'){
            isTab1 = false;
            isTab2 = false;
            isTab3 = false;
            isTab4 = true;
            isTab5 = false;
            isTab6 = false;
            isTab7 = false;
        }
        else if(parameter === 'tab5'){
            isTab1 = false;
            isTab2 = false;
            isTab3 = false;
            isTab4 = false;
            isTab5 = true;
            isTab6 = false;
            isTab7 = false;
        }
        else if(parameter === 'tab6'){
            isTab1 = false;
            isTab2 = false;
            isTab3 = false;
            isTab4 = false;
            isTab5 = false;
            isTab6 = true;
            isTab7 = false;
        }
        else if(parameter === 'tab7'){
            isTab1 = false;
            isTab2 = false;
            isTab3 = false;
            isTab4 = false;
            isTab5 = false;
            isTab6 = false;
            isTab7 = true;
        }
        setState({
            ...state,
            isTab1: isTab1,
            isTab2: isTab2,
            isTab3: isTab3,
            isTab4: isTab4,
            isTab5: isTab5,
            isTab6: isTab6,
            isTab7: isTab7
        })
    }

    React.useEffect(()=>{       
        axios({
            url:'./data/sub/sub1.json',
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                setState({
                    ...state,
                    product: res.data.product,
                    product2: res.data.product2,
                    product3: res.data.product3,
                    product4: res.data.product4,
                    product5: res.data.product5,
                    product6: res.data.product6,
                    product7: res.data.product7
                });
            }
        })
        .catch((err)=>{
            console.log( err );
        });
    },[]);

    return (
        <div id='sub1'>    
            <div className="title-wrap">
                <ul>
                    <li className={`${state.isTab1 === true ? ' active' : ''}`} onClick={(e)=>onClickTab(e, 'tab1')}><a href="!#">전체</a></li>
                    <li className={`${state.isTab2 === true ? ' active' : ''}`} onClick={(e)=>onClickTab(e, 'tab2')}><a href="!#">요거트</a></li>
                    <li className={`${state.isTab3 === true ? ' active' : ''}`} onClick={(e)=>onClickTab(e, 'tab3')}><a href="!#">토핑</a></li>
                    <li className={`${state.isTab4 === true ? ' active' : ''}`} onClick={(e)=>onClickTab(e, 'tab4')}><a href="!#">베이커리</a></li>
                    <li className={`${state.isTab5 === true ? ' active' : ''}`} onClick={(e)=>onClickTab(e, 'tab5')}><a href="!#">세트</a></li>
                    <li className={`${state.isTab6 === true ? ' active' : ''}`} onClick={(e)=>onClickTab(e, 'tab6')}><a href="!#">굿즈</a></li>
                    <li className={`${state.isTab7 === true ? ' active' : ''}`} onClick={(e)=>onClickTab(e, 'tab7')}><a href="!#">정기배송</a></li>
                </ul>
                <span><a href="!#">전체보기</a></span>
            </div>
            <div className="product-list">
                <Sub1ComponentChild initState={state} />
            </div>
        </div>
    );
};
