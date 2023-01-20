const deleteBtn = document.querySelectorAll('.fa-trash')

Array.from(deleteBtn).forEach((element)=>{
    element.addEventListener('click', deleteItem)
})

async function deleteItem(){
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        const response = await fetch('deleteClient', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'name': itemText,
              'phone': itemText
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}
