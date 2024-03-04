let taskInput = document.getElementById("taskInput");
let addButton = document.getElementById("addButton");
let tabs = document.querySelectorAll(".tasktabs div");
let taskList = [];
let mode = 'all'
let filterList = [];

addButton.addEventListener("click", addTask);
console.log(tabs);
for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    iscomplete: false,
  };
  taskList.push(task);

  render();
}

function render() {
    let list= []
    if(mode == "all"){
        list = taskList

    }else if (mede == "ongoing"){
        list = filterList
    }else if (mode == "done"){

    }
  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].iscomplete == true) {
      resultHTML += `<div id="taskBoard">
            <div class="task">
                <div class="taskdone">${list[i].taskContent}</div>
                <div>
                    <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-rotate-right"></i></button>
                    <button onclick="deletetask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        </div>`;
    } else {
      resultHTML += `<div id="taskBoard">
        <div class="task">
            <div>${list[i].taskContent}</div>
            <div>
                <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
                <button onclick="deletetask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
            </div>
        </div>
    </div>`;
    }
  }
  document.getElementById("taskBoard").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

function deletetask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  console.log(taskList);
  render();
}

function filter(event) {
  let mode = event.target.id;
  if (mode === "all") {
  } else if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete == true) {
        filterList.push(taskList[i]);
    }
  }
  render();
}
}