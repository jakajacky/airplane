import { Bullet } from './../bullet/Bullet';
import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Node)
    public playerPlane: Node = null;
    @property(Prefab)
    public bullet01: Prefab = null;
    @property(Prefab)
    public bullet02: Prefab = null;
    @property(Prefab)
    public bullet03: Prefab = null;
    @property(Prefab)
    public bullet04: Prefab = null;
    @property(Prefab)
    public bullet05: Prefab = null;
    @property
    public shootTime = 0.3;
    @property
    public bulletSpeed = 0.1;

    @property(Node)
    public bulletRoot: Node = null;

    private _curShootTime = 0;
    private _isShooting = false;

    start() {
        this._init();
    }

    update(deltaTime: number) {
        this._curShootTime += deltaTime;
        if (this._isShooting && this._curShootTime > this.shootTime) {
            this.createPlayerBullet();
            this._curShootTime = 0;
        }
    }

    public createPlayerBullet() {
        const bullet = instantiate(this.bullet01);
        bullet.setParent(this.bulletRoot);
        const pos = this.playerPlane.position;
        bullet.setPosition(pos.x, pos.y+0.5, pos.z);
        const bulletComp = bullet.getComponent(Bullet)
        bulletComp.bulletSpeed = this.bulletSpeed;
    }

    public isShooting(value: boolean) {
        this._isShooting = value;
    }

    private _init() {
        this._curShootTime = this.shootTime;
    }
}

