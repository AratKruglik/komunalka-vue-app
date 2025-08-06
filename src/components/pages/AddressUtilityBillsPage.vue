<template>
  <MainLayout>
    <div class="utility-bills-page">
      <!-- Address Selector -->
      <div class="address-selector-section">
        <h2 class="section-title">Оберіть адресу</h2>
        <div class="address-dropdown">
          <select v-model="selectedAddress" class="address-select">
            <option value="address1">вул. Хрещатик, 22, кв. 15, м. Київ</option>
            <option value="address2">вул. Шевченка, 15, кв. 8, м. Київ</option>
          </select>
          <ChevronDownIcon class="dropdown-icon" />
        </div>
      </div>

      <!-- Utility Progress Tracker -->
      <div class="utility-progress">
        <div class="progress-item" :class="{ completed: utilities.electricity.completed }">
          <div class="progress-icon">
            <BoltIcon class="icon" />
          </div>
          <span class="progress-label">Електроенергія</span>
          <div class="progress-line" :class="{ filled: utilities.electricity.completed }"></div>
        </div>
        
        <div class="progress-item" :class="{ completed: utilities.gas.completed }">
          <div class="progress-icon">
            <FireIcon class="icon" />
          </div>
          <span class="progress-label">Газ</span>
          <div class="progress-line" :class="{ filled: utilities.gas.completed }"></div>
        </div>
        
        <div class="progress-item" :class="{ completed: utilities.coldWater.completed, inProgress: utilities.coldWater.inProgress }">
          <div class="progress-icon">
            <BeakerIcon class="icon" />
          </div>
          <span class="progress-label">Холодна вода</span>
          <div class="progress-line" :class="{ filled: utilities.coldWater.completed, partial: utilities.coldWater.inProgress }"></div>
        </div>
        
        <div class="progress-item" :class="{ pending: utilities.hotWater.pending }">
          <div class="progress-icon">
            <WifiIcon class="icon" />
          </div>
          <span class="progress-label">Гаряча вода</span>
        </div>
      </div>

      <!-- Utility Sections -->
      <div class="utility-sections">
        <!-- Electricity Section -->
        <UtilitySection 
          :utility="utilities.electricity"
          @update="updateUtility('electricity', $event)"
        />
        
        <!-- Gas Section -->
        <UtilitySection 
          :utility="utilities.gas"
          @update="updateUtility('gas', $event)"
        />
        
        <!-- Cold Water Section -->
        <UtilitySection 
          :utility="utilities.coldWater"
          @update="updateUtility('coldWater', $event)"
        />
        
        <!-- Hot Water Section -->
        <UtilitySection 
          :utility="utilities.hotWater"
          @update="updateUtility('hotWater', $event)"
        />
      </div>

      <!-- Summary Section -->
      <div class="summary-section">
        <h2 class="section-title">Підсумок показань</h2>
        <div class="summary-table">
          <table>
            <thead>
              <tr>
                <th>Послуга</th>
                <th>Попередні</th>
                <th>Поточні</th>
                <th>Споживання</th>
                <th>Тариф</th>
                <th>Вартість</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(utility, key) in utilities" :key="key">
                <td>
                  <div class="utility-info">
                    <div class="utility-icon">
                      <component :is="getUtilityIcon(utility.type)" class="icon" />
                    </div>
                    <span>{{ utility.name }}</span>
                  </div>
                </td>
                <td>{{ utility.previousReading }} {{ utility.unit }}</td>
                <td>{{ utility.currentReading }} {{ utility.unit }}</td>
                <td>{{ utility.consumption }} {{ utility.unit }}</td>
                <td>{{ utility.tariff }} грн/{{ utility.unit }}</td>
                <td>{{ utility.cost }} грн</td>
                <td>
                  <span :class="['status-badge', utility.status]">
                    {{ getStatusLabel(utility.status) }}
                  </span>
                </td>
              </tr>
              <tr class="total-row">
                <td colspan="5"><strong>Загальна сума:</strong></td>
                <td><strong>{{ totalCost }} грн</strong></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Action Buttons -->
        <div class="action-buttons">
          <button class="btn-secondary">
            <DocumentTextIcon class="icon" />
            Зберегти чернетку
          </button>
          <button class="btn-primary">
            <CheckIcon class="icon" />
            Зберегти всі показання
          </button>
        </div>
      </div>

      <!-- History Section -->
      <div class="history-section">
        <h2 class="section-title">Історія показань</h2>
        <div class="history-table">
          <table>
            <thead>
              <tr>
                <th>Дата</th>
                <th>Послуга</th>
                <th>Показання</th>
                <th>Споживання</th>
                <th>Вартість</th>
                <th>Дії</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="record in historyRecords" :key="record.id">
                <td>{{ formatDate(record.date) }}</td>
                <td>
                  <div class="utility-info">
                    <div class="utility-icon">
                      <component :is="getUtilityIcon(record.type)" class="icon" />
                    </div>
                    <span>{{ record.name }}</span>
                  </div>
                </td>
                <td>{{ record.reading }} {{ record.unit }}</td>
                <td>{{ record.consumption }} {{ record.unit }}</td>
                <td>{{ record.cost }} грн</td>
                <td>
                  <button class="action-btn">
                    <EyeIcon class="icon" />
                  </button>
                  <button class="action-btn">
                    <DocumentTextIcon class="icon" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <button class="view-all-history">
          Переглянути всю історію показань
          <ChevronRightIcon class="icon" />
        </button>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from '../layouts/MainLayout.vue'
