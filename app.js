const btnSave = document.querySelector("#save");
const ulTasks = document.querySelector("#list-tasks");
const textareaDetail = document.querySelector("#task-detail");
let editMode = false;
let taskToEdit = undefined;

let btnsDelete = [];
let btnsEdit = [];

let tasksList = [
  { detail: "Correr", id: 1 },
  { detail: "Pintar", id: 2 },
  { detail: "Programar", id: 3 },
  { detail: "Salir con amigos", id: 4 },
];

const getIdTask = (btnID) => {
  return Number(btnID.split("-")[1]);
};

const generateTasks = (tasks) => {
  ulTasks.innerHTML = "";
  tasks.forEach((task) => {
    ulTasks.innerHTML += `<li>${task.detail}</li>
          <button class="btnEdit" id="btnEdit-${task.id}">Editar</button>
          <button class="btnDelete" id="btnDelete-${task.id}">Borrar</button>`;
  });
};

const addListenerToDeletes = () => {
  btnsDelete = document.querySelectorAll(".btnDelete");
  btnsDelete.forEach((btnDelete) => {
    btnDelete.addEventListener("click", (e) => {
      const idTask = getIdTask(e.target.id);
      tasksList = tasksList.filter((task) => task.id != idTask);
      generateTasks(tasksList);
      addListenerToDeletes();
      addListenerToEdits();
    });
  });
};

const addListenerToEdits = () => {
  btnsEdit = document.querySelectorAll(".btnEdit");
  btnsEdit.forEach((btnEdit) => {
    btnEdit.addEventListener("click", (e) => {
      editMode = true;
      btnSave.innerText = "Editar";
      const idTask = getIdTask(e.target.id);
      let taskSeleted = tasksList.find((task) => task.id == idTask);
      taskToEdit = taskSeleted;
      textareaDetail.value = taskSeleted.detail;
    });
  });
};

btnSave.addEventListener("click", (e) => {
  if (textareaDetail.value == "") {
    alert("bro escribi alguito.");
  } else {
    if (!editMode) {
      tasksList.push({
        detail: textareaDetail.value,
        id: tasksList.length + 1,
      });
    } else {
      const newDetailTask = textareaDetail.value;
        tasksList = tasksList.map((task) => {
          if (task.id == taskToEdit.id) {
            return { detail: newDetailTask, id: taskToEdit.id };
          } else {
            return task;
          }
        });
    //   tasksList = [...tasksList, { detail: newDetailTask, id: taskToEdit.id }];
      btnSave.innerText = "Save";
      editMode = false;
    }
    textareaDetail.value = "";
    generateTasks(tasksList);
    addListenerToDeletes();
    addListenerToEdits();
  }
});

generateTasks(tasksList); // Llamada a una funcion
addListenerToDeletes();
addListenerToEdits();
