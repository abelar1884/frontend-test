<template>
    <u-form @submit="onSubmit">
        <u-input 
            v-model="form.name" 
            label="Имя пользователя"
            :disabled="disabled"
            :error="errors.name"
        />
        
        <u-textarea 
            v-model="form.text" 
            label="Коментарий"
            :disabled="disabled"
            :error="errors.text"
            :rows="10"
         />
       
        <u-date-picker 
            v-model="form.date" 
            label="Дата"
            :disabled="disabled"
            :error="errors.date"
        />

        <template #submit-button>
            <button 
                type="submit" 
                class="button button_blue"
                :disabled="disabled"
            >
                    {{ isLoading ? 'Загрузка...' : form.id ? 'Сохранить' : 'Создать' }}
            </button>
        </template>
    </u-form>
</template>

<script>
import UForm from './ui/UForm.vue';
import UInput from './ui/UInput.vue';
import UTextarea from './ui/UTextarea.vue';
import UDatePicker from './ui/UDatePicker.vue';
import validateInput from '../libs/validation';

export default {
    components: {UForm, UInput, UTextarea, UDatePicker},
    props: {
        comment: Object,
        default: () => { return {} },
        disabled: {
            type: Boolean,
            default: false
        },
        isLoading: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            form: {
                name: null,
                text: null,
                date: new Date()
            },
            errors: {
                name: null,
                text: null,
                date: null
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
            const validationRules = {
                name: 'required',
                text: 'required',
                date: 'required|date'
            }
            const { isValid, message } = validateInput(this.form, validationRules)
            if (isValid) {
                this.$emit('submit', this.form)
                this.errors = {}
            } else{
                this.errors = message
            }
    
        },
        resetForm() {
            this.form.name = null,
            this.form.text = null,
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
    align-items: center;
    width: 100%;
}
</style>
