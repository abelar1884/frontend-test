<template>
    <form class="form" @submit.prevent="onSubmit">
        <input v-model="form.name" placeholder="Имя пользователя" required>
        <textarea v-model="form.text" placeholder="Коментарий" required>

        </textarea>
        <date-picker v-model="form.date" />
        <button type="submit">
            {{ form.id ? 'Сохранить' : 'Создать'}}
        </button>
    </form>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

export default {
    components: {DatePicker},
    props: {
        comment: Object,
        default: () => { return {} }
    },
    data () {
        return {
            form: {
                name: null,
                text: null,
                date: new Date()
            }
        }
    },
    mounted() {
        if (this.comment) {
            this.form.id = this.comment.id
            this.form.name = this.comment.name
            this.form.text = this.comment.text
            this.form.date = new Date(this.comment.date)
        }
    },
    methods: {
        onSubmit () {
            this.$emit('submit', this.form)
            this.form.name = null
            this.form.text = null
            this.form.date = new Date()
        }
    }
}
</script>

<style scoped>
.form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 200px
}
</style>
