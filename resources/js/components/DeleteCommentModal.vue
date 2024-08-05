<template>
    <u-modal v-model="isShow">
        <div class="delete-modal">
            <h6 class="delete-modal__title">
                Удалить коментарий {{ comment ? comment.name : '' }}?
            </h6>
            <div class="delete-modal__actions">
                <button class="button button_grey" @click="isShow = false">Нет</button>
                <button class="button button_red" @click="removeComment(comment.id)">Удалить</button>
            </div>
        </div>
    </u-modal>
</template>

<script>
import UModal from "../components/ui/UModal.vue";
import { deleteComment } from "../libs/queries";
import { mapActions, mapMutations } from "vuex/dist/vuex.common.js";

export default {
    components: { UModal },
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
            isShowDeleteModal: false
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
        removeComment(id) {
            this.isShow = false
            this.setLoading(true)
            deleteComment(id).then(() => {
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
