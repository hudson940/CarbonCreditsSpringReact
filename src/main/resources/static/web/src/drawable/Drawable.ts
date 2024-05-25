import RoughCanvas from 'roughjs'

export interface Drawable {
    /**
     * draw
     */
    draw(canvas:RoughCanvas):void
}