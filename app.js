"use strict";

const list = document.querySelector(".listTasks");
const children = list.children;

let itemsCount = 0;

document.querySelector("#inputTask").addEventListener("change", createTask);
document.querySelector(".listTasks").addEventListener("click", deleteTask);
document.querySelector(".clear").addEventListener("click", clearCompleted);
document.querySelector("#theme-toggle").addEventListener("click", changeMode);

function createTask(e) {
  e.preventDefault();

  let input = document.querySelector("input");
  if (input.value != "") {
    addTask(input.value);
  }
  input.value = "";
}

function addTask(task) {
  let li = document.createElement("li");
  li.setAttribute("draggable", "true");
  li.classList.add("drag-item");
  li.innerHTML = `<input class="checkbox" type='checkbox'/><label class="task">${task}</label><span class="delete"></span>`;
  list.appendChild(li);

  ++itemsCount;
  updateItemCount();
}

function deleteTask(e) {
  const taskElementLi = e.target.parentNode;

  if (e.target.className == "delete") {
    let parentNode = taskElementLi.parentNode;
    parentNode.removeChild(taskElementLi);
    if (!taskElementLi.classList.contains("check")) {
      --itemsCount; // Solo disminuye itemsCount si la tarea no está marcada como completada
    }
  }

  if (e.target.className == "checkbox") {
    if (e.target.checked) {
      taskElementLi.classList.add("check");
      --itemsCount;
    } else {
      taskElementLi.classList.remove("check");
      ++itemsCount;
    }
  }
  updateItemCount();
}

function clearCompleted() {
  for (var i = 0; i < children.length; i++) {
    var childChecked = children[i].classList.contains("check");

    if (childChecked) {
      list.removeChild(children[i]);
    }
  }
}

//////////////////====================== FILTERS ===============================/////////////

let filters = document.querySelectorAll(".btnFilter");

let allBtn = document.querySelector(".allTasks");
let activeBtn = document.querySelector(".activated");
let completeBtn = document.querySelector(".completed");

for (let i = 0; i < filters.length; i++) {
  document.querySelectorAll(".btnFilter")[i].addEventListener("click", () => {
    // MOSTRAR TODAS LAS TAREAS
    if (filters[i].classList.contains("allTasks")) {
      allBtn.classList.add("active");
      activeBtn.classList.remove("active");
      completeBtn.classList.remove("active");
      for (let i = 0; i < children.length; i++) {
        let childHidden = children[i].classList.contains("hideTasks");

        if (childHidden) {
          children[i].classList.remove("hideTasks");
        }
      }
    }

    // MOSTRAR TAREAS ACTIVAS/PENDIENTES
    if (filters[i].classList.contains("activated")) {
      activeBtn.classList.add("active");
      completeBtn.classList.remove("active");
      allBtn.classList.remove("active");
      for (let i = 0; i < children.length; i++) {
        children[i].classList.remove("hideTasks");
        let childChecked = children[i].classList.contains("check");
        if (childChecked) {
          children[i].classList.add("hideTasks");
        }
      }

      // MOSTRAR TAREAS COMPLETADAS
    } else if (filters[i].classList.contains("completed")) {
      completeBtn.classList.add("active");
      allBtn.classList.remove("active");
      activeBtn.classList.remove("active");
      for (let i = 0; i < children.length; i++) {
        children[i].classList.remove("hideTasks");
        let childChecked = children[i].classList.contains("check");
        if (!childChecked) {
          children[i].classList.add("hideTasks");
        }
      }
    }
  });
}

// Función para actualizar el número de elementos en el span
function updateItemCount() {
  let itemSpan = document.querySelector(".itemsLeft");
  itemSpan.textContent = itemsCount;
}

/////////////////================= Change Mode =============================//////////////////////

function changeMode() {
  document.body.classList.toggle("light-theme");
  const iconAttr = document.querySelector(".iconMode");

  if (document.body.classList.contains("light-theme")) {
    iconAttr.setAttribute("src", "images/icon-moon.svg");
  } else {
    iconAttr.setAttribute("src", "images/icon-sun.svg");
  }
}





// const list = document.querySelector(".listTasks");
// let draggedItem = null;

// // Add event listeners for drag and drop events
// list.addEventListener('dragstart', handleDragStart);
// list.addEventListener('dragover', handleDragOver);
// list.addEventListener('drop', handleDrop);

// // Drag start event handler
// function handleDragStart(event) {
//   draggedItem = event.target;
//   event.dataTransfer.effectAllowed = 'move';
//   event.dataTransfer.setData('text/html', draggedItem.innerHTML);
//   event.target.style.opacity = '0.5';
// }

// // Drag over event handler
// function handleDragOver(event) {
//   event.preventDefault();
//   event.dataTransfer.dropEffect = 'move';
//   const targetItem = event.target;
//   if (targetItem !== draggedItem && targetItem.classList.contains('drag-item')) {
//     const boundingRect = targetItem.getBoundingClientRect();
//     const offset = boundingRect.y + (boundingRect.height / 2);
//     if (event.clientY - offset > 0) {
//       targetItem.style.borderBottom = 'solid 2px #000';
//       targetItem.style.borderTop = '';
//     } else {
//       targetItem.style.borderTop = 'solid 2px #000';
//       targetItem.style.borderBottom = '';
//     }
//   }
// }

// // Drop event handler
// function handleDrop(event) {
//   event.preventDefault();
//   const targetItem = event.target;
//   if (targetItem !== draggedItem && targetItem.classList.contains('drag-item')) {
//     if (event.clientY > targetItem.getBoundingClientRect().top + (targetItem.offsetHeight / 2)) {
//       targetItem.parentNode.insertBefore(draggedItem, targetItem.nextSibling);
//     } else {
//       targetItem.parentNode.insertBefore(draggedItem, targetItem);
//     }
//   }
//   targetItem.style.borderTop = '';
//   targetItem.style.borderBottom = '';
//   draggedItem.style.opacity = '';
//   draggedItem = null;
// }