const board = document.getElementById('boardInner');
const numContainer = document.getElementById('numberContainer');
const letterContainer = document.getElementById('letterContainer');
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
const numbers = ['1', '2', '3', '4', '5', '6', '7', '8']
const display = 'block'

const renderBoard = (useLabels) =>{
  
  if (useLabels){
    renderLabels() 
  }
  
  let change = false
  let color = 'white'
  for (let i = 0; i < 64; ++i){
    let divElement = document.createElement('div')
    divElement.className = 'square'
    change = i % 8 === 0 || i % 8 === NaN
    color = change ? color : 
    color === 'white' ? 'black' : 'white'
    divElement.style.backgroundColor = color
    board.appendChild(divElement)
    change = false
  }
}

const renderBoard1 = (useLabels) =>{
  
  if (useLabels){
    renderLabels() 
  }
 
  for (let i = 0; i < letters.length; ++i){
    let row = document.createElement('div')
    row.className = 'row'
    row.style.flexDirection = i % 2 === 0 ? '' : 'row-reverse'; 
    for (let i = 0; i < letters.length; ++i){
      let square = document.createElement('div')
      square.className = 'square'
      square.style.backgroundColor = i % 2 === 0 ? 'white' : 'black'
      row.appendChild(square)
    }
    board.appendChild(row)
  }   
 }

renderLabels = () => {
  letters.forEach((x,i)=>{
    let divElement = document.createElement('div')
    let divElement2 = document.createElement('div')
    divElement.innerText = x
    divElement.className = 'label'
    divElement2.innerText = numbers[i]
    divElement2.className = 'label'
    numContainer.appendChild(divElement2)
    letterContainer.appendChild(divElement)
  })
}

// pass true as the argument in the function below to render the labels.
renderBoard1(true)