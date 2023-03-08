import { Constant } from './Constant';
import { Bullet } from './../bullet/Bullet';
import { _decorator, Component, instantiate, math, Node, Prefab } from 'cc';
import { EnemyPlane } from '../plane/EnemyPlane';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Node)
    public playerPlane: Node = null;
    // 敌机预置
    @property(Prefab)
    public enemyPlane01: Prefab = null;
    @property(Prefab)
    public enemyPlane02: Prefab = null;

    // 子弹预置
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

    // 子弹挂载的节点
    @property(Node)
    public bulletRoot: Node = null;

    // 敌机其他参数
    @property
    public createEnemyTime = 1;
    @property
    public enemy1Speed = 0.005;
    @property
    public enemy2Speed = 0.007;


    // 子弹其他参数
    @property
    public shootTime = 0.3;
    @property
    public bulletSpeed = 0.1;


    private _curShootTime = 0;
    private _isShooting = false;
    private _currCreateEnemyTime = 0;
    private _combinationInterval = 1;

    start() {
        this._init();
    }

    update(deltaTime: number) {
        this._curShootTime += deltaTime;
        if (this._isShooting && this._curShootTime > this.shootTime) {
            this.createPlayerBullet();
            this._curShootTime = 0;
        }

        if (this._combinationInterval === Constant.Combination.PLAN1) {
            this._currCreateEnemyTime += deltaTime;
            if (this._currCreateEnemyTime > this.createEnemyTime) {
                this.createEnemyPlane();
                this._currCreateEnemyTime = 0;
            }
        }
        else if (this._combinationInterval === Constant.Combination.PLAN2) {

        }
        else {

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

    public createEnemyPlane() {
        const whichEnemy = math.randomRangeInt(1,3);
        let prefab: Prefab = null;
        let speed = 0;
        if (whichEnemy === Constant.PlaneType.TYPE1) {
            prefab = this.enemyPlane01;
            speed = this.enemy1Speed;
        }
        else {
            prefab = this.enemyPlane02;
            speed = this.enemy2Speed;
        }

        const enemy = instantiate(prefab);
        enemy.setParent(this.node);
        const enemyComp = enemy.getComponent(EnemyPlane);
        enemyComp.show(speed);

        const randomPosX = math.randomRangeInt(-4, 4);
        enemy.setPosition(randomPosX, 0.5, -10);
    }

    public isShooting(value: boolean) {
        this._isShooting = value;
    }

    private _init() {
        this._curShootTime = this.shootTime;

        this.changePlaneModel();
    }

    private changePlaneModel() {
        this.schedule(this._modelChanged, 10, 3)
    }

    private _modelChanged() {
        this._combinationInterval ++;
    }
}

