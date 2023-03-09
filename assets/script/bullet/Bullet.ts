import { _decorator, Component, math, Node } from 'cc';
const { ccclass, property } = _decorator;

const OUTOFRANGE = 10;

@ccclass('Bullet')
export class Bullet extends Component {
    @property
    public bulletSpeed = 0;

    private _isEnemyBullet = false;

    start() {

    }

    update(deltaTime: number) {
        const pos = this.node.position;
        let moveLength = 0
        if (this._isEnemyBullet) {
            moveLength = pos.z + this.bulletSpeed;
        }
        else {
            moveLength = pos.z - this.bulletSpeed;
        }

        this.node.setPosition(pos.x, pos.y, moveLength);

        if (math.absMax(0, moveLength) > OUTOFRANGE) {
            this.node.destroy();
            console.log("bullet destroyed");

        }
    }

    show(isEnemyBullet: boolean) {
        this._isEnemyBullet = isEnemyBullet;
    }
}

