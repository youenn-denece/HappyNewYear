<template>
  <div id="app">
    <!-- Contenu principal -->
    <div class="main-container">
      <!-- Formulaire -->
      <div v-if="!showMessage" class="form-container">
        <div class="glass-card">
          <!-- Select des villes -->
          <div class="input-group">
            <label for="city" class="floating-label">Choisissez votre ville</label>
            <div class="select-wrapper">
              <select id="city" v-model="selectedCity" class="custom-select">
                <option value="">-- Sélectionnez une ville --</option>
                <option value="quimper">Quimper</option>
                <option value="quimperKermoisan">Quimper (Kermoisan)</option>
                <option value="quimperle">Quimperlé</option>
                <option value="rennes">Rennes</option>
                <option value="mellac">Mellac</option>
                <option value="plelan">Plélan le Grand</option>
                <option value="nantes">Nantes</option>
                <option value="thouareSurLoire">Thouaré sur Loire</option>
              </select>
              <div class="select-arrow"></div>
            </div>
          </div>

          <!-- Checkboxes genre -->
          <div class="input-group">
            <label class="floating-label">Votre genre</label>
            <div class="gender-container">
              <div class="checkbox-card" :class="{ active: isHomme }">
                <input
                    type="checkbox"
                    id="homme"
                    v-model="isHomme"
                    @change="handleGenderChange('homme')"
                    class="hidden-checkbox"
                >
                <label for="homme" class="checkbox-label">
                  <div class="checkbox-icon">
                    <div class="icon-male">♂</div>
                  </div>
                  <span class="checkbox-text">Je suis un homme</span>
                  <div class="checkbox-indicator"></div>
                </label>
              </div>

              <div class="checkbox-card" :class="{ active: isFemme }">
                <input
                    type="checkbox"
                    id="femme"
                    v-model="isFemme"
                    @change="handleGenderChange('femme')"
                    class="hidden-checkbox"
                >
                <label for="femme" class="checkbox-label">
                  <div class="checkbox-icon">
                    <div class="icon-female">♀</div>
                  </div>
                  <span class="checkbox-text">Je suis une femme</span>
                  <div class="checkbox-indicator"></div>
                </label>
              </div>
            </div>

            <div v-if="selectedGender" class="selection-feedback">
              Sélection : {{ selectedGender === 'homme' ? 'Homme' : 'Femme' }}
            </div>
          </div>
        </div>
      </div>

      <!-- Message de vœux -->
      <div v-if="showMessage" class="message-container">
        <div class="message-content">
          <h2 class="wish-message">
            {{ wishMessage.text }}<span class="name-container">
        <span class="name-green">{{ wishMessage.name }}</span>
        <span class="name-pink">{{ wishMessage.name }}</span>
      </span>{{ wishMessage.exclamation }}
          </h2>
        </div>
        <button @click="resetForm" class="reset-button">
          <span class="button-text">Recommencer</span>
        </button>
      </div>


    </div>
  </div>
</template>

<script>
import {ref, computed} from 'vue'

export default {
  name: 'App',
  setup() {
    const selectedCity = ref('')
    const isHomme = ref(false)
    const isFemme = ref(false)
    const selectedGender = ref('')

    const handleGenderChange = (gender) => {
      if (gender === 'homme') {
        if (isHomme.value) {
          isFemme.value = false
          selectedGender.value = 'homme'
        } else {
          selectedGender.value = ''
        }
      } else if (gender === 'femme') {
        if (isFemme.value) {
          isHomme.value = false
          selectedGender.value = 'femme'
        } else {
          selectedGender.value = ''
        }
      }
    }

    const nameMapping = {
      'chavagne-femme': 'Oforiwa',
      'chavagne-homme': 'Mathou',
      'nantes-femme': 'Marion',
      'nantes-homme': 'Sébastien',
      'rennes-femme': 'Elodie',
      'quimperle-homme': 'Claude',
      'quimper-homme': 'Antoine',
      'quimper-femme': 'Anne',
      'rennes-homme': 'Youenn',
      'plelan-femme': 'Moomoone',
      'mellac-homme': 'Sylvain',
      'mellac-femme': 'Milou',
      'plelan-homme': 'Adrien',
      'thouareSurLoire-femme' : 'Rose',
      'thouareSurLoire-homme' : 'Léandre'



    }

    const isFormComplete = computed(() => {
      return selectedCity.value !== '' && selectedGender.value !== ''
    })

    const showMessage = computed(() => {
      return isFormComplete.value
    })

    const wishMessage = computed(() => {
      if (!isFormComplete.value) return { text: '', name: '', exclamation: '' }
      const key = `${selectedCity.value}-${selectedGender.value}`
      const name = nameMapping[key] || 'à toi'
      return {
        text: 'Bonne année ',
        name: name,
        exclamation: ' !'
      }
    })

    const resetForm = () => {
      selectedCity.value = ''
      isHomme.value = false
      isFemme.value = false
      selectedGender.value = ''
    }

    return {
      selectedCity,
      isHomme,
      isFemme,
      selectedGender,
      handleGenderChange,
      showMessage,
      wishMessage,
      resetForm
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200;12..96,300;12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}

#app {
  min-height: 100vh;
  min-height: 100dvh;
  font-family: 'Bricolage Grotesque', sans-serif;
  overflow-x: hidden;
  position: relative;
  touch-action: manipulation;
  background: #282E2E;
}

/* Contenu principal */
.main-container {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  padding-top: max(2rem, env(safe-area-inset-top) + 1rem);
  padding-bottom: max(2rem, env(safe-area-inset-bottom) + 1rem);
}

/* Formulaire */
.form-container {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.input-group {
  width: 100%;
}

.floating-label {
  display: block;
  font-size: 1.4rem;
  font-weight: 700;
  color: #24D26D;
  margin-bottom: 1rem;
  letter-spacing: 0.02em;
  text-align: center;
  font-variation-settings: "opsz" 24;
}

/* Select */
.select-wrapper {
  position: relative;
  margin-bottom: 1rem;
}

.custom-select {
  width: 100%;
  padding: 1.2rem;
  font-size: 18px;
  font-family: 'Bricolage Grotesque', sans-serif;
  font-weight: 500;
  background: #525351;
  color: #24D26D;
  border: 2px solid #24D26D;
  border-radius: 20px;
  outline: none;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  touch-action: manipulation;
  text-align: center;
  letter-spacing: 0.01em;
  font-variation-settings: "opsz" 16;
}

.custom-select option {
  background: #282E2E;
  color: #24D26D;
}

.select-arrow {
  position: absolute;
  right: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid #24D26D;
  pointer-events: none;
}

/* Checkboxes */
.gender-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;
}

.checkbox-card {
  background: transparent;
  border: 2px solid #24D26D;
  border-radius: 25px;
  padding: 1.5rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  touch-action: manipulation;
  min-height: 90px;
}

.checkbox-card.active {
  background: rgba(40, 46, 46, 0.05);
}

.hidden-checkbox {
  display: none;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  cursor: pointer;
  color: #24D26D;
  width: 100%;
}

.checkbox-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: transparent;
  border: 2px solid #24D26D;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  flex-shrink: 0;
}

