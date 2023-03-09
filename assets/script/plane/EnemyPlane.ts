import { _decorator, Component, Node, Vec3 } from 'cc';
import { Constant } from '../framework/Constant';
import { GameManager } from '../framework/GameManager';
const { ccclass, property } = _decorator;

const OUTOFBOUNCE = 50;

@ccclass('EnemyPlane')
export class EnemyPlane extends Component {
    @property
    public enemySpeed = 0;
    @property
    public createBulletTime = 0.5;

    public enemyType = Constant.PlaneType.TYPE1;

    private _currCreateBulletTime = 0;
    private _needBullet = false;
    private _gameManager: GameManager = null;

    start() {

    }

    update(deltaTime: number) {
        const pos = this.node.position;
        const moved = pos.z + this.enemySpeed;
        this.node.setPosition(pos.x, pos.y, moved)

        if (this._needBullet) {
            this._currCreateBulletTime += deltaTime;
            if (this._currCreateBulletTime > this.createBulletTime) {
                const p = new Vec3(pos.x, pos.y, moved);
                this._gameManager.createEnemyBullet(p);
                this._currCreateBulletTime = 0;
            }
        }

        if (moved > OUTOFBOUNCE) {
            this.node.destroy();
        }
    }

    public show(gameManager: GameManager, speed: number, needBullet: boolean) {
        this.enemySpeed = speed;
        this._needBullet = needBullet;
        this._gameManager = gameManager;
    }
}