import UtilitySection from './UtilitySection.vue'
import { 
  DocumentTextIcon,
  ChevronRightIcon,
  ChevronDownIcon,
  EyeIcon,
  BoltIcon,
  FireIcon,
  BeakerIcon,
  WifiIcon,
  CheckIcon
} from '@heroicons/vue/24/outline'

export default {
  name: 'AddressUtilityBillsPage',
  components: {
    MainLayout,
    UtilitySection,
    DocumentTextIcon,
    ChevronRightIcon,
    ChevronDownIcon,
    EyeIcon,
    BoltIcon,
    FireIcon,
    BeakerIcon,
    WifiIcon,
    CheckIcon
  },
  data() {
    return {
      selectedAddress: 'address1',
      utilities: {
        electricity: {
          type: 'electricity',
          name: 'Електроенергія',
          unit: 'кВт⋅год',
          currentReading: 5432,
          previousReading: 5212,
          readingDate: '2023-06-25',
          tariff: 1.68,
          completed: true,
          status: 'completed'
        },
        gas: {
          type: 'gas',
          name: 'Газ',
          unit: 'м³',
          currentReading: 1875,
          previousReading: 1845,
          readingDate: '2023-06-25',
          tariff: 7.96,
          completed: true,
          status: 'completed'
        },
        coldWater: {
          type: 'coldWater',
          name: 'Холодна вода',
          unit: 'м³',
          currentReading: '',
          previousReading: 143.5,
          readingDate: '2023-06-25',
          tariff: 25.38,
          completed: false,
          inProgress: true,
          status: 'in-progress'
        },
        hotWater: {
          type: 'hotWater',
          name: 'Гаряча вода',
          unit: 'м³',
          currentReading: '',
          previousReading: 87.2,
          readingDate: '2023-06-25',
          tariff: 93.22,
          completed: false,
          pending: true,
          status: 'pending'
        }
      },
      historyRecords: [
        {
          id: 1,
          date: '2023-05-25',
          type: 'electricity',
          name: 'Електроенергія',
          unit: 'кВт⋅год',
          reading: 5212,
          consumption: 205,
          cost: 344.40
        },
        {
          id: 2,
          date: '2023-05-25',
          type: 'gas',
          name: 'Газ',
          unit: 'м³',
          reading: 1845,
          consumption: 28,
          cost: 222.88
        },
        {
          id: 3,
          date: '2023-05-25',
          type: 'coldWater',
          name: 'Холодна вода',
          unit: 'м³',
          reading: 143.5,
          consumption: 3.2,
          cost: 81.22
        },
        {
          id: 4,
          date: '2023-05-25',
          type: 'hotWater',
          name: 'Гаряча вода',
          unit: 'м³',
          reading: 87.2,
          consumption: 1.8,
          cost: 167.80
        }
      ]
    }
  },
  computed: {
    totalCost() {
      return Object.values(this.utilities)
        .reduce((total, utility) => total + (utility.cost || 0), 0)
        .toFixed(2)
    }
  },
  methods: {
    updateUtility(utilityKey, data) {
      this.utilities[utilityKey] = { ...this.utilities[utilityKey], ...data }
      
      // Calculate consumption and cost
      if (data.currentReading && this.utilities[utilityKey].previousReading) {
        const consumption = data.currentReading - this.utilities[utilityKey].previousReading
        const cost = consumption * this.utilities[utilityKey].tariff
        
        this.utilities[utilityKey].consumption = consumption
        this.utilities[utilityKey].cost = cost.toFixed(2)
        this.utilities[utilityKey].completed = true
        this.utilities[utilityKey].status = 'completed'
      }
    },
    getUtilityIcon(type) {
      const icons = {
        electricity: 'BoltIcon',
        gas: 'FireIcon',
        coldWater: 'BeakerIcon',
        hotWater: 'WifiIcon'
      }
      return icons[type] || 'DocumentTextIcon'
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
    }
  }
}
</script>

