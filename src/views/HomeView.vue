<script setup>
import { ref, onMounted } from 'vue'
import Header from '../components/Header.vue'

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
        <!-- Forside --- om mig  -->
        <section class="">
            <h1 class="text-5xl font-bold text-primary">Kort om mig</h1>

            <!-- Billede af mig -->
            <div class="">

            </div>

            <!-- Kort om mig -->
            <div class="">

            </div>
        </section>
    </main>
</template>
