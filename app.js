const btnSave = document.querySelector("#save");
const ulTasks = document.querySelector("#list-tasks");
const textareaDetail = document.querySelector("#task-detail");

let btnsDelete = [];

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
  tasks.forEach((task) => {
    ulTasks.innerHTML += `<li>${task.detail}</li>
          <button class="btnEdit" id="btnEdit-${task.id}">Editar</button>
          <button class="btnDelete" id="btnDelete-${task.id}">Borrar</button>`;
  });

  addListenerToDeletes();
};

const addListenerToDeletes = () => {
  btnsDelete = document.querySelectorAll(".btnDelete");
  btnsDelete.forEach((btnDelete) => {
    btnDelete.addEventListener("click", (e) => {
      const idTask = getIdTask(e.target.id);
      tasksList = tasksList.filter((task) => task.id != idTask);
      ulTasks.innerHTML = "";
      generateTasks(tasksList);
    });
  });
};

btnSave.addEventListener("click", (e) => {
  if (textareaDetail.value == "") {
    alert("bro escribi alguito.");
  } else {
    tasksList.push({ detail: textareaDetail.value, id: tasksList.length });
    ulTasks.innerHTML += `<li>${textareaDetail.value}</li>
    <button class="btnEdit" id="btnEdit-${tasksList.length}">Editar</button>
    <button class="btnDelete" id="btnDelete-${tasksList.length}">Borrar</button>`;
    textareaDetail.value = "";
    addListenerToDeletes();
  }
});

generateTasks(tasksList); // Llamada a una funcion
