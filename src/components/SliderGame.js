import React, { Image, Component } from 'react';
import {Motion, spring} from 'react-motion'
import * as _ from 'underscore'
import {CloseButton} from './CloseButton'

import Slider0 from '../sliderimages/Slider0.png'
import Slider1 from '../sliderimages/Slider1.png'
import Slider2 from '../sliderimages/Slider2.png'
import Slider3 from '../sliderimages/Slider3.png'
import Slider4 from '../sliderimages/Slider4.png'
import Slider5 from '../sliderimages/Slider5.png'
import Slider6 from '../sliderimages/Slider6.png'
import Slider7 from '../sliderimages/Slider7.png'
import Slider8 from '../sliderimages/Slider8.png'

const tilesStyle = {
    listStyle: 'none',
    margin: '0 auto',
    padding: 5,
    position: 'relative'
  }
  
  const tileStyle = {
    // backgroundColor: 'grey',
    boxShadow: 'inset 0 0 1px 0 black',
    boxSizing: 'border-box',
    display: 'block',
    padding: 6,
    position: 'absolute'
  }
  
  const holeStyle = {
    opacity: 0
  }
  
  const buttonStyle = {
    display: 'block',
    margin: '16px auto',
    padding: '8px 16px'
  }
  
  // Checks if the puzzle can be solved.
  //
  // Examples:
  //   isSolvable([3, 7, 6, 0, 5, 1, 2, 4, 8], 3, 3) // => false
  //   isSolvable([6, 4, 5, 0, 1, 2, 3, 7, 8], 3, 3) // => true
  function isSolvable (numbers, rows, cols) {
    let product = 1
    for (let i = 1, l = rows * cols - 1; i <= l; i++) {
      for (let j = i + 1, m = l + 1; j <= m; j++) {
        product *= (numbers[i - 1] - numbers[j - 1]) / (i - j)
      }
    }
    return Math.round(product) === 1
  }
  
  // Checks if the puzzle is solved.
  //
  // Examples:
  //   isSolved([6, 4, 5, 0, 1, 2, 3, 7, 8]) // => false
  //   isSolved([0, 1, 2, 3, 4, 5, 6, 7, 8]) // => true
  function isSolved (numbers) {
    for (let i = 0, l = numbers.length; i < l; i++) {
      if (numbers[i] !== i) {
        return false
      }
    }

    return true
  }
  
  // Get the linear index from a row/col pair.
  function getLinearPosition ({row, col}, rows, cols) {
    return parseInt(row, 10) * cols + parseInt(col, 10)
  }
  
  // Get the row/col pair from a linear index.
  function getMatrixPosition (index, rows, cols) {
    return {
      row: Math.floor(index / cols),
      col: index % cols
    }
  }
  
  function getVisualPosition ({row, col}, width, height) {
    return {
      x: col * width,
      y: row * height
    }
  }
  
  function shuffle (numbers, hole, rows, cols) {
    do {
      numbers = _.shuffle(_.without(numbers, hole)).concat(hole)
    } while (isSolved(numbers) || !isSolvable(numbers, rows, cols))
    return numbers
  }
  
  function canSwap (src, dest, rows, cols) {
    const {row: srcRow, col: srcCol} = getMatrixPosition(src, rows, cols)
    const {row: destRow, col: destCol} = getMatrixPosition(dest, rows, cols)
    return (Math.abs(srcRow - destRow) + Math.abs(srcCol - destCol) === 1)
  }
  
  function swap (numbers, src, dest) {
    numbers = _.clone(numbers);
    [numbers[src], numbers[dest]] = [numbers[dest], numbers[src]]
    return numbers
  }
  
  class Tile extends Component {
    constructor () {
      super()
      
      this.handleClick = this.handleClick.bind(this)
    }
    
    handleClick () {
      const {index} = this.props
      this.props.onClick(index)
    }
    
    render () {
      const {hole, number, index, rows, cols, width, height} = this.props
      const matrixPos = getMatrixPosition(index, rows, cols)
      const visualPos = getVisualPosition(matrixPos, width, height)
      const motionStyle = {
        translateX: spring(visualPos.x),
        translateY: spring(visualPos.y)
      }
      const style = {
        ...tileStyle,
        ...(number === hole ? holeStyle : {}),
        width,
        height
          }
      
    const ImgSrcArray = [Slider0, Slider1, Slider2, Slider3, Slider4, Slider5, Slider6, Slider7, Slider8]
      return (
        <Motion style={motionStyle}>
          {({translateX, translateY}) => (
            <li style={{...style, transform: `translate3d(${translateX}px, ${translateY}px, 0)`}}
              onClick={this.handleClick}
              >
              <img src={ImgSrcArray[number]} className="tile-image" alt="tile-piece" />
              <p className="tile-number">{number+1}</p>
            </li>
          )}
        </Motion>
      )
    }
  }
  
  class Tiles extends Component {
    constructor (props) {
      super(props)
      
      const {rows, cols} = props
      this.state = {
        numbers: _.range(0, rows * cols), 
        solved: false, 
      }
      

      this.handleTileClick = this.handleTileClick.bind(this)
      this.handleButtonClick = this.handleButtonClick.bind(this)
    }
    

    handleTileClick (index) {
      this.swap(index)
    }
    
    handleButtonClick () {
      this.shuffle()
    }
    
    shuffle () {
      const {hole, rows, cols} = this.props
      const {numbers} = this.state
      const shuffledNumbers = shuffle(numbers, hole, rows, cols)
      this.setState({numbers: shuffledNumbers})
    }
    
    swap (tileIndex) {
      const {hole, rows, cols} = this.props
      const {numbers} = this.state
      const holeIndex = numbers.indexOf(hole)
      if (canSwap(tileIndex, holeIndex, rows, cols)) {
        const newNumbers = swap(numbers, tileIndex, holeIndex)
        this.setState({numbers: newNumbers})
      }
    }
    
    render () {
      const {rows, cols, width, height} = this.props
      const {numbers} = this.state
      const solved = isSolved(numbers)
      const pieceWidth = Math.round(width / cols)
      const pieceHeight = Math.round(height / rows)
      const style = {
        ...tilesStyle,
        width,
        height
      }
      
      return (
        <div>
          {solved ? 
            <CloseButton closeBox={this.props.closeBox} className="slider-game-btn"/> 
            : null
            }
          <ul style={style}>
            {numbers.map((number, index) => (
              <Tile {...this.props} index={index} number={number} key={number}
                width={pieceWidth} height={pieceHeight}
                onClick={this.handleTileClick}
              />
            ))}
          </ul>
          <button style={buttonStyle}
            onClick={this.handleButtonClick}
          >
            {solved ? 'Start' : 'Restart'}
          </button>
          
        </div>
      )
    }
  }
  
  export default class SliderGame extends Component {
    render () {
      return (
        <Tiles rows={3} cols={3} hole={8}
          width={300} height={300} closeBox={this.props.closeBox}
        />
      )
    }
  }