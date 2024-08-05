<template>
    <div class="container">
        <u-table
            :headers="headers"
            :rows="paginateComments"
            :is-loading="isLoading"
            :sort-by="sortParams.sortBy"
            :sort-desc="sortParams.sortDesc"
            @sort="onSort"
        >
            <template #header-actions="{header}">
               Управление
            </template>
            <template #cell-date="{row}">
                {{ parseDate(row.date) }}
            </template>
            <template #cell-actions="{row}">
                <div class="actions">
                    <button @click="onDelete(row)" class="button button_red">Удалить</button>
                    <button @click="onEdit(row)" class="button button_blue">Редактировать</button>
                </div>
            </template>
            <template #pagination>
                <u-pagination
                    v-if="comments.length > paginationParams.perPage && !isLoading"
                    :current-page="paginationParams.currentPage"
                    :items-per-page="paginationParams.perPage"
                    :total-items="comments.length"
                    @page-changed="paginationParams = $event"
                />
            </template>
        </u-table>
        <delete-comment-modal v-model="isShowDeleteModal" :comment="selectedComment" />
        <edit-comment-modal v-model="isShowEditModal" :comment="selectedComment" />
        <add-comment />
    </div>
</template>
<script>
import { mapActions, mapMutations } from 'vuex'
import UTable from '../components/ui/UTable.vue';
import UModal from '../components/ui/UModal.vue';
import UPagination from '../components/ui/UPagination.vue';
import DeleteCommentModal from '../components/DeleteCommentModal.vue';
import EditCommentModal from '../components/EditCommentModal.vue';
import AddComment from '../components/AddComment.vue';

export default {
    components: {
        DeleteCommentModal,
        EditCommentModal,
        AddComment,
        UModal, 
        UPagination, 
        UTable
    },
    data() {
        return {
            selectedComment: null,
            sortParams: {
                sortBy: 'id',
                sortDesc: true
            },
            commentForEdit: null,
            isShowDeleteModal: false,
            isShowEditModal: false,
            headers: [
                {
                    label: 'id',
                    sorted: true
                },
                {
                    label: 'name',
                    text: 'Имя пользователя'
                },
                {
                    label: 'text',
                    text: 'Текст'
                },
                {
                    label: 'date',
                    text: 'Дата',
                    sorted: true
                },
                {
                    label: 'actions',
                    text: '',
                }
            ]
        }
    },
    mounted() {
        this.fetchComments()
    },
    computed: {
        paginationParams: {
            get () {
                return this.$store.getters['paginationParams']
            },
            set (value) {
                this.setCurrentPage(value)
            }
        },
        comments() {
            return this.$store.getters['comments']
        },
        paginateComments() {
            return this.comments.sort(this.sortableMethod).slice((this.paginationParams.currentPage - 1) * this.paginationParams.perPage, this.paginationParams.currentPage * this.paginationParams.perPage)
        },
        isLoading() {
            return this.$store.getters['isLoading']
        }
    },
    methods: {
        sortableMethod(a, b) {
            if (this.sortParams.sortBy === 'id') {
                return this.sortParams.sortDesc ? b.id - a.id : a.id - b.id
            }
            if (this.sortParams.sortBy === 'date') {
                const aDate = new Date(a.date)
                const bDate = new Date(b.date)
                return this.sortParams.sortDesc ? bDate - aDate : aDate - bDate
            }
            return this.sortParams.sortDesc ? b.id - a.id : a.id - b.id
        },
        onSort({sortBy, sortDesc}) {
            this.sortParams.sortBy = sortBy
            this.sortParams.sortDesc = sortDesc
        },
        parseDate(date) {
            return new Date(date).toLocaleDateString()
        },
        onDelete(comment) {
            this.selectedComment = comment
            this.isShowDeleteModal = true
        },
        onEdit(comment) {
            this.selectedComment = comment
            this.isShowEditModal = true
        },
        ...mapActions([
            'fetchComments',
        ]),
        ...mapMutations([
            'setCurrentPage'
        ])
    }
};
</script>
