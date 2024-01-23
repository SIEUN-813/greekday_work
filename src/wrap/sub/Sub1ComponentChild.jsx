import React from 'react';
import './scss/sub1.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { viewProduct } from '../../reducer/viewProduct';
import { viewProductIsFlag } from '../../reducer/viewProductIsFlag';

export default function Sub1ComponentChild({initState}) {

    const dispatch = useDispatch();
    const selector = useSelector((state)=>state);
    const navigate = useNavigate();

    const onClickProduct=(e, item, route)=>{
        e.preventDefault();
        let obj = {
            번호 : item.번호,
            이미지 : `${process.env.PUBLIC_URL}${route}/${item.이미지}`,
            제품명 : item.제품명,
            제품설명 : item.제품설명,
            정가 : item.정가,
            할인율 : item.할인율,
            판매가 : Math.round(item.정가 * (1- item.할인율)),
            리뷰 : item.리뷰
        }        
        dispatch(viewProduct(obj));
        navigate('/productView');
    }

    React.useEffect(()=>{
        let imsi = [];
        if(localStorage.getItem('GREEKDAY_VIEW_PRODUCT') === null){
            if(Object.keys(selector.viewProduct.current).length > 0){
                imsi = [selector.viewProduct.current];
                localStorage.setItem("GREEKDAY_VIEW_PRODUCT", JSON.stringify(imsi));
                dispatch(viewProductIsFlag(!selector.viewProductIsFlag.isFlag));  
            }
        }
        else{
            let result = JSON.parse(localStorage.getItem('GREEKDAY_VIEW_PRODUCT'));
            let filterResult = result.map((item) => (item.번호) === selector.viewProduct.current.번호 ? true : false)
            if(filterResult.includes(true) !== true){
                if(Object.keys(selector.viewProduct.current).length > 0){
                    result = [selector.viewProduct.current, ...result]; 
                    localStorage.setItem("GREEKDAY_VIEW_PRODUCT", JSON.stringify(result));
                    dispatch(viewProductIsFlag(!selector.viewProductIsFlag.isFlag));  
                }  
            }            
        }
    },[selector.viewProduct.current]);

    return (
        <div>
            {
                initState.isTab1 &&                    
                <ul>     
                    {
                        initState.product.length > 0 &&
                        (
                            initState.product.map((item, idx)=>{      
                                return(                                                              
                                    <li className={`list list${idx+1}`} onClick={(e)=>onClickProduct(e, item, './images/sub/sub1/')}>
                                        <div className="img-box">
                                            <a href="!#">
                                                <img src={`./images/sub/sub1/${item.이미지}`} alt="" />
                                            </a>
                                        </div>
                                        <div className="txt-box">
                                            <div className="review"><span>{item.리뷰}</span></div>
                                            <h3>{item.제품명}</h3>
                                            <p>{item.제품설명}</p>
                                            <div className="price"> 
                                                {
                                                    item.할인율 !== 0 &&                                                
                                                    <h4>{Math.round(item.할인율 * 100)}%</h4>
                                                }
                                                <h5 className={item.할인율 === 0 ? 'on' : ''}>{Math.round(item.정가 * (1 - item.할인율)).toLocaleString('ko-KR')}원</h5>
                                                {   
                                                    item.할인율 !== 0 &&
                                                    <h6>{item.정가.toLocaleString('ko-KR')}원</h6>
                                                }
                                            </div>
                                        </div>
                                    </li>     
                                )
                            })
                        )
                    }  
                </ul>
            }
            {
                initState.isTab2 &&       
                <ul>     
                    {
                        initState.product2.length > 0 &&
                        (
                            initState.product2.map((item, idx)=>{      
                                return(                                                              
                                    <li className={`list list${idx+1}`} onClick={(e)=>onClickProduct(e, item, './images/sub/sub1/')}>
                                        <div className="img-box">
                                            <a href="!#">
                                                <img src={`./images/sub/sub1/${item.이미지}`} alt="" />
                                            </a>
                                        </div>
                                        <div className="txt-box">
                                            <div className="review"><span>{item.리뷰}</span></div>
                                            <h3>{item.제품명}</h3>
                                            <p>{item.제품설명}</p>
                                            <div className="price">                                
                                                <h4>3%</h4>
                                                <h5>10,470원</h5>
                                                <h6>10,800원</h6>
                                            </div>
                                        </div>
                                    </li>     
                                )
                            })
                        )
                    }  
                </ul>
            }
            {
                initState.isTab3 &&       
                <ul>     
                    {
                        initState.product3.length > 0 &&
                        (
                            initState.product3.map((item, idx)=>{      
                                return(                                                              
                                    <li className={`list list${idx+1}`} onClick={(e)=>onClickProduct(e, item, './images/sub/sub1/')}>
                                        <div className="img-box">
                                            <a href="!#">
                                                <img src={`./images/sub/sub1/${item.이미지}`} alt="" />
                                            </a>
                                        </div>
                                        <div className="txt-box">
                                            <div className="review"><span>{item.리뷰}</span></div>
                                            <h3>{item.제품명}</h3>
                                            <p>{item.제품설명}</p>
                                            <div className="price">                                
                                                <h4>3%</h4>
                                                <h5>10,470원</h5>
                                                <h6>10,800원</h6>
                                            </div>
                                        </div>
                                    </li>     
                                )
                            })
                        )
                    }  
                </ul>
            }
            {
                initState.isTab4 &&       
                <ul>     
                    {
                        initState.product4.length > 0 &&
                        (
                            initState.product4.map((item, idx)=>{      
                                return(                                                              
                                    <li className={`list list${idx+1}`} onClick={(e)=>onClickProduct(e, item, './images/sub/sub1/')}>
                                        <div className="img-box">
                                            <a href="!#">
                                                <img src={`./images/sub/sub1/${item.이미지}`} alt="" />
                                            </a>
                                        </div>
                                        <div className="txt-box">
                                            <div className="review"><span>{item.리뷰}</span></div>
                                            <h3>{item.제품명}</h3>
                                            <p>{item.제품설명}</p>
                                            <div className="price">                                
                                                <h4>3%</h4>
                                                <h5>10,470원</h5>
                                                <h6>10,800원</h6>
                                            </div>
                                        </div>
                                    </li>     
                                )
                            })
                        )
                    }  
                </ul>
            }
            {
                initState.isTab5 &&       
                <ul>     
                    {
                        initState.product5.length > 0 &&
                        (
                            initState.product5.map((item, idx)=>{      
                                return(                                                              
                                    <li className={`list list${idx+1}`} onClick={(e)=>onClickProduct(e, item, './images/sub/sub1/')}>
                                        <div className="img-box">
                                            <a href="!#">
                                                <img src={`./images/sub/sub1/${item.이미지}`} alt="" />
                                            </a>
                                        </div>
                                        <div className="txt-box">
                                            <div className="review"><span>{item.리뷰}</span></div>
                                            <h3>{item.제품명}</h3>
                                            <p>{item.제품설명}</p>
                                            <div className="price">                                
                                                <h4>3%</h4>
                                                <h5>10,470원</h5>
                                                <h6>10,800원</h6>
                                            </div>
                                        </div>
                                    </li>     
                                )
                            })
                        )
                    }  
                </ul>
            }
            {
                initState.isTab6 &&       
                <ul>     
                    {
                        initState.product6.length > 0 &&
                        (
                            initState.product6.map((item, idx)=>{      
                                return(                                                              
                                    <li className={`list list${idx+1}`} onClick={(e)=>onClickProduct(e, item, './images/sub/sub1/')}>
                                        <div className="img-box">
                                            <a href="!#">
                                                <img src={`./images/sub/sub1/${item.이미지}`} alt="" />
                                            </a>
                                        </div>
                                        <div className="txt-box">
                                            <div className="review"><span>{item.리뷰}</span></div>
                                            <h3>{item.제품명}</h3>
                                            <p>{item.제품설명}</p>
                                            <div className="price">                                
                                                <h4>3%</h4>
                                                <h5>10,470원</h5>
                                                <h6>10,800원</h6>
                                            </div>
                                        </div>
                                    </li>     
                                )
                            })
                        )
                    }  
                </ul>
            }
            {
                initState.isTab7 &&       
                <ul>     
                    {
                        initState.product7.length > 0 &&
                        (
                            initState.product7.map((item, idx)=>{      
                                return(                                                              
                                    <li className={`list list${idx+1}`} onClick={(e)=>onClickProduct(e, item, './images/sub/sub1/')}>
                                        <div className="img-box">
                                            <a href="!#">
                                                <img src={`./images/sub/sub1/${item.이미지}`} alt="" />
                                            </a>
                                        </div>
                                        <div className="txt-box">
                                            <div className="review"><span>{item.리뷰}</span></div>
                                            <h3>{item.제품명}</h3>
                                            <p>{item.제품설명}</p>
                                            <div className="price">                                
                                                <h4>3%</h4>
                                                <h5>10,470원</h5>
                                                <h6>10,800원</h6>
                                            </div>
                                        </div>
                                    </li>     
                                )
                            })
                        )
                    }  
                </ul>
            }
        </div>
    );
};