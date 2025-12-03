
<template>
  <div class="home">
    <n-card v-if="!showMessage" title="🎉 Bonne Année !" size="large" class="home-card">
      <n-form @submit.prevent="handleSubmit" label-placement="top">
        <!-- Select pour la ville -->
        <n-select
            v-model="ville"
            :options="villeOptions"
            placeholder="Choisissez votre ville"
            size="large"
        />

        <!-- Radios pour le genre -->
        <n-radio-group v-model="genre" name="genre" size="large">
          <n-radio value="homme">Je suis un homme</n-radio>
          <n-radio value="femme">Je suis une femme</n-radio>
        </n-radio-group>


        <!-- Bouton -->
        <n-button type="primary" size="large" block @click="handleSubmit">
          Valider
        </n-button>
      </n-form>
    </n-card>

    <!-- Animation -->
    <transition name="fade">
      <div v-if="showMessage" class="message-container">
        <h1 class="animated-text">Bonne année {{ nom }} 🎆</h1>
        <canvas ref="canvas" class="confetti-canvas"></canvas>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import confetti from 'canvas-confetti'

const ville = ref('')
const genre = ref('')
const nom = ref('')
const showMessage = ref(false)
const canvas = ref<HTMLCanvasElement | null>(null)

const villeOptions = [
  { label: 'Quimper', value: 'quimper' },
  { label: 'Rennes', value: 'rennes' }
]


const handleSubmit = async () => {
  console.log('Ville:', ville.value, 'Genre:', genre.value) // Debug
  const villeNormalized = (ville.value || '').trim().toLowerCase()
  const genreNormalized = (genre.value || '').trim().toLowerCase()

  if (villeNormalized === 'quimper' && genreNormalized === 'homme') {
    nom.value = 'Antoine'
  } else if (villeNormalized === 'rennes' && genreNormalized === 'femme') {
    nom.value = 'Elodie'
  } else {
    nom.value = 'Ami'
  }

  showMessage.value = true
  await nextTick()
  launchConfetti()
}


const launchConfetti = () => {
  if (!canvas.value) return
  const myConfetti = confetti.create(canvas.value, { resize: true, useWorker: true })
  const duration = 3000
  const end = Date.now() + duration

  const frame = () => {
    myConfetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } })
    myConfetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } })
    if (Date.now() < end) requestAnimationFrame(frame)
  }
  frame()
}
</script>

<style scoped>
.home {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #74ebd5 0%, #9face6 100%);
  overflow: hidden;
}

.home-card {
  width: 400px;
  padding: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
}

.message-container {
  text-align: center;
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
  position: relative;
}

.confetti-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.animated-text {
  animation: fadeIn 2s ease-in-out, scaleUp 1.5s ease-in-out;
}

.n-radio {
  font-size: 1.2rem;
}
.n-radio__dot {
  width: 18px;
  height: 18px;
}


@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleUp {
  from { transform: scale(0.8); }
  to { transform: scale(1.2); }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
