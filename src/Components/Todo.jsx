import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from 'uuid';
import SimpleModal from "./Modal";
import Modal from "./Modal";





const Todo = () => {

    const [todo, setTodo] = useState('');
    const [isEditActive, setIsEditActive] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(null)
    const [todos, setTodos] = useState( JSON.parse(localStorage.getItem('todos')) || []);
    const [showCompleted, setShowCompleted] = useState(true);
    const [isOpen, setIsOpen] = useState(false)
const [image, setImage] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [fileName, setFileName] = useState('');
  console.log(assignedTo);
  
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
       
    }, [todos])

    
    const imageRef = useRef();

const clearFileInput = () => {
  if (imageRef.current) {
    imageRef.current.value = null;
  }
};


    const onClose = () => {
        setIsOpen(false)
        setIsEditActive(false)
        setTodo('')
    }
  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('todos', JSON.stringify(todos));

    if (isEditActive){ 
        const updateTodos = [...todos];
        updateTodos[currentIndex] = {
            ...updateTodos[currentIndex],
            todo,
            image,
          assignedTo,
          createdAt: new Date().toLocaleString().split(' ')[0]
        };
        setTodos(updateTodos);
        setCurrentIndex(null);
        setIsOpen(false)
        
        // setIsEditActive(false);
      
    } else {
        setTodos([...todos, {
            id: uuid(),
            todo,
            image,
            assignedTo,
          isCompleted: false,
             createdAt: new Date().toLocaleString().split(' ')[0]
        }]);
        
    }
    setIsEditActive(false)
      setTodo('');
      clearFileInput()
    setImage(null);
  
};


    const handleEdit = ( index) => {
        setIsOpen(true)
        setIsEditActive(true)
        setCurrentIndex(index)
        setTodo(todos[index].todo)
      setAssignedTo(todos[index].assignedTo);
      setImage(todos[index].image)
      console.log(todos[index].image);
      
    }
    const handleDelete =(e,id) => {
       const restOfTodos=  todos.filter(todo => {
          return todo.id !== id;
       })
        setTodos(restOfTodos)
        setTodo('');

    }
    const handleChecked = (e, index) => {
        todos[index].isCompleted = !todos[index].isCompleted
        const newTodos = [...todos]
        setTodos(newTodos)
                
    }
    const handleShowCompleted = () => {
        setShowCompleted(!showCompleted)  
        console.log(showCompleted);
        
    }
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });


const handleImageChange = async (e) => {
  const file = e.target.files[0];
  if (file) {
    const base64 = await getBase64(file);
    setFileName(file.name);
    
    setImage(base64);
  }
};

const handleInputChange = (e) => {
    setTodo(e.target.value);          
    }
    
 
    return (
        <>
            {
             isOpen&&
                <Modal setIsOpen ={setIsOpen} image={image} todo= {todo} fileName={fileName} handleImageChange ={handleImageChange} setAssignedTo={setAssignedTo} assignedTo={assignedTo}  handleInputChange={handleInputChange} handleSave={handleSave} onClose = {onClose} setImage={setImage} />
          }
<div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-black  container mx-auto p-5 rounded-lg shadow-md lg:w-12/12">

          <div className="flex justify-center w-full ">
  <form className="flex flex-col items-center gap-4 mx-auto w-full md:w-1/2" onSubmit={handleSave}>
    {/* Task Input */}
    <div className="relative w-full ">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        {/* icon */}
                            </div>
      <label className="block text-sm font-bold mb-1">Description </label>
      <textarea
        onChange={handleInputChange}
        className="w-full h-24 resize-none bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600"
        placeholder="Add Your Tasks description..."
        required
        value={todo}
      />
    </div>

    {/* Upload Image */}
    <div className="w-full">
      <label className="block text-sm font-bold mb-1">Upload Image:</label>
      <input
        ref={imageRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600"
      />
    </div>

    {/* Assigned To */}
    <div className="w-full">
      <label className="block text-sm mb-1 font-bold">Assigned To:</label>
      <select
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
        className="w-full bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600"
      >
        <option value="">Select a person</option>
        <option value="Faria">Faria</option>
        <option value="Sajib">Sajib</option>
        <option value="Iliana">Iliana</option>
      </select>
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full p-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800"
    >
      Save
    </button>
  </form>
</div>


              
        <input checked={showCompleted} onChange={handleShowCompleted} type="checkbox" className='mt-3'/> <span>Show Completed Tasks</span>
              <h1 className='my-5 text-xl font-bold'>Your Todos</h1>

            
                <div className="todos  ">
                    {/* todos */}
                   
                   {
  todos.map((todo, index) => {
    return (!todo.isCompleted || showCompleted) && (
      <div
        key={todo.id || index}
        className="todo  my-3 flex flex-col  md:flex-row items-start md:items-center justify-between w-full md:w-6/12 mx-auto gap-4 p-4 border rounded shadow-sm dark:border-gray-700"
      >
        <div className="flex items-center gap-4 w-full md:w-auto">
          <input
            checked={todo.isCompleted}
            onChange={(e) => handleChecked(e, index)}
            type="checkbox"
            className="w-5 h-5"
          />
          <div>
            <label
              className={`text-lg font-semibold block ${
                todo.isCompleted ? 'line-through opacity-50' : ''
              }`}
            >
              {todo.todo}
            </label>
            {todo.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {todo.description}
              </p>
            )}
            {todo.assignedTo && (
<h5 className="tex-sm text-white font-bold mt-1 block">
  Assigned to: {todo.assignedTo}
</h5>


            )}
          </div>
        </div>

        {todo.image && (
          <img
            src={todo.image}
            alt="todo"
            className="w-20 h-20 object-cover rounded-md border dark:border-gray-600"
          />
        )}

        <div className="buttons flex gap-2 mt-2 md:mt-0">
          <button
            onClick={() => handleEdit( index)}
            type="button"
            className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 dark:focus:ring-green-800"
          >
            Edit
          </button>

          <button
            onClick={(e) => handleDelete(e, todo.id)}
            type="button"
            className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 dark:focus:ring-red-800"
          >
            Delete
          </button>
        </div>
      </div>
    );
  })
}

                    
            </div>
            
            </div>

            
      </>
)
}

export default Todo