document.addEventListener('DOMContentLoaded', () => {
  const addBtn = document.getElementById('add-task-btn');
  const newTaskInput = document.getElementById('new-task');
  const taskList = document.getElementById('task-list');

  // Load tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  renderTasks();

  addBtn.addEventListener('click', () => {
    const taskText = newTaskInput.value.trim();
    if (taskText !== "") {
      tasks.push({ text: taskText, done: false });
      localStorage.setItem('tasks', JSON.stringify(tasks));
      newTaskInput.value = "";
      renderTasks();
    }
  });

  function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.textContent = task.text;
      if (task.done) li.classList.add('done');

      li.addEventListener('click', () => {
        tasks[index].done = !tasks[index].done;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
      });

      taskList.appendChild(li);
    });
  }
});