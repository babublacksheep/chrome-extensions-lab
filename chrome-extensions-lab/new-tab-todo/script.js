document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById('add-task-btn');
  const newTaskInput = document.getElementById('new-task');
  const taskList = document.getElementById('task-list');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  renderTasks();

  addBtn.addEventListener('click', () => {
    const taskText = newTaskInput.value.trim();
    if (taskText !== "") {
      tasks.unshift({ text: taskText, done: false });
      localStorage.setItem('tasks', JSON.stringify(tasks));
      newTaskInput.value = "";
      renderTasks();
    }
  });

  function renderTasks() {
    taskList.innerHTML = "";

    // Sort: incomplete on top, completed at bottom
    const incompleteTasks = tasks.filter(t => !t.done);
    const completedTasks = tasks.filter(t => t.done);
    const sortedTasks = [...incompleteTasks, ...completedTasks];

    sortedTasks.forEach((task) => {
      const li = document.createElement('li');
      const checkbox = document.createElement('input');
      const label = document.createElement('span');

      checkbox.type = 'checkbox';
      checkbox.checked = task.done;
      label.textContent = task.text;

      if (task.done) {
        li.classList.add('done');
      }

      checkbox.addEventListener('change', () => {
        // Find the matching task in the original array
        const indexInOriginal = tasks.findIndex(t =>
          t.text === task.text && t.done === task.done
        );
        if (indexInOriginal !== -1) {
          tasks[indexInOriginal].done = checkbox.checked;
          localStorage.setItem('tasks', JSON.stringify(tasks));
          renderTasks();
        }
      });

      li.appendChild(checkbox);
      li.appendChild(label);
      taskList.appendChild(li);
    });
  }
});