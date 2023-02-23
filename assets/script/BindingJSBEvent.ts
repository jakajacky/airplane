import { Input, NodeEventType, native } from 'cc';
import { _decorator, Component, EventTouch, Node } from 'cc';
import { NATIVE } from 'cc/env';
const { ccclass, property } = _decorator;

@ccclass('BindingJSBEvent')
export class BindingJSBEvent extends Component {
    @property(Node)
    button: Node = null;

    start() {
        this.button.setPosition(0,0.541,0)
        this.button.on(Node.EventType.TOUCH_START, (tou,s) => {
            console.log('弹出iOS原生弹窗');
            //native.bridge.sendToNative('123', '456')
            if (NATIVE) {
                console.log('弹出iOS原生弹窗');
                native.bridge.sendToNative('123', '456')
                this.button.setPosition(0,0.541,this.button.position.z + 1)
            }
        }, this)
    }

    update(deltaTime: number) {

    }

    _touchStart(touch: Touch, event: EventTouch) {
        console.log('弹出iOS原生弹窗');
    }


}

