<template>
  <!-- wrapper: reference for absolute positioning -->
  <div ref="boxWrapper" class="relative w-full" :style="{ height: height + 'px' }">
    <!-- INDRE BOX: det indhold der SKAL clips -->
    <div class="bg-primary w-full h-full overflow-hidden">
        <div class="flex items-center justify-center h-full">
            <div class="flex flex-col mt-17 min-h-[80px]">
                <router-link
                    v-for="link in sortedLinks"
                    :key="link.path"
                    :to="link.path"
                    class="text-4xl font-black mx-auto py-4 px-2"
                    :class="route.path === link.path ? 'text-secondary!' : 'text-white!'"
                >
                    {{ link.label }}
                </router-link>
            </div>
        </div>
    </div>

    <!-- HANDLE: søskende til den indre box så den kan overlappe kanten og ikke clipped -->
    <button
    ref="handle"
    @pointerdown="onPointerDown"
    type="button"
    class="absolute left-3/4 -translate-x-1/2 bottom-0 translate-y-1/2 w-36 h-10 rounded-full shadow flex items-center justify-center z-10 cursor-row-resize"
    aria-label="Resize container vertically"
    :style="{ touchAction: 'none' }"
    >
        <span class="w-28 h-8 block bg-custom-gray rounded-full">
            <div class="flex flex-col items-center justify-center gap-1 py-2.5">
                <span class="block w-12 h-[3px] bg-gray-800 rounded"></span>
                <span class="block w-12 h-[3px] bg-gray-800 rounded"></span>
            </div>
        </span>
    </button>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount, computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  initialHeight: { type: Number, default: 80 },
  minHeight: { type: Number, default: 80 },
  maxHeight: { type: Number, default: 1000 }
})

const height = ref(props.initialHeight)
const dragging = ref(false)
const startY = ref(0)
const startHeight = ref(0)

const handle = ref(null)

function clamp(v) {
  return Math.min(props.maxHeight, Math.max(props.minHeight, v))
}

function onPointerDown(e) {
  if (e.pointerType === 'mouse' && e.button !== 0) return

  dragging.value = true
  startY.value = e.clientY
  startHeight.value = height.value

  try { handle.value?.setPointerCapture?.(e.pointerId) } catch (err) {}

  window.addEventListener('pointermove', onPointerMove)
  window.addEventListener('pointerup', onPointerUp)

  document.body.style.userSelect = 'none'
  document.body.style.touchAction = 'none'
}

function onPointerMove(e) {
  if (!dragging.value) return
  const dy = e.clientY - startY.value
  height.value = clamp(startHeight.value + dy)
}

function onPointerUp(e) {
  dragging.value = false
  try { handle.value?.releasePointerCapture?.(e.pointerId) } catch (err) {}

  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)

  document.body.style.userSelect = ''
  document.body.style.touchAction = ''
}

onBeforeUnmount(() => {
  window.removeEventListener('pointermove', onPointerMove)
  window.removeEventListener('pointerup', onPointerUp)
})


const route = useRoute()

// Dine links som data
const links = [
  { label: "Om mig", path: "/" },
  { label: "Projekter", path: "/post" }
]

// Sortér sådan at det aktuelle link altid kommer først
const sortedLinks = computed(() => {
  return [...links].sort((a, b) => {
    return a.path === route.path ? -1 :
           b.path === route.path ? 1 : 0
  })
})

</script>

<style scoped>
button:focus { outline: none; box-shadow: 0 0 0 3px rgba(59,130,246,0.25); }
</style>
