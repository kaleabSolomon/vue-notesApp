<script setup>
import { ref } from "vue";
// import { useQuery } from "@vue/apollo-composable";
// import gql from "graphql-tag";
const showModal = ref(false);
const newNote = ref("");
const errorMsg = ref("");
const notes = ref([]);

function getRandomColor() {
  return "hsl(" + Math.random() * 360 + ", 100%, 75%)";
}

const getNotes = async function () {
  try {
    const result = await fetch("http://localhost:8080/v1/graphql", {
      method: "POST",
      headers: {
        "x-hasura-admin-secret": "myadminsecretkey",
      },
      body: JSON.stringify({
        query: `query{
        notes {
      id
      note
      created_at
      bgcolor
    }
      }`,
      }),
    });

    let data = await result.json();
    let fetchedData = data.data.notes;

    notes.value = [...fetchedData];

    console.log(notes.value);
  } catch (e) {
    console.log("error: " + e.message);
  }
};
getNotes();

const addNote = async function () {
  try {
    const response = await fetch("http://localhost:8080/v1/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": "myadminsecretkey",
      },
      body: JSON.stringify({
        query: `
          mutation AddNote($note: String!, $bgColor: String!) {
            insert_notes_one(object: {note: $note, bgcolor: $bgColor}) {
              id
            }
          }
        `,
        variables: {
          note: newNote.value,
          bgColor: getRandomColor(),
        },
      }),
    });

    const data = await response.json();
    getNotes();
    showModal.value = false;
    newNote.value = "";
    errorMsg.value = "";

    console.log(data);
  } catch (e) {
    console.log("error: " + e.message);
  }
};
</script>

<template>
  <div
    v-if="showModal"
    class="absolute w-full h-full bg-black/80 z-10 flex items-center justify-center"
  >
    <div
      class="w-750 bg-white rounded-xl p-7 relative flex flex-col min-h-200 z-20"
    >
      <textarea
        v-model.trim="newNote"
        name="notes"
        id="notes"
        cols="30"
        rows="10"
        class="p-2.5"
      ></textarea>
      <p v-if="errorMsg">{{ errorMsg }}</p>
      <div class="flex w-1/2 m-auto">
        <button
          class="py-2.5 px-5 bg-cyan-500 text-white cursor-pointer mt-3 mx-auto w-1/3"
          @click="addNote()"
        >
          Add Note
        </button>
        <button
          class="py-2.5 px-5 bg-black text-white cursor-pointer mt-3 mx-auto w-1/3"
          @click="showModal = false"
        >
          Close
        </button>
      </div>
    </div>
  </div>
  <main class="h-screen w-screen">
    <div class="max-w-1000 p-2.5 my-0 mx-auto">
      <header class="flex justify-between items-center">
        <h1 class="font-bold mb-25 text-7xl">Notes</h1>
        <button
          class="border-none p-2.5 w-12 h-12 cursor-pointer rounded-full text-white bg-black text-xl"
          @click="showModal = true"
        >
          +
        </button>
      </header>
      <div class="flex flex-wrap">
        <div
          :style="{ backgroundColor: note.bgcolor }"
          :key="note.id"
          v-for="note in notes"
          class="w-56 h-56 p-2.5 rounded-2xl mr-5 mb-5 flex flex-col justify-between"
        >
          <p class="text-sm">{{ note.note }}</p>
          <div class="flex justify-between">
            <p class="text-xs font-bold">
              {{ new Date(note.created_at).toLocaleDateString("en-US") }}
            </p>
            <button>
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 7H20"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M6 10L7.70141 19.3578C7.87432 20.3088 8.70258 21 9.66915 21H14.3308C15.2974 21 16.1257 20.3087 16.2986 19.3578L18 10"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
                  stroke="#000000"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