.icon-male, .icon-female {
  font-size: 2rem;
  font-weight: bold;
  color: #24D26D;
}

.checkbox-card.active .checkbox-icon {
  background: rgba(40, 46, 46, 0.1);
}

.checkbox-text {
  font-weight: 600;
  font-size: 1.2rem;
  flex: 1;
  color: #24D26D;
  letter-spacing: 0.01em;
  font-variation-settings: "opsz" 18;
}

.checkbox-indicator {
  width: 28px;
  height: 28px;
  border: 2px solid #24D26D;
  border-radius: 50%;
  position: relative;
  flex-shrink: 0;
}

.checkbox-card.active .checkbox-indicator {
  background: #24D26D;
}

.checkbox-card.active .checkbox-indicator::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #282E2E;
  font-size: 16px;
  font-weight: bold;
}

/* Feedback de sélection */
.selection-feedback {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 1.5rem;
  color: #24D26D;
  font-weight: 600;
  font-size: 1.1rem;
  letter-spacing: 0.02em;
  font-variation-settings: "opsz" 20;
}

/* Message de célébration */
.message-container {
  position: relative;
  width: 100%;
  max-width: 600px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 80vh;
}

.message-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wish-message {
  font-size: clamp(3.5rem, 16vw, 6rem);
  font-weight: 800;
  font-family: 'Bricolage Grotesque', sans-serif;
  color: #24D26D;
  line-height: 1.1;
  letter-spacing: 0.02em;
  text-align: center;
  font-variation-settings: "opsz" 32;
}
/* Animation rideau pour le nom */
.name-container {
  position: relative;
  display: inline-block;
}

.name-green {
  color: #24D26D;
  position: relative;
  z-index: 1;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  animation: hideGreen 2s ease-in-out forwards;
}

.name-pink {
  color: #FE81CC;
  position: absolute;
  top: -2px;
  left: -1px;
  z-index: 2;
  width: 105%;
  font-size: 1.05em;
  clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
  animation: revealPink 2s ease-in-out forwards;
}

@keyframes hideGreen {
  0% {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  }
  100% {
    clip-path: polygon(110% 0, 110% 0, 110% 100%, 110% 100%);
  }
}

@keyframes revealPink {
  0% {
    clip-path: polygon(0 0, 0 0, 0 100%, 0 100%);
  }
  100% {
    clip-path: polygon(0 0, 115% 0, 100% 100%, 0 100%);
  }
}

/* Bouton de reset */
.reset-button {
  position: relative;
  padding: 0.7rem 1.5rem;
  font-size: 0.6rem;
  font-weight: 700;
  font-family: 'Bricolage Grotesque', sans-serif;
  color: #282E2E;
  background: #24D26D;
  border: 2px solid #24D26D;
  border-radius: 50px;
  cursor: pointer;
  overflow: hidden;
  touch-action: manipulation;
  min-height: 30px;
  min-width: 90px;
  letter-spacing: 0.02em;
  z-index: 15;
  font-variation-settings: "opsz" 20;
  align-self: center;
  margin-bottom: 2rem;
}

.reset-button:hover {
  background: transparent;
  color: #24D26D;
}

.button-text {
  position: relative;
  z-index: 2;
}

/* Optimisations spécifiques mobile */
@media (max-width: 480px) {
  .main-container {
    padding: 1rem;
    padding-top: max(2rem, env(safe-area-inset-top) + 1rem);
  }

  .form-container {
    gap: 1.5rem;
  }

  .checkbox-card {
    padding: 1.2rem;
    min-height: 80px;
  }

  .checkbox-icon {
    width: 50px;
    height: 50px;
  }

  .icon-male, .icon-female {
    font-size: 1.6rem;
  }

  .checkbox-text {
    font-size: 1.1rem;
  }

  .floating-label {
    font-size: 1.2rem;
  }

  .wish-message {
    font-size: clamp(2.8rem, 14vw, 4.5rem);
  }

  .custom-select {
    font-size: 16px;
  }

  .reset-button {
    margin-bottom: 1rem;
  }
}

</style>