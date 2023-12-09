const newTaskInputEl = document.querySelector('#new-task-input')
const taskListEl = document.querySelector('#tasks-list')
const addTaskButtonEl = document.querySelector('#add-task-button')

// Aqui guardaremos todas las tareas que vayamos anyadiendo
const tasks = []

// Objeto globar para tener las referencias a lo que vayamos haciendo, una especie de estado
// en la que llevaremos control de las tareas, la lista de tareas y el input
const app = {
  tasks,
  taskListEl,
  newTaskInputEl,
}

// Esta funcion nos va a permitir anyadir tareas
// recibe por parametros el titulo y un booleano de si la tarea esta completada, por defecto es falso
const createTask = (title, isCompleted = false) => {
  return {
    id: Date.now(),
    title,
    isCompleted,
  }
}

// Funcion para anyadir una tarea al nodo lista de tareas, recibe la tarea y la lista de tareas
const addTaskToList = (task, taskListEl) => {
  // almacenamos el elemento tarea usando una funcion createTaskElement() que recibe la tarea a crear
  const taskElement = createTaskElement(task)
  // anyadimos ese elemento tarea como nodo hijo a la lista de tareas
  taskListEl.appendChild(taskElement)
}

// Funcion que se va a llamar cuando pulsemos el boton de anyadir tarea
// recibe el objeto app como parametro
// contiene las referencias a las tareas, el nodo lista de tareas y el input donde esta el valor de la nueva tarea a anyadir
const addTask = (app) => {
  // extraemos el titulo del input usando app.(input element).value
  // input.value nos da el valor del texto en el input
  const newTaskTitle = app.newTaskInputEl.value
  // creamos una nueva tarea, le pasamos el titulo obtenido previamente.
  const newTask = createTask(newTaskTitle)
  // en nuestro objeto app tenemos la referencia a las tareas (array vacio, al principio)
  // como es un array vamos a hacer push de la nueva tarea para anyadirla al array.
  app.tasks.push(newTask)
  // esta funcion hace que se vea en el DOM el elemento que simboliza la tarea dentro del nodo lista de tareas
  addTaskToList(newTask, app.taskListEl)
  // para mejorar la UX, despues de anyadir una tarea al nodo lista de tareas
  // vamos a resetear el valor del input a un string vacio
  app.newTaskInputEl.value = ''
}

// Esta funcion nos sirve para representar la tarea en el HTML
// recive un objeto tarea
const createTaskElement = (task) => {
  // creamos el elemento HTML que representa la tarea, en nuestro caso un li
  const taskEl = document.createElement('li')

  // creamos el elemento HTML que reprenta el checkbox para marcar si a tare se ha completado o no
  const taskCheckbox = document.createElement('input')
  // el typo del elemento
  taskCheckbox.type = 'checkbox'
  // la propiedad del elemento checkbox, va a ser igual al valor de nuestro objeto task.isCompleted
  taskCheckbox.checked = task.isCompleted
  taskCheckbox.classList.add('task-checkbox')
  taskCheckbox.addEventListener('change', () => {
    task.isCompleted = taskCheckbox.checked
    // .toggle es un metodo para intercambiar clases de css cuando se fuerza (2do parametro) a ello.
    taskText.classList.toggle('completed', task.isCompleted)
  })

  // creamos el elemento HTML que representa el texto de la tarea
  const taskText = document.createElement('span')
  taskText.textContent = task.title
  taskText.classList.add('task-text')
  taskText.classList.toggle('completed', task.isCompleted)

  // creamos el elemento HTML que representa un boton para borrar la tarea
  const taskDeleteButton = document.createElement('button')
  taskDeleteButton.textContent = 'Delete'
  taskDeleteButton.className = 'task-delete-button'
  taskDeleteButton.addEventListener('click', () => {
    // Eliminar la tarea del documento o DOM
    taskEl.remove()
    // Eliminar la tarea del array de listas
    // para poder borrar un elemento de un array necesitaria saber su indice.
    const taskElIndex = app.tasks.findIndex(() => taskEl)
    if (taskElIndex > -1) {
      app.tasks.splice(taskElIndex, 1)
    } 
  })

  // Incluimos los elementos previamente creados al nodo tarea
  taskEl.appendChild(taskCheckbox)
  taskEl.appendChild(taskText)
  taskEl.appendChild(taskDeleteButton)

  // Devolvemos el elemento tarea creado.
  return taskEl
}

// Evento que ocurre cuando hacemos click en el boton anyadir tarea
addTaskButtonEl.addEventListener('click', () => {
  addTask(app)
})

// Evento que ocurre al presionar la tecla Enter para anyadir una tarea
newTaskInputEl.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTask(app)
  }
})

// todo - usar almacenamiento local para anyadir persistencia a los todos.
// Para ello usamos la API webstorageapi que tiene 2 obj - session storage / local storage.

// Cuando debemos anyadir local storage en nuestra aplicacion?
// - Cuando el usuario carga la pagina por primera vez. entonces cargara tareas del LS si las hubiese y si no nada.
// - Cuando el usuario crea una nueva tarea. La lista de tareas existentes deberia actualizarse y guardarse en LS.
// - Cuando el usuario marca una tarea como completada, queremos que los datos sean persistentes y por ello debemos actualizar LS
// - Cuando el usuario borra una tarea.
