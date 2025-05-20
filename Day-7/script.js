const API_URL = "http://localhost:3000/books";
let editId = null;

function fetchPosts(searchQuery = "") {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", API_URL + "?_limit=5", true);
  xhr.onload = function () {
    const posts = JSON.parse(xhr.responseText);
    const list = document.getElementById("postList");
    list.innerHTML = "";
    posts
    .filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    .forEach(post => {
      const tr = document.createElement("tr");

      const tdId = document.createElement("td");
      tdId.textContent = post.id;

      const tdTitle = document.createElement("td");
      tdTitle.textContent = post.title;

      const tdActions = document.createElement("td");

      // Edit button
      const editBtn = document.createElement("button");
      editBtn.className = "edit";
      editBtn.innerHTML = '<i class="fas fa-edit"></i>';
      editBtn.addEventListener("click", () => {
        document.getElementById("titleInput").value = post.title;
        editId = post.id;
      });

      // Delete button
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete";
      deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
      deleteBtn.addEventListener("click", () => {
        deletePost(post.id);
      });

      tdActions.appendChild(editBtn);
      tdActions.appendChild(deleteBtn);

      tr.appendChild(tdId);
      tr.appendChild(tdTitle);
      tr.appendChild(tdActions);

      list.appendChild(tr);
    });
  };
  xhr.send();
}

function createPost() {
  const input = document.getElementById("titleInput");
  const title = input.value.trim();
  if (!title) return alert("Title required");

  const xhr = new XMLHttpRequest();
  const method = editId ? "PUT" : "POST";
  const url = editId ? `${API_URL}/${editId}` : API_URL;

  xhr.open(method, url, true);
  xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhr.onload = function () {
    alert(editId ? "Post updated!" : "Post added!");
    input.value = "";
    editId = null;
    fetchPosts();
  };
  xhr.send(JSON.stringify({ title: title }));
}

function deletePost(id) {
  const xhr = new XMLHttpRequest();
  xhr.open("DELETE", `${API_URL}/${id}`, true);
  xhr.onload = function () {
    alert("Book deleted!");
    fetchPosts();
  };
  xhr.send();
}

function searchBooks() {
  const query = document.getElementById("searchInput").value.trim();
  fetchPosts(query);
}

// Inicializar
fetchPosts();

