//유저가 값을 입력한다
//+버튼을 누르면 할 일이 추가 된다
// delete 를 누르면 할 일이 삭제 된다
//check 버튼을 누르면 할일이 끝나면서 밑줄이 간다
//진행중을 누르면 진행중인 아이템만 
//전체 탭을 누르면 다시 전체 아이템으로 돌아옴

let userInput = document.querySelector(".task-input");
let addButton = document.querySelector(".button-add");
let tabs = document.querySelectorAll(".tab-type div")
let taskList = []
let filterList = []
let mode = "all"

addButton.addEventListener("click", addTask)

for(let i=0;i<tabs.length;i++)
{
  tabs[i].addEventListener("click", function(event){
    filter(event)})
}

function addTask(){
  let taskValue = userInput.value;
  let task={
    content: taskValue,
    iscomplete:false,
    id : randomIDGenerator()
  }

  taskList.push(task)
  userInput.value = "";
  render();
}

function render(){
  let resultHTML = "";  //스트링 변수 선언
  list=[]
  if(mode == "all"){
    list = taskList
  }else{
    list = filterList
  }
  for(let i=0;i<list.length;i++){
    if(list[i].iscomplete == true){
      resultHTML +=`<div class="task task-done-task" id="${list[i].id}">
      <span class="task-done"> ${list[i].content} </span>
      <span>
        <button onclick="toggleDone('${list[i].id}')">check</button>
        <button onclick="deleteTask('${list[i].id}')">delete</button>
      </span>
    </div>`
    }else{
    resultHTML +=`<div class="task" id="${list[i].id}">
    <span > ${list[i].content} </span>
    <span>
      <button onclick="toggleDone('${list[i].id}')">check</button>
      <button onclick="deleteTask('${list[i].id}')">delete</button>
    </span>
  </div>`
    }
  }
  document.querySelector(".task-board").innerHTML = resultHTML;
}
function toggleDone(id){
  for (let i = 0; i < taskList.length; i++){
    if(taskList[i].id == id){
      if(taskList[i].iscomplete == false){
      taskList[i].iscomplete = true
      break;
      }else if(taskList[i].iscomplete == true){
        taskList[i].iscomplete = false
        break;
      }
    }
  }
  filter()
}
function deleteTask(id){
  for (let i = 0; i < taskList.length; i++){
    if(taskList[i].id == id){
      taskList.splice(i,1)
    }
  }
  filter()
}

function filter(event){
  if (event) {
    mode = event.target.id;
    underLine.style.width = event.target.offsetWidth + "px";
    underLine.style.left = event.target.offsetLeft + "px";
    underLine.style.top =
    event.target.offsetTop + (event.target.offsetHeight - 4) + "px";
  }
  filterList = []
  
  if(mode == "ongoing"){
    for (let i = 0; i < taskList.length; i++){
      if(taskList[i].iscomplete == false){
        filterList.push(taskList[i])
      }
    }
  }else if(mode == "done"){
    for (let i = 0; i < taskList.length; i++){
      if(taskList[i].iscomplete){
        filterList.push(taskList[i])
      }
    }
  }
  render();
}

function randomIDGenerator() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return "_" + Math.random().toString(36).substr(2, 9);
}