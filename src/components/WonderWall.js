import React from "react";
import Matter from "matter-js";
import 'matter-attractors'

import im1 from './images/Asset-01.png'
import im2 from './images/Asset-02.png'
import im3 from './images/Asset-03.png'
import im4 from './images/Asset-04.png'
import im5 from './images/Asset-05.png'
import im6 from './images/Asset-06.png'
import im7 from './images/Asset-07.png'
import im8 from './images/Asset-08.png'
import im9 from './images/Asset-09.png'
import im10 from './images/Asset-10.png'
import im11 from './images/Asset-11.png'
import im12 from './images/Asset-12.png'
import im13 from './images/Asset-13.png'
import im14 from './images/Asset-14.png'
import im15 from './images/Asset-15.png'

const images = [im1, im2, im3, im4, im5, im6, im7, im8, im9, im10, im11, im12, im13, im14]

Matter.use('matter-attractors');

const numOfBalls = 3;

var ballsIndex = 0;
var addRectangle = true;

var width = 375;
var height = 800;


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
                width: width,
                height: height,
                wireframes: false,
                background: '#FFFFFF'
            }
        });

        const temp = function (a,b,c) {Render.bodies(a,b,c)};

        // add mouse control
        const mouseConstraint = MouseConstraint.create(engine, {body: document.body});

        var mouse = Mouse.create(render.canvas);

        var bodyToChange = attractiveBody;

        var attractiveBody = Bodies.circle(
            render.options.width / 2,
            render.options.height / 2,
            0.1,
            {
                isStatic: true,
                collisionFilter: [],
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
        for (var i = 0; i < numOfBalls; i++) {
            var ball = getBall(i)
            ballList.push(ball);
        }
        ballsIndex = numOfBalls;

        function getBall(index) {

            var rand1 = parseInt("" + (Math.random() * width));
            var rand2 = parseInt("" + (Math.random() * height));
            return Bodies.circle(rand1, rand2, 30, {
                restitution: 0.1,
                inertia: Infinity,
                render: {
                    sprite: {
                        texture: images[index],
                        xScale: 0.1,
                        yScale: 0.1
                    }
                }
            });
        }


        World.add(engine.world, mouseConstraint);

        var lastTimeAnim = 0, lastTimeWait = 0;
        var scaleRate = 0;

        //Events.on(engine, 'afterUpdate', function(){player.body.angle = 0;});

        Events.on(engine, 'beforeUpdate', function (event) {

            var timeScale = (event.delta || (1000 / 60)) / 1000 * 5;

            if (scaleRate > 0 || scaleRate < 0) {
                var refPos = bodyToChange.position;
                var scaling = 1 + (scaleRate * timeScale)
                Body.scale(bodyToChange, scaling, scaling);
                bodyToChange.render.sprite.xScale *= scaling;
                bodyToChange.render.sprite.yScale *= scaling;

                if ((scaleRate > 0 && bodyToChange.render.sprite.xScale >= 0.4) ||
                    (scaleRate < 0 && bodyToChange.render.sprite.xScale <= 0.1)) {

                    // stop scaling
                    scaleRate = 0;

                    // update last time
                    lastTimeAnim = engine.timing.timestamp;
                }
                bodyToChange.angle = 0;
                bodyToChange.inertia = Infinity;

                // var ctx = render.canvas.getContext("2d");
                // ctx.font = "30px Arial";
                // ctx.fillStyle = "red";
                // ctx.fillText("Hello World", refPos.x, refPos.y);
            }


        });

        Matter.Events.on(mouseConstraint, "mousedown", function (event) {
            //World.add(engine.world, Bodies.circle(100, 100, 30, {restitution: 0.7}));

            //console.log("blub", mouseConstraint.body)
            if (mouseConstraint.body) {
                //Matter.Composite.remove(engine.world, mouseConstraint.body);
                scaleRate = 1;
                setTimeout(() => {scaleRate = -1;lastTimeAnim = engine.timing.timestamp;}, 3000);
                bodyToChange = mouseConstraint.body;
            } else {
                World.add(engine.world, getBall(ballsIndex++))

            }
        });


        World.add(engine.world, attractiveBody);

        Engine.run(engine);

        Render.run(render);

        render.options.wireframes = false;
        World.add(engine.world, ballList);

        if (addRectangle){
            var rand1 = parseInt("" + (Math.random() * width));
            var rand2 = parseInt("" + (Math.random() * height));
            var rect = Bodies.rectangle(rand1, rand2, 100, 83, {
                restitution: 0.1,
                inertia: Infinity,
                render: {
                    sprite: {
                        texture: im15,
                        xScale: 0.14,
                        yScale: 0.14
                    }
                }
            });

            World.add(engine.world, rect);
        }

        Render.bodies12 = function(render, bodies, context) {
            //temp(render, bodies, context)
            var c = context,
                engine = render.engine,
                options = render.options,
                showInternalEdges = options.showInternalEdges || !options.wireframes,
                body,
                part,
                i,
                k;

            for (i = 0; i < bodies.length; i++) {
                body = bodies[i];

                if (!body.render.visible)
                    continue;

                // handle compound parts
                for (k = body.parts.length > 1 ? 1 : 0; k < body.parts.length; k++) {
                    part = body.parts[k];

                    if (!part.render.visible)
                        continue;

                    if (part.render.sprite && part.render.sprite.texture && !options.wireframes || false) {

                    } else {
                        // part polygon
                        if (part.circleRadius) {
                            c.globalAlpha = 1;
                            c.fillStyle = '#000000';
                            c.beginPath();
                            c.arc(part.position.x + 10, part.position.y + 10, part.circleRadius, 0, 2 * Math.PI);
                        }
                        c.lineWidth = 10;
                        c.strokeStyle = '#737373';
                        c.stroke();

                        c.fill();
                    }

                    c.globalAlpha = 1;
                }
            }
            //Render.oldBodies(render, bodies, context);
        };
        console.log(Render)

    }

    render() {
        return <div ref="scene"/>;
    }
}

export default Scene;