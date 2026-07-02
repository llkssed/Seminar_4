import { useState, useRef, useEffect, useCallback } from 'react';
import './App.css';

function useConsole() {
  const [lines, setLines] = useState([]);
  const log = useCallback((msg) => {
    setLines((prev) => [...prev, { t: 'log', msg }].slice(-40));
  }, []);
  return { lines, log };
}

function ConsolePanel({ lines }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
  }, [lines]);
  return (
    <div className="console-panel">
      <div className="console-head">
        <span className="console-title">Console</span>
      </div>
      <div className="console-body" ref={ref}>
        {lines.map((l, i) => (
          <div key={i} className={`console-line ${l.t === 'sys' ? 'sys' : ''}`}>
            <span className="chev">{l.t === 'sys' ? '·' : '›'}</span>
            {l.msg}
          </div>
        ))}
      </div>
    </div>
  );
}

function CodeBlock({ code }) {
  return (
    <pre className="code">
      <code>{code}</code>
    </pre>
  );
}

function Section({ n, title, subtitle, children }) {
  return (
    <section className="section">
      <div className="section-head">
        <span className="section-n">{n}</span>
        <div>
          <h2>{title}</h2>
          {subtitle && <p className="section-sub">{subtitle}</p>}
        </div>
      </div>
      <div className="section-body">{children}</div>
    </section>
  );
}

function VariablesDemo({ log }) {
  const run = () => {
    let message = 'Привет, мир!';
    const pi = 3.14;
    var count = 10;
    log(`${message}`);
    log(`${pi}`);
    log(`${count}`);
  };
  return (
    <div className="demo-grid">
      <CodeBlock
        code={`let message = "Привет, мир!";\nconst pi = 3.14;\nvar count = 10;\nconsole.log(message, pi, count);`}
      />
      <div className="demo-panel">
        <button className="btn" onClick={run}>
          Выполнить
        </button>
      </div>
    </div>
  );
}

function FunctionsDemo({ log }) {
  const [name, setName] = useState('Андрей');
  const run = () => {
    function greet(n) {
      return `Привет, ${n}!`;
    }
    log(greet(name || 'гость'));
  };
  return (
    <div className="demo-grid">
      <CodeBlock
        code={`function greet(name) {\n  return \`Привет, \${name}!\`;\n}\nconsole.log(greet("${
          name || 'гость'
        }"));`}
      />
      <div className="demo-panel">
        <input
          className="text-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Введите имя"
        />
        <button className="btn" onClick={run}>
          Вызвать
        </button>
      </div>
    </div>
  );
}

function ConditionalsDemo({ log }) {
  const [age, setAge] = useState(18);
  const run = () => {
    if (age >= 18) log(`Вы совершеннолетний.`);
    else log(`Вы несовершеннолетний.`);
  };
  return (
    <div className="demo-grid">
      <CodeBlock
        code={`if (age >= 18) {\n  console.log("Вы совершеннолетний.");\n} else {\n  console.log("Вы несовершеннолетний.");\n}`}
      />
      <div className="demo-panel">
        <p className="demo-note">Введите возраст.</p>
        <input
          className="text-input"
          type="number"
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
        />
        <button className="btn" onClick={run}>
          Проверить
        </button>
      </div>
    </div>
  );
}

function LoopsDemo({ log }) {
  const run = () => {
    for (let i = 0; i < 5; i++) log(`${i}`);
  };
  return (
    <div className="demo-grid">
      <CodeBlock code={`for (let i = 0; i < 5; i++) {\n  console.log(i);\n}`} />
      <div className="demo-panel">
        <p className="demo-note">Цикл выведет числа от 0 до 4 в консоль.</p>
        <button className="btn" onClick={run}>
          Запустить
        </button>
      </div>
    </div>
  );
}

