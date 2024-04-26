<template>
    <div>
        <comments
            :rows="paginateComments"
            :is-loading="$store.getters['isLoading']"
            :sort-by.sync="sortParams.sortBy"
            :sort-desc.sync="sortParams.sortDesc"
        >
            <template v-slot="{row}">
                <div class="actions">
                    <button @click="removeComment(row.id)">Удалить</button>
                    <button @click="commentForEdit = row">Редактировать</button>
                </div>
            </template>
            <template #pagination>
                <pagination
                    v-show="!$store.getters['isLoading']"
                    v-model="currentPage"
                    :pages="pages"
                />
            </template>
        </comments>
        <div class="forms">
            <div>
                <h4>Создать новый коментарий</h4>
                <comment-from @submit="onCreateComment" />
            </div>
            <div  v-if="commentForEdit">
                <h4>Редактировать новый коментарий</h4>
                <comment-from
                    :comment="commentForEdit"
                    @submit="onEditComment"
                />
            </div>
        </div>
    </div>
</template>
<script>
import { getComments, deleteComment, createComment, editComment } from '../libs/queries'
import comments from "../components/comments";
import commentFrom from "../components/commentFrom";
import pagination from "../components/pagination";
import { mapMutations } from 'vuex'

export default {
    components: {comments, commentFrom, pagination},
    data() {
        return {
            comments: [],
            sortParams: {
                sortBy: 'id',
                sortDesc: false
            },
            currentPage: 1,
            perPage: 3,
            commentForEdit: null
        }
    },
    mounted() {
        this.fetchComments()
    },
    computed: {
        paginateComments () {
            return this.paginate(this.comments, this.perPage, this.currentPage)
        },
        pages () {
            return Math.ceil(this.comments.length / this.perPage)
        }
    },
    watch: {
        sortParams: {
            handler: function() {
                this.sortComments()
            },
            deep: true
        }
    },
    methods: {
        fetchComments() {
            this.setLoading(true)
            getComments().then(({ data })=> {
                this.comments = data
            }).finally(() => this.setLoading(false))
        },
        removeComment(id) {
            this.setLoading(true)
            this.commentForEdit = null
            deleteComment(id).then(() => {
                this.fetchComments()
            })
        },
        onCreateComment(form) {
            this.setLoading(true)
            createComment(form).then(() => this.fetchComments())
        },
        onEditComment (form) {
            this.setLoading(true)
            this.commentForEdit = null
            editComment(form.id, form).then(() => this.fetchComments())
        },
        sortComments () {
            this.comments = [...this.comments]
                .sort((a,b) => {
                    if (a[this.sortParams.sortBy] >= b[this.sortParams.sortBy]) {
                        return this.sortParams.sortDesc ? 1 : -1
                    }
                    return !this.sortParams.sortDesc ? 1 : -1
                })
        },
        paginate (array, perPage, page) {
            return array.slice((page - 1) * perPage, page * perPage)
        },
        ...mapMutations([
            'setLoading'
        ])
    }
};
</script>

<style>
.forms {
    display: flex;
    justify-content: space-between;
}
@media (max-width: 700px) {
    .forms {
        flex-direction: column;
    }
}
</style>