<style scoped>
.utility-bills-page {
  width: 100%;
  min-height: 100vh;
  background: #f8fafc;
  padding: 16px;
  max-width: 1184px;
  margin: 0 auto;
}

/* Address Selector */
.address-selector-section {
  background: white;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 24px 0;
}

.address-dropdown {
  position: relative;
}

.address-select {
  width: 100%;
  padding: 12px 48px 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  background: white;
  appearance: none;
  outline: none;
}

.address-select:focus {
  border-color: #ffd700;
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.1);
}

.dropdown-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #6b7280;
  pointer-events: none;
}

/* Utility Progress */
.utility-progress {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
  padding: 0 16px;
}

.progress-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  position: relative;
}

.progress-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  background: #e5e7eb;
  z-index: 2;
}

.progress-item.completed .progress-icon {
  background: #ffd700;
}

.progress-item.inProgress .progress-icon {
  background: #ffd700;
}

.progress-icon .icon {
  width: 20px;
  height: 20px;
  color: #333;
}

.progress-item:not(.completed):not(.inProgress) .progress-icon .icon {
  color: #6b7280;
}

.progress-label {
  font-size: 14px;
  font-weight: 500;
  color: #1f2937;
  text-align: center;
  margin-top: 8px;
}

.progress-line {
  position: absolute;
  top: 20px;
  left: 50%;
  width: calc(100% - 40px);
  height: 4px;
  background: #e5e7eb;
  z-index: 1;
}

.progress-item:last-child .progress-line {
  display: none;
}

.progress-line.filled {
  background: #ffd700;
}

.progress-line.partial {
  background: linear-gradient(to right, #ffd700 50%, #e5e7eb 50%);
}

/* Utility Sections */
.utility-sections {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 24px;
}

/* Summary Section */
.summary-section {
  background: white;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
}

.summary-table {
  overflow-x: auto;
  margin-bottom: 24px;
}

.summary-table table {
  width: 100%;
  border-collapse: collapse;
}

.summary-table th {
  background: #f9fafb;
  padding: 12px 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  border-bottom: 1px solid #e5e7eb;
}

.summary-table th:last-child {
  text-align: center;
}

.summary-table td {
  padding: 16px;
  border-bottom: 1px solid #f3f4f6;
  font-size: 14px;
  color: #1f2937;
}

.utility-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.utility-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffd700;
}

.utility-icon .icon {
  width: 16px;
  height: 16px;
  color: #333;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
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

.total-row {
  background: #f9fafb;
  font-weight: 600;
}

.total-row td {
  border-bottom: none;
  font-weight: 700;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 16px;
  justify-content: flex-end;
}

.btn-secondary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #f3f4f6;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: #ffd700;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary:hover {
  background: #fbbf24;
}

.btn-secondary .icon,
.btn-primary .icon {
  width: 16px;
  height: 16px;
}

/* History Section */
.history-section {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
}

.history-table {
  overflow-x: auto;
  margin-bottom: 24px;
}

.history-table table {
  width: 100%;
  border-collapse: collapse;
}

.history-table th {
  background: #f9fafb;
  padding: 12px 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  border-bottom: 1px solid #e5e7eb;
}

.history-table th:last-child {
  text-align: center;
}

.history-table td {
  padding: 16px;
  border-bottom: 1px solid #f3f4f6;
  font-size: 14px;
  color: #1f2937;
}

.action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.2s;
  margin-right: 8px;
}

.action-btn:hover {
  background: #f3f4f6;
}

.action-btn .icon {
  width: 16px;
  height: 16px;
  color: #6b7280;
}

.view-all-history {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #2563eb;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  margin: 0 auto;
}

.view-all-history:hover {
  color: #1d4ed8;
}

.view-all-history .icon {
  width: 16px;
  height: 16px;
}

/* Responsive */
@media (max-width: 768px) {
  .utility-bills-page {
    padding: 8px;
  }
  
  .progress-item {
    font-size: 12px;
  }
  
  .progress-label {
    font-size: 12px;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .summary-table,
  .history-table {
    font-size: 12px;
  }
}
</style>