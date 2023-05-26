<script setup></script>

<template>
  <main class="h-screen w-screen">
    <div class="max-w-1000 p-2.5 my-0 mx-auto">
      <header class="flex justify-between items-center">
        <h1 class="font-bold mb-25 text-7xl">Notes</h1>
        <button
          class="border-none p-2.5 w-50 h-50 cursor-pointer rounded-full text-white bg-black text-xl"
        >
          +
        </button>
      </header>
      <div class="flex flex-wrap">
        <div
          class="w-56 h-56 bg-red-500 p-2.5 rounded-2xl mr-5 mb-5 flex flex-col justify-between"
        >
          <p class="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            ipsam delectus consequuntur repudiandae nam vitae. Temporibus,
            possimus.
          </p>
          <p class="text-xs font-bold">05/26/2023</p>
        </div>
        <div
          class="w-56 h-56 bg-red-500 p-2.5 rounded-2xl mr-5 mb-5 flex flex-col justify-between"
        >
          <p class="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            ipsam delectus consequuntur repudiandae nam vitae. Temporibus,
            possimus.
          </p>
          <p class="text-xs font-bold">05/26/2023</p>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
