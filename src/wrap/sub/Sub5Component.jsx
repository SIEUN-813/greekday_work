import React from 'react';
import axios from 'axios';
import './scss/sub3.scss'
import Sub5ComponentChild from './Sub5ComponentChild';

export default function Sub5Component(){
    const [state, setState] = React.useState({
        isTab1: true,
        isTab2: false,
        isTab3: false,
        all: [],
        recipe: [],
        healthy: []
    })
    const onClickTab=(e, parameter)=>{
        e.preventDefault();
        let isTab1 = state.isTab1;
        let isTab2 = state.isTab2;
        let isTab3 = state.isTab3;    
        if(parameter === 'tab1'){
            isTab1 = true;
            isTab2 = false;
            isTab3 = false;
        }
        else if(parameter === 'tab2'){
            isTab1 = false;
            isTab2 = true;
            isTab3 = false;
        }
        else if(parameter === 'tab3'){
            isTab1 = false;
            isTab2 = false;
            isTab3 = true;
        }
        setState({
            ...state,
            isTab1: isTab1,
            isTab2: isTab2,
            isTab3: isTab3
        })
    }

    React.useEffect(()=>{       
        axios({
            url:'./data/sub/sub5.json',
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                setState({
                    ...state,
                    all: res.data.all,
                    recipe: res.data.recipe,
                    healthy: res.data.healthy
                });
            }
        })
        .catch((err)=>{
            console.log( err );
        });
    },[]);

    return (
        <div id='sub3'>
            <div className="container">
                <div className="title">
                    <h2>Life</h2>
                    <div className="menu">
                        <ul>
                            <li className={`${state.isTab1 === true ? ' active' : ''}`} onClick={(e)=>onClickTab(e, 'tab1')}><a href="!#">All</a></li>
                            <li className={`${state.isTab2 === true ? ' active' : ''}`} onClick={(e)=>onClickTab(e, 'tab2')}><a href="!#">Recipe</a></li>
                            <li className={`${state.isTab3 === true ? ' active' : ''}`} onClick={(e)=>onClickTab(e, 'tab3')}><a href="!#">Healthy</a></li>
                        </ul>
                    </div>
                </div>
                <div className="event-box">
                    <Sub5ComponentChild initState={state} />
                </div>
            </div>
        </div>
    );
};
