const addTask=document.querySelector('.add')
const input=document.querySelector('.task')
const ListParent=document.querySelector('.Taks')

const elemnt=document.querySelector('.elemnt')
let ismodifie=false


addTask.addEventListener('click',function(){
    input.classList.toggle('hidden')
    addTask.classList.toggle('hidden')
    ismodifie=false
    
})

    
input.addEventListener("keypress",function(k){
    
    if(k.key==='Enter'){
        k.preventDefault()
        ismodifie=false
    
    var textvalue=document.querySelector('input').value
    if(textvalue!==''){
    generateElemnt(textvalue)
    
    input.classList.toggle('hidden')
    addTask.classList.toggle('hidden')
   input.value='';
    
    }else(
        console.error("NO input")
    )
}
    
    
    
})
const generateElemnt=function(value){
    const markup=`
    <li class='elemnt'>
          ${value} <span><button class="Delete"><i class="fa-solid fa-trash-can" style="color: #ff0000;"></i></button> <button class="modifie"><i class="fa-solid fa-pen"></i></button></span>
        </li>
    `
    ListParent.innerHTML+=markup
    attachListeners()
    

}


const attachListeners = function () {
    const deleteButtons = document.querySelectorAll('.Delete');
    const modifyButtons = document.querySelectorAll('.modifie');

    deleteButtons.forEach(button => {
      button.addEventListener('click', function () {
        const listItem = this.closest('li');
        listItem.remove(); 
      });
    });

  
    
    modifyButtons.forEach(button => {
        button.addEventListener('click', function () {
          if (!ismodifie) {
            ismodifie = true;
            
            
            const listItem = this.closest('li');
            const currentText = listItem.firstChild.textContent.trim();
            
           
            const input = document.createElement('input');
            input.type = 'text';
            input.value = currentText;
      
            
            listItem.firstChild.remove();
      
            
            listItem.insertBefore(input, listItem.firstChild);
      
            
            input.focus();
      
            
            input.addEventListener('keypress', function (event) {
              if (event.key === 'Enter') {
                ismodifie = false; 
                const newText = input.value;
      
                if (newText !== '') {
                  
                  input.remove();
                  const textNode = document.createTextNode(newText);
                  listItem.insertBefore(textNode, listItem.firstChild);
                }
              }
            });
          }
        });
      });
    }