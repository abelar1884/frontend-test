<template>
    <div class="create-form">
        <comment-form @submit="onSubmit" ref="addForm" :disabled="isSending" :is-loading="isSending" />
    </div>
</template>

<script>
import { createComment } from '../libs/queries';
import CommentForm from './CommentForm.vue';
import { mapActions, mapMutations } from 'vuex'

export default {
    data () {
        return {
            isSending: false
        }
    },
    components: {
        CommentForm
    },
    methods: {
        onSubmit(form) {
            this.isSending = true
            createComment(form).then(() => {
                this.setLoading(true)
                this.fetchComments()
                this.isSending = false
                this.$refs.addForm.resetForm()
            })
        },
        ...mapActions(['fetchComments']),
        ...mapMutations(['setLoading'])
    }
}
</script>