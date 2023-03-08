import { _decorator, Component, Node } from 'cc';
import { Constant } from '../framework/Constant';
const { ccclass, property } = _decorator;

const OUTOFBOUNCE = 50;

@ccclass('EnemyPlane')
export class EnemyPlane extends Component {
    @property
    public enemySpeed = 0;

    public enemyType = Constant.PlaneType.TYPE1;

    start() {

    }

    update(deltaTime: number) {
        const pos = this.node.position;
        const moved = pos.z + this.enemySpeed;
        this.node.setPosition(pos.x, pos.y, moved)
        if (moved > OUTOFBOUNCE) {
            this.node.destroy();
        }
    }

    public show(speed: number) {
        this.enemySpeed = speed;
    }
}