function DomDemo() {
  const [text, setText] = useState('Новый заголовок');
  return (
    <div className="demo-grid">
      <CodeBlock
        code={`let heading = document.getElementById("heading");\nheading.textContent = "${text}";`}
      />
      <div className="demo-panel">
        <p className="demo-note">DOM позволяет менять содержимое элемента на странице.</p>
        <input
          className="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Новый текст"
        />
        <div className="dom-target">{text || '—'}</div>
      </div>
    </div>
  );
}

function ButtonDemo({ log }) {
  const [active, setActive] = useState(false);
  const click = () => {
    setActive((a) => !a);
    log(`фон ${!active ? '"lightblue"' : 'сброшен'}`);
  };
  return (
    <div className="demo-grid">
      <CodeBlock
        code={`button.addEventListener("click", function() {\n  document.body.style.backgroundColor = "lightblue";\n});`}
      />
      <div className={`demo-panel colorbox ${active ? 'colorbox-active' : ''}`}>
        <p className="demo-note">Пример обработки событий.</p>
        <button className="btn" onClick={click}>
          Изменить цвет
        </button>
      </div>
    </div>
  );
}

function FormDemo({ log }) {
  const [name, setName] = useState('');
  const [output, setOutput] = useState('');
  const submit = (e) => {
    e.preventDefault();
    setOutput(`Привет, ${name || 'гость'}!`);
    log(`Привет, ${name || 'гость'}!`);
  };
  return (
    <div className="demo-grid">
      <CodeBlock
        code={`form.addEventListener("submit", function(event) {\n  event.preventDefault();\n  let name = input.value;\n  output.textContent = \`Привет, \${name}!\`;\n});`}
      />
      <div className="demo-panel">
        <p className="demo-note">Форма считает значение поля и выведет результат без перезагрузки страницы.</p>
        <form onSubmit={submit} className="inline-form">
          <input
            className="text-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите ваше имя"
          />
          <button className="btn" type="submit">
            Отправить
          </button>
        </form>
        {output && <p className="form-output">{output}</p>}
      </div>
    </div>
  );
}

function AnimationDemo({ log }) {
  const [pos, setPos] = useState(0);
  const runningRef = useRef(false);
  const start = () => {
    if (runningRef.current) return;
    runningRef.current = true;
    log('старт анимации');
    let position = 0;
    const move = () => {
      position += 3;
      setPos(position);
      if (position < 260) {
        requestAnimationFrame(move);
      } else {
        runningRef.current = false;
        log('анимация завершена');
      }
    };
    move();
  };
  return (
    <div className="demo-grid">
      <CodeBlock
        code={`function move() {\n  position += 1;\n  box.style.left = position + "px";\n  if (position < 300) requestAnimationFrame(move);\n}\nmove();`}
      />
      <div className="demo-panel">
        <p className="demo-note">
          requestAnimationFrame плавно переместит элемент.
        </p>
        <div className="track">
          <div className="box" style={{ left: pos + 'px' }}></div>
        </div>
        <button className="btn" onClick={start}>
          Запустить анимацию
        </button>
      </div>
    </div>
  );
}

function App() {
  const { lines, log } = useConsole();

  return (
    <div className="page">
      <header className="hero">
        <h1>
          JavaScript с нуля
        </h1>
      </header>

      <main className="layout">
        <div className="sections">
          <Section n="01" title="Переменные">
            <VariablesDemo log={log} />
          </Section>
          <Section n="02" title="Функции">
            <FunctionsDemo log={log} />
          </Section>
          <Section n="03" title="Условные операторы">
            <ConditionalsDemo log={log} />
          </Section>
          <Section n="04" title="Циклы">
            <LoopsDemo log={log} />
          </Section>
          <Section n="05" title="DOM">
            <DomDemo log={log} />
          </Section>
          <Section n="06" title="Обработка событий">
            <ButtonDemo log={log} />
          </Section>
          <Section n="07" title="Формы">
            <FormDemo log={log} />
          </Section>
          <Section n="08" title="Анимации">
            <AnimationDemo log={log} />
          </Section>
        </div>

        <aside className="console-rail">
          <ConsolePanel lines={lines} />
        </aside>
      </main>

    </div>
  );
}

export default App;
