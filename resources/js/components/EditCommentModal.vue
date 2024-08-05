<template>  
    <u-modal v-model="isShow">
        <div class="delete-modal">
            <h6 class="delete-modal__title">
                Редактировать коментарий {{ comment ? comment.name : '' }}
            </h6>
            <comment-form @submit="onSubmit" :comment="comment" :disabled="isSending" :is-loading="isSending"/>
        </div>
    </u-modal>
</template>

<script>
import UModal from "../components/ui/UModal.vue";
import { editComment } from "../libs/queries";
import { mapActions, mapMutations } from "vuex/dist/vuex.common.js";
import CommentForm from "./CommentForm.vue";

export default {
    components: { UModal, CommentForm },
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        comment: {
            type: Object,
            default: () => { return {} }
        },
        value: Boolean
    },
    data() {
        return {
            isSending: false
        }
    },
    computed: {
        isShow: {
            get () {
                return this.value
            },
            set (value) {
                this.$emit('change', value)
            }
        }
    },
    methods: {
        onSubmit (comment) {
            this.isSending = true
            editComment(comment.id, comment).then(() => {
                this.isShow = false
                this.isSending = false
                this.setLoading(true)
                this.fetchComments()
            })
        },
        ...mapActions(['fetchComments']),
        ...mapMutations(['setLoading'])
    }
}
</script>

<style scoped>
.delete-modal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 20px;
}
.delete-modal__title {
    text-align: center;
    font-size: 16px;
    margin: 10px 0;
}
.delete-modal__actions {
    display: flex;
    justify-content: center;
    gap: 10px;
}
</style>
