<template>
  <div class="utility-section" :class="{ completed: utility.completed, 'in-progress': utility.inProgress }">
    <!-- Header -->
    <div class="section-header">
      <div class="utility-info">
        <div class="utility-icon">
          <component :is="getUtilityIcon(utility.type)" class="icon" />
        </div>
        <h3 class="utility-name">{{ utility.name }}</h3>
      </div>
      <div class="status-badge" :class="utility.status">
        {{ getStatusLabel(utility.status) }}
      </div>
    </div>

    <!-- Content -->
    <div class="section-content">
      <div class="inputs-section">
        <!-- Current Reading -->
        <div class="input-group">
          <label class="input-label">Поточні показання</label>
          <div class="input-with-unit">
            <input 
              type="number" 
              v-model="localUtility.currentReading"
              @input="updateReading"
              class="reading-input"
              :placeholder="utility.completed ? utility.currentReading : 'Введіть поточні показання'"
            />
            <span class="unit">{{ utility.unit }}</span>
          </div>
        </div>

        <!-- Previous Reading -->
        <div class="input-group">
          <div class="label-with-date">
            <label class="input-label">Попередні показання</label>
            <span class="reading-date">{{ formatDate(utility.readingDate) }}</span>
          </div>
          <div class="input-with-unit">
            <input 
              type="number" 
              :value="utility.previousReading"
              readonly
              class="reading-input readonly"
            />
            <span class="unit">{{ utility.unit }}</span>
          </div>
        </div>

        <!-- Date Input -->
        <div class="input-group">
          <label class="input-label">Дата зняття показань</label>
          <div class="date-input-wrapper">
            <input 
              type="date" 
              v-model="localUtility.readingDate"
              @input="updateReading"
              class="date-input"
            />
            <CalendarIcon class="date-icon" />
          </div>
        </div>
      </div>

      <div class="photo-and-calculation">
        <!-- Photo Upload -->
        <div class="photo-section">
          <label class="input-label">Фото лічильника</label>
          <div class="photo-upload" :class="{ 'has-photo': hasPhoto }">
            <div v-if="!hasPhoto" class="upload-placeholder">
              <CameraIcon class="upload-icon" />
              <p class="upload-text">Завантажте фото вашого лічильника</p>
            </div>
            <img v-else :src="photoUrl" alt="Лічильник" class="uploaded-photo" />
            <button class="upload-button" @click="uploadPhoto">
              <CameraIcon class="icon" />
              Завантажити фото
            </button>
          </div>
        </div>

        <!-- Calculation Summary -->
        <div class="calculation-section" :class="{ active: hasCalculation }">
          <h4 class="calculation-title">Розрахунок</h4>
          <div class="calculation-row">
            <span class="calc-label">Споживання:</span>
            <span class="calc-value">{{ consumption }} {{ utility.unit }}</span>
          </div>
          <div class="calculation-row">
            <span class="calc-label">Тариф:</span>
            <span class="calc-value">{{ utility.tariff }} грн/{{ utility.unit }}</span>
          </div>
          <div class="calculation-row total">
            <span class="calc-label">Вартість:</span>
            <span class="calc-value total-cost">{{ cost }} грн</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  BoltIcon,
  FireIcon,
  BeakerIcon,
  WifiIcon,
  CameraIcon,
  CalendarIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'UtilitySection',
  components: {
    BoltIcon,
    FireIcon,
    BeakerIcon,
    WifiIcon,
    CameraIcon,
    CalendarIcon
  },
  props: {
    utility: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localUtility: {
        currentReading: this.utility.currentReading || '',
        readingDate: this.utility.readingDate || ''
      },
      hasPhoto: false,
      photoUrl: ''
    }
  },
  computed: {
    consumption() {
      if (!this.localUtility.currentReading || !this.utility.previousReading) {
        return '--'
      }
      return this.localUtility.currentReading - this.utility.previousReading
    },
    cost() {
      if (this.consumption === '--') {
        return '-- грн'
      }
      return (this.consumption * this.utility.tariff).toFixed(2)
    },
    hasCalculation() {
      return this.consumption !== '--'
    }
  },
  methods: {
    updateReading() {
      this.$emit('update', this.localUtility)
    },
    getUtilityIcon(type) {
      const icons = {
        electricity: 'BoltIcon',
        gas: 'FireIcon',
        coldWater: 'BeakerIcon',
        hotWater: 'BeakerIcon'
      }
      return icons[type] || 'BoltIcon'
    },
    getStatusLabel(status) {
      const labels = {
        completed: 'Заповнено',
        'in-progress': 'В процесі',
        pending: 'Очікує заповнення'
      }
      return labels[status] || status
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('uk-UA')
    },
    uploadPhoto() {
      // Photo upload logic would go here
      // For demo purposes, we'll just toggle the state
      this.hasPhoto = !this.hasPhoto
      if (this.hasPhoto) {
        this.photoUrl = 'https://via.placeholder.com/128x128?text=Meter'
      }
    }
  }
}
</script>

