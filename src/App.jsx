import { useState } from 'react'
import "./App.css"

function App() {
  let [current_operand, setCurrent] = useState([]);
  let [previous_operand , setPrevious] = useState(0);
  let [render , setRender] = useState(0);
  let [operation ,setOperation] = useState("");

  let operations = new Map([
    ["AC" ,handleAllClear],
    ["DEL" ,handleDelete],
    ["+", handleOperation],
    ["-", handleOperation],
    ["*", handleOperation],
    ["÷", handleOperation],
    ["=", handleResult.bind(null,current_operand,previous_operand,operation)],
  ]);

  return (
      <div className='main-container'>

        <div className="display">
            
            <div  className="previous-operand">
              { previous_operand ? previous_operand : "" }
              {" " + operation ? operation : "" }
            </div>
            <div  className="current-operand">{
              current_operand ? current_operand : ""
            } </div>
        </div>
          <div onClick={(e) => {
            let button = e.target ; 
            
            if(button.tagName === "BUTTON" && operations.get(button.textContent)){
                let operation = button.textContent ;
                operations.get(operation)(operation);
            } else {
              
              current_operand.push(button.textContent);
              setRender(++render);
            }
            
          }}>
            
          <button className='two-span'>AC</button>
          <button>DEL</button>
          <button>÷</button>
          <button>1</button>
          <button>2</button>
          <button>3</button>
          <button>*</button>
          <button>4</button>
          <button>5</button>
          <button>6</button>
          <button>+</button>
          <button>7</button>
          <button>8</button>
          <button>9</button>
          <button>-</button>
          <button>.</button>
          <button>0</button>
          <button className="two-span">=</button>
          </div>
      </div>
  )

  function handleAllClear(){
    setCurrent([]);
    setPrevious(0);
    setOperation("");
  }

  function handleDelete(){
    current_operand.pop();
    setRender(++render);
  }

  function handleOperation(operation){
    
    setOperation(operation);

    switch(operation){
      case "+":
        
        setPrevious(Number(current_operand.join("")) + previous_operand );
        setCurrent([]);
        return;

      case "-":
        
        if (previous_operand === 0 ) setPrevious(current_operand.join("") - previous_operand );
        if (previous_operand > 0 || previous_operand < 0 ) setPrevious(previous_operand - current_operand.join(""));
        setCurrent([]);
        return;

      case "*":
        
        if (previous_operand === 0) previous_operand = 1;
        if (current_operand.length === 0) current_operand.push(1);
        setPrevious(current_operand.join("") * previous_operand);
        setCurrent([]);
        return;

      case "÷":
        
        if (previous_operand === 0) setPrevious(current_operand.join("") / 1);
        if (previous_operand) setPrevious(previous_operand / current_operand.join(""));
        setCurrent([]);
      return;
      
    }
    
    
  }
 
 function handleResult(...args){
   let [current_operand,previous_operand,operation] = args;
   setOperation("")
   setPrevious(`${previous_operand} ${operation} ${current_operand.join("")}`)
  
   switch(operation){
    case "+":
      setCurrent(Number(current_operand.join("")) + previous_operand );
      return;
    case "-":
      setCurrent(Number(previous_operand - current_operand.join("")));
      return;
    case "*":
      setCurrent(Number(current_operand.join("")) * previous_operand );
      return;
    case "÷":
      setCurrent(Number(previous_operand / current_operand.join("")));
      return;
   }

 }

}

export default App;
