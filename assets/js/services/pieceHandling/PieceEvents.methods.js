import Click from './handleEvents/Click.js'
import MouseEnter from './handleEvents/mouseEnter.js'
import MouseLeave from './handleEvents/mouseLeave.js'

export default {
    ...Click,
    ...mouseEnter,
    ...mouseLeave,
}