// script.js
// Author: Sharath Babu
// Purpose: Core logic for Chrome new tab to-do list
// License: MIT License

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

    const incompleteTasks = tasks.filter(t => !t.done);
    const completedTasks = tasks.filter(t => t.done);
    const sortedTasks = [...incompleteTasks, ...completedTasks];

    sortedTasks.forEach((task) => {
      const li = document.createElement('li');
      if (task.done) li.classList.add('done');

      // Checkbox
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.done;

      checkbox.addEventListener('change', () => {
        const index = tasks.findIndex(t =>
          t.text === task.text && t.done === task.done
        );
        if (index !== -1) {
          tasks[index].done = checkbox.checked;
          localStorage.setItem('tasks', JSON.stringify(tasks));
          renderTasks();
        }
      });

      // Task text
      const label = document.createElement('span');
      label.textContent = task.text;

      // Edit button
      const editBtn = document.createElement('button');
      editBtn.textContent = "Edit";
      editBtn.style.marginLeft = "10px";

      editBtn.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = task.text;
        input.style.marginLeft = "10px";
        li.replaceChild(input, label);
        input.focus();

        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            const newText = input.value.trim();
            if (newText !== "") {
              const index = tasks.findIndex(t =>
                t.text === task.text && t.done === task.done
              );
              if (index !== -1) {
                tasks[index].text = newText;
                localStorage.setItem('tasks', JSON.stringify(tasks));
                renderTasks();
              }
            }
          }
        });
      });

      // Delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = "Delete";
      deleteBtn.style.marginLeft = "5px";

      deleteBtn.addEventListener('click', () => {
        tasks = tasks.filter(t => !(t.text === task.text && t.done === task.done));
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
      });

            // Container for task text
      const textContainer = document.createElement('div');
      textContainer.appendChild(checkbox);
      textContainer.appendChild(label);

      // Container for buttons (right aligned)
      const buttonContainer = document.createElement('div');
      buttonContainer.classList.add('task-buttons');
      buttonContainer.appendChild(editBtn);
      buttonContainer.appendChild(deleteBtn);

      // Combine both in a wrapper
      const taskWrapper = document.createElement('div');
      taskWrapper.classList.add('task-item');
      taskWrapper.appendChild(textContainer);
      taskWrapper.appendChild(buttonContainer);

      li.appendChild(taskWrapper);

      // Append li to ul
      taskList.appendChild(li);
    });
  }
});