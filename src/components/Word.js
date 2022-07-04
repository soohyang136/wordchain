import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import '../App.css';

export default function Word(){    
    const [word, setWord] = useState([]);
    const [print, setPrint] = useState([]);
    const change = {
        "라":"나","락":"낙","란":"난","랄":"날",
        "람":"남","랍":"납","랏":"낫","랑":"낭",
        "략":"약","냑":"약","량":"양","냥":"양",
        "렁":"넝","려":"여","녀":"여","력":"역",
        "녁":"역","련":"연","년":"연","렬":"열",
        "녈":"열","렴":"염","념":"염","렵":"엽",
        "령":"영","녕":"영","로":"노","록":"녹",
        "론":"논","롤":"놀","롬":"놈","롭":"놉",
        "롯":"놋","롱":"농","뢰":"뇌","료":"요",
        "뇨":"요","룡":"용","뇽":"용","루":"누",
        "룩":"눅","룬":"눈","룰":"눌","룸":"눔",
        "룻":"눗","룽":"눙","류":"유","뉴":"유",
        "륙":"육","뉵":"육","륜":"윤","률":"율",
        "륭":"융","르":"느","륵":"늑","른":"는",
        "를":"늘","름":"늠","릅":"늡","릇":"늣",
        "릉":"능","래":"내","랙":"낵","랜":"낸",
        "랠":"낼","램":"냄","랩":"냅","랫":"냇",
        "랭":"냉","례":"예","녜":"예","리":"이",
        "니":"이","린":"인","닌":"인","릴":"일",
        "닐":"일","림":"임","님":"임","립":"입",
        "닙":"입","릿":"잇","닛":"잇","링":"잉",
        "닝":"잉"
    }
    const inputRef = useRef(null);
    function rem(arr){
        arr.pop();
        return arr;
    }

    useEffect(() => {
         async function fetchData(){
            const response = await axios.get("https://opendict.korean.go.kr/api/search?certkey_no=4082&key=7C0D6B2BE5A04149309C92F60A3564B7&target_type=search&req_type=json&part=word&q="+ word[word.length - 1] + "&sort=popular&start=1&num=10&advanced=y&pos=1");
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
            console.log(change[lastspelling]);
            if(lastspelling === e.target.value[0] || change[lastspelling] !== ""){
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
                        <div className='print' key={index}>
                            <h2 >{w.wording}</h2>
                            <h4 >{w.define}</h4>
                        </div>
                    )
                })
                }
            </div>
        </>
    )
}