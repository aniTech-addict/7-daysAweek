document.addEventListener("DOMContentLoaded", ()=>{

    const columns = document.querySelectorAll(".task-column");

    columns.forEach((column) => {
        column.addEventListener("dragover", (event) => {
            // Test a custom type we will set later
            const types = event.dataTransfer.types || [];
            // DOMStringList may not support includes in all browsers
            if (Array.from(types).includes("task")) {
                event.preventDefault();
            }
        });
    });
    
    columns.forEach((column) => {
        column.addEventListener("drop", (event) => {
            event.preventDefault();
            const draggedTask = document.getElementById("dragged-task");
            if (!draggedTask) return;
            // Move the dragged task into this column
            column.appendChild(draggedTask);
        });
    });

    const tasks = document.querySelectorAll(".task");

    tasks.forEach((task) => {
        task.addEventListener("dragstart", (event) => {
            console.log("Drag started");
            task.id = "dragged-task";
            task.classList.add("dragging");
            event.dataTransfer.effectAllowed = "move";
            // Store the id using a safe MIME type so it works across browsers
            event.dataTransfer.setData("text/plain", task.id);
            // Also set a custom type if the browser allows it
            try { event.dataTransfer.setData("task", ""); } catch (e) { /* some browsers restrict custom types */ }
        });

        task.addEventListener("dragend", (event) => {
            task.removeAttribute("id");
            task.classList.remove("dragging");
        });
    });

});
