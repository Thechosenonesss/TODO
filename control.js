const addTask=document.querySelector('.add')
const input=document.querySelector('.task')
const ListParent=document.querySelector('.Taks')
const form=document.querySelector('form')
const reset=document.querySelector('.Reset')


const elemnt=document.querySelector('.elemnt')

class TASK{
  tasks=[]
  ismodifie=false
  constructor(){
    this.GetStorage()
    addTask.addEventListener('click',this.askFor.bind(this))
    form.addEventListener('submit', this.getInput.bind(this))
    reset.addEventListener('click',this.ResetStorage.bind(this))



  }



 askFor(){
    
    input.classList.toggle('hidden')
    addTask.classList.toggle('hidden')
    this.ismodifie=false
    
}
 

  getInput(e){
    e.preventDefault()
    this.ismodifie=false
    
    var textvalue=input.value
    if(textvalue!==''){
    this.generateElemnt(textvalue)
    this.tasks.push(textvalue)
    
    this.local()
  
    input.classList.toggle('hidden')
    addTask.classList.toggle('hidden')
   input.value='';
   
    
    }else{
      input.classList.toggle('hidden')
    addTask.classList.toggle('hidden')
    }}
  
  

    
    
    


  generateElemnt=function(value){
    const markup=`
    <li class='elemnt'>
          ${value} <span class="btns"><button class="Delete"><i class="fa-solid fa-trash-can" style="color: #ff0000;"></i></button> <button class="modifie"><i class="fa-solid fa-pen"></i></button></span>
        </li>
    `
    ListParent.innerHTML+=markup
    this.attachListeners()
    
    
  
  }


  attachListeners  () {
    const deleteButtons = document.querySelectorAll('.Delete');
    const modifyButtons = document.querySelectorAll('.modifie');
    let taskarr=this.tasks
    

    deleteButtons.forEach(button => {
      button.addEventListener('click', () =>{
        const listItem = button.closest('li');
        var index=this.tasks.indexOf(listItem.firstChild.textContent)
        listItem.remove(); 
        this.tasks.splice(index,1) 
        this.local()
        console.log(taskarr)
        
        
        
        
   });
     
    console.log(this.tasks)});
    
    
    

  
    
    modifyButtons.forEach(button => {
        button.addEventListener('click',  ()=> {
          if (!this.ismodifie) {
            this.ismodifie = true;
           
            
            
            const listItem = button.closest('li');
            const currentText = listItem.firstChild.textContent.trim();
            
           
            const input = document.createElement('input');
            input.type = 'text';
            input.value = currentText;
            let index=this.tasks.indexOf(input.value)
      
            
            listItem.firstChild.remove();
      
            
            listItem.insertBefore(input, listItem.firstChild);
      
            
            input.focus();
      
            
            input.addEventListener('keypress', (event)=> {
              if (event.key === 'Enter') {
                this.ismodifie = false; 
                const newText = input.value;
      
                if (newText !== '') {
                  
                  input.remove();
                  const textNode = document.createTextNode(newText);
                  listItem.insertBefore(textNode, listItem.firstChild);
                  this.tasks[index]=newText;
                  this.local()
                
                  
                  
                }
              }
            });
          }
          });
      });
    }


    local(){
      localStorage.setItem('Task',JSON.stringify(this.tasks))
    }

    GetStorage(){
      const data=JSON.parse(localStorage.getItem('Task'))
      if(!data) return
      this.tasks=data;
      this.tasks.forEach(task=>{ this.generateElemnt(task)})

      
    }

    removeFromStorage(){
      localStorage.removeItem('Task')
    }

    ResetStorage(){
      this.tasks = [];
      this.local()
      location.reload()
    }




  }



const task=new TASK()

    





  
  
  
 



 