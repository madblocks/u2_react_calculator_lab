import { useState } from 'react'
import Display from './Display'
import { Function, Equals } from './Function'
import NumberButtons from './NumberButtons'
import Clear from './Clear'

export default function Calc () {

    const initialState = {
        display: '',
        displayValue: '',
        decimalCount: 0,
        lastValue: '',
        lastInputWasFunction: false,
        operator: ''
    }

    const [calcState, setCalcState] = useState(initialState)

    const clearState = () => {
        setCalcState(initialState)
    }

    const inputIsValid = (input) => {
        // prevent length over limit   
        return true
    }

    const handleDisplay = (e, input) => {
        e.preventDefault()
        
        let stateCopy = {...calcState}

        // if decimal is pressed without previous number add leading 0
        if (input === '.' && stateCopy.displayValue === '') {
            stateCopy.display = 0
            stateCopy.displayValue = 0
        }

        let tmpDisplay = stateCopy.display + `${input}`
        let tmpDisplayValue = parseFloat(tmpDisplay)
        let tmpDecimalCount = stateCopy.decimalCount

        // prevent multiple decimals
        if (input === '.') {
            tmpDecimalCount = stateCopy.decimalCount + 1
        }

        if (inputIsValid(input) && tmpDecimalCount <= 1) {
            setCalcState({...stateCopy, 
                          display: tmpDisplay, 
                          displayValue: tmpDisplayValue, 
                          decimalCount: tmpDecimalCount, 
                          lastInputWasFunction: false})
        }
    }

    const doMath = () => {
        let stateCopy = {...calcState}
        let result = 0
        switch (stateCopy.operator) {
            case '+': 
                result = stateCopy.lastValue + stateCopy.displayValue
                break;
            case '-':
                result = stateCopy.lastValue - stateCopy.displayValue
                break;
            case '*':
                result = stateCopy.lastValue * stateCopy.displayValue
                break;
            case '/':
                result = stateCopy.lastValue / stateCopy.displayValue
                break;
            default:
                break;
        }
        return result
    }

    const handleFunction = (e, func) => {
        e.preventDefault()
        let stateCopy = {...calcState}
        // if last input was a number move displayValue to lastValue and clear display
        if (!stateCopy.lastInputWasFunction) {
            stateCopy.operator = func
            stateCopy.lastInputWasFunction = true
            stateCopy.lastValue = stateCopy.displayValue
            stateCopy.decimalCount = 0
            stateCopy.displayValue = ''
            stateCopy.display = ''
        } else {
            // if last input was function, switch function
            stateCopy.operator = func
            stateCopy.lastInputWasFunction = true
        }
        
        
        
        


        // if operation has already been performed the function button must calculate result.  ex. (2+2+) should result in 4
        if (stateCopy.lastValue !== '') {

        }
            

        
        setCalcState({...stateCopy})
    }

    const handleEquals = (e) => {
        e.preventDefault()
        let result = doMath()
        setCalcState({...calcState, display: result, displayValue: result})
    }

    return (
        <div className='calcContainer'>
            <Display display={calcState.display} input={calcState.input}/>
            <div className="buttonsGrid">
                <div id="span3"></div>
                
                <Clear clearState={clearState}/>
                <NumberButtons id={7} handleDisplay={handleDisplay}/>
                <NumberButtons id={8} handleDisplay={handleDisplay}/>
                <NumberButtons id={9} handleDisplay={handleDisplay}/>
                <Function id="/" handleFunction={handleFunction}/>
                <NumberButtons id={4} handleDisplay={handleDisplay}/>
                <NumberButtons id={5} handleDisplay={handleDisplay}/>
                <NumberButtons id={6} handleDisplay={handleDisplay}/>
                <Function id="*" handleFunction={handleFunction}/>
                <NumberButtons id={1} handleDisplay={handleDisplay}/>
                <NumberButtons id={2} handleDisplay={handleDisplay}/>
                <NumberButtons id={3} handleDisplay={handleDisplay}/>
                <Function id="-" handleFunction={handleFunction}/>
                <NumberButtons id={0} handleDisplay={handleDisplay}/>
                <NumberButtons id="." handleDisplay={handleDisplay}/>
                <Function id="+" handleFunction={handleFunction}/>
                <Equals handleEquals={handleEquals}/>
            </div>
        </div>
    )
}