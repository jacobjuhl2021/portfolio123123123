<script setup>
import Header from '../components/Header.vue'
import { ref, onMounted, nextTick, watch, computed } from 'vue'

const posts = ref([])
const API = import.meta.env.VITE_WP_URL

onMounted(async () => {
    const res = await fetch(`${API}/wp-json/wp/v2/posts?_embed`)
    posts.value = await res.json()
})

const currentPost = ref(null)

onMounted(async () => {
  const res = await fetch(`${API}/wp-json/wp/v2/posts?_embed`)
  posts.value = await res.json()

  // vælg nyeste post som standard
  currentPost.value = posts.value[0] || null
})


// Dropdown animation logic
const detailsRef = ref(null)
const summaryRef = ref(null)
const contentRef = ref(null)

onMounted(() => {
  summaryRef.value.addEventListener('click', async (e) => {
    e.preventDefault()

    const details = detailsRef.value
    const content = contentRef.value
    const isOpen = details.hasAttribute("open")

    if (!isOpen) {
      details.setAttribute("open", "")
      await nextTick()
      content.style.maxHeight = content.scrollHeight + "px"
    } else {
      content.style.maxHeight = content.scrollHeight + "px"
      requestAnimationFrame(() => {
        content.style.maxHeight = "0px"
      })
      content.addEventListener("transitionend", () => {
        details.removeAttribute("open")
      }, { once: true })
    }
  })
})


</script>

<template>
  <Header />
    <main class="">
        <div class="m-container mx-4 pt-12 mb-2">
            <div class="col-span-full">
                <p class="font-bold">Her kan der læses om projekter jeg tidligere har været med til at udvikle, hvad de gik ud på og hvad jeg har lavet i dem</p>
            </div>
        </div>
        
        <!-- Erfaringer  -->

        <div class="m-container mb-8 mt-4">
            <div class="col-span-3">
                <details ref="detailsRef" class="group mb-2 p-4 bg-secondary text-white rounded-xl">
                    <summary ref="summaryRef" class="cursor-pointer flex items-center justify-between font-bold">
                        <p class="select-none text-primary font-extrabold text-2xl" v-html="currentPost?.title.rendered || 'Projekter'"></p>  
                        <span class="transition-transform duration-300 group-open:rotate-180 select-none">&#8645;</span>
                    </summary>

                    <div ref="contentRef"
                    class="overflow-hidden transition-[max-height] duration-200 ease-in-out"
                    style="max-height:0px"
                    >
                        <div class="mt-2 pt-4 rounded">
                            <div v-for="post in posts.filter(p => p.id !== currentPost?.id)" :key="post.id">
                                <div class="w-full flex ">
                                <button
                                    class="pb-1 font-semibold text-xl hover:border-b-2 flex items-center w-full gap-y-20"
                                    @click="
                                        currentPost = post;
                                        detailsRef.removeAttribute('open')
                                    "
                                    :class="{ 'text-primary': currentPost?.id === post.id }"
                                >
                                    <span v-html="post.title.rendered"></span>
                                    <span class="ml-auto">&#8669;</span>
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </details>
            </div>

        </div>

        <div v-if="currentPost">
            <div class="m-container mx-4">
                <div class="col-span-full">
                <h2 class="text-primary mb-2" v-html="currentPost.title.rendered"></h2>
                <div class="mb-2" v-html="currentPost.excerpt.rendered"></div>
                </div>
            </div>

            <img
                class="w-full"
                v-if="currentPost._embedded?.['wp:featuredmedia']"
                :src="
                currentPost._embedded['wp:featuredmedia'][0]
                    .media_details.sizes.medium_large?.source_url
                    ?? currentPost._embedded['wp:featuredmedia'][0].source_url
                "
            />
        </div>

    </main>
</template>


