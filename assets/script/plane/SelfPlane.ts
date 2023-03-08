import { GameManager } from '../framework/GameManager';
import { _decorator, Component, Node, EventTouch, Touch, input, Input, Camera, geometry, PhysicsSystem, rect, Game } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SelfPlane')
export class SelfPlane extends Component {
    @property(Camera)
    readonly cameraCom: Camera = null
    @property
    public speed = 1;
    @property(Node)
    public plane: Node = null;

    @property(GameManager)
    public gameManager: GameManager = null;

    private _ray: geometry.Ray = new geometry.Ray();

    start() {
        input.on(Input.EventType.TOUCH_MOVE, this._touchMove, this);
        input.on(Input.EventType.TOUCH_START, this._touchStart, this);
        input.on(Input.EventType.TOUCH_END, this._touchEnd, this);
    }

    update(deltaTime: number) {

    }

    _planeMove(touch: Touch, event: EventTouch) {
        const delta = touch.getDelta();
        let p = this.plane.getPosition();
        this.plane.setPosition(p.x + 0.01 * this.speed * delta.x, p.y, p.z - 0.01 * this.speed * delta.y);
    }

    _touchStart(event: EventTouch) {
        const touch = event.touch;
        // 3D触摸使用射线检测
        this.cameraCom.screenPointToRay(touch.getLocationX(), touch.getLocationY(), this._ray);
        if (PhysicsSystem.instance.raycast(this._ray)) {
            const raycastResults = PhysicsSystem.instance.raycastResults;
            for (let i = 0; i < raycastResults.length; i++) {
                const item = raycastResults[i];
                if (item.collider.node == this.plane) {
                    console.log('触摸飞机!');
                    this.gameManager.isShooting(true);

                    break;
                }
            }
        }
    }

    _touchEnd(event: EventTouch) {
        const touch = event.touch;
        // 3D触摸使用射线检测
        this.cameraCom.screenPointToRay(touch.getLocationX(), touch.getLocationY(), this._ray);
        if (PhysicsSystem.instance.raycast(this._ray)) {
            const raycastResults = PhysicsSystem.instance.raycastResults;
            for (let i = 0; i < raycastResults.length; i++) {
                const item = raycastResults[i];
                if (item.collider.node == this.plane) {
                    console.log('触摸飞机!');
                    this.gameManager.isShooting(false);
                    break;
                }
            }
        }
    }

    _touchMove(event: EventTouch) {
        const touch = event.touch;
        const delta = touch.getDelta();
        // 3D触摸使用射线检测
        this.cameraCom.screenPointToRay(touch.getLocationX(), touch.getLocationY(), this._ray);
        if (PhysicsSystem.instance.raycast(this._ray)) {
            const raycastResults = PhysicsSystem.instance.raycastResults;
            for (let i = 0; i < raycastResults.length; i++) {
                const item = raycastResults[i];
                if (item.collider.node == this.plane) {
                    console.log('触摸飞机!');
                    let pos = this.plane.position;

                    this.plane.setPosition(pos.x + 0.01 * this.speed * delta.x, pos.y, pos.z - 0.01 * this.speed * delta.y);

                    break;
                }
            }
        }
    }
}

