import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import '../App.css';

export default function Word(){    
    const [word, setWord] = useState([]);
    const [print, setPrint] = useState([]);
    const inputRef = useRef(null);
    function rem(arr){
        arr.pop();
        return arr;
    }

    useEffect(() => {
         async function fetchData(){
            const response = await axios.get(process.env.REACT_APP_DB_HOST + "/api/search?certkey_no=3972&key=60C5985FAD0CE908A6FE289E8D2801F4&target_type=search&req_type=json&part=word&q="+ word[word.length - 1] + "&sort=dict&start=1&num=10&advanced=y&pos=1");
            if(response.data.channel.total === 0) {
                const arr = rem(word);
                setWord(prev => arr);
                alert("없는 단어");
            }
            else{
                setPrint(prev => [{wording : word[word.length - 1], define : response.data.channel.item[0].sense[0].definition} ,...prev]);
            }
        }
         
        if(word.length !== 0){
            fetchData();
        }
         inputRef.current.value = "";
        
    }, [word]);

    function Onclick(e){
        if(word.length === 0){
            setWord(prev => [...prev, e.target.value]);
        }
        else{
            const lastword = word[word.length - 1];
            const lastspelling = lastword.slice(-1)[0];
            if(lastspelling === e.target.value[0]){
                let flag = true;
                for(let i = 0; i < word.length; i++){
                    if(word[i] === e.target.value){
                        flag = false;
                        break;
                    }
                }
                if(flag){
                    setWord(prev => [...prev, e.target.value]);
                }
                else{
                    inputRef.current.value = "";
                    alert("사용한 단어");
                }
            }
            else{
                inputRef.current.value = "";   
                alert("실패");
            }
        }
    }

    function OnEnter(e){
        if(e.key === "Enter") {
            Onclick(e);
        }
    }
    return(
        <>
            <div onKeyPress={OnEnter}>
                <div className='submit'>
                    <input ref={inputRef} placeholder="단어입력" />
                    <button onClick={Onclick}>제출</button>
                </div>
                {print.map((w, index) => {
                    return (
                        <div className='print'>
                            <h2 key={index}>{w.wording}</h2>
                            <h4 key={index}>{w.define}</h4>
                        </div>
                    )
                })
                }
            </div>
        </>
    )
}