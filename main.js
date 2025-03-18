document.addEventListener('DOMContentLoaded', () => {
    const addTodoBtn = document.getElementById('addTodoBtn');  // 「追加」ボタン
    const todoInput = document.getElementById('todoInput');  // 入力フィールド
    const todoItems = document.getElementById('todoItems');  // Todoリストの親要素

    // 追加ボタンがクリックされたとき、またはEnterキーで新しいTodoを追加
    addTodoBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTodo();
        }
    });

    // Todoを追加する関数
    function addTodo() {
        const todoText = todoInput.value.trim();  // 入力されたTodoテキスト
        if (todoText !== '') {
            // 新しいリストアイテム（li）を作成
            const li = document.createElement('li');
            li.setAttribute('draggable', 'true');  // ドラッグ可能に設定

            // AM / PM ラベルを作成（初期状態は空）
            const amPmLabel = document.createElement('span');
            amPmLabel.classList.add('am-pm-label');
            amPmLabel.textContent = '';

            // Todoのテキスト要素
            const textElement = document.createElement('span');
            textElement.classList.add('todo-text');
            textElement.textContent = todoText;

            // AM / PM ボタンを作成
            const amBtn = document.createElement('button');
            amBtn.textContent = 'AM';
            amBtn.classList.add('am-btn');
            amBtn.addEventListener('click', () => {
                toggleAmPm(amPmLabel, 'AM');
                sortTodos();  // 並べ替えを実行
            });

            const pmBtn = document.createElement('button');
            pmBtn.textContent = 'PM';
            pmBtn.classList.add('pm-btn');
            pmBtn.addEventListener('click', () => {
                toggleAmPm(amPmLabel, 'PM');
                sortTodos();  // 並べ替えを実行
            });

            // 優先度変更ボタン（赤、黄、緑）
            const redBtn = createPriorityButton('red', textElement);
            const yellowBtn = createPriorityButton('yellow', textElement);
            const greenBtn = createPriorityButton('green', textElement);

            // 削除ボタン
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Del';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', () => { li.remove();
            });

            // 項目をクリックすると取り消し線が引かれ、グレーアウト
            textElement.addEventListener('click', () => {
                textElement.classList.toggle('done');
            });

            // ボタンをまとめる div を作成
            const btnGroup = document.createElement('div');
            btnGroup.classList.add('btn-group');
            btnGroup.append(redBtn, yellowBtn, greenBtn, amBtn, pmBtn, deleteBtn);

            // リストアイテムに要素を追加
            li.append(amPmLabel, textElement, btnGroup);
            todoItems.appendChild(li);

            // 入力フィールドをクリア
            todoInput.value = '';
        }
    }

    // 優先度ボタンを作成する関数
    function createPriorityButton(color, element) {
        const btn = document.createElement('button');
        btn.classList.add('priority-btn', color);
        btn.addEventListener('click', () => togglePriority(element, `${color}-text`));
        return btn;
    }

    // 優先度を切り替える関数
    function togglePriority(element, colorClass) {
        if (element.classList.contains(colorClass)) {
            element.classList.remove(colorClass);
        } else {
            element.classList.remove('red-text', 'yellow-text', 'green-text');
            element.classList.add(colorClass);
        }
    }

    // AM / PM ラベルをトグルする関数
    function toggleAmPm(label, type) {
        if (label.textContent === type) {
            label.textContent = '';  // クリックでリセット
        } else {
            label.textContent = type;  // AM または PM をセット
        }
    }

    // Todoの並べ替えを行う関数
    function sortTodos() {
        const items = Array.from(todoItems.children);
        items.sort((a, b) => {
            const amPmA = a.querySelector('.am-pm-label').textContent;
            const amPmB = b.querySelector('.am-pm-label').textContent;

            // AMが先に来るように並べ替え
            if (amPmA === 'AM' && amPmB !== 'AM') return -1;
            if (amPmA !== 'AM' && amPmB === 'AM') return 1;
            return 0;
        });

        // 並べ替えをDOMに適用
        items.forEach(item => todoItems.appendChild(item));
    }

});
