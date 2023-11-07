<template>
  <div>
    <h1>Cursos</h1>
    <div v-for="course in coursesList" :key="course.id">
      <h4>{{ course.name }}</h4>
      <br />
      <li v-for="student in course.students" :key="student.id">
        {{ student.name }}
      </li>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  layout: 'default',
  computed: {
    ...mapState('courses', ['coursesList']),
  },
  methods: {},
}
</script>
