import { MeshRenderer } from 'cc';
import { Material } from 'cc';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property, executeInEditMode, menu, requireComponent } = _decorator;
//装饰器 向creator注册GameManager
@ccclass('GameManager')
//装饰器 允许creator在编辑状态下运行脚本
@executeInEditMode(true)
//装饰器 自定义组件选择器中的层级分类
@menu('自定义脚本/Manager/GameManager')
//装饰器 当前组件依赖MeshRenderer，creator中创建脚本组件时，自动生成MeshRender组件
@requireComponent(MeshRenderer)
export class GameManager extends Component {

    // 私有变量
    private _init = false
    // 公开属性
    public testp = false
    // 公开属性、并可在编辑器组件检查器面板中显示，默认值1
    @property
    public height = 1
    // 公开属性、并可在编辑器组件检查器面板中显示，接收Material类型
    @property(Material)
    public bar: Material = null

    // 继承的方法
    protected onLoad(): void {
        console.log('onLoad');

    }

    protected onEnable(): void {
        console.log('onEnable');
    }

    start() {
        console.log('start');
    }

    update(deltaTime: number) {
        if (this._init === false) {
            console.log('update');
        }
    }

    protected lateUpdate(dt: number): void {
        if (this._init === false) {
            console.log('lateUpdate');
            this._init = true
        }
    }

    protected onDestroy(): void {
        console.log('onDestroy');
    }

}

