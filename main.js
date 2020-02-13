const tasks = [
    {
        title: 'Задание 1',
        description: 'График функции',
        imageSrc: 'imgs/function.png',
        href: 'task1.html'
    }
];

function generateTasks() {
    return tasks
        .map(task => {
        return (
            <Task task={task} />
        )})
}

function Task(props) {
    console.log('Props');
    console.log(props);
    return (
        <a className="task" href={props.task.href}>
            <div className="task__title">{props.task.title}</div>
            <div className="task__description">{props.task.description}</div>
            <img src={props.task.imageSrc} className="task__image" alt={props.task.description} />
        </a>
    );
}

class App extends React.Component{
    render() {
        return (
            <div className="app">
                <div className="title">Задания по курсу КГГ</div>
                <div className="list">
                    {generateTasks()}
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));

console.log('render');

// const canvas = document.getElementById('canvas');
// const context = canvas.getContext('2d');
//
// context.rect(0, 0, 100, 100);
// context.stroke();