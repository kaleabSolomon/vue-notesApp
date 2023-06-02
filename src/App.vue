<script setup>
import { ref } from "vue";
const showModal = ref(false);
const newNote = ref("");
const notes = ref([]);

function getRandomColor() {
  return "hsl(" + Math.random() * 360 + ", 100%, 75%)";
}

const addNote = () => {
  notes.value.push({
    id: Math.floor(Math.random() * 1000000),
    text: newNote.value,
    date: new Date(),
    noteColor: getRandomColor(),
  });
  showModal.value = false;
  newNote.value = "";
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
        v-model="newNote"
        name="notes"
        id="notes"
        cols="30"
        rows="10"
        class="p-2.5"
      ></textarea>
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
          :style="{ backgroundColor: note.noteColor }"
          :key="note.id"
          v-for="note in notes"
          class="w-56 h-56 p-2.5 rounded-2xl mr-5 mb-5 flex flex-col justify-between"
        >
          <p class="text-sm">{{ note.text }}</p>
          <p class="text-xs font-bold">
            {{ note.date.toLocaleDateString("en-US") }}
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
