const deleteBtn = document.querySelectorAll('.fa-trash')
const editBtn = document.querySelectorAll('.fa-pen-to-square')



Array.from(deleteBtn).forEach((element)=>{
    element.addEventListener('click', deleteItem)
})

Array.from(editBtn).forEach((element) => {
    element.addEventListener('click', editItem)
})

async function deleteItem(){
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('deleteClient', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'name': itemText
            //   'phone': itemText
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

async function editItem(){
    const itemText = this.parentNode.childNodes[1].innerText
    try {
        const response = await fetch('editClient', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'name': itemText
            //   'phone': itemText
            }) 
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }
    catch(err) {
        console.log(err)
    }
}