<style scoped>
.utility-section {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  margin-bottom: 24px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #f3f4f6;
}

.utility-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.utility-icon {
  width: 40px;
  height: 40px;
  background: #ffd700;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.utility-icon .icon {
  width: 20px;
  height: 20px;
  color: #333;
}

.utility-section.completed .utility-icon {
  background: #ffd700;
}

.utility-section.in-progress .utility-icon {
  background: #ffd700;
}

.utility-section:not(.completed):not(.in-progress) .utility-icon {
  background: #e5e7eb;
}

.utility-name {
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.status-badge {
  padding: 6px 12px;
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 600;
}

.status-badge.completed {
  background: #dcfce7;
  color: #166534;
}

.status-badge.in-progress {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.pending {
  background: #f3f4f6;
  color: #1f2937;
}

.section-content {
  padding: 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.inputs-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-label {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.label-with-date {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.reading-date {
  font-size: 14px;
  color: #6b7280;
}

.input-with-unit {
  display: flex;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  overflow: hidden;
}

.reading-input {
  flex: 1;
  padding: 12px 16px;
  border: none;
  outline: none;
  font-size: 16px;
  background: white;
}

.reading-input.readonly {
  background: #f9fafb;
  color: #6b7280;
}

.unit {
  padding: 12px 16px;
  background: #f3f4f6;
  border-left: 1px solid #d1d5db;
  font-size: 16px;
  color: #6b7280;
  white-space: nowrap;
}

.date-input-wrapper {
  position: relative;
}

.date-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
}

.date-input:focus {
  border-color: #ffd700;
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
}

.date-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #9ca3af;
  pointer-events: none;
}

.photo-and-calculation {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.photo-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.photo-upload {
  border: 2px dashed #d1d5db;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  position: relative;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.upload-icon {
  width: 48px;
  height: 48px;
  color: #9ca3af;
}

.upload-text {
  color: #6b7280;
  font-size: 14px;
  margin: 0;
}

.uploaded-photo {
  width: 128px;
  height: 128px;
  border-radius: 8px;
  object-fit: cover;
}

.upload-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #f3f4f6;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  margin-top: 12px;
}

.upload-button .icon {
  width: 16px;
  height: 16px;
}

.calculation-section {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
}

.calculation-section.active {
  background: #eff6ff;
  border-color: #bfdbfe;
}

.calculation-title {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 12px 0;
}

.calculation-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
}

.calculation-row.total {
  border-top: 1px solid #e2e8f0;
  padding-top: 8px;
  margin-top: 8px;
}

.calc-label {
  font-size: 16px;
  color: #6b7280;
}

.calc-value {
  font-size: 16px;
  font-weight: 500;
  color: #1f2937;
}

.total-cost {
  font-weight: 700;
  color: #1f2937;
}

@media (max-width: 768px) {
  .section-content {
    grid-template-columns: 1fr;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>