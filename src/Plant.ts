
import Vector from './Vector'
import Enviroment from './Enviroment'
import * as dibujo from './dibujo/index'

export default class Plant {
  public position   : Vector
  public enviroment : Enviroment
  public size       : number = 1
  public maxSize    : number = 5
  public circle

  constructor (position?) {
    if (position) {
      this.position = position
    } else {
      this.position = Vector.randomPositive(1000, 1000)// this.enviroment.world.maxPositionX, this.enviroment.world.maxPositionY)
    }

    this.circle = new dibujo.Circle({
      position: this.position,
      color: 'green',
      radius: this.size
    })
  }

  update () {
    this.grow()
    if (Math.random() < 0.0005) this.haveChild()
    if (this.size > this.maxSize) {
      this.haveChild()
      this.haveChild()
      this.dead()
    }
    this.circle.radius = this.size
  }

  dead () {
    this.enviroment.world.remove(this)
  }

  grow () {
    this.size += 0.0025
  }

  haveChild () {
    this.enviroment.world.add(
      new Plant(Vector.add(this.position, Vector.random(this.size* 5, this.size * 5)))
    )
  }
}
