function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.messages = [];
        this.functions = [
            'Math.sin(x)',
            'Math.cos(x) * x',
            'x * x', 'x * (x + x)',
            'x - Math.sin(x) * x',
            'x * x + Math.sin(x) * x * x',
            '4 * x - Math.sin(x) * x',
            'x * x * x'
        ];
        this.state = {
            a: '-5',
            b: '5',
            f: 'Math.sin(x)',
            canvasWidth: 920,
            canvasHeight: 600,
            renderedMessages: []
        };

        this.draw = this.draw.bind(this);
        this.handleChangeA = this.handleChangeA.bind(this);
        this.handleChangeB = this.handleChangeB.bind(this);
        this.handleChangeF = this.handleChangeF.bind(this);
        this.renderMessages = this.renderMessages.bind(this);
        this.createMessage = this.createMessage.bind(this);
        this.generateRandomValues = this.generateRandomValues.bind(this);
    }

    generateRandomValues() {
        const b = getRandomInt(100) + 10;
        const a = -getRandomInt(100) - 10;
        const textOfFunction = this.functions[getRandomInt(this.functions.length)];
        this.setState({a: a.toString(), b: b.toString(), f: textOfFunction});
        setTimeout(this.draw);
    }

    draw() {
        // Непосредственно решение задачи
        let isHasException = false;
        const canvas = document.getElementsByClassName('canvas').item(0);
        const context = canvas.getContext('2d');

        const canvasWidth = this.state.canvasWidth;
        const canvasHeight = this.state.canvasHeight - 1;

        context.fillStyle = "black";
        context.fillRect(0, 0, canvasWidth, canvasHeight + 1);

        const a = Number.parseInt(this.state.a);
        if (Number.isNaN(a)) {
            isHasException = true;
            this.createMessage('Число "a" указано не верно');
        }

        const b = Number.parseInt(this.state.b);
        if (Number.isNaN(b)) {
            isHasException = true;
            this.createMessage('Число "b" указано не верно');
        }

        const textOfFunction = this.state.f;

        try {
            eval(textOfFunction);
            if (textOfFunction === '') {
                throw new Error();
            }
        } catch (e) {
            isHasException = true;
            this.createMessage('Функция указана неверно')
        }

        const f = function (x) {
            return eval(textOfFunction);
        };

        if (isHasException) {
            return;
        }

        if (a >= b) {
            isHasException = true;
            this.createMessage('"a" больше или равно "b"')
        }

        if (isHasException) {
            return;
        }

        let maxY = 1;
        let minY = -1;

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

        maxY += 1;
        minY -= 1;

        const xx0 = -a * canvasWidth / (b - a);
        const yy0 = maxY * canvasHeight / (maxY - minY);

        context.strokeStyle = "blue";
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

        this.createMessage('График успешно построен', 0.5);
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

    createMessage(text, lifeTimeInSecounds = 3) {
        const messages = this.messages;
        messages.push(text);
        this.setState({renderedMessages: messages});

        setTimeout(() => {
            const messages = this.messages;
            const indexOfMessage = messages.indexOf(text);
            messages.splice(indexOfMessage, 1);
            this.setState({renderedMessages: messages});
        }, lifeTimeInSecounds * 1000);
    }

    renderMessages() {
        return this.state.renderedMessages.map(m => <Message text={m} key={Math.random()}/>);
    }

    render() {
        return (
            <div className="app">
                <div className="title">Задание 1</div>
                <div className="text">a</div>
                <input type="number" name="a" value={this.state.a} onChange={this.handleChangeA}/>
                <div className="text">b</div>
                <input type="number" name="b" value={this.state.b} onChange={this.handleChangeB}/>
                <div className="text">Функция (на языке JavaScript с переменной x):</div>
                <input type="text" name="function" value={this.state.f} onChange={this.handleChangeF}/>
                <div className="buttons_list">
                    <div className="button">
                        <div className="process-button" onClick={this.draw}>Построить график</div>
                    </div>
                    <div className="button">
                        <div className="process-button" onClick={this.generateRandomValues}>Случайные значения</div>
                    </div>
                </div>
                <canvas className="canvas" height={this.state.canvasHeight} width={this.state.canvasWidth}></canvas>
                <div className="message-list">
                    {this.renderMessages()}
                </div>
            </div>
        );
    }
}

function Message(props) {
    return (
        <div className="message-list__message">
            {props.text}
        </div>
    );
}

ReactDOM.render(<App/>, document.getElementById('app'));
