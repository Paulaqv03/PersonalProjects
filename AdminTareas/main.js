const input = document.querySelector('input');
const addBtn = document.querySelector('.btn-add');
const ul = document.querySelector("ul");
const empty = document.querySelector(".empty");

addBtn.addEventListener('click', (e) =>{
    e.preventDefault(e);
    
    const text = input.value;

    const li = document.createElement('li');
    const p = document.createElement('p');
    p.textContent = text;

    li.appendChild(p);
    li.appendChild(addDeleteButton());
    ul.appendChild(li);

    input.value ="";
    empty.style.display = "none";
}); 

function addDeleteButton(){
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "X";
    deleteBtn.className = "delete-btn";

    deleteBtn.addEventListener('click', (e) => {
        const item = e.target.parentElement;
        ul.removeChild(item);

        const items = document.querySelectorAll("li");

        if (items.length === 0) {
          empty.style.display = "block";
        }
    });
    return deleteBtn;
}