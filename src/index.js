import "bootstrap/scss/bootstrap.scss";
import http from "./http";

// render Post

const renderAllPost = (post) => {
   const listNode = document.querySelector("#list");
   http.getAllPost().then((postList) => {
      const newList = postList
         .map((post) => {
            return `<div
         class="
            mb-3
            p-2
            card
            d-flex
            flex-row
            justify-content-between
            align-items-center
         "
      >
         <div>
            <p><strong>${post.title}</strong></p>
            <p>${post.description}</p>
         </div>
         <div>
            <button class="btn btn-info btn-edit" data-id="${post._id}">Edit</button>
            <button class="btn btn-danger btn-remove"data-id="${post._id}">Remove</button>
         </div>
      </div>`;
         })
         .join("");
      listNode.innerHTML = newList;
   });
};

// const renderAllPost = () => {
//    const test = http.getAllPost();
//    console.log(test.then((res) => console.log(res)));
//    return http.getAllPost().then((postList) => {
//       postList.forEach((post) => {
//          renderPost(post);
//       });
//    });
// };
// clear Form
const clearForm = () => {
   document.querySelector("#title").value = "";
   document.querySelector("#description").value = "";
   document.querySelector("#list").innerHTML = "";
   return renderAllPost();
};

// create Post
const createPost = () => {
   const title = document.querySelector("#title").value;
   const description = document.querySelector("#description").value;
   const newPost = { title, description };
   http.createPost(newPost).then((res) => {
      alert("add done");
      return clearForm();
   });
};

// delete Post
const deletePost = (id) => {
   http.deletePost(id).then((res) => {
      return clearForm();
   });
};

// start edit
const editStart = (id) => {
   http.getPostById(id).then((res) => {
      console.log(res);
      const { title, description } = res;
      document.querySelector("#title").value = title;
      document.querySelector("#description").value = description;
      document.querySelector("#btn-group").classList.remove("d-none");
      document.querySelector("#btn-add").classList.add("d-none");
      document.querySelector("#btn-edit").dataset.id = res._id;
   });
};

// edit end
const editEnd = (id, post) => {
   http.updatePost(id, post).then((res) => {
      alert("edit done");
      return clearForm();
   });
};

const init = () => {
   renderAllPost();
   // create form
   document.querySelector("#btn-add").addEventListener("click", (event) => {
      event.preventDefault();
      createPost();
   });
   //delete form
   document.querySelector("#list").addEventListener("click", (event) => {
      if (event.target.classList.contains("btn-remove")) {
         event.preventDefault();
         deletePost(event.target.dataset.id);
      }
   });
   // start edit
   document.querySelector("#list").addEventListener("click", (event) => {
      if (event.target.classList.contains("btn-edit")) {
         console.log(event.target.dataset.id);
         editStart(event.target.dataset.id);
      }
   });
   // back edit
   document.querySelector("#btn-back").addEventListener("click", (event) => {
      document.querySelector("#title").value = "";
      document.querySelector("#description").value = "";
      document.querySelector("#btn-group").classList.add("d-none");
      document.querySelector("#btn-add").classList.remove("d-none");
      document.querySelector("#btn-edit").dataset.id = "";
   });

   // edit end
   document.querySelector("#btn-edit").addEventListener("click", (event) => {
      const title = document.querySelector("#title").value;
      const description = document.querySelector("#description").value;
      const updatePost = { title, description };
      event.preventDefault();
      editEnd(event.target.dataset.id, updatePost);
   });
};

window.addEventListener("DOMContentLoaded", () => {
   init();
});
