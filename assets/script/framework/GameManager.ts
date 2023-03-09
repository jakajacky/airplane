import { Constant } from './Constant';
import { Bullet } from './../bullet/Bullet';
import { _decorator, Component, instantiate, math, Node, Prefab, Vec3 } from 'cc';
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
        // 渲染子弹
        this._curShootTime += deltaTime;
        if (this._isShooting && this._curShootTime > this.shootTime) {
            this.createPlayerBullet();
            this._curShootTime = 0;
        }

        // 渲染敌机
        this._currCreateEnemyTime += deltaTime;
        if (this._combinationInterval === Constant.Combination.PLAN1) {
            // Plan1： 单架敌机
            if (this._currCreateEnemyTime > this.createEnemyTime) {
                this.createEnemyPlane();
                this._currCreateEnemyTime = 0;
            }
        }
        else if (this._combinationInterval === Constant.Combination.PLAN2) {
            // Plan2： 单架敌机/一字敌机群
            if (this._currCreateEnemyTime > this.createEnemyTime * 1.5) {
                const randomCombination = math.randomRangeInt(1,3);
                if (randomCombination === Constant.Combination.PLAN2) {
                    // 一字敌机群
                    this.createEnemyPlane1();
                }
                else {
                    // 单架敌机
                    this.createEnemyPlane();
                }
                this._currCreateEnemyTime = 0;
            }
        }
        else {
            // Plan3： 单架敌机/一字敌机群/V字敌机群
            if (this._currCreateEnemyTime > this.createEnemyTime * 1.5) {
                const randomCombination = math.randomRangeInt(1,4);
                if (randomCombination === Constant.Combination.PLAN3) {
                    // V字敌机群
                    this.createEnemyPlane2();
                }
                else if (randomCombination === Constant.Combination.PLAN2) {
                    // 一字敌机群
                    this.createEnemyPlane1();
                }
                else {
                    // 单架敌机
                    this.createEnemyPlane();
                }
                this._currCreateEnemyTime = 0;
            }
        }

    }

    public createPlayerBullet() {
        const bullet = instantiate(this.bullet01);
        bullet.setParent(this.bulletRoot);
        const pos = this.playerPlane.position;
        bullet.setPosition(pos.x, pos.y+0.5, pos.z);
        const bulletComp = bullet.getComponent(Bullet)
        bulletComp.bulletSpeed = this.bulletSpeed;
        bulletComp.show(false);
    }

    public createEnemyBullet(bulletPos: Vec3) {
        const bullet = instantiate(this.bullet01);
        bullet.setParent(this.bulletRoot);
        const pos = bulletPos;
        bullet.setPosition(pos.x, pos.y+0.5, pos.z);
        const bulletComp = bullet.getComponent(Bullet)
        bulletComp.bulletSpeed = this.bulletSpeed;
        bulletComp.show(true);
    }

    // 创建单架飞机
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
        enemyComp.show(this, speed, true);

        const randomPosX = math.randomRangeInt(-4, 4);
        enemy.setPosition(randomPosX, 0.5, -10);
    }

    // 创建一字飞机编队
    public createEnemyPlane1() {
        const enemyArray = new Array<Node>(5);
        for (let i = 0; i < enemyArray.length; i++) {
            enemyArray[i] = instantiate(this.enemyPlane01);
            const element = enemyArray[i];
            element.setParent(this.node);

            element.setPosition(-0.9+i*0.45, 0.5, -10);
            const enemyComp = element.getComponent(EnemyPlane)
            enemyComp.show(this, this.enemy1Speed, false);
        }
    }

    // 创建V字飞机编队
    public createEnemyPlane2() {
        const enemyArray = new Array<Node>(7);

        const combinationPos = [
            -0.9, 0.5, -4.9,
            -0.6, 0.5, -4.6,
            -0.3, 0.5, -4.3,
            0, 0.5, -4,
            0.3, 0.5, -4.3,
            0.6, 0.5, -4.6,
            0.9, 0.5, -4.9,
        ];

        for (let i = 0; i < enemyArray.length; i++) {
            enemyArray[i] = instantiate(this.enemyPlane02);
            const element = enemyArray[i];
            element.setParent(this.node);
            const startIndex = i * 3;
            element.setPosition(combinationPos[startIndex], combinationPos[startIndex+1], combinationPos[startIndex+2]);
            const enemyComp = element.getComponent(EnemyPlane)
            enemyComp.show(this, this.enemy2Speed, false);
        }
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

