document.addEventListener("DOMContentLoaded", () => {
    const userList = document.getElementById("user-list");
    const addUserBtn = document.getElementById("add-user-btn");

    const fetchUsers = async () => {
        const response = await fetch('http://localhost:3001/users');
        const users = await response.json();
        renderUsers(users);
    };

    const renderUsers = (users) => {
        userList.innerHTML = '';
        users.forEach(user => {
            const userCard = document.createElement('div');
            userCard.className = "rounded-lg shadow-lg p-1 bg-white";
            userCard.innerHTML = `
                <img src="${user.image}" alt="${user.name}" class="w-full  object-cover rounded-lg mb-4">
                <div class="flex flex-col  items-center mb-4">
                 <h2 class="text-xl font-bold mb-2">${user.name}</h2>
                 <p class="text-gray-500 mb-2">${user.profession}</p>
                </div>

                 <div class=" mr-10 items-center flex jsutify-center  mb-10" >
                 <div class="w-5 h-5 rounded-full  ${user.online ? 'bg-green-500'  : 'bg-red-500'} "><p class="text-gray-500 ml-5" >${user.online ? 'Online'  : 'Offline'}<p><div/>
                   <button class="delete-btn bg-red-500 text-white p-2 rounded-lg" data-id="${user.id}">Delete</button>
                 </div>

                

                
            `;
            userList.appendChild(userCard);
        });
        addDeleteEventListeners();
    };

    const addDeleteEventListeners = () => {
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", async (e) => {
                const id = e.target.getAttribute('data-id');
                await fetch(`http://localhost:3001/users/${id}`, { method: 'DELETE' });
                fetchUsers();
            });
        });
    };

    addUserBtn.addEventListener("click", () => {
        window.location.href = "create.html";
    });

    fetchUsers();
});
