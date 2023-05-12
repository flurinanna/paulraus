import React from "react";
import Matter from "matter-js";
import 'matter-attractors'

Matter.use('matter-attractors');

class Scene extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        var Engine = Matter.Engine,
            Render = Matter.Render,
            World = Matter.World,
            Bodies = Matter.Bodies,
            Body = Matter.Body,
            Mouse = Matter.Mouse,
            Events = Matter.Events,
            Runner = Matter.Runner,
            MouseConstraint = Matter.MouseConstraint;

        var engine = Engine.create({
            // positionIterations: 20
        });

        engine.world.gravity.scale = 0;

        var render = Render.create({
            element: this.refs.scene,
            engine: engine,
            options: {
                width: 600,
                height: 600,
                wireframes: false
            }
        });

        World.add(engine.world, [
            // walls
            Bodies.rectangle(200, 0, 600, 50, {isStatic: true}),
            Bodies.rectangle(200, 600, 600, 50, {isStatic: true}),
            Bodies.rectangle(600, 300, 50, 600, {isStatic: true}),
            Bodies.rectangle(0, 300, 50, 600, {isStatic: true})
        ]);

        // add mouse control
        const mouseConstraint = Matter.MouseConstraint.create(
            engine, {element: document.body}
        );

        var mouse = Mouse.create(render.canvas);

        var bodyToChange = attractiveBody;

        Matter.Events.on(Runner, "tick", event => {
            if (mouseConstraint.body) {
                //Matter.Composite.remove(engine.world, mouseConstraint.body);
                scaleRate = 7;
                setTimeout(() => {scaleRate = -4;lastTimeAnim = engine.timing.timestamp;}, 3000);
                bodyToChange = mouseConstraint.body;
            }
        });

        var attractiveBody = Bodies.circle(
            render.options.width / 2,
            render.options.height / 2,
            1,
            {
                isStatic: true,

                plugin: {
                    attractors: [
                        function (bodyA, bodyB) {
                            return {
                                x: (bodyA.position.x - bodyB.position.x) * 1e-5,
                                y: (bodyA.position.y - bodyB.position.y) * 1e-5,
                            };
                        }
                    ]
                }
            });

        var ballList = [];
        for (var i = 0; i < 20; i++) {
            var rand1 = parseInt("" + (Math.random() * 600));
            var rand2 = parseInt("" + (Math.random() * 600));
            var ball = Bodies.circle(rand1, rand2, 30, {restitution: 0.1});
            ballList.push(ball);
        }


        World.add(engine.world, mouseConstraint);

        var lastTimeAnim = 0, lastTimeWait = 0;
        var scaleRate = 0;

        Events.on(engine, 'beforeUpdate', function (event) {
            var timeScale = (event.delta || (1000 / 60)) / 1000;

            if (scaleRate > 0 || scaleRate < 0) {
                Body.scale(bodyToChange, 1 + (scaleRate * timeScale), 1 + (scaleRate * timeScale));
            }

            if (engine.timing.timestamp - lastTimeAnim >= 300) {

                // stop scaling
                scaleRate = 0;

                // update last time
                lastTimeAnim = engine.timing.timestamp;
            }
        });

        Matter.Events.on(mouseConstraint, "mous§", function (event) {
            //World.add(engine.world, Bodies.circle(100, 100, 30, {restitution: 0.7}));

        });


        World.add(engine.world, attractiveBody);

        Engine.run(engine);

        Render.run(render);


        World.add(engine.world, ballList);
    }

    render() {
        return <div ref="scene"/>;
    }
}

export default Scene;