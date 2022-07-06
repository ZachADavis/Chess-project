import Click from './handleEvents/Click.js'
import mouseEnter from './handleEvents/mouseEnter.js'
import mouseLeave from './handleEvents/mouseLeave.js'

export default {
    ...Click,
    ...mouseEnter,
    ...mouseLeave,
}