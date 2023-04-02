const iEngine = Matter.Engine.create();
const iRunner = Matter.Runner.create();
// 创建一个渲染器
const iRender = Matter.Render.create({
    element: document.body,
    engine: iEngine,
    options: {
        width: innerWidth,
        height: innerHeight,
        wireframes: false,
        background: "#FF000000"
    }
});
// 创建一个矩形边界
const bounds = {
    x: innerWidth / 2,
    y: innerHeight / 2,
    w: innerWidth,
    h: innerHeight
};
const t = 50;
const walls = [
    // 上边界
    Matter.Bodies.rectangle(bounds.x, bounds.y - bounds.h / 2 - t / 2, bounds.w + t * 2, t, { isStatic: true, render: { visible: false } }),
    // 下边界
    Matter.Bodies.rectangle(bounds.x, bounds.y + bounds.h / 2 + t / 2, bounds.w + t * 2, t, { isStatic: true, render: { visible: false } }),
    // 左边界
    Matter.Bodies.rectangle(bounds.x - bounds.w / 2 - t / 2, bounds.y, t, bounds.h + t * 2, { isStatic: true, render: { visible: false } }),
    // 右边界
    Matter.Bodies.rectangle(bounds.x + bounds.w / 2 + t / 2, bounds.y, t, bounds.h + t * 2, { isStatic: true, render: { visible: false } })
];
const kemoA = Matter.Bodies.circle(innerWidth * 0.8, 100, 50, {
    density: .5,
    restitution: 1.5,
    render: { sprite: { texture: 'img/kemoA.png' } }
})
const kemoB = Matter.Bodies.circle(innerWidth * 0.2, 100, 50, {
    density: .5,
    restitution: 1.2,
    render: { sprite: { texture: 'img/kemoB.png' } }
})
const kemoC = Matter.Bodies.circle(innerWidth * 0.4, 100, 50, {
    density: .5,
    restitution: 1.2,
    render: { sprite: { texture: 'img/kemoC.png' } }
})
const kemoD = Matter.Bodies.circle(innerWidth * 0.6, 100, 100, {
    density: .5,
    restitution: 1.2,
    render: { sprite: { texture: 'img/kemoD.png' } }
})
const mouse = Matter.Mouse.create(iRender.canvas);
const mouseConstraint = Matter.MouseConstraint.create(iEngine, {
    mouse: mouse,
    constraint: {
        stiffness: 0.2,
        render: {
            visible: false
        }
    }
})
iRender.mouse = mouse;
Matter.Composite.add(iEngine.world, walls);
Matter.Composite.add(iEngine.world, mouseConstraint);
Matter.Composite.add(iEngine.world, [kemoA, kemoB, kemoC, kemoD]);
Matter.Render.run(iRender);
Matter.Runner.run(iRunner, iEngine);