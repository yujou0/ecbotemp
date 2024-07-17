<script setup>
const tableContainer = ref(null);

let isDragging = false;
let mouseX = 0;
let scrollLeft = 0;

const handleMouseDown = (event) => {
  isDragging = true;
  mouseX = event.clientX;
  scrollLeft = tableContainer.value.scrollLeft;
};

const handleMouseUp = () => {
  isDragging = false;
};

const handleMouseLeave = () => {
  isDragging = false;
};

const handleMouseMove = (event) => {
  if (!isDragging) return;
  const dx = event.clientX - mouseX;
  tableContainer.value.scrollLeft = scrollLeft - dx;
};
onMounted(() => {
  if (tableContainer.value) {
    tableContainer.value.addEventListener("mousedown", handleMouseDown);
    tableContainer.value.addEventListener("mouseup", handleMouseUp);
    tableContainer.value.addEventListener("mouseleave", handleMouseLeave);
    tableContainer.value.addEventListener("mousemove", handleMouseMove);
  }
 
});
onUnmounted(() => {
  if (tableContainer.value) {
    tableContainer.value.removeEventListener("mousedown", handleMouseDown);
    tableContainer.value.removeEventListener("mouseup", handleMouseUp);
    tableContainer.value.removeEventListener("mouseleave", handleMouseLeave);
    tableContainer.value.removeEventListener("mousemove", handleMouseMove);
  }
});
</script>

<template>
          <div class="table-container" ref="tableContainer">
          <slot>
            
          </slot>
          </div>
</template>
<style scoped></style>
