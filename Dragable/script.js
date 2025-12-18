document.addEventListener("DOMContentLoaded",()=>{ // Execution starts only after DOM is loaded

    const draggables = document.querySelectorAll(".draggable")
    const containers = document.querySelectorAll(".container")
    
    console.log(draggables)
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', ()=>{  
            draggable.classList.add("dragging") // reduce element Opacity 
        })

        draggable.addEventListener('dragend',()=>{  
            draggable.classList.remove("dragging") // reverting element opacity
        })
    })

    containers.forEach((container)=>{
        container.addEventListener('dragover', ()=>{
            container.addEventListener('drop',()=>{
                console.log("Hitting")
                const draggable = document.querySelector('.draggable');
                container.appendChild(draggable)
                console.log(draggable)
            })
        })
    })
})

