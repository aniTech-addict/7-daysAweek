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
            console.log("Dragging over")
            const draggable = document.querySelector(".dragging");
            container.appendChild(draggable);
        })

        
    })
})

