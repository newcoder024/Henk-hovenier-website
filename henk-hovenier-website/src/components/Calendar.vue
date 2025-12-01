<template>
  <div class="calendar">
    <div class="month">
      <button @click="prevMonth"><i class="fa-solid fa-arrow-left arrow-btn"></i></button>
      <span>{{ currentMonthName }} {{ currentYear }}</span>
      <button @click="nextMonth"><i class="fa-solid fa-arrow-right arrow-btn"></i></button>
    </div>

    <div class="weekdays">
      <span v-for="day in weekdays" :key="day">{{ day }}</span>
    </div>

    <div class="days">
      <span
        v-for="day in blanks"
        :key="'b'+day"
        class="blank"
      ></span>

      <button
      v-for="day in daysInMonth"
      :key="day"
      :class="{ occupied: isOccupied(day), selected: isSelected(day), disabled: isDisabled(day) }"
      @click="selectDay(day)"
      :disabled="isDisabled(day)"
      >
  {{ day }}        
</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    availability: {
      type: Object,
      default: () => ({}),
    },
    modelValue: String, // v-model: selected date
  },
  data() {
    const today = new Date();
    return {
      currentMonth: today.getMonth(),
      currentYear: today.getFullYear(),
      weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    };
  },
  computed: {
    currentMonthName() {
      return new Date(this.currentYear, this.currentMonth).toLocaleString('default', { month: 'long' });
    },
    daysInMonth() {
      return new Array(new Date(this.currentYear, this.currentMonth + 1, 0).getDate()).fill(0).map((_, i) => i + 1);
    },
    blanks() {
      const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
      return new Array(firstDay).fill(0);
    }
  },
  methods: {
    isWeekend(day){
        const date = new Date(this.currentYear, this.currentMonth, day);
        const dayOfWeek = date.getDay();
        return dayOfWeek === 0 || dayOfWeek === 6;
    },
     isDisabled(day) {
    return this.isOccupied(day) || this.isWeekend(day);
    },
    isOccupied(day) {
      const dateStr = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      return this.availability[dateStr] >= 8; // full day booked
    },
    isSelected(day) {
      if (!this.modelValue) return false;
      const selectedDay = new Date(this.modelValue);
      return selectedDay.getDate() === day && selectedDay.getMonth() === this.currentMonth && selectedDay.getFullYear() === this.currentYear;
    },
    selectDay(day) {
    if (this.isDisabled(day)) return; // can't select
    const dateStr = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    this.$emit('update:modelValue', dateStr);
  },
    prevMonth() {
      if (this.currentMonth === 0) {
        this.currentMonth = 11;
        this.currentYear--;
      } else {
        this.currentMonth--;
      }
    },
    nextMonth() {
      if (this.currentMonth === 11) {
        this.currentMonth = 0;
        this.currentYear++;
      } else {
        this.currentMonth++;
      }
    }
  }
};
</script>

<style scoped>
.arrow-btn{
    color:black;
    cursor: pointer;
    padding: 5px;
}
.days button.disabled {
  background: #ddd;
  cursor: not-allowed;
}
.days button.occupied{
    background: #f08080;
    cursor: not-allowed;
}

.calendar {
  width: 300px;
  margin: 0 auto;
  text-align: center;
}

.month {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.weekdays, .days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.weekdays span {
  font-weight: bold;
}

.days button {
  margin: 2px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
  background: white;
  color: black;
}

.days button.occupied {
  background: #f08080;
  cursor: not-allowed;
}

.days button.selected {
  background: #4CAF50;
  color: white;
}

.days .blank {
  height: 32px;
}
</style>
