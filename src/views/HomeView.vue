<script setup>
import { ref, onMounted } from 'vue'
import Header from '../components/Header.vue'
import profileImage from '../assets/images/mig.jpg'

const posts = ref([])
const API = import.meta.env.VITE_WP_URL

onMounted(async () => {
    const res = await fetch(`${API}/wp-json/wp/v2/posts?_embed`)
    posts.value = await res.json()
})
</script>
<template>
    <Header />
    <main>
        <section class="pt-12 ">
            <div class="">
                <div class="gapper py-4">
                    <h1 class="text-4xl font-black text-primary">Hi, I’m Jacob Juhl🌮</h1>
                    <!-- Kort om mig -->
                    <div class="mt-2">
                        <p class="text-lg font-bold text-xl">I develop web applications – frontend and backend.
                            I’ve toyed with Linux servers💻
                            I live in Odense and studied it at UCL.</p>
                        <p class="mt-4 text-xl">
                            I like to develop products in Vue, with tailwind, and I’m working on improving my skills with Wordpress, I’ve also worked with Laravel and relational databases.
                            <br><br>
                            I like teamwork, comradery, and good communication.
                        </p>
                    </div>
                </div>
            </div>
            <div class="gapper">
                <div class="">
                    <ul class="text-xl">
                        <li class="font-extrabold mt-4 mb-2 text-primary">
                        Research me more here:
                        </li>
                        <li class="ml-2 text-emerald">
                        <a href="https://github.com/jacobjuhl2021" target="_blank">
                            &#8618; Github
                        </a>
                        </li>
                        <li class="ml-2 text-emerald">
                        <a href="https://www.linkedin.com/in/jacob-h%C3%B8jer-juhl-181b6521b/" target="_blank">
                            &#8618; LinkedIn
                        </a>
                        </li>
                    </ul>
                </div>
            </div>
            <img :src="profileImage" alt="Jacob Juhl" class="mt-4"></img>
        </section>
    </main>
</template>
