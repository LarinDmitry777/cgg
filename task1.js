class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            a: '-5',
            b: '5',
            f: 'Math.sin(x)',
            canvasWidth: 920,
            canvasHeight: 600
        };

        this.draw = this.draw.bind(this);
        this.handleChangeA = this.handleChangeA.bind(this);
        this.handleChangeB = this.handleChangeB.bind(this);
        this.handleChangeF = this.handleChangeF.bind(this);
    }

    draw() {
        const canvas = document.getElementsByClassName('canvas').item(0);
        const context = canvas.getContext('2d');
        const state = this.state;

        const canvasWidth = this.state.canvasWidth;
        const canvasHeight = this.state.canvasHeight - 1;

        context.fillStyle = "black";
        context.fillRect(0, 0, canvasWidth, canvasHeight);

        const a = +this.state.a;
        const b = +this.state.b;
        const fun = this.state.f;
        const f = function (x) {
            return eval(fun);
        };

        let maxY = -Number.MAX_VALUE;
        let minY = Number.MAX_VALUE;

        for (let xx = 0; xx < canvasWidth; xx++) {
            const x = a + xx * (b - a) / canvasWidth;
            const y = f(x);

            if (y > maxY) {
                maxY = y;
            }
            if (y < minY) {
                minY = y;
            }
        }

        console.log(maxY, minY);

        const xx0 = -a * canvasWidth / (b - a);
        const yy0 = maxY * canvasHeight / (maxY - minY);

        context.strokeStyle = "red";
        context.beginPath();
        context.moveTo(xx0, 0);
        context.lineTo(xx0, canvasHeight);
        context.stroke();

        context.beginPath();
        context.moveTo(0, yy0);
        context.lineTo(canvasWidth, yy0);
        context.stroke();


        const points = [];

        for (let xx = 0; xx < canvasWidth; xx++) {
            const x = a + xx * (b - a) / canvasWidth;
            const y = f(x);
            const yy = canvasHeight - canvasHeight / (maxY - minY) * (y - minY);
            points.push({x: xx, y: yy});
        }

        context.strokeStyle = "white";
        context.beginPath();
        context.moveTo(points[0].x, points[0].y);
        points.forEach(p => context.lineTo(p.x, p.y));
        context.stroke();

        console.log('here')
    }

    handleChangeA(event) {
        this.setState({a: event.target.value});
    }

    handleChangeB(event) {
        this.setState({b: event.target.value});
    }

    handleChangeF(event) {
        this.setState({f: event.target.value});
    }

    render() {
        return (
            <div className="app">
                <div className="title">Задание 1</div>
                <div className="text">a</div>
                <input type="number" name="a" value={this.state.a} onChange={this.handleChangeA}/>
                <div className="text">b</div>
                <input type="number" name="b" value={this.state.b} onChange={this.handleChangeB}/>
                <div className="text">Функция:</div>
                <input type="text" name="function" value={this.state.f} onChange={this.handleChangeF}/>
                <div className="button">
                    <div className="button__draw" onClick={this.draw}>Построить график</div>
                </div>
                <canvas className="canvas" height={this.state.canvasHeight} width={this.state.canvasWidth}></canvas>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));



